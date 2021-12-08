"use strict";

class Blinky extends Ghost {


    constructor(level, position, routing) {
        super(level, position, routing);
        this.character = Configuration.ghost_blinky_character;
    }


    move() {
        var pacman_id = super.selectClosestPacmanID();
        var next_position = this.routing.calculateNextPositionOnShortestPath(this.current_position.getID(), pacman_id);
        super.moveToPosition(next_position, this.character);
    }


}