"use strict";

class Blinky extends Ghost {

    constructor(level, position, routing) {
        super(level, Configuration.ghost_blinky_character, position, routing);
    }


    move() {
        var current_position_id = super.getCurrentPosition().getID();
        var next_position = this.calculateNextPositionFrom(current_position_id);
        super.moveToPosition(next_position.x, next_position.y);
    }


    calculateNextPositionFrom(position_id) {
        var pacman_id = super.selectClosestPacmanID();
        return super.getRouting().calculateNextPositionOnShortestPath(position_id, pacman_id);
    }

}