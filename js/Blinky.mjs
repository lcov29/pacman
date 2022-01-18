"use strict";

import Ghost from "./Ghost.mjs";
import Configuration from "./Configuration.mjs";


export default class Blinky extends Ghost {


    constructor(level, position, routing) {
        super(level,
              position, 
              Configuration.ghost_blinky_character, 
              Configuration.ghost_blinky_foreground_css_class, 
              routing,
              Configuration.scatter_point_character_blinky,
              Configuration.ghost_blinky_spawn_character);
    }


    // chase movement pattern implementation; is used by GhostStateChase
    calculateNextChasePosition(position_id) {
        let pacman_id = super.selectClosestPacmanID();
        return super.getRouting().calculateNextPositionOnShortestPath(position_id, pacman_id);
    }

    
}