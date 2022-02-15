"use strict";

import Ghost from "./Ghost.mjs";
import Configuration from "../Configuration.mjs";
import Directions from "./Directions.mjs";


export default class GhostInky extends Ghost {


    constructor(level, position, routing) {
        super(level, position, routing);
        super.setCharacter(Configuration.GHOST_INKY_CHARACTER);
        super.setBaseMovementStyleClass(Configuration.GHOST_INKY_MOVEMENT_FOREGROUND_CSS_CLASS);
        super.setBaseRespawnStyleClass(Configuration.GHOST_INKY_RESPAWN_FOREGROUNG_CSS_CLASS);
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
        let closestBlinkyPosition = this.selectClosestBlinkyPosition();
        let targetTileId = this.calculateGhostBlinkyOffsetPositionId(pacmanOffsetPosition, closestBlinkyPosition);
        return targetTileId;
    }


    calculatePacmanOffsetPosition(pacmanPositionId) {
        let pacmanPosition = this.level.getPacmanPositionFor(pacmanPositionId);
        let pacmanMovementDirection = this.getPacmanMovementDirectionFor(pacmanPosition.getID());
        let pacmanOffsetPosition = pacmanPosition;
        let x = pacmanPosition.getX();
        let y =  pacmanPosition.getY();

        for (let i = 0; i < Configuration.GHOST_INKY_MAX_TILE_OFFSET_TO_PACMAN_DIRECTION_POSITION; i++) {
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


    // TODO: RENAME METHOD TO A MORE DESCRIPTIVE NAME
    calculateGhostBlinkyOffsetPositionId(pacmanOffsetPosition, ghostBlinkyPosition) {
        let xDifference = pacmanOffsetPosition.getX() - ghostBlinkyPosition.getX();
        let yDifference = pacmanOffsetPosition.getY() - ghostBlinkyPosition.getY();
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

        return potentialTargetTilePosition.getID();
    }


    calculatePotentialTargetTilePosition(pacmanOffsetPosition, xDifference, yDifference) {
        let xCalculated = pacmanOffsetPosition.getX() + xDifference;
        let yCalculated = pacmanOffsetPosition.getY() + yDifference;
        let targetTilePosition = null;
        try {
            targetTilePosition = this.level.getBoardPositionAt(xCalculated, yCalculated);
        } catch(e){}
        return targetTilePosition;
    }


    // TODO: HANDLE CASE WHERE NO BLINKY EXISTS IN LEVEL
    selectClosestBlinkyPosition() {
        let minCostPosition = null;
        let minPathCost = Infinity;
        let ghostInkyId = super.getCurrentPosition().getID();;
        
        for (let ghostBlinkyPosition of this.level.getGhostBlinkyPositions()) {   
           let currentPathCost =  this.routing.getShortestDistanceBetween(ghostInkyId, ghostBlinkyPosition.getID());
           if (currentPathCost < minPathCost) {
              minPathCost = currentPathCost;
              minCostPosition = ghostBlinkyPosition;
           }
        }
        return minCostPosition;
     }


    isPositionAccessible(position) {
        return (Configuration.ACTORS_INACCESSIBLE_TILES.includes(position.getElementCharacter()) === false);
    }


    isPositionOnBoard(position) {
        return position !== null;
    }


    getPacmanMovementDirectionFor(pacmanPositionId) {
        let pacmanMovementDirection = this.level.getPacmanMovementDirectionFor(pacmanPositionId);
        if (pacmanMovementDirection === undefined) {
            // handle case when pacman has not yet moved at the start of the game
            pacmanMovementDirection = Directions.getDirectionByName(Configuration.INITIAL_PACMAN_SPRITE_DIRECTION);
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