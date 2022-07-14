'use strict';


export default class GhostState {


    constructor(durationInTurns, ghost) {
        this.remainingTurns = durationInTurns;
        this.ghost = ghost;
        this.name = '';
    }


    setName(name) {
        this.name = name;
    }


    getName() {
        return this.name;
    }


    setSpriteDisplayPriority(priority) {
        this.ghost.setSpriteDisplayPriority(priority);
    }


    getRemainingTurns() {
        return this.remainingTurns;
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