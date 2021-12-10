"use strict";

class Pacman extends Actor {
   
   
   constructor(level, position) {
      super(level, position);
      super.setCharacter(Configuration.pacman_character);
      this.has_teleported = false;
      this.lifes = Configuration.initial_pacman_lifes;
   }
   

   getNumberOfLifes() {
      return this.lifes;
   }
   
   
   isDead() {
      return this.lifes == 0;
   }
   

   incrementLifeBy(value) {
      if (this.lifes > 0 && value > 0) {
         this.lifes += value;
      }
   }


   decrementLife() {
      if (this.lifes > 0) {
         this.lifes--;
      }
   }


   move() {
      if (super.isMovementDirectionSet()) {
         this.calculateNextPosition();
         this.handleWallCollision();
         this.handleTeleportation();
         this.handlePointCollision();
         this.handleGhostCollision();
         super.sendLevelUpdateRequests(!this.isDead());
         this.updateOccupiedBoardElement();
         super.updateCurrentPosition();
      }
   }
   

   calculateNextPosition() {
      var direction = super.getMovementDirection();
      var next_xPosition = super.getCurrentPosition().getX() + direction.x;
      var next_yPosition = super.getCurrentPosition().getY() + direction.y;
      var next_position_id = super.getNextPositionID(next_xPosition, next_yPosition);
      super.setNextPosition(new BoardPosition(next_xPosition, next_yPosition, next_position_id));
   }

   
   handleWallCollision() {
      if (super.isNextBoardPositionEqual(Configuration.wall_character)) {
         super.setNextPosition(super.getCurrentPosition());
      }
   }


   handleTeleportation() {
      if (super.isOccupiedBoardElementTeleporter()) {
         // prevent teleporting loop
         if (this.has_teleported) {
            this.has_teleported = false;
         } else {
            var destination = super.getTeleportDestinationForCurrentPosition();
            super.setNextPosition(destination);
            this.has_teleported = true;
         }
      }
   }
   
   
   handlePointCollision() {
      if (super.isNextBoardPositionEqual(Configuration.point_character)) {
         super.getLevel().incrementScoreBy(Configuration.score_value_per_point);
         super.getLevel().decrementPoint();
      }
   }
   
   
   handleGhostCollision() {
      if (super.isNextBoardPositionEqual(Configuration.ghost_character)) {
         this.decrementLife();
      }
   }
   

   updateOccupiedBoardElement() {
      if (super.isNextBoardPositionEqual(Configuration.point_character)) {
         super.setOccupiedBoardElement(Configuration.empty_tile_character);
      } else {
         if (!super.isNextBoardPositionEqual(Configuration.pacman_character)) {
            var next_occupied_element = super.getLevel().getBoardPositionElement(super.getNextPosition());
            super.setOccupiedBoardElement(next_occupied_element);
         }
      }
   }

   
}
