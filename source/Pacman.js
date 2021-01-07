"use strict";

class Pacman extends MovableObject {
   
   
   constructor(game, xPosition, yPosition) {
      super(game, xPosition, yPosition);
      this.next_direction = '';
      this.lifes = 1;
   }
   
   
   move() {
      if (this.next_direction != '') {
         let direction = Dictionary.getDirectionByName(this.next_direction);
         this.calculateNextPosition(direction);
         this.handleWallCollision();
         this.handlePointCollision();
         this.handleGhostCollision();
         this.updateField();
         this.updateCurrentPosition();
      }
   }
   
   
   handleWallCollision() {
      if (this.isNextFieldPositionEqual('wall')) {
         this.setNextPosition(this.xPosition, this.yPosition);
      }
   }
   
   
   handlePointCollision() {
      if (this.isNextFieldPositionEqual('point')) {
         this.game.incrementScoreBy(10);
         this.game.decrementPoint();
      }
   }
   
   
   handleGhostCollision() {
      if (this.isNextFieldPositionEqual('ghost')) {
         this.decrementLife();
      }
   }
   
   
   updateField() {
      this.game.field.addUpdateRequest(new UpdateRequest(this.xPosition, this.yPosition, 'empty'));
      if (this.lifes > 0) {
         this.game.field.addUpdateRequest(new UpdateRequest(this.next_xPosition, this.next_yPosition, 'pacman'));
      }
   }
   
   
   decrementLife() {
      if (this.lifes > 0) {
         this.lifes--;
      }
   }
   
   
   setNextDirection(direction_name) {
      this.next_direction = direction_name;
   }
   
   
   setNumberOfLifes(lifes) {
      this.lifes = lifes;
   }

   
   getNumberOfLifes() {
      return this.lifes;
   }
   
   
   isDead() {
      return this.lifes == 0;
   }
   
}
