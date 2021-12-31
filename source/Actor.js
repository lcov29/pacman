"use strict";

class Actor {
    

   constructor(level, character, position) {
      this.level = level;
      this.character = character;
      this.current_position = position;
      this.next_position = position;
      this.current_occupied_board_character = Configuration.empty_tile_character;
      this.next_occupied_board_character = '';
      this.movement_direction_name = '';
   }


   getCurrentPosition() {
      return this.current_position;
   }


   getCurrentPositionID() {
      return this.current_position.getID();
   }

   
   updateCurrentPosition() {
      this.current_position = this.next_position;
      this.next_position = undefined;
   }


   getNextPosition() {
      return this.next_position;
   }
 

   setNextPosition(position) {
      this.next_position = position;
   }


   isNextBoardPositionEqual(character) {
      return this.next_position.getCharacter() == character;
   }


   getBoardPositionAt(x, y) {
      return this.level.getBoardPositionAt(x, y);
   }


   updateNextOccupiedBoardCharacter(character = "") {
      this.next_occupied_board_character = (character == "") ? this.next_position.getCharacter() : character;
   }


   updateCurrentOccupiedBoardCharacter() {
      this.current_occupied_board_character = this.next_occupied_board_character;
      this.next_occupied_board_character = "";
   }

   
   isOccupiedBoardElementTeleporter() {
      return this.level.isBoardElementTeleporter(this.current_occupied_board_character);
   }


   getMovementDirection() {
      return Directions.getDirectionByName(this.movement_direction_name);
   }


   isMovementDirectionSet() {
      return this.movement_direction_name != '';
   }


   setMovementDirectionName(direction) {
      this.movement_direction_name = direction;
   }


   calculateMovementDirectionName(current_position = undefined, next_position = undefined) {
      current_position = (current_position == undefined) ? this.current_position : current_position;
      next_position = (next_position == undefined) ? this.next_position : next_position;
      this.movement_direction_name = Directions.calculateMovementDirectionName(current_position, next_position);
   }


   getTeleportDestinationForCurrentPosition() {
      return this.level.getTeleportDestination(this.current_position);
   }


   getPacmanIDs() {
      return this.level.getPacmanIDs();
   }

 
   decrementLifeOfPacman(pacman_id) {
      this.level.decrementLifeOfPacman(pacman_id);
   }


   incrementScoreBy(value) {
      this.level.incrementScoreBy(value);
   }


   decrementAvailablePoints() {
      this.level.decrementAvailablePoints();
   }


   updateLevel(condition_update_next_position = true) {

      this.current_position.setCharacter(this.current_occupied_board_character);
      this.current_position.setMovementDirection("");
      this.level.addUpdateRequest(this.current_position);

      // prevent dead pacmans getting drawn on next position
      if (condition_update_next_position) {
         this.next_position.setCharacter(this.character);
         this.next_position.setMovementDirection(this.movement_direction_name);
         this.level.addUpdateRequest(this.next_position);
      }

      this.level.update();

   }


}
