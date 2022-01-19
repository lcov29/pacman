"use strict";

import Ghost from "./Ghost.mjs";
import Configuration from "./Configuration.mjs";


export default class Blinky extends Ghost {


    constructor(level, position, routing) {
        super(level, position, routing);
        super.setCharacter(Configuration.ghost_blinky_character);
        super.setBaseStyleClass(Configuration.ghost_blinky_movement_foreground_css_class);
        super.setBaseRespawnStyleClass(Configuration.ghost_blinky_respawn_foreground_css_class);
        super.setScatterCharacter(Configuration.scatter_point_character_blinky);
        super.setSpawnCharacter(Configuration.ghost_blinky_spawn_character);
        super.setInitialState();
    }


    // chase movement pattern implementation; is used by GhostStateChase
    calculateNextChasePosition(position_id) {
        let pacman_id = super.selectClosestPacmanID();
        return super.getRouting().calculateNextPositionOnShortestPath(position_id, pacman_id);
    }

    
}