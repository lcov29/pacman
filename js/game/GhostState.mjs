"use strict";


export default class GhostState {


    constructor(durationInTurns, ghost) {
        this.baseStyleClass = "";
        this.remainingTurns = durationInTurns;
        this.spriteDisplayPriority = 0;
        this.ghost = ghost;
    }


    setBaseStyleClass(styleClass) {
        this.baseStyleClass = styleClass;
    }


    setSpriteDisplayPriority(priority) {
        this.spriteDisplayPriority = priority;
    }


    getRemainingTurns() {
        return this.remainingTurns;
    }


    getBaseStyleClass() {
        return this.baseStyleClass;
    }


    getSpriteDisplayPriority() {
        return this.spriteDisplayPriority;
    }


    getGhost() {
        return this.ghost;
    }


    end() {
        this.remainingTurns = 0;
    }


    decrementRemainingTurns() {
        this.remainingTurns--;
    }


}