'use strict';

import Ghost from './Ghost.mjs';
import Configuration from '../Configuration.mjs';


export default class GhostBlinky extends Ghost {


    constructor(level, position, routing) {
        super(level, position, routing);
        super.setCharacter(Configuration.ghostBlinkyCharacter);
        // super.setBaseMovementStyleClass(Configuration.GHOST_BLINKY_MOVEMENT_FOREGROUND_CSS_CLASS);
        // super.setBaseRespawnStyleClass(Configuration.GHOST_BLINKY_RESPAWN_FOREGROUND_CSS_CLASS);
        super.setInitialState();
    }


    // chase movement pattern implementation; is used by GhostStateChase
    calculateNextChasePosition(positionId) {
        let pacmanId = super.selectClosestPacmanID();
        return super.getRouting().calculateNextPositionOnShortestPath(positionId, pacmanId);
    }

    
}