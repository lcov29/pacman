"use strict";

class Pacman extends Actor {
   
   
   constructor(level, position) {
      super(level, Configuration.pacman_character, position, Configuration.initial_pacman_direction);
      this.has_teleported = false;
      this.lifes = Configuration.initial_pacman_lifes;
      this.has_moved_in_current_turn = false;
   }
   

   setTurnMovementStatus(bool) {
      this.has_moved_in_current_turn = bool;
   }


   getTurnMovementStatus() {
      return this.has_moved_in_current_turn;
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


   /*
   move() {
      if (super.isMovementDirectionSet()) {
         this.calculateNextPosition();
         this.handleWallCollision();
         this.handleGhostDoorCollision();
         this.handleTeleportation();
         this.handlePointCollision();
         this.handleGhostCollision();
         this.updateNextPositionOccupiedCharacter();
         super.updateLevel(!this.isDead());
         super.updateCurrentOccupiedBoardCharacter();
         super.updateCurrentPosition();
      }
   }*/
 

   move() {
      if (super.isMovementDirectionSet() && !this.getTurnMovementStatus()) {
         this.calculateNextPosition();
         this.handleTeleportation();
         if (this.handlePacmanCollision()) {
            this.handleWallCollision();
            this.handleGhostDoorCollision();
            //this.handleTeleportation();
            this.handlePointCollision();
            this.handleGhostCollision();
            this.updateNextPositionOccupiedCharacter();
            super.updateLevel(!this.isDead());
            super.updateCurrentOccupiedBoardCharacter();
            super.updateCurrentPosition();
            this.setTurnMovementStatus(true);
         }
      }
      return this.getTurnMovementStatus();
   }


   calculateNextPosition() {
      let direction = super.getMovementDirection();
      let next_xPosition = super.getCurrentPosition().getX() + direction.x;
      let next_yPosition = super.getCurrentPosition().getY() + direction.y;
      let next_position = null;
      try {
         next_position =  super.getBoardPositionAt(next_xPosition, next_yPosition);
      } catch(e) {
         next_position = super.getCurrentPosition();
      } finally {
         super.setNextPosition(next_position);
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


   handlePacmanCollision() {
      let result = true;
      if (super.isNextBoardPositionEqual(Configuration.pacman_character)) {
         let other_pacman_id = super.getNextPosition().getID();
         let other_pacman_completed_turn = this.level.getTurnCompletionStatusForPacman(other_pacman_id);
         if (other_pacman_completed_turn) {
            super.setNextPosition(super.getCurrentPosition());
         } else {
            result = false;
         }
      }
      return result;
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
         if (!super.isNextBoardPositionEqual(Configuration.pacman_character)) {
            super.updateNextOccupiedBoardCharacter();
         }
      }
   }

   
}
