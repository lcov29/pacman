"use strict";

class Blinky extends Ghost {


    constructor(level, position, routing) {
        super(level, position, routing);
        super.setCharacter(Configuration.ghost_blinky_character);
    }


    move() {
        var next_position = this.calculateNextPositionFrom(super.getCurrentPosition());
        super.moveToPosition(next_position);
    }


    calculateNextPositionFrom(position) {
        var pacman_id = super.selectClosestPacmanID();
        return super.getRouting().calculateNextPositionOnShortestPath(position.getID(), pacman_id);
    }


}