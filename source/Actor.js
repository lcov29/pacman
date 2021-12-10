"use strict";

class Actor {
    

   constructor(level, position) {
      this.level = level;
      this.character = '';
      this.current_position = position;
      this.next_position = position;
      this.occupied_board_element = Configuration.empty_tile_character;
      this.movement_direction_name = '';
   }
   
   
   getLevel() {
      return this.level;
   }


   getCharacter() {
      return this.character;
   }


   setCharacter(character) {
      this.character = character;
   }


   getCurrentPosition() {
      return this.current_position;
   }


   getCurrentPositionID() {
      return this.current_position.getID();
   }

   
   updateCurrentPosition() {
      this.current_position = this.next_position;
   }


   getNextPosition() {
      return this.next_position;
   }


   getNextPositionID(next_xPosition = -1, next_yPosition = -1) {
      var id = -1;
      if (next_xPosition == -1 && next_yPosition == -1) {
         id = this.next_position.getID();
      } else {
         id = this.level.getBoardPositionID(next_xPosition, next_yPosition);
      }
      return id;
   }
 

   setNextPosition(position) {
      this.next_position = position;
   }


   isNextBoardPositionEqual(element) {
      return this.level.getBoardPositionElement(this.next_position) == element;
   }


   updateNextOccupiedBoardElement() {
      var next_element = this.level.getBoardPositionElement(this.next_position);
      this.setOccupiedBoardElement(next_element);
   }


   setOccupiedBoardElement(element) {
      this.occupied_board_element = element;
   }

   
   isOccupiedBoardElementTeleporter() {
      return this.level.isBoardElementTeleporter(this.occupied_board_element);
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


   sendLevelUpdateRequests(condition_update_next_position) {
      this.level.addUpdateRequest(new UpdateRequest(this.current_position, this.occupied_board_element));
      if (condition_update_next_position) {
         this.level.addUpdateRequest(new UpdateRequest(this.next_position, this.character, this.movement_direction_name));
      }
   } 


}
