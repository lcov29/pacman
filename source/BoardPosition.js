"use strict";

class BoardPosition {

    constructor(x, y, character) {
        this.x = x;
        this.y = y;
        this.id = Configuration.id_unaccessible_board_element;
        this.character = character;
        this.movement_direction = "";
    }


    getX() {
        return this.x;
    }


    getY() {
        return this.y;
    }


    getID() {
        return this.id;
    }


    getCharacter() {
        return this.character;
    }


    getMovementDirection() {
        return this.movement_direction;
    }

    setID(id) {
        // prevent id of accessible elements to change after initialisation
        this.id = (this.id == Configuration.id_unaccessible_board_element) ? id : this.id;
    }


    setMovementDirection(direction) {
        this.movement_direction = direction;
    }


    clone() {
        var clone = new BoardPosition(this.x, this.y, this.character);
        clone.setID(this.id);
        return clone;
    }

}