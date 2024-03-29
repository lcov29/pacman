import Ghost from './Ghost.mjs';
import Configuration from '../../../global/Configuration.mjs';


export default class GhostInky extends Ghost {


    constructor(level, position, routing) {
        super(level, position, routing);
        super.character = Configuration.ghostInkyCharacter;
    }


    // implementation of chase movement pattern for GhostStateChase
    calculateNextChasePosition(positionId) {
        const closestGhostPosition = this.#selectClosestPositionOfGhostTypeWithHighestReferencePriority();

        if (closestGhostPosition) {
            const targetTileId = this.#calculateChaseTargetTileId(closestGhostPosition);
            return super.routing.calculateNextPositionOnShortestPath(positionId, targetTileId);
        } else {
            return this.#fallbackChasePositionCalculation(positionId);
        }


    }


    #calculateChaseTargetTileId(closestGhostPosition) {
        // default chase behavior when there is at least one other ghost type to base movement calculation upon
        const pacmanPositionId = super.selectClosestPacmanID();

        if (closestGhostPosition) {
            return pacmanPositionId;
        } else {
            const pacmanOffsetPosition = this.#calculatePacmanOffsetPosition(pacmanPositionId);
            const targetTileId = this.#calculateTargetTileId(pacmanOffsetPosition, closestGhostPosition);
            return targetTileId;
        }
    }


    #fallbackChasePositionCalculation(positionId) {
        // fallback chase behavior (equal to ghost blinky) in case there are no other ghost
        // types to base movement calculation upon
        const pacmanId = super.selectClosestPacmanID();
        return super.routing.calculateNextPositionOnShortestPath(positionId, pacmanId);
    }


    #calculatePacmanOffsetPosition(pacmanPositionId) {
        const pacmanPosition = super.level.getPacmanPositionFor(pacmanPositionId);
        const pacmanMovementDirection = super.level.getPacmanMovementDirectionFor(pacmanPositionId);

        let pacmanOffsetPosition = pacmanPosition;
        let x = pacmanPosition.x;
        let y = pacmanPosition.y;

        for (let i = 0; i < Configuration.ghostInkyMaxTileOffsetToPacmanDirectionPosition; i++) {
            x += pacmanMovementDirection.x;
            y += pacmanMovementDirection.y;
            try {
                const calculatedPosition = super.level.getBoardPositionAt(x, y);
                if (this.#isPositionAccessible(calculatedPosition)) {
                    pacmanOffsetPosition = calculatedPosition;
                }
            } catch(e) {
                break;   // calculated position is outside of the board
            }
        }

        return pacmanOffsetPosition;
    }


    #calculateTargetTileId(pacmanOffsetPosition, ghostPosition) {
        let xDifference = pacmanOffsetPosition.x - ghostPosition.x;
        let yDifference = pacmanOffsetPosition.y - ghostPosition.y;
        let xOriginalDifference = xDifference;
        let potentialTargetTilePosition = this.#calculatePotentialTargetTilePosition(pacmanOffsetPosition,
                                                                                    xDifference,
                                                                                    yDifference);
        while (!this.#isPositionOnBoard(potentialTargetTilePosition)||
               !this.#isPositionAccessible(potentialTargetTilePosition)) {
            
            if (xDifference === 0) {

                if (yDifference > 0) {
                    yDifference = this.#decrementTowardsZero(yDifference);
                    xDifference = xOriginalDifference;
                    potentialTargetTilePosition = this.#calculatePotentialTargetTilePosition(pacmanOffsetPosition,
                                                                                            xDifference,
                                                                                            yDifference);
                } else {
                    potentialTargetTilePosition = pacmanOffsetPosition;
                }
                
            } else {
                xDifference = this.#decrementTowardsZero(xDifference);
                potentialTargetTilePosition = this.#calculatePotentialTargetTilePosition(pacmanOffsetPosition,
                                                                                        xDifference,
                                                                                        yDifference);
            }
        }

        return potentialTargetTilePosition.id;
    }


    #calculatePotentialTargetTilePosition(pacmanOffsetPosition, xDifference, yDifference) {
        try {
            const xCalculated = pacmanOffsetPosition.x + xDifference;
            const yCalculated = pacmanOffsetPosition.y + yDifference;
            const targetTilePosition = super.level.getBoardPositionAt(xCalculated, yCalculated);
            return targetTilePosition;
        } catch(e){
            return null;
        }
    }


    #selectClosestPositionOfGhostTypeWithHighestReferencePriority() {
       let minCostPosition = null;
       let minPathCost = Infinity;
       
       const ghostReferencePositionList = this.#selectPositionsOfGhostTypeWithHighestReferencePriority();

       for (let ghostPosition of ghostReferencePositionList) {  
          const ghostInkyId = super.currentPositionId
          const currentPathCost =  super.routing.getShortestDistanceBetween(ghostInkyId, ghostPosition.id);

          if (currentPathCost < minPathCost) {
             minPathCost = currentPathCost;
             minCostPosition = ghostPosition;
          }
       }
       return minCostPosition;
    }


    #selectPositionsOfGhostTypeWithHighestReferencePriority() {
        let ghostPositionList = [];
        for (let ghostCharacter of Configuration.chasePatternGhostInkyGhostPriorityList) {
            ghostPositionList = super.level.getGhostPositionListFor(ghostCharacter);
            if (ghostPositionList.length > 0) { break; }
        }
        return ghostPositionList;
    }

    
    #isPositionAccessible(position) {
        return (Configuration.actorsInaccessibleTileCharacterList.includes(position.elementCharacter) === false);
    }


    #isPositionOnBoard(position) {
        return position !== null;
    }


    #decrementTowardsZero(value) {
        let result = value;
        if (value >= 0) {
            result--;
        } else {
            result++;
        }
        return result;
    }

    
}