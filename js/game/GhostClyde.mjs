"use strict";

import Ghost from "./Ghost.mjs";
import Configuration from "../Configuration.mjs";


export default class GhostClyde extends Ghost {


    constructor(level, position, routing) {
        super(level, position, routing);
        super.setCharacter(Configuration.GHOST_CLYDE_CHARACTER);
        super.setBaseMovementStyleClass(Configuration.GHOST_CLYDE_MOVEMENT_FOREGROUND_CSS_CLASS);
        super.setBaseRespawnStyleClass(Configuration.GHOST_CLYDE_RESPAWN_FOREGROUNG_CSS_CLASS);
        super.setInitialState();
    }


    // chase movement pattern implementation; is used by GhostStateChase
    calculateNextChasePosition(positionId) {
        let targetTileId = -1;
        let pacmanId = super.selectClosestPacmanID();
        let minDistanceToClosestPacman = super.getRouting().getShortestDistanceBetween(positionId, pacmanId);
        if (minDistanceToClosestPacman >= Configuration.GHOST_CLYDE_MIN_TILE_DISTANCE_TO_PACMAN) {
            targetTileId = pacmanId;
        } else {
            targetTileId = super.getScatterID();
        }
        return super.getRouting().calculateNextPositionOnShortestPath(positionId, targetTileId);
    }

    
}