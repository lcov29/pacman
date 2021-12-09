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


   getNextPositionID() {
      return this.next_position.getID();
   }
 

   setNextPosition(position) {
      this.next_position = position;
   }


   isNextBoardPositionEqual(element) {
      return this.level.getBoardPositionElement(this.next_position) == element;
   }


   getOccupiedBoardElement() {
      return this.occupied_board_element;
   }


   setOccupiedBoardElement(element) {
      this.occupied_board_element = element;
   }

   
   isOccupiedBoardElementTeleporter() {
      return this.level.isBoardElementTeleporter(this.occupied_board_element);
   }


   isOccupiedBoardElementEqual(element) {
      return this.occupied_board_element == element;
   }


   getMovementDirectionName() {
      return this.movement_direction_name;
   }


   setMovementDirectionName(direction) {
      this.movement_direction_name = direction;
   }


   getMovementDirection() {
      return Directions.getDirectionByName(this.movement_direction_name);
   }


   calculateMovementDirectionName(current_position = undefined, next_position = undefined) {
      current_position = (current_position == undefined) ? this.current_position : current_position;
      next_position = (next_position == undefined) ? this.next_position : next_position;
      this.movement_direction_name = Directions.calculateMovementDirectionName(current_position, next_position);
   }


   isMovementDirectionSet() {
      return this.movement_direction_name != '';
   }


   getTeleportDestinationForCurrentPosition() {
      return this.level.getTeleportDestination(this.current_position);
   }


   sendLevelUpdateRequests(condition_update_next_position) {
      this.level.addUpdateRequest(new UpdateRequest(this.current_position, this.occupied_board_element));
      if (condition_update_next_position) {
         this.level.addUpdateRequest(new UpdateRequest(this.next_position, this.character, this.movement_direction_name));
      }
   } 


}
