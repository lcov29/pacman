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


    get remainingTurns() {
        return this.#remainingTurns;
    }


    get ghost() {
        return this.#ghost;
    }


    getName() {
        return this.#name;
    }


    setSpriteDisplayPriority(priority) {
        this.#ghost.spriteDisplayPriority = priority;
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