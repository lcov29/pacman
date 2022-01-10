"use strict";


class GhostState {


    constructor(name, duration_in_turns, ghost, base_style_class) {
        this.name = name;
        this.remaining_turns = duration_in_turns;
        this.ghost = ghost;
        this.base_style_class = base_style_class;
    }


    getName() {
        return this.name;
    }


    getRemainingTurns() {
        return this.remaining_turns;
    }


    getGhost() {
        return this.ghost;
    }


    getBaseStyleClass() {
        return this.base_style_class;
    }


    decrementRemainingTurns() {
        this.remaining_turns--;
    }


}