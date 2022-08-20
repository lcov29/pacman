'use strict';

import Ghost from './Ghost.mjs';
import Configuration from '../../../global/Configuration.mjs';


export default class GhostClyde extends Ghost {


    constructor(level, position, routing) {
        super(level, position, routing);
        super.character = Configuration.ghostClydeCharacter;
    }


    // implementation of chase movement pattern for GhostStateChase
    calculateNextChasePosition(positionId) {
        const pacmanId = super.selectClosestPacmanID();
        const distanceToClosestPacman = super.routing.getShortestDistanceBetween(positionId, pacmanId);
        const isDistanceToPacmanBelowMinimum = distanceToClosestPacman < Configuration.ghostClydeMinTileDistanceToPacman

        let targetTileId = -1;
        if (isDistanceToPacmanBelowMinimum) {
            targetTileId = super.scatterID;
        } else {
            targetTileId = pacmanId;
        }
        return super.routing.calculateNextPositionOnShortestPath(positionId, targetTileId);
    }

    
}