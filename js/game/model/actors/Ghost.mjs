'use strict';

import GhostStateScatter from './ghostStates/GhostStateScatter.mjs';
import GhostStateScared from './ghostStates/GhostStateScared.mjs';
import Configuration from '../../../global/Configuration.mjs';
import Directions from '../Directions.mjs';
import Actor from './Actor.mjs';


export default class Ghost extends Actor {


   #routing = null;
   #scatterPositionId = -1
   #spawnPositionId = -1;
   #state = null;


   constructor(level, position, routing) {
      super(level, position);
      this.#routing = routing;
      this.#spawnPositionId = position.id;
      super.movementDirectionName = Configuration.directionNameDown; 
   }


   set scatterID(positionId) {
      this.#scatterPositionId = positionId;
   }


   set spawnID(positionId) {
      this.#spawnPositionId = positionId;
   }


   set state(state) {
      this.#state = state;
   }


   get routing() {
      return this.#routing;
   }


   get scatterID() {
      return this.#scatterPositionId;
   }


   get spawnID() {
      return this.#spawnPositionId;
   }


   getAccessibleNeighborList(xBoardPosition, yBoardPosition) {
      return super.level.getAccessibleNeighborList(xBoardPosition, yBoardPosition);
   }


   initializeState() {
      if (this.#state === null) {
         this.#state = new GhostStateScatter(this);
      }
   }


   getTeleportationStatus() {
      return super.hasTeleportedInPreviousTurn;
   }
   

   isNextPositionEqualToTeleportDestination() {
      return super.nextPosition.id === super.getTeleportDestinationForCurrentPosition().id;
   }


   isHostile() {
      return this.#state.isHostileTowardsPacman();
   }


   isKillable() {
      return this.#state.isKillable();
   }


   isScared() {
      return (this.#state instanceof GhostStateScared);
   }


   move() {
      if (this.#state.getRemainingTurns() > 0) {
         super.loadCurrentPositionFromBoard();
         this.#state.executeMovementPattern();
         super.loadNextPositionFromBoard();
         this.#state.handleTeleporterCollision();
         this.#state.handleScatterPositionCollision();
         this.#state.handlePacmanCollisionOnNextPosition();
         this.#state.handleInaccessibleTileCollision();
         this.#state.handleSpawnCollision();
         if (super.hasTeleportedInPreviousTurn === false) {
            this.updateMovementDirection(super.currentPosition, super.nextPosition);
         }
         super.sendLevelMovementRequest(this.#state.getName());
         super.updateCurrentPosition();
         this.#state.decrementRemainingTurns();
     } else {
         this.#state = this.#state.getSubsequentState();
         this.move();
     }
   }


   scare() {
      this.#state.scare();
   }


   kill() {
      this.#state.kill();
   }


   reverseCurrentMovementDirection() {
      let directionName = super.movementDirectionName;
      let reverseDirectionName = Directions.getReversedDirectionName(directionName);
      super.movementDirectionName = reverseDirectionName;
   }


   selectClosestPacmanID() {
      let pacmanIds = super.level.getPacmanIDs();
      let minCostId = null;
      let minPathCost = Infinity;
      let currentId = -1;
      
      for (let pacmanId of pacmanIds) {   
         currentId = super.currentPosition.id;
         let currentPathCost =  this.#routing.getShortestDistanceBetween(currentId, pacmanId);
         if (currentPathCost < minPathCost) {
            minPathCost = currentPathCost;
            minCostId = pacmanId;
         }
      }
      return minCostId;
   }


   updateMovementDirection(currentPosition, nextPosition) {
      if (currentPosition.id !== nextPosition.id) {
         let directionX = nextPosition.x - currentPosition.x;
         let directionY = nextPosition.y - currentPosition.y;
         let directionName = Directions.getDirectionNameByIndex(directionX, directionY);
         super.movementDirectionName = directionName;
      }
   }


   randomizeMovementDirection() {
      while (true) {
         let randomDirectionName = Directions.getRandomDirectionName();
         if (randomDirectionName !== super.movementDirectionName) {
            super.movementDirectionName = randomDirectionName;
            break;
         }
      }
   }


   killPacman(pacmanId) {
      super.level.killPacman(pacmanId);
   }


   countScaredGhosts() {
      return super.level.countScaredGhosts();
   }

   
}
