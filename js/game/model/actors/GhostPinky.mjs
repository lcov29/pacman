'use strict';

import Ghost from './Ghost.mjs';
import Configuration from '../../../global/Configuration.mjs';
import Directions from '../Directions.mjs';


export default class GhostPinky extends Ghost {


    constructor(level, position, routing) {
        super(level, position, routing);
        super.setCharacter(Configuration.ghostPinkyCharacter);
        super.setInitialState();
    }


    // chase movement pattern implementation; is used by GhostStateChase
    calculateNextChasePosition(positionId) {
        let targetTileId = this.calculateChaseTargetTileId();
        return super.getRouting().calculateNextPositionOnShortestPath(positionId, targetTileId);
    }


    calculateChaseTargetTileId() {
        let pacmanPositionId = super.selectClosestPacmanID();
        let pacmanPosition = this.level.getPacmanPositionFor(pacmanPositionId);
        let pacmanMovementDirection = this.getPacmanMovementDirectionFor(pacmanPositionId);
        let currentTargetTileId = pacmanPositionId;
        let x = pacmanPosition.x;
        let y = pacmanPosition.y;

        for (let i = 0; i < Configuration.ghostPinkyMaxTileOffsetToPacmanDirectionPosition; i++) {
            x += pacmanMovementDirection.x;
            y += pacmanMovementDirection.y;
            try {
                let calculatedPosition = this.level.getBoardPositionAt(x, y);
                if (this.isPositionAccessible(calculatedPosition)) {
                    currentTargetTileId = calculatedPosition.id;
                }
            } catch(e) {
                break;   // calculated position is outside of the board
            }
        }

        return currentTargetTileId;
    }


    isPositionAccessible(position) {
        return (Configuration.actorsInaccessibleTileCharacterList.includes(position.elementLayerCharacter) === false);
    }


    getPacmanMovementDirectionFor(pacmanPositionId) {
        let pacmanMovementDirection = this.level.getPacmanMovementDirectionFor(pacmanPositionId);
        if (pacmanMovementDirection === undefined) {
            // handle case when pacman has not yet moved at the start of the game
            pacmanMovementDirection = Directions.getDirectionByName(Configuration.initialPacmanSpriteDirection);
        }
        return pacmanMovementDirection;
    }

    
}