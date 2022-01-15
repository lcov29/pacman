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


   getBoardPositionAt(x, y) {
      return this.level.getBoardPositionAt(x, y);
   }


   getPacmanIDs() {
      return this.level.getPacmanIDs();
   }


   getTeleportDestinationForCurrentPosition() {
      return this.level.getTeleportDestination(this.current_position);
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


   decrementLifeOfPacman(pacman_id) {
      this.level.decrementLifeOfPacman(pacman_id);
   }


   decrementAvailablePoints() {
      this.level.decrementAvailablePoints();
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


   updateLevel(styleclass_next_position, condition_update_next_position = true) {
      this.sendLevelUpdateRequestForCurrentPosition();
      this.sendLevelUpdateRequestForNextPosition(styleclass_next_position, condition_update_next_position);
      this.level.update();
   }


   sendLevelUpdateRequestForCurrentPosition() {
      let actor = Configuration.empty_tile_character;
      let element = this.current_position.getElementCharacter();
      let styleclass = Configuration.getForegroundStyleClass(actor, element);
      this.current_position.setActorCharacter(actor);
      this.level.addUpdateRequest(new UpdateRequest(this.current_position, styleclass));
   }


   sendLevelUpdateRequestForNextPosition(styleclass, update_condition) {
      if (update_condition) {
         this.next_position.setActorCharacter(this.character);
         this.level.addUpdateRequest(new UpdateRequest(this.next_position, styleclass));
      }
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
         next_position =  this.getBoardPositionAt(next_xPosition, next_yPosition);
      } catch(e) {
         // prevent actor from leaving the board
         next_position = this.getCurrentPosition();
      }
      return next_position;
   }


}
