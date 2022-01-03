"use strict";


class GhostState {


    constructor(name, duration_in_turns, ghost_reference, ghost_css_class) {
        this.name = name;
        this.remaining_turns = duration_in_turns;
        this.ghost = ghost_reference;
        this.ghost_css_class = ghost_css_class;
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


    getCSSClass() {
        return this.ghost_css_class;
    }


    decrementRemainingTurns() {
        this.remaining_turns--;
    }


}