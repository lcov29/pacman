"use strict";

class MovableObject {
    

   constructor(level, xPosition, yPosition) {
      this.level = level;
      this.xPosition = xPosition;
      this.yPosition = yPosition;
      this.next_xPosition = xPosition;
      this.next_yPosition = yPosition;
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
   
   
   isNextFieldPositionEqual(object) {
      return this.level.field.getFieldObject(this.next_xPosition, this.next_yPosition) == object;
   }


}
