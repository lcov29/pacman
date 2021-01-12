"use strict";

class Pacman extends MovableObject {
   
   
   constructor(level, xPosition, yPosition) {
      super(level, xPosition, yPosition);
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
         this.updateLevel();
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
         this.level.incrementScoreBy(10);
         this.level.decrementPoint();
      }
   }
   
   
   handleGhostCollision() {
      if (this.isNextFieldPositionEqual('ghost')) {
         this.decrementLife();
      }
   }
   
   
   updateLevel() {
      this.level.addUpdateRequest(new UpdateRequest(this.xPosition, this.yPosition, 'empty'));
      if (this.lifes > 0) {
         this.level.addUpdateRequest(new UpdateRequest(this.next_xPosition, this.next_yPosition, 'pacman'));
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
