"use strict";

import Actor from "./Actor.mjs";
import Configuration from "./Configuration.mjs";


export default class Pacman extends Actor {
   

   constructor(level, position) {
      super(level, position);
      super.setCharacter( Configuration.pacman_character);
      super.setBaseMovementStyleClass(Configuration.pacman_foreground_css_class);
      this.has_completed_current_turn = false;
      this.has_changed_position_in_previous_turn = false;
   }


   setTurnCompletionStatus(status) {
      this.has_completed_current_turn = status;
   }


   getTurnCompletionStatus() {
      return this.has_completed_current_turn;
   }


   getStyleClass() {
      let base_style_class = super.getBaseMovementStyleClass();
      let direction_name = super.getCurrentMovementDirectionName();
      return `${base_style_class}_${direction_name}`;
   }


   updatePositionChangeFlag() {
      let current_position_id = super.getCurrentPosition().getID();
      let next_Position_id = super.getNextPosition().getID();
      this.has_changed_position_in_previous_turn = (current_position_id !== next_Position_id);
   }


   kill() {
      super.setUpdateFlagNextPosition(false);
      this.level.decrementTotalPacmanLifes();
      this.level.removeDeadPacmanAt(super.getCurrentPosition().getID());
   }


   // TODO: CHECK FOR BUGFIX: IS NEXT POSITION UPDATED BEFORE MOVING SO THAT A CONSUMPTION
   // OF A POINT ON NEXT POSITION BY AN EARLIER PACMAN IN THE SAME TURN IS HANDLED
   move() {
      if (super.isMovementDirectionSet() === false) {
         this.setTurnCompletionStatus(true);
      } else {

         if (this.getTurnCompletionStatus() === false) {
            super.setNextPosition(super.calculateNextPositionByDirection());
            let teleportation_status = this.handleTeleportation();
            this.handleWallCollision();
            this.handleGhostDoorCollision();         
            if (this.handleOtherPacmanCollision()) {
               super.setTeleportationStatus(teleportation_status);
               this.handlePointCollision();
               this.handlePowerUpCollision();
               this.handleGhostCollision();
               this.updatePositionChangeFlag();
               super.updateBoard(this.getStyleClass());
               super.updateCurrentPosition();
               this.setTurnCompletionStatus(true);
            } else {
               super.resetUpdateFlags();
               // TODO: RESET NEXT POSITION IN ELSE STATEMENT
               // TODO setTurnMovementStatus(false);
            }
            
         }

      }
      return this.getTurnCompletionStatus();
   }


   handleTeleportation() {
      let teleportation_executed = false;
      // check teleporter flag to prevent teleportation loop
      if (super.isCurrentPositionTeleporter() && this.has_teleported_in_previous_turn === false) {
         let destination = super.getTeleportDestinationForCurrentPosition();
         super.setNextPosition(destination);
         teleportation_executed = true;
      }
      return teleportation_executed;
   }


   handleWallCollision() {
      if (super.isNextPositionElementCharacter(Configuration.wall_character)) {
         super.setNextPosition(super.getCurrentPosition());
         super.setUpdateFlagCurrentPosition(false);
         if (this.has_changed_position_in_previous_turn === false) {
            super.setUpdateFlagNextPosition(false);
         }
      }
   }


   handleGhostDoorCollision() {
      if (super.isNextPositionElementCharacter(Configuration.ghost_door_character)) {
         super.setNextPosition(super.getCurrentPosition());
         super.setUpdateFlagCurrentPosition(false);
         if (this.has_changed_position_in_previous_turn === false) { 
            super.setUpdateFlagNextPosition(false);
         }
      }
   }


   handleOtherPacmanCollision() {
      let result = true;
      if (super.isNextPositionActorCharacter(Configuration.pacman_character)) {
         let this_pacman_position_id = this.getCurrentPosition().getID();
         let other_pacman_position_id = this.getNextPosition().getID();
         if (this_pacman_position_id !== other_pacman_position_id) {
            let other_completed_turn = this.level.getTurnCompletionStatusForPacmanAt(other_pacman_position_id);
            if (other_completed_turn) {
               super.setNextPosition(super.getCurrentPosition());
            } else {
               result = false;
            }
         }
      }
      return result;
   }
   
   
   handlePointCollision() {
      if (super.isNextPositionElementCharacter(Configuration.point_character)) {
         super.incrementScoreBy(Configuration.score_value_per_point);
         this.level.decrementAvailablePoints();
         super.getNextPosition().setElementCharacter(Configuration.empty_tile_character);
      }
   }


   handlePowerUpCollision() {
      if (super.isNextPositionElementCharacter(Configuration.powerup_character)) {
         super.incrementScoreBy(Configuration.score_value_per_powerup);
         this.level.decrementAvailablePoints();
         this.level.scareLivingGhosts();
         super.getNextPosition().setElementCharacter(Configuration.empty_tile_character);
      }
   }


   handleGhostCollision() {
      let next_position_actor_character = super.getNextPosition().getActorCharacter();
      if (Configuration.GHOST_CHARACTERS.includes(next_position_actor_character)) {
         if (this.handleHostileGhostCollision() === false) {
            this.handleKillableGhostCollision();
         }
      }
   }


   handleHostileGhostCollision() {
      let result = false;
      let position_id = super.getNextPosition().getID();
      if (this.level.isPositionOccupiedByHostileGhost(position_id)) {
         this.kill();
         result = true;
      }
      return result;
   }


   handleKillableGhostCollision() {
      let position_id = super.getNextPosition().getID();
      if (this.level.isPositionOccupiedByKillableGhost(position_id)) {
         this.level.killGhost(position_id);
         super.incrementScoreBy(Configuration.score_value_per_eaten_ghost);
      }
   }

   
}
