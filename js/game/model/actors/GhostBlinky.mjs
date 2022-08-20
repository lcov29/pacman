'use strict';

import Ghost from './Ghost.mjs';
import Configuration from '../../../global/Configuration.mjs';


export default class GhostBlinky extends Ghost {


    constructor(level, position, routing) {
        super(level, position, routing);
        super.character = Configuration.ghostBlinkyCharacter;
    }


    // implementation of chase movement pattern for GhostStateChase
    calculateNextChasePosition(positionId) {
        const pacmanId = super.selectClosestPacmanID();
        return super.routing.calculateNextPositionOnShortestPath(positionId, pacmanId);
    }

    
}