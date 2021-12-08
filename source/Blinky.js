"use strict";

class Blinky extends Ghost {


    constructor(level, position, routing) {
        super(level, position, routing);
        this.character = Configuration.ghost_blinky_character;
    }


    move() {
        var pacman_id = this.selectClosestPacmanID();
        var next_position = this.routing.calculateNextPositionOnShortestPath(this.current_position_id, pacman_id);
        this.moveToPosition(next_position, this.character);
    }


}