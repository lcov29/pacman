"use strict";

class Ghost extends MovableObject {
   
   
   constructor(level, xPosition, yPosition) {
      super(level, xPosition, yPosition);
      this.occupied_field_object = Configuration.empty_character;
   }
   
   
   moveToPosition(position) {
      this.setNextPosition(position.xPosition, position.yPosition)
      this.handlePacManCollision();
      this.updateField();
      this.updateCurrentPosition();
   }
    

   handlePacManCollision() {
      if (this.isNextFieldPositionEqual(Configuration.pacman_character)) {
         this.decrementLifeOfPacman();
      }
   }

   
   updateField() {
      this.level.addUpdateRequest(new UpdateRequest(this.xPosition, this.yPosition, this.occupied_field_object));
      this.updateOccupiedFieldObject();
      this.level.addUpdateRequest(new UpdateRequest(this.next_xPosition, this.next_yPosition, Configuration.ghost_character));
   }
    
       
   decrementLifeOfPacman() {
      for (let pacman of this.level.pacmans) {
         if (pacman.xPosition == this.next_xPosition && pacman.yPosition == this.next_yPosition) {
            pacman.decrementLife();
         }
      }
   }
   
   
   //TODO: check for edge cases
   updateOccupiedFieldObject() {
      if (this.isNextFieldPositionEqual(Configuration.ghost_character) || 
          this.isNextFieldPositionEqual(Configuration.pacman_character)) {
         this.occupied_field_object = Configuration.empty_character;
      } else {
         this.occupied_field_object = this.level.field.getFieldObject(this.next_xPosition, this.next_yPosition);
      }
   }

   
}
