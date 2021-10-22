"use strict";

class MovableObject {
    

   constructor(level, xPosition, yPosition) {
      this.level = level;
      this.xPosition = xPosition;
      this.yPosition = yPosition;
      this.next_xPosition = xPosition;
      this.next_yPosition = yPosition;
      this.occupied_board_element = Configuration.empty_tile_character;
      this.has_teleported = false;
   }
   
   
   setNextPosition(xPosition, yPosition) {
      this.next_xPosition = xPosition;
      this.next_yPosition = yPosition;
   }


   calculateNextPosition(direction) {
      this.next_xPosition = this.xPosition + direction.x;
      this.next_yPosition = this.yPosition + direction.y;
   }


   updateCurrentPosition() {
      this.xPosition = this.next_xPosition;
      this.yPosition = this.next_yPosition;
   }
   
   
   isOccupiedBoardElementEqual(element) {
      return this.occupied_board_element == element;
   }

   
   isNextBoardPositionEqual(element) {
      return this.level.board.getElementAt(this.next_xPosition, this.next_yPosition) == element;
   }


}
