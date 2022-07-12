'use strict';


export default class GhostState {


    constructor(durationInTurns, ghost) {
        this.remainingTurns = durationInTurns;
        this.ghost = ghost;
        this.spriteDisplayPriority = 0;
        this.name = '';
    }


    setName(name) {
        this.name = name;
    }


    getName() {
        return this.name;
    }


    setSpriteDisplayPriority(priority) {
        this.spriteDisplayPriority = priority;
    }


    getRemainingTurns() {
        return this.remainingTurns;
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