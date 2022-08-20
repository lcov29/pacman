'use strict';

import Ghost from './Ghost.mjs';
import Directions from '../Directions.mjs';
import Configuration from '../../../global/Configuration.mjs';


export default class GhostInky extends Ghost {


    constructor(level, position, routing) {
        super(level, position, routing);
        super.character = Configuration.ghostInkyCharacter;
        super.setInitialState();
    }


    // chase movement pattern implementation; is used by GhostStateChase
    calculateNextChasePosition(positionId) {
        let targetTileId = this.calculateChaseTargetTileId();
        return super.getRouting().calculateNextPositionOnShortestPath(positionId, targetTileId);
    }


    calculateChaseTargetTileId() {
        let pacmanPositionId = super.selectClosestPacmanID();
        let pacmanOffsetPosition = this.calculatePacmanOffsetPosition(pacmanPositionId);
        let closestGhostPosition = this.selectClosestPositionOfGhostTypeWithHighestReferencePriority();
        let targetTileId = (closestGhostPosition === null) ? pacmanPositionId : this.calculateTargetTileId(pacmanOffsetPosition, closestGhostPosition);
        return targetTileId;
    }


    calculatePacmanOffsetPosition(pacmanPositionId) {
        let pacmanPosition = this.level.getPacmanPositionFor(pacmanPositionId);
        let pacmanMovementDirection = this.getPacmanMovementDirectionFor(pacmanPosition.id);
        let pacmanOffsetPosition = pacmanPosition;
        let x = pacmanPosition.x;
        let y = pacmanPosition.y;

        for (let i = 0; i < Configuration.ghostInkyMaxTileOffsetToPacmanDirectionPosition; i++) {
            x += pacmanMovementDirection.x;
            y += pacmanMovementDirection.y;
            try {
                let calculatedPosition = this.level.getBoardPositionAt(x, y);
                if (this.isPositionAccessible(calculatedPosition)) {
                    pacmanOffsetPosition = calculatedPosition;
                }
            } catch(e) {
                break;   // calculated position is outside of the board
            }
        }

        return pacmanOffsetPosition;
    }


    calculateTargetTileId(pacmanOffsetPosition, ghostPosition) {
        let xDifference = pacmanOffsetPosition.x - ghostPosition.x;
        let yDifference = pacmanOffsetPosition.y - ghostPosition.y;
        let xOriginalDifference = xDifference;
        let potentialTargetTilePosition = this.calculatePotentialTargetTilePosition(pacmanOffsetPosition,
                                                                                    xDifference,
                                                                                    yDifference);
        while (this.isPositionOnBoard(potentialTargetTilePosition) === false ||
               this.isPositionAccessible(potentialTargetTilePosition) === false) {
            
            if (xDifference === 0) {

                if (yDifference > 0) {
                    yDifference = this.decrementTowardsZero(yDifference);
                    xDifference = xOriginalDifference;
                    potentialTargetTilePosition = this.calculatePotentialTargetTilePosition(pacmanOffsetPosition,
                                                                                            xDifference,
                                                                                            yDifference);
                } else {
                    potentialTargetTilePosition = pacmanOffsetPosition;
                }
                
            } else {
                xDifference = this.decrementTowardsZero(xDifference);
                potentialTargetTilePosition = this.calculatePotentialTargetTilePosition(pacmanOffsetPosition,
                                                                                        xDifference,
                                                                                        yDifference);
            }
        }

        return potentialTargetTilePosition.id;
    }


    calculatePotentialTargetTilePosition(pacmanOffsetPosition, xDifference, yDifference) {
        let xCalculated = pacmanOffsetPosition.x + xDifference;
        let yCalculated = pacmanOffsetPosition.y + yDifference;
        let targetTilePosition = null;
        try {
            targetTilePosition = this.level.getBoardPositionAt(xCalculated, yCalculated);
        } catch(e){}
        return targetTilePosition;
    }


    selectClosestPositionOfGhostTypeWithHighestReferencePriority() {
       let minCostPosition = null;
       let minPathCost = Infinity;
       let ghostInkyId = super.currentPosition.id;
       let ghostReferencePositions = this.selectPositionsOfGhostTypeWithHighestReferencePriority();
       for (let ghostPosition of ghostReferencePositions) {   
          let currentPathCost =  this.routing.getShortestDistanceBetween(ghostInkyId, ghostPosition.id);
          if (currentPathCost < minPathCost) {
             minPathCost = currentPathCost;
             minCostPosition = ghostPosition;
          }
       }
       return minCostPosition;
    }


    selectPositionsOfGhostTypeWithHighestReferencePriority() {
        let ghostPositions = [];
        for (let ghostCharacter of Configuration.chasePatternGhostInkyGhostPriorityList) {
            ghostPositions = this.level.getGhostPositionsFor(ghostCharacter);
            if (ghostPositions.length > 0) { break; }
        }
        return ghostPositions;
    }

    
    isPositionAccessible(position) {
        return (Configuration.actorsInaccessibleTileCharacterList.includes(position.elementLayerCharacter) === false);
    }


    isPositionOnBoard(position) {
        return position !== null;
    }


    getPacmanMovementDirectionFor(pacmanPositionId) {
        let pacmanMovementDirection = this.level.getPacmanMovementDirectionFor(pacmanPositionId);
        if (pacmanMovementDirection === undefined) {
            // handle case when pacman has not yet moved at the start of the game
            pacmanMovementDirection = Directions.getDirectionByName(Configuration.initialPacmanSpriteDirection);
        }
        return pacmanMovementDirection;
    }


    decrementTowardsZero(value) {
        let result = value;
        if (value >= 0) {
            result--;
        } else {
            result++;
        }
        return result;
    }

    
}