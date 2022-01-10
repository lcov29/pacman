"use strict";

class UpdateRequest {


    constructor(board_position, styleclass) {
        this.board_position = board_position;
        this.styleclass = styleclass;
    }


    getPosition() {
        return this.board_position;
    }


    getStyleClass() {
        return this.styleclass;
    }


}