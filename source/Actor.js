"use strict";

class Actor {
    

   constructor(level, position) {
      this.level = level;
      this.current_position = position;
      this.next_position = position;
      this.occupied_board_element = Configuration.empty_tile_character;
      this.has_teleported = false;
   }
   
   
   setNextPosition(position) {
      this.next_position = position;
   }


   getCurrentPositionID() {
      return this.current_position.getID();
   }


   calculateNextPosition(direction) {
      let next_xPosition = this.current_position.getX() + direction.x;
      let next_yPosition = this.current_position.getY() + direction.y;
      let next_position_id = this.level.getBoardPositionID(next_xPosition, next_yPosition);
      this.next_position = new BoardPosition(next_xPosition, next_yPosition, next_position_id);
   }


   updateCurrentPosition() {
      this.current_position = this.next_position;
   }
   
   
   isOccupiedBoardElementEqual(element) {
      return this.occupied_board_element == element;
   }

   
   isNextBoardPositionEqual(element) {
      return this.level.getBoardPositionElement(this.next_position) == element;
   }


}
