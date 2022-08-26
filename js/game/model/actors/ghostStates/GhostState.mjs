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


    set spriteDisplayPriority(priority) {
        this.#ghost.spriteDisplayPriority = priority;
    }


    get remainingTurns() {
        return this.#remainingTurns;
    }


    get ghost() {
        return this.#ghost;
    }


    get name() {
        return this.#name;
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