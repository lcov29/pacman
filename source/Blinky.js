"use strict";

class Blinky extends Ghost {


    constructor(level, position, routing) {
        super(level, Configuration.ghost_blinky_character, position, routing);
    }


    move() {
        let current_position_id = super.getCurrentPosition().getID();
        let next_position = this.calculateNextPositionFrom(current_position_id);
        return super.moveToPosition(next_position.x, next_position.y);
    }


    calculateNextPositionFrom(position_id) {
        let pacman_id = super.selectClosestPacmanID();
        return super.getRouting().calculateNextPositionOnShortestPath(position_id, pacman_id);
    }

    
}