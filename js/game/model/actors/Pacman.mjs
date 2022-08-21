'use strict';

import Actor from './Actor.mjs';
import Configuration from '../../../global/Configuration.mjs';
import BackgroundRequest from '../../requests/BackgroundRequest.mjs'

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


   #isAlive = true;
   #hasCompletedCurrentTurn = false;
   #isBackgroundUpdateNeeded = false;

   
   constructor(level, position) {
      super(level, position);
      super.character = Configuration.pacmanCharacter;
      super.spriteDisplayPriority = Configuration.pacmanSpriteDisplayPriority;
      super.movementDirectionName = Configuration.initialPacmanSpriteDirection;
   }


   get hasCompletedCurrentTurn() {
      return this.#hasCompletedCurrentTurn;
   }


   resetTurnCompletionStatus() {
      this.#hasCompletedCurrentTurn = false;
   }


   kill() {
      super.level.decrementTotalPacmanLifes();
      super.level.removeDeadPacmanAt(super.currentPosition.id);
      this.#isAlive = false;
   }


   move() {
      if (!this.#hasCompletedCurrentTurn) {
         super.loadCurrentPositionFromBoard();
         super.nextPosition = super.calculateNextPositionByCurrentDirection();

         const hasTeleported = this.#handleTeleportation();  
         this.#handleInaccessibleTileCollision();
         const isMovementPossible = this.#handleOtherPacmanCollision();

         if (isMovementPossible) {
            super.hasTeleportedInPreviousTurn = hasTeleported;
            this.#handleGhostCollision();
            this.#handlePointCollision();
            this.#handlePowerUpCollision();
            this.#handleBonusElementCollision();
            super.sendLevelMovementRequest();
            this.#sendLevelBackgroundRequest();
            super.updateCurrentPosition();
            this.#hasCompletedCurrentTurn = true;
         } else {
            // next position is blocked by another pacman that has not completed the current turn, 
            // so this pacman has to abort its movement and wait for the other to complete the turn
            super.nextPosition = null;
            this.resetTurnCompletionStatus();
         }
      }
      return this.#hasCompletedCurrentTurn;
   }


   #sendLevelBackgroundRequest() {
      if (this.#isBackgroundUpdateNeeded) {
         const nextPosition = super.nextPosition;
         const request = new BackgroundRequest(nextPosition.x, nextPosition.y, nextPosition.elementLayerCharacter);
         super.sendLevelBackgroundRequest(request);
      }
      this.#isBackgroundUpdateNeeded = false;
   }


   #handleTeleportation() {
      let teleportationExecuted = false;
      // check teleportation flag to prevent teleportation loop
      if (super.isCurrentPositionTeleporter() && !super.hasTeleportedInPreviousTurn) {
         super.nextPosition = super.getTeleportDestinationForCurrentPosition();
         teleportationExecuted = true;
      }
      return teleportationExecuted;
   }


   #handleInaccessibleTileCollision() {
      let nextElement = super.nextPosition.elementLayerCharacter;
      if (Configuration.pacmanInaccessibleTileCharacterList.includes(nextElement)) {
         super.nextPosition = super.currentPosition;
      }
   }


   #handleOtherPacmanCollision() {
      let result = true;
      if (super.isNextPositionActorCharacter(Configuration.pacmanCharacter)) {
         let thisPacmanPositionId = super.currentPosition.id;
         let otherPacmanPositionId = super.nextPosition.id;
         if (thisPacmanPositionId !== otherPacmanPositionId) {
            let otherCompletedTurn = super.level.getTurnCompletionStatusForPacmanAt(otherPacmanPositionId);
            if (otherCompletedTurn) {
               super.nextPosition = super.currentPosition;
            } else {
               result = false;
            }
         }
      }
      return result;
   }
   
   
   #handlePointCollision() {
      const isNextPositionPoint = super.isNextPositionElementCharacter(Configuration.pointCharacter);

      if (this.#isAlive && isNextPositionPoint) {
         super.incrementScoreBy(Configuration.scoreValuePerPoint);
         super.level.incrementConsumedPoints();
         super.level.decrementAvailablePoints();
         super.nextPosition.elementCharacter = Configuration.emptyTileCharacter;
         this.#isBackgroundUpdateNeeded = true;
      }
   }


   #handlePowerUpCollision() {
      const isNextPositionPowerUp = super.isNextPositionElementCharacter(Configuration.powerUpCharacter);

      if (this.#isAlive && isNextPositionPowerUp) {
         super.incrementScoreBy(Configuration.scoreValuePerPowerUp);
         super.level.incrementConsumedPoints();
         super.level.decrementAvailablePoints();
         super.level.scareLivingGhosts();
         super.nextPosition.elementCharacter = Configuration.emptyTileCharacter;
         this.#isBackgroundUpdateNeeded = true;
      }
   }

   
   #handleBonusElementCollision() {
      const nextElementCharacter = super.nextPosition.elementLayerCharacter;
      const isNextPositionBonusElement = Configuration.bonusCharacterList.includes(nextElementCharacter);

      if (this.#isAlive && isNextPositionBonusElement) {
         super.nextPosition.elementCharacter = Configuration.emptyTileCharacter;
         super.level.handleBonusConsumption();
         this.#isBackgroundUpdateNeeded = true;
      }
   }


   #handleGhostCollision() {
      let nextPositionActorCharacter = super.nextPosition.actorLayerCharacter;
      if (Configuration.ghostCharacterList.includes(nextPositionActorCharacter)) {
         let nextPositionId = super.nextPosition.id;
         this.#handleHostileGhostCollision(nextPositionId);
         this.#handleKillableGhostCollision(nextPositionId);
      }
   }


   #handleHostileGhostCollision(positionId) {
      if (super.level.isPositionOccupiedByHostileGhost(positionId)) {
         this.kill();
      }
   }


   #handleKillableGhostCollision(positionId) {
      if (this.#isAlive && super.level.isPositionOccupiedByKillableGhost(positionId)) {
         super.level.killGhost(positionId);
         super.incrementScoreBy(Configuration.scoreValuePerEatenGhost);
      }
   }

   
}
