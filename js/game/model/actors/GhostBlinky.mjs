'use strict';

import Ghost from './Ghost.mjs';
import Configuration from '../../../global/Configuration.mjs';


export default class GhostBlinky extends Ghost {


    constructor(level, position, routing) {
        super(level, position, routing);
        super.character = Configuration.ghostBlinkyCharacter;
        super.setInitialState();
    }


    // chase movement pattern implementation; is used by GhostStateChase
    calculateNextChasePosition(positionId) {
        let pacmanId = super.selectClosestPacmanID();
        return super.routing.calculateNextPositionOnShortestPath(positionId, pacmanId);
    }

    
}