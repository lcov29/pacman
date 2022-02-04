"use strict";

export default class UpdateRequest {


    constructor(board_position, styleclass, priority = 0) {
        this.board_position = board_position;
        this.styleclass = styleclass;
        this.priority = priority;
    }


    getPosition() {
        return this.board_position;
    }


    getStyleClass() {
        return this.styleclass;
    }


    getPriority() {
        return this.priority;
    }


}