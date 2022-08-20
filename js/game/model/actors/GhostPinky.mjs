'use strict';

import Ghost from './Ghost.mjs';
import Configuration from '../../../global/Configuration.mjs';
import Directions from '../Directions.mjs';


export default class GhostPinky extends Ghost {


    constructor(level, position, routing) {
        super(level, position, routing);
        super.character = Configuration.ghostPinkyCharacter;
    }


    // implementation of chase movement pattern for GhostStateChase
    calculateNextChasePosition(positionId) {
        const targetTileId = this.#calculateChaseTargetTileId();
        return super.routing.calculateNextPositionOnShortestPath(positionId, targetTileId);
    }


    #calculateChaseTargetTileId() {
        const pacmanPositionId = super.selectClosestPacmanID();
        const pacmanPosition = super.level.getPacmanPositionFor(pacmanPositionId);
        const pacmanMovementDirection = super.level.getPacmanMovementDirectionFor(pacmanPositionId);

        let currentTargetTileId = pacmanPositionId;
        let x = pacmanPosition.x;
        let y = pacmanPosition.y;

        for (let i = 0; i < Configuration.ghostPinkyMaxTileOffsetToPacmanDirectionPosition; i++) {
            x += pacmanMovementDirection.x;
            y += pacmanMovementDirection.y;
            try {
                const calculatedPosition = super.level.getBoardPositionAt(x, y);
                if (this.#isPositionAccessible(calculatedPosition)) {
                    currentTargetTileId = calculatedPosition.id;
                }
            } catch(e) {
                break;   // calculated position is outside of the board
            }
        }

        return currentTargetTileId;
    }


    #isPositionAccessible(position) {
        return !Configuration.actorsInaccessibleTileCharacterList.includes(position.elementLayerCharacter);
    }

    
}