"use strict";

class Ghost extends MovableObject {
   
   
   constructor(level, xPosition, yPosition) {
      super(level, xPosition, yPosition);
      this.occupied_board_element = Configuration.empty_character;
   }
   
   
   moveToPosition(position) {
      this.setNextPosition(position.xPosition, position.yPosition)
      this.handlePacManCollision();
      this.updateField();
      this.updateCurrentPosition();
   }
    

   handlePacManCollision() {
      if (this.isNextBoardPositionEqual(Configuration.pacman_character)) {
         this.decrementLifeOfPacman();
      }
   }

   
   updateField() {
      this.level.addUpdateRequest(new UpdateRequest(this.xPosition, this.yPosition, this.occupied_board_element));
      this.updateOccupiedBoardElement();
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
   updateOccupiedBoardElement() {
      if (this.isNextBoardPositionEqual(Configuration.ghost_character) || 
          this.isNextBoardPositionEqual(Configuration.pacman_character)) {
         this.occupied_board_element = Configuration.empty_character;
      } else {
         this.occupied_board_element = this.level.board.getElementAt(this.next_xPosition, this.next_yPosition);
      }
   }

   
}
