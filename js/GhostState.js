"use strict";


export default class GhostState {


    constructor(name, duration_in_turns, ghost, base_style_class) {
        this.name = name;
        this.remaining_turns = duration_in_turns;
        this.ghost = ghost;
        this.base_style_class = base_style_class;
    }


    getName() {
        return this.name;
    }


    getGhost() {
        return this.ghost;
    }


    getBaseStyleClass() {
        return this.base_style_class;
    }


    end() {
        this.remaining_turns = 0;
    }


    move() {
        // calls subclass methods
        if (this.remaining_turns > 0) {
            this.executeStateMovementPattern();
            this.remaining_turns--;
        } else {
            this.ghost.setState(this.getSubsequentState()); 
            this.ghost.move();
        }
    }


}