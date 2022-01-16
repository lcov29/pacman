"use strict";

export default class Pacman extends Actor {
   
   
   constructor(level, position) {
      super(level,
            position,  
            Configuration.pacman_character, 
            "",
            Configuration.pacman_foreground_css_class);
      this.has_teleported_in_previous_turn = false;
   }
   

   setTeleportationStatus(status) {
      this.has_teleported_in_previous_turn = status;
   }


   getStyleClass() {
      return `${super.getBaseStyleClass()}_${super.getMovementDirectionName()}`;
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
               super.updateLevel(this.getStyleClass());
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
         this.level.decrementAvailablePoints();
         super.getNextPosition().setElementCharacter(Configuration.empty_tile_character);
      }
   }


   handlePowerUpCollision() {
      if (super.isNextBoardPositionEqual(Configuration.powerup_character)) {
         super.incrementScoreBy(Configuration.score_value_per_powerup);
         this.level.decrementAvailablePoints();
         this.level.scareLivingGhosts();
         super.getNextPosition().setElementCharacter(Configuration.empty_tile_character);
      }
   }
   
   
   handleGhostCollision() {
      if (super.isNextBoardPositionEqual(Configuration.ghost_blinky_character)) {
         let position_id = super.getNextPosition().getID();
         let state_names = this.level.getStateNamesOfGhostsAt(position_id);
         let executed = this.handleGhostChaseScatterCollision(state_names);
         if (!executed) { this.handleGhostScaredCollision(state_names, position_id); }      
      }
   }


   handleGhostChaseScatterCollision(ghost_states) {
      let executed = false;
      if (ghost_states.includes(Configuration.ghost_state_chase_name) ||
          ghost_states.includes(Configuration.ghost_state_scatter_name)) {
               this.kill();
               executed = true;
      }
      return executed;
   }


   handleGhostScaredCollision(ghost_states, position_id) {
      if (ghost_states.includes(Configuration.ghost_state_flee_name)) {
         this.level.killGhost(position_id);
         super.incrementScoreBy(Configuration.score_value_per_eaten_ghost);
      }
   }


   kill() {
      super.setUpdateFlagNextPosition(false);
      this.level.decrementTotalPacmanLifes();
      this.level.removeDeadPacmanAt(super.getCurrentPosition().getID());
   }

   
}
