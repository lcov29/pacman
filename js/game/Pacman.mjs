"use strict";

import Actor from "./Actor.mjs";
import Configuration from "../Configuration.mjs";

/*  
   =================================================================================================================
   Implements the movement of pacman and the interaction with other actors and other elements like points etc

   Note 1:     There can be multiple pacmans on the board

   Note 2:     Each pacman moves in the same current direction as all the others

   Note 3:     Each position on the board can only be occupied by a single pacman. 
               Two pacmans can not share a position.

   Note 4:     If a pacman is blocking the move of another pacman, the move of the blocked pacman will be 
               postponed until the blocking pacman has finished its turn. If the target position is then 
               still blocked, the blocked pacman will stay on its current position. Two pacmans will not
               deadlock each other because of their shared direction of movement.

   Note 5:     Pacmans move before ghosts
   =================================================================================================================
 */


export default class Pacman extends Actor {
   

   constructor(level, position) {
      super(level, position);
      super.setCharacter(Configuration.PACMAN_CHARACTER);
      super.setBaseMovementStyleClass(Configuration.PACMAN_FOREGROUND_CSS_CLASS);
      this.has_completed_current_turn = false;
      this.has_changed_movement_direction = false;
   }


   setTurnCompletionStatus(status) {
      this.has_completed_current_turn = status;
   }


   setMovementDirectionChangeStatus(status) {
      this.has_changed_movement_direction = status;
   }


   setMovementDirectionName(direction_name) {
      let change_status = (direction_name !== super.getCurrentMovementDirectionName());
      this.setMovementDirectionChangeStatus(change_status);
      super.setMovementDirectionName(direction_name);
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


   move() {
      if (super.isMovementDirectionSet() === false) {
         this.setTurnCompletionStatus(true);
      } else {

         if (this.getTurnCompletionStatus() === false) {
            super.loadCurrentPositionFromBoard();
            let next_position = super.calculateNextPositionByCurrentDirection();
            super.setNextPosition(next_position);
            super.loadNextPositionFromBoard();
            let teleportation_status = this.handleTeleportation();  
            this.handleInaccessibleTileCollision();       
            if (this.handleOtherPacmanCollision()) {
               super.setTeleportationStatus(teleportation_status);
               this.handlePointCollision();
               this.handlePowerUpCollision();
               this.handleGhostCollision();
               this.updatePositionChangeFlag();
               super.updateBoard(this.getStyleClass());
               super.updateCurrentPosition();
               this.setTurnCompletionStatus(true);
               this.setMovementDirectionChangeStatus(false);
            } else {
               // next position is blocked by another pacman that has not completed the current turn, 
               // so this pacman has to abort its movement and wait for the other to complete the turn
               super.resetUpdateFlags();
               super.setNextPosition(null);
               this.setTurnCompletionStatus(false);
            }
            
         }

      }
      return this.getTurnCompletionStatus();
   }


   handleTeleportation() {
      let teleportation_executed = false;
      // check teleportation flag to prevent teleportation loop
      if (super.isCurrentPositionTeleporter() && this.has_teleported_in_previous_turn === false) {
         let destination = super.getTeleportDestinationForCurrentPosition();
         super.setNextPosition(destination);
         teleportation_executed = true;
      }
      return teleportation_executed;
   }


   handleInaccessibleTileCollision() {
      let next_element = super.getNextPosition().getElementCharacter();
      if (Configuration.PACMAN_INACCESSIBLE_TILES.includes(next_element)) {
         super.setNextPosition(super.getCurrentPosition());
         super.setUpdateFlagCurrentPosition(false);
         if (this.has_changed_movement_direction === false) {
            super.setUpdateFlagNextPosition(false);
         }
      }
   }


   handleOtherPacmanCollision() {
      let result = true;
      if (super.isNextPositionActorCharacter(Configuration.PACMAN_CHARACTER)) {
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
      if (super.isNextPositionElementCharacter(Configuration.POINT_CHARACTER)) {
         super.incrementScoreBy(Configuration.SCORE_VALUE_PER_POINT);
         this.level.decrementAvailablePoints();
         super.getNextPosition().setElementCharacter(Configuration.EMPTY_TILE_CHARACTER);
      }
   }


   handlePowerUpCollision() {
      if (super.isNextPositionElementCharacter(Configuration.POWERUP_CHARACTER)) {
         super.incrementScoreBy(Configuration.SCORE_VALUE_PER_POWERUP);
         this.level.decrementAvailablePoints();
         this.level.scareLivingGhosts();
         super.getNextPosition().setElementCharacter(Configuration.EMPTY_TILE_CHARACTER);
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
         super.incrementScoreBy(Configuration.SCORE_VALUE_PER_EATEN_GHOST);
      }
   }

   
}
