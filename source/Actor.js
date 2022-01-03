"use strict";

class Actor {
    

   constructor(level, character, position, initial_direction) {
      this.level = level;
      this.character = character;
      this.current_position = position;
      this.next_position = position;
      this.current_occupied_board_character = Configuration.empty_tile_character;
      this.next_occupied_board_character = '';
      this.movement_direction_name = initial_direction;
      this.current_position.setMovementDirection(this.movement_direction_name);
   }


   setNextPosition(position) {
      this.next_position = position;
   }


   setMovementDirectionName(direction) {
      this.movement_direction_name = direction;
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


   getMovementDirection() {
      return Directions.getDirectionByName(this.movement_direction_name);
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


}
