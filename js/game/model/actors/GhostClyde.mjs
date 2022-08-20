'use strict';

import Ghost from './Ghost.mjs';
import Configuration from '../../../global/Configuration.mjs';


export default class GhostClyde extends Ghost {


    constructor(level, position, routing) {
        super(level, position, routing);
        super.character = Configuration.ghostClydeCharacter;
    }


    // chase movement pattern implementation; is used by GhostStateChase
    calculateNextChasePosition(positionId) {
        let targetTileId = -1;
        let pacmanId = super.selectClosestPacmanID();
        let minDistanceToClosestPacman = super.routing.getShortestDistanceBetween(positionId, pacmanId);
        if (minDistanceToClosestPacman >= Configuration.ghostClydeMinTileDistanceToPacman) {
            targetTileId = pacmanId;
        } else {
            targetTileId = super.scatterID;
        }
        return super.routing.calculateNextPositionOnShortestPath(positionId, targetTileId);
    }

    
}