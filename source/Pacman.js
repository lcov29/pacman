"use strict";

class Pacman extends Actor {
   
   
   constructor(level, position) {
      super(level,
            position,  
            Configuration.pacman_character, 
            "",
            Configuration.pacman_foreground_css_class);
      this.has_teleported_in_previous_turn = false;
      this.lifes = Configuration.initial_pacman_lifes;
   }
   

   setTeleportationStatus(status) {
      this.has_teleported_in_previous_turn = status;
   }


   getNumberOfLifes() {
      return this.lifes;
   }


   getStyleClass() {
      return `${super.getBaseStyleClass()}_${super.getMovementDirectionName()}`;
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
            this.handleWallCollision();
            this.handleGhostDoorCollision();
            let teleportation_status = this.handleTeleportation();
            if (super.handleCollisionWithSameActorType()) {
               this.setTeleportationStatus(teleportation_status);
               this.handlePointCollision();
               this.handlePowerUpCollision();
               this.handleGhostCollision();
               super.updateLevel(this.getStyleClass(), !this.isDead());
               super.updateCurrentPosition();
               super.setTurnMovementStatus(true);
            }
         }

      }
      return super.getTurnMovementStatus();
   }


   handleTeleportation() {
     let teleportation_executed = false;
      if (super.isOccupiedBoardElementTeleporter() && this.has_teleported_in_previous_turn === false) {
         let destination = super.getTeleportDestinationForCurrentPosition();
         super.setNextPosition(destination);
         teleportation_executed = true;
      }
      return teleportation_executed;
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
         super.getNextPosition().setElementCharacter(Configuration.empty_tile_character);
      }
   }


   handlePowerUpCollision() {
      if (super.isNextBoardPositionEqual(Configuration.powerup_character)) {
         super.incrementScoreBy(Configuration.score_value_per_powerup);
         super.decrementAvailablePoints();
         this.level.scareGhosts();
         super.getNextPosition().setElementCharacter(Configuration.empty_tile_character);
      }
   }
   
   
   handleGhostCollision() {
      if (super.isNextBoardPositionEqual(Configuration.ghost_blinky_character)) {
         let ghost_position_id = super.getNextPosition().getID();
         if (this.level.isGhostScared(ghost_position_id)) {
            this.level.killGhost(ghost_position_id);
            super.incrementScoreBy(Configuration.score_value_per_eaten_ghost);
         } else {
            this.decrementLife();
            this.level.decrementTotalPacmanLifes();
         }
         
      }
   }

   
}
