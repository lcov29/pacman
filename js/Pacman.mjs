"use strict";

import Actor from "./Actor.mjs";
import Configuration from "./Configuration.mjs";


export default class Pacman extends Actor {
   

   constructor(level, position) {
      super(level, position);
      super.setCharacter( Configuration.pacman_character);
      super.setBaseStyleClass(Configuration.pacman_foreground_css_class);
      this.has_changed_position_in_previous_turn = false;
   }


   getStyleClass() {
      return `${super.getBaseStyleClass()}_${super.getMovementDirectionName()}`;
   }


   updatePositionChangeFlag() {
      let current_position_id = super.getCurrentPosition().getID();
      let next_Position_id = super.getNextPosition().getID();
      this.has_changed_position_in_previous_turn = (current_position_id !== next_Position_id);
   }


   move() {
      if (super.isMovementDirectionSet() === false) {
         super.setTurnMovementStatus(true);
      } else {

         if (super.getTurnMovementStatus() === false) {
            super.setNextPosition(super.calculateNextPositionByDirection());
            let teleportation_status = this.handleTeleportation();
            this.handleWallCollision();
            this.handleGhostDoorCollision();         
            if (super.handleCollisionWithSameActorType()) {
               super.setTeleportationStatus(teleportation_status);
               this.handlePointCollision();
               this.handlePowerUpCollision();
               this.handleGhostCollision();
               this.updatePositionChangeFlag();
               super.updateBoard(this.getStyleClass());
               super.updateCurrentPosition();
               super.setTurnMovementStatus(true);
            } else {
               super.resetUpdateFlags();
               // TODO: RESET NEXT POSITION IN ELSE STATEMENT
            }
            
         }

      }
      return super.getTurnMovementStatus();
   }


   // TODO: ADD COMMENT
   handleTeleportation() {
      let teleportation_executed = false;
      if (super.isCurrentPositionTeleporter() && this.has_teleported_in_previous_turn === false) {
         let destination = super.getTeleportDestinationForCurrentPosition();
         super.setNextPosition(destination);
         teleportation_executed = true;
      }
      return teleportation_executed;
   }


   handleWallCollision() {
      if (super.isNextBoardPositionEqual(Configuration.wall_character)) {
         super.setNextPosition(super.getCurrentPosition());
         super.setUpdateFlagCurrentPosition(false);
         if (this.has_changed_position_in_previous_turn === false) {
            super.setUpdateFlagNextPosition(false);
         }
      }
   }


   handleGhostDoorCollision() {
      if (super.isNextBoardPositionEqual(Configuration.ghost_door_character)) {
         super.setNextPosition(super.getCurrentPosition());
         super.setUpdateFlagCurrentPosition(false);
         if (this.has_changed_position_in_previous_turn === false) { 
            super.setUpdateFlagNextPosition(false);
         }
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
   
   
   // TODO: REFACTOR
   handleGhostCollision() {
      if (super.isNextBoardPositionEqual(Configuration.ghost_blinky_character) ||
          super.isNextBoardPositionEqual(Configuration.GHOST_PINKY_CHARACTER) ||
          super.isNextBoardPositionEqual(Configuration.GHOST_CLYDE_CHARACTER) ||
          super.isNextBoardPositionEqual(Configuration.GHOST_INKY_CHARACTER)) {
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
