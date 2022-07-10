'use strict';

import Actor from './Actor.mjs';
import Configuration from '../Configuration.mjs';
import BackgroundRequest from '../BackgroundRequest.mjs'

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
      super.setSpriteDisplayPriority(Configuration.PACMAN_SPRITE_DISPLAY_PRIORITY);
      this.isAlive = true;
      this.hasCompletedCurrentTurn = false;
      this.hasChangedMovementDirection = false;
      this.isBackgroundUpdateNeeded = false;
   }


   setTurnCompletionStatus(status) {
      this.hasCompletedCurrentTurn = status;
   }


   setMovementDirectionChangeStatus(status) {
      this.hasChangedMovementDirection = status;
   }


   setMovementDirectionName(directionName) {
      let changeStatus = (directionName !== super.getCurrentMovementDirectionName());
      this.setMovementDirectionChangeStatus(changeStatus);
      super.setMovementDirectionName(directionName);
   }


   getTurnCompletionStatus() {
      return this.hasCompletedCurrentTurn;
   }


   getStyleClass() {
      let baseStyleClass = super.getBaseMovementStyleClass();
      let directionName = super.getCurrentMovementDirectionName();
      return `${Configuration.BOARD_TILE_BASE_CSS_CLASS} ${baseStyleClass}${directionName}`;
   }


   // TODO: CHECK IF NECESSARY
   updatePositionChangeFlag() {
      let currentPositionId = super.getCurrentPosition().getID();
      let nextPositionId = super.getNextPosition().getID();
      this.hasChangedPositionInPreviousTurn = (currentPositionId !== nextPositionId);
   }


   kill() {
      super.setUpdateFlagNextPosition(false);
      this.level.decrementTotalPacmanLifes();
      this.level.removeDeadPacmanAt(super.getCurrentPosition().getID());
      this.isAlive = false;
   }


   move() {
      if (super.isMovementDirectionSet() === false) {
         this.setTurnCompletionStatus(true);
      } else {

         if (this.getTurnCompletionStatus() === false) {
            super.loadCurrentPositionFromBoard();
            let nextPosition = super.calculateNextPositionByCurrentDirection();
            super.setNextPosition(nextPosition);
            super.loadNextPositionFromBoard();
            let teleportationStatus = this.handleTeleportation();  
            this.handleInaccessibleTileCollision();       
            if (this.handleOtherPacmanCollision()) {
               super.setTeleportationStatus(teleportationStatus);
               this.handleGhostCollision();
               if (this.isAlive) {
                  this.handlePointCollision();
                  this.handlePowerUpCollision();
                  this.handleBonusElementCollision();
               }
               this.updatePositionChangeFlag();
               //super.updateBoard(Configuration.EMPTY_FOREGROUND_CSS_CLASS, this.getStyleClass());
               super.sendLevelMovementRequest();
               this.sendLevelBackgroundRequest();
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


   sendLevelBackgroundRequest() {
      if (this.isBackgroundUpdateNeeded) {
         const nextPosition = super.getNextPosition();
         const request = new BackgroundRequest(nextPosition.getX(), nextPosition.getY(), nextPosition.getElementCharacter());
         super.sendLevelBackgroundRequest(request);
      }
      this.isBackgroundUpdateNeeded = false;
   }


   handleTeleportation() {
      let teleportationExecuted = false;
      // check teleportation flag to prevent teleportation loop
      if (super.isCurrentPositionTeleporter() && this.hasTeleportedInPreviousTurn === false) {
         let destination = super.getTeleportDestinationForCurrentPosition();
         super.setNextPosition(destination);
         teleportationExecuted = true;
      }
      return teleportationExecuted;
   }


   handleInaccessibleTileCollision() {
      let nextElement = super.getNextPosition().getElementCharacter();
      if (Configuration.PACMAN_INACCESSIBLE_TILES.includes(nextElement)) {
         super.setNextPosition(super.getCurrentPosition());
         super.setUpdateFlagCurrentPosition(false);
         if (this.hasChangedMovementDirection === false) {
            super.setUpdateFlagNextPosition(false);
         }
      }
   }


   handleOtherPacmanCollision() {
      let result = true;
      if (super.isNextPositionActorCharacter(Configuration.PACMAN_CHARACTER)) {
         let thisPacmanPositionId = this.getCurrentPosition().getID();
         let otherPacmanPositionId = this.getNextPosition().getID();
         if (thisPacmanPositionId !== otherPacmanPositionId) {
            let otherCompletedTurn = this.level.getTurnCompletionStatusForPacmanAt(otherPacmanPositionId);
            if (otherCompletedTurn) {
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
         this.level.incrementConsumedPoints();
         this.level.decrementAvailablePoints();
         super.getNextPosition().setElementCharacter(Configuration.EMPTY_TILE_CHARACTER);
         this.isBackgroundUpdateNeeded = true;
      }
   }


   handlePowerUpCollision() {
      if (super.isNextPositionElementCharacter(Configuration.POWERUP_CHARACTER)) {
         super.incrementScoreBy(Configuration.SCORE_VALUE_PER_POWERUP);
         this.level.incrementConsumedPoints();
         this.level.decrementAvailablePoints();
         this.level.scareLivingGhosts();
         super.getNextPosition().setElementCharacter(Configuration.EMPTY_TILE_CHARACTER);
         this.isBackgroundUpdateNeeded = true;
      }
   }


   handleBonusElementCollision() {
      if (super.isNextPositionElementCharacter(Configuration.BONUS_ELEMENT_CHARACTER)) {
         super.getNextPosition().setElementCharacter(Configuration.EMPTY_TILE_CHARACTER);
         this.level.handleBonusConsumption();
         this.isBackgroundUpdateNeeded = true;
      }
   }


   handleGhostCollision() {
      let nextPositionActorCharacter = super.getNextPosition().getActorCharacter();
      if (Configuration.GHOST_CHARACTERS.includes(nextPositionActorCharacter)) {
         let nextPositionId = super.getNextPosition().getID();
         this.handleHostileGhostCollision(nextPositionId);
         this.handleKillableGhostCollision(nextPositionId);
      }
   }


   handleHostileGhostCollision(positionId) {
      if (this.level.isPositionOccupiedByHostileGhost(positionId)) {
         this.kill();
      }
   }


   handleKillableGhostCollision(positionId) {
      if (this.isAlive && this.level.isPositionOccupiedByKillableGhost(positionId)) {
         this.level.killGhost(positionId);
         super.incrementScoreBy(Configuration.SCORE_VALUE_PER_EATEN_GHOST);
      }
   }

   
}
