"use strict";

class Pacman extends Actor {
   
   
   constructor(level, position) {
      super(level, Configuration.pacman_character, position, Configuration.initial_pacman_direction);
      this.has_teleported_in_previous_turn = false;
      this.lifes = Configuration.initial_pacman_lifes;
   }
   

   setTeleportationStatus(status) {
      this.has_teleported_in_previous_turn = status;
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
      if (super.isMovementDirectionSet() === false) {
         super.setTurnMovementStatus(true);
      } else {

         if (super.getTurnMovementStatus() === false) {
            super.setNextPosition(super.calculateNextPositionByDirection());
            let teleportation_status = this.handleTeleportation();
            if (super.handleCollisionWithSameActorType()) {
               this.setTeleportationStatus(teleportation_status);
               this.handleWallCollision();
               this.handleGhostDoorCollision();
               this.handlePointCollision();
               this.handleGhostCollision();
               this.updateNextPositionOccupiedCharacter();
               super.updateLevel(!this.isDead());
               super.updateCurrentOccupiedBoardCharacter();
               super.updateCurrentPosition();
               super.setTurnMovementStatus(true);
            }
         }

      }
      return super.getTurnMovementStatus();
   }


   handleTeleportation() {
     let executed = false;
      if (super.isOccupiedBoardElementTeleporter() && this.has_teleported_in_previous_turn === false) {
         let destination = super.getTeleportDestinationForCurrentPosition();
         super.setNextPosition(destination);
         executed = true;
      }
      return executed;
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
   
   
   handlePointCollision() {
      if (super.isNextBoardPositionEqual(Configuration.point_character)) {
         super.incrementScoreBy(Configuration.score_value_per_point);
         super.decrementAvailablePoints();
      }
   }
   
   
   handleGhostCollision() {
      if (super.isNextBoardPositionEqual(Configuration.ghost_blinky_character)) {
         this.decrementLife();
         this.level.decrementTotalPacmanLifes();
      }
   }


   updateNextPositionOccupiedCharacter() {
      if (super.isNextBoardPositionEqual(Configuration.point_character)) {
         super.updateNextOccupiedBoardCharacter(Configuration.empty_tile_character);
      } else {
         if (super.isNextBoardPositionEqual(Configuration.pacman_character)) {
            super.updateNextOccupiedBoardCharacter(super.getOccupiedBoardCharacter());
         } else {
            super.updateNextOccupiedBoardCharacter();
         }
      }
   }

   
}
