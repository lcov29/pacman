"use strict";

class BoardPosition {

    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
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

    clone() {
        return new BoardPosition(this.x, this.y, this.id);
    }

}