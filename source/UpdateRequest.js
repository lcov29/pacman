"use strict";

class UpdateRequest {
   
   constructor(position, object, direction = "") {
      this.position = position
      this.object = object;
      this.direction = direction;
   }

   getPosition() {
      return this.position;
   }

   getObject() {
      return this.object;
   }

   getDirection() {
      return this.direction;
   }
   
}