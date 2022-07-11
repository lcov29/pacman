'use strict';

import GhostStateScatter from './GhostStateScatter.mjs';
import GhostStateScared from './GhostStateScared.mjs';
import StyleClassMapper from './StyleClassMapper.mjs';
import Configuration from '../Configuration.mjs';
import Directions from './Directions.mjs';
import Actor from './Actor.mjs';


export default class Ghost extends Actor {


   constructor(level, position, routing) {
      super(level, position); 
      this.routing = routing;
      this.baseRespawnStyleClass = '';
      this.scatterPositionId = -1;
      this.spawnPositionId = position.getID();
      this.state = null;
   }


   setBaseRespawnStyleClass(styleClassName) {
      this.baseRespawnStyleClass = styleClassName;
   }


   setScatterID(positionId) {
      this.scatterPositionId = positionId;
   }


   setSpawnID(positionId) {
      this.spawnPositionId = positionId;
   }


   setInitialState() {
      if (this.state === null) {
         this.state = new GhostStateScatter(7, this);
      }
   }


   setState(state) {
      this.state = state;
   }


   getRouting() {
      return this.routing;
   }


   getBaseRespawnStyleClass() {
      return this.baseRespawnStyleClass;
   }


   getScatterID() {
      return this.scatterPositionId;
   }


   getSpawnID() {
      return this.spawnPositionId;
   }


   getTeleportationStatus() {
      return this.hasTeleportedInPreviousTurn;
   }
   

   isNextPositionEqualToTeleportDestination() {
      return super.getNextPosition().getID() === super.getTeleportDestinationForCurrentPosition().getID();
   }


   isHostile() {
      return this.state.isHostileTowardsPacman();
   }


   isKillable() {
      return this.state.isKillable();
   }


   isScared() {
      return (this.state instanceof GhostStateScared);
   }


   move() {
      if (this.state.getRemainingTurns() > 0) {
         super.loadCurrentPositionFromBoard();
         this.state.executeMovementPattern();
         super.loadNextPositionFromBoard();
         this.state.handleTeleportation();
         this.state.handleScatterPositionCollision();
         this.state.handlePacmanCollisionOnCurrentPosition();
         this.state.handlePacmanCollisionOnNextPosition();
         this.state.handleInaccessibleTileCollision();
         this.state.handleSpawnCollision();
         if (this.hasTeleportedInPreviousTurn === false) {
            this.updateMovementDirection(super.getCurrentPosition(), super.getNextPosition());
         }
         super.sendLevelMovementRequest();
         super.updateCurrentPosition();
         this.state.decrementRemainingTurns();
     } else {
         this.state = this.state.getSubsequentState();
         this.move();
     }
   }


   scare() {
      this.state.scare();
   }


   kill() {
      this.state.kill();
   }


   reverseCurrentMovementDirection() {
      let directionName = super.getCurrentMovementDirectionName();
      let reverseDirectionName = Directions.getReversedDirectionName(directionName);
      super.setMovementDirectionName(reverseDirectionName);
   }


   selectClosestPacmanID() {
      let pacmanIds = this.level.getPacmanIDs();
      let minCostId = null;
      let minPathCost = Infinity;
      let currentId = -1;
      
      for (let pacmanId of pacmanIds) {   
         currentId = super.getCurrentPosition().getID();
         let currentPathCost =  this.routing.getShortestDistanceBetween(currentId, pacmanId);
         if (currentPathCost < minPathCost) {
            minPathCost = currentPathCost;
            minCostId = pacmanId;
         }
      }
      return minCostId;
   }


   updateMovementDirection(currentPosition, nextPosition) {
      if (currentPosition.getID() !== nextPosition.getID()) {
         let directionX = nextPosition.getX() - currentPosition.getX();
         let directionY = nextPosition.getY() - currentPosition.getY();
         let directionName = Directions.getDirectionNameByIndex(directionX, directionY);
         super.setMovementDirectionName(directionName);
      }
   }


   randomizeMovementDirection() {
      while (true) {
         let randomDirectionName = Directions.getRandomDirectionName();
         if (randomDirectionName !== super.getCurrentMovementDirectionName()) {
            super.setMovementDirectionName(randomDirectionName);
            break;
         }
      }
   }


   killPacman(pacmanId) {
      this.level.killPacman(pacmanId);
   }


   countScaredGhosts() {
      return this.level.countScaredGhosts();
   }

   
}
