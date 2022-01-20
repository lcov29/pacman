"use strict";

import Ghost from "./Ghost.mjs";
import Configuration from "./Configuration.mjs";


export default class GhostInky extends Ghost {


    constructor(level, position, routing) {
        super(level, position, routing);
        super.setCharacter(Configuration.GHOST_INKY_CHARACTER);
        super.setBaseStyleClass(Configuration.GHOST_INKY_MOVEMENT_FOREGROUND_CSS_CLASS);
        super.setBaseRespawnStyleClass(Configuration.GHOST_INKY_RESPAWN_FOREGROUNG_CSS_CLASS);
        super.setScatterCharacter(Configuration.scatter_point_character_inky);
        super.setSpawnCharacter(Configuration.GHOST_INKY_SPAWN_CHARACTER);
        super.setInitialState();
    }


    // chase movement pattern implementation; is used by GhostStateChase
    calculateNextChasePosition(position_id) {
        let pacman_id = super.selectClosestPacmanID();
        return super.getRouting().calculateNextPositionOnShortestPath(position_id, pacman_id);
    }

    
}