'use strict';


export default class GhostState {


    #remainingTurns = 0;
    #ghost = null;
    #name = '';


    constructor(ghost) {
        this.#ghost = ghost;
    }


    set remainingTurns(number) {
        this.#remainingTurns = number;
    }


    set name(name) {
        this.#name = name;
    }


    getName() {
        return this.#name;
    }


    setSpriteDisplayPriority(priority) {
        this.#ghost.spriteDisplayPriority = priority;
    }


    getRemainingTurns() {
        return this.#remainingTurns;
    }


    getGhost() {
        return this.#ghost;
    }


    end() {
        this.#remainingTurns = 0;
    }


    decrementRemainingTurns() {
        if (this.#remainingTurns > 0) {
            this.#remainingTurns--;
        }
    }


}