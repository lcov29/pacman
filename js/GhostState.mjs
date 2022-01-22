"use strict";


export default class GhostState {


    constructor(duration_in_turns, ghost) {
        this.base_style_class = "";
        this.remaining_turns = duration_in_turns;
        this.sprite_display_priority = 0;
        this.ghost = ghost;
    }


    setBaseStyleClass(style_class) {
        this.base_style_class = style_class;
    }


    setSpriteDisplayPriority(priority) {
        this.sprite_display_priority = priority;
    }


    getRemainingTurns() {
        return this.remaining_turns;
    }


    getBaseStyleClass() {
        return this.base_style_class;
    }


    getSpriteDisplayPriority() {
        return this.sprite_display_priority;
    }


    getGhost() {
        return this.ghost;
    }


    end() {
        this.remaining_turns = 0;
    }


    decrementRemainingTurns() {
        this.remaining_turns--;
    }


}