"use strict";

class Actor {
    

   constructor(level, position, character, initial_direction, base_style_class) {
      this.level = level;
      this.current_position = position;
      this.next_position = position;
      this.character = character;
      this.current_occupied_board_character = Configuration.empty_tile_character;
      this.next_occupied_board_character = '';
      this.movement_direction_name = initial_direction;
      this.has_moved_in_current_turn = false;
      this.base_style_class = base_style_class;
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


   getOccupiedBoardCharacter() {
      return this.current_occupied_board_character;
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
      return this.next_position.getCharacter() === character;
   }


   isOccupiedBoardElementTeleporter() {
      return this.level.isBoardElementTeleporter(this.current_occupied_board_character);
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
      this.current_position.setCharacter(this.current_occupied_board_character);
      let styleclass_current_position = Configuration.getForegroundStyleClass(this.current_occupied_board_character);
      this.level.addUpdateRequest(new UpdateRequest(this.current_position, styleclass_current_position));

      // prevent dead pacmans getting drawn on next position
      if (condition_update_next_position) {
         this.next_position.setCharacter(this.character);
         this.level.addUpdateRequest(new UpdateRequest(this.next_position, styleclass_next_position));
      }

      this.level.update();
   }


   updateCurrentPosition() {
      this.current_position = this.next_position;
      this.next_position = null;
   }


   updateCurrentOccupiedBoardCharacter() {
      this.current_occupied_board_character = this.next_occupied_board_character;
      this.next_occupied_board_character = "";
   }


   updateNextOccupiedBoardCharacter(character = "") {
      this.next_occupied_board_character = (character === "") ? this.next_position.getCharacter() : character;
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
