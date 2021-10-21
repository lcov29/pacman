"use strict";

class UpdateRequest {
   
   constructor(xPosition, yPosition, object, direction = "") {
      this.xPosition = xPosition;
      this.yPosition = yPosition;
      this.object = object;
      this.direction = direction;
   }
   
}