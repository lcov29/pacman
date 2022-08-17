'use strict';

import Ghost from './Ghost.mjs';
import Configuration from '../../../global/Configuration.mjs';


export default class GhostClyde extends Ghost {


    constructor(level, position, routing) {
        super(level, position, routing);
        super.setCharacter(Configuration.ghostClydeCharacter);
        super.setInitialState();
    }


    // chase movement pattern implementation; is used by GhostStateChase
    calculateNextChasePosition(positionId) {
        let targetTileId = -1;
        let pacmanId = super.selectClosestPacmanID();
        let minDistanceToClosestPacman = super.getRouting().getShortestDistanceBetween(positionId, pacmanId);
        if (minDistanceToClosestPacman >= Configuration.ghostClydeMinTileDistanceToPacman) {
            targetTileId = pacmanId;
        } else {
            targetTileId = super.getScatterID();
        }
        return super.getRouting().calculateNextPositionOnShortestPath(positionId, targetTileId);
    }

    
}