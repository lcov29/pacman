"use strict";

class Pacman extends Actor {
   
   
   constructor(level, position) {
      super(level, Configuration.pacman_character, position, Configuration.initial_pacman_direction);
      this.has_teleported = false;
      this.lifes = Configuration.initial_pacman_lifes;
   }
   

   getNumberOfLifes() {
      return this.lifes;
   }
   
   
   isDead() {
      return this.lifes === 0;
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
         this.handleGhostDoorCollision();
         this.handleTeleportation();
         this.handlePointCollision();
         this.handleGhostCollision();
         this.setNextPositionOccupiedCharacter();
         super.updateLevel(!this.isDead());
         super.updateCurrentOccupiedBoardCharacter();
         super.updateCurrentPosition();
      }
   }
   

   calculateNextPosition() {
      let direction = super.getMovementDirection();
      let next_xPosition = super.getCurrentPosition().getX() + direction.x;
      let next_yPosition = super.getCurrentPosition().getY() + direction.y;
      let next_position =  super.getBoardPositionAt(next_xPosition, next_yPosition);
      super.setNextPosition(next_position);
   }

   
   handleWallCollision() {
      if (super.isNextBoardPositionEqual(Configuration.wall_character)) {
         super.setNextPosition(super.getCurrentPosition());
      }
   }


   handleGhostDoorCollision() {
      if (super.isNextBoardPositionEqual(Configuration.ghost_door_character)) {
         super.setNextPosition(super.getCurrentPosition());
      }
   }


   handleTeleportation() {
      if (super.isOccupiedBoardElementTeleporter()) {
         // prevent teleportation loop
         if (this.has_teleported) {
            this.has_teleported = false;
         } else {
            let destination = super.getTeleportDestinationForCurrentPosition();
            super.setNextPosition(destination);
            this.has_teleported = true;
         }
      }
   }
   
   
   handlePointCollision() {
      if (super.isNextBoardPositionEqual(Configuration.point_character)) {
         super.incrementScoreBy(Configuration.score_value_per_point);
         super.decrementAvailablePoints();
      }
   }
   
   
   handleGhostCollision() {
      if (super.isNextBoardPositionEqual(Configuration.ghost_character)) {
         this.decrementLife();
      }
   }


   setNextPositionOccupiedCharacter() {
      if (super.isNextBoardPositionEqual(Configuration.point_character)) {
         super.updateNextOccupiedBoardCharacter(Configuration.empty_tile_character);
      } else {
         if (!super.isNextBoardPositionEqual(Configuration.pacman_character)) {
            super.updateNextOccupiedBoardCharacter();
         }
      }
   }

   
}
