import GhostStateScaredStart from './ghostStates/GhostStateScaredStart.mjs';
import GhostStateScaredEnd from './ghostStates/GhostStateScaredEnd.mjs';
import GhostStateScatter from './ghostStates/GhostStateScatter.mjs';
import GhostStateRespawn from './ghostStates/GhostStateRespawn.mjs';
import Configuration from '../../../global/Configuration.mjs';
import Directions from '../Directions.mjs';
import Actor from './Actor.mjs';
import RespawnRequest from '../../requests/RespawnRequest.mjs';


export default class Ghost extends Actor {


   #routing = null;
   #scatterPositionId = -1
   #spawnPositionId = -1;
   #state = null;


   constructor(level, position, routing) {
      super(level, position);
      this.#routing = routing;
      this.#spawnPositionId = position.id;
      this.#state = new GhostStateScatter(this);
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
   

   isNextPositionOccupiedByPacman() {
      return super.level.isPositionOccupiedByPacman(super.nextPositionId);
   }


   isNextPositionEqualToTeleportDestination() {
      return super.nextPositionId === super.getTeleportDestinationForCurrentPosition().id;
   }


   isHostile() {
      return this.#state.isHostileTowardsPacman();
   }


   isKillable() {
      return this.#state.isKillable();
   }


   isScared() {
      return (this.#state instanceof GhostStateScaredStart ||
              this.#state instanceof GhostStateScaredEnd);
   }


   move() {
      const isStateChangeNecessary = this.#state.remainingTurns === 0;

      if (isStateChangeNecessary) {
         this.#changeToSubsequentState();
         this.move();
      } else {
         super.loadCurrentPositionFromBoard();
         this.#state.executeMovementPattern();
         super.loadNextPositionFromBoard();
         this.#state.handleTeleporterCollision();
         this.#state.handleScatterPositionCollision();
         this.#state.handlePacmanCollisionOnNextPosition();
         this.#state.handleInaccessibleTileCollision();
         this.#state.handleSpawnCollision();
         this.#updateMovementDirection(super.currentPosition, super.nextPosition);
         super.sendLevelMovementRequest(this.#state.name);
         this.#sendRespawnRequest();
         super.updateCurrentPosition();
         this.#state.decrementRemainingTurns();
     }
   }


   scare() {
      this.#state.scare();
   }


   kill() {
      this.#state.kill();
   }


   reverseCurrentMovementDirection() {
      const directionName = super.movementDirectionName;
      const reverseDirectionName = Directions.getReversedDirectionName(directionName);
      super.movementDirectionName = reverseDirectionName;
   }


   selectClosestPacmanID() {
      const pacmanIdList = super.level.getPacmanIdList();
      let minCostId = null;
      let minPathCost = Infinity;
      
      for (let pacmanId of pacmanIdList) {   
         const currentPathCost =  this.#routing.getShortestDistanceBetween(super.currentPositionId, pacmanId);
         
         if (currentPathCost < minPathCost) {
            minPathCost = currentPathCost;
            minCostId = pacmanId;
         }
      }
      return minCostId;
   }


   randomizeMovementDirection() {
      while (true) {
         const randomDirectionName = Directions.getRandomDirectionName();
         const isDifferentDirection = randomDirectionName !== super.movementDirectionName;

         if (isDifferentDirection) {
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


   #sendRespawnRequest() {
      const isRespawning = this.#state instanceof GhostStateRespawn;

      if (isRespawning) {
         const request = new RespawnRequest(super.nextPosition, this.#state.respawnStage);
         super.level.processRespawnRequest(request);
      }
   }


   #changeToSubsequentState() {
      this.#state = this.#state.subsequentState;
   }


   #updateMovementDirection(currentPosition, nextPosition) {
      if (!super.hasTeleportedInPreviousTurn) {
         const isDifferentPositions = currentPosition.id !== nextPosition.id;

         if (isDifferentPositions) {
            const directionX = nextPosition.x - currentPosition.x;
            const directionY = nextPosition.y - currentPosition.y;
            const directionName = Directions.getDirectionNameByIndex(directionX, directionY);
            super.movementDirectionName = directionName;
         }
      }
   }

   
}
