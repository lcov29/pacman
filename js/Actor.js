"use strict";

class Actor {
    

   constructor(level, position, character, initial_direction, base_style_class) {
      this.level = level;
      this.current_position = position;
      this.next_position = position;
      this.character = character;
      this.movement_direction_name = initial_direction;
      this.base_style_class = base_style_class;
      this.has_moved_in_current_turn = false;
      this.update_flag_current_position = true;
      this.update_flag_next_position = true;
   }


   setNextPosition(position) {
      this.next_position = position;
   }


   setMovementDirectionName(direction) {
      this.movement_direction_name = direction;
   }


   setTurnMovementStatus(status) {
      this.has_moved_in_current_turn = status;
   }


   setUpdateFlagCurrentPosition(status) {
      this.update_flag_current_position = status;
   }


   setUpdateFlagNextPosition(status) {
      this.update_flag_next_position = status;
   }


   resetUpdateFlags() {
      this.update_flag_current_position = true;
      this.update_flag_next_position = true;
   }


   getCurrentPosition() {
      return this.current_position;
   }


   getNextPosition() {
      return this.next_position;
   }


   getMovementDirectionName() {
      return this.movement_direction_name;
   }


   getMovementDirection() {
      return Directions.getDirectionByName(this.movement_direction_name);
   }


   getTurnMovementStatus() {
      return this.has_moved_in_current_turn;
   }


   getBaseStyleClass() {
      return this.base_style_class;
   }


   getTeleportDestinationForCurrentPosition() {
      return this.level.getTeleportDestination(this.current_position);
   }


   isCurrentBoardPositionEqual(character) {
      return this.current_position.getActorCharacter() === character ||
             this.current_position.getElementCharacter() === character;
   }


   isNextBoardPositionEqual(character) {
      return this.next_position.getActorCharacter() === character ||
             this.next_position.getElementCharacter() === character;
   }


   isOccupiedBoardElementTeleporter() {
      let occupied_element_character = this.current_position.getElementCharacter();
      return this.level.isBoardElementTeleporter(occupied_element_character);
   }


   isMovementDirectionSet() {
      return this.movement_direction_name !== '';
   }


   incrementScoreBy(value) {
      this.level.incrementScoreBy(value);
   }


   handleCollisionWithSameActorType() {
      let result = true;
      if (this.isNextBoardPositionEqual(this.character)) {
         let this_actor_id = this.getCurrentPosition().getID();
         let other_actor_id = this.getNextPosition().getID();
         if (this_actor_id !== other_actor_id) {
            let other_completed_turn = this.level.getTurnCompletionStatusForActor(this.character, other_actor_id);
            if (other_completed_turn) {
               this.setNextPosition(this.getCurrentPosition());
            } else {
               result = false;
            }
         }
      }
      return result;
   }


   updateLevel(styleclass_next_position) {
      this.sendLevelUpdateRequestForCurrentPosition();
      this.sendLevelUpdateRequestForNextPosition(styleclass_next_position);
      this.level.update();
      this.resetUpdateFlags();
   }


   sendLevelUpdateRequestForCurrentPosition() {
      if (this.update_flag_current_position) {
         let actor = Configuration.empty_tile_character;
         let element = this.current_position.getElementCharacter();
         let styleclass = Configuration.getForegroundStyleClass(actor, element);
         this.current_position.setActorCharacter(actor);
         this.level.addUpdateRequest(new UpdateRequest(this.current_position, styleclass));
      }
   }


   sendLevelUpdateRequestForNextPosition(styleclass) {
      if (this.update_flag_next_position) {
         this.next_position.setActorCharacter(this.character);
         this.level.addUpdateRequest(new UpdateRequest(this.next_position, styleclass));
      }
   }


   loadCurrentPositionFromBoard() {
      this.current_position = this.level.getBoardPositionAt(this.current_position.getX(), 
                                                            this.current_position.getY());
   }


   updateCurrentPosition() {
      this.current_position = this.next_position;
      this.next_position = null;
   }


   calculateNextPositionByDirection() {
      let direction = this.getMovementDirection();
      let next_xPosition = this.getCurrentPosition().getX() + direction.x;
      let next_yPosition = this.getCurrentPosition().getY() + direction.y;
      let next_position = null;
      try {
         next_position =  this.level.getBoardPositionAt(next_xPosition, next_yPosition);
      } catch(e) {
         // prevent actor from leaving the board
         next_position = this.getCurrentPosition();
      }
      return next_position;
   }


}
