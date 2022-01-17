"use strict";

import Ghost from "./Ghost.js";
import Configuration from "./Configuration.js";


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


    chase() {
        let current_position_id = super.getCurrentPosition().getID();
        let next_position = this.calculateNextPositionFrom(current_position_id);
        return super.moveToPosition(next_position.x, next_position.y);
    }


    calculateNextPositionFrom(position_id) {
        let pacman_id = super.selectClosestPacmanID();
        return super.getRouting().calculateNextPositionOnShortestPath(position_id, pacman_id);
    }

    
}