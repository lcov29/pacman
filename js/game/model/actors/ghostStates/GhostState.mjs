'use strict';


export default class GhostState {


    #remainingTurns = 0;
    #ghost = null;
    #name = '';


    constructor(ghost) {
        this.#ghost = ghost;
    }


    setName(name) {
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


    setDurationInTurns(number) {
        this.#remainingTurns = number;
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