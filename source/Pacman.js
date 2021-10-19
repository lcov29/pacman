"use strict";

class Pacman extends MovableObject {
   
   
   constructor(level, xPosition, yPosition) {
      super(level, xPosition, yPosition);
      this.next_direction = '';
      this.lifes = Configuration.initial_pacman_lifes;
   }
   
   
   move() {
      if (this.next_direction != '') {
         let direction = Configuration.getDirectionByName(this.next_direction);
         this.calculateNextPosition(direction);
         this.handleWallCollision();
         this.handlePointCollision();
         this.handleGhostCollision();
         this.updateLevel();
         this.updateCurrentPosition();
      }
   }
   
   
   handleWallCollision() {
      if (this.isNextFieldPositionEqual(Configuration.wall_character)) {
         this.setNextPosition(this.xPosition, this.yPosition);
      }
   }
   
   
   handlePointCollision() {
      if (this.isNextFieldPositionEqual(Configuration.point_character)) {
         this.level.incrementScoreBy(10);
         this.level.decrementPoint();
      }
   }
   
   
   handleGhostCollision() {
      if (this.isNextFieldPositionEqual(Configuration.ghost_character)) {
         this.decrementLife();
      }
   }
   
   
   updateLevel() {
      var request = new UpdateRequest(this.xPosition, this.yPosition, Configuration.empty_character);
      this.level.addUpdateRequest(request);
      if (this.lifes > 0) {
         request = new UpdateRequest(this.next_xPosition, this.next_yPosition, Configuration.pacman_character);
         this.level.addUpdateRequest(request);
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
