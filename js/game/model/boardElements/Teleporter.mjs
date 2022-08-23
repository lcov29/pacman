'use strict';

export default class Teleporter {


    #position1 = null;
    #position2 = null;

    
    constructor() {}


    get idPosition1() {
        return this.#position1.id;
    }


    get idPosition2() {
        return this.#position2.id;
    }


    getDestinationPositionFor(position) {
        switch(position.id) {
            case this.#position1.id:
                return this.#position2.clone();
            case this.#position2.id:
                return this.#position1.clone();
            default:
                return null;
        }
    }


    isInitialized() {
        const isPosition1Initialized = this.#position1 !== null;
        const isPosition2Initialized = this.#position2 !== null;
        return isPosition1Initialized && isPosition2Initialized;
    }

    
    isTeleporter(position) {
        const isEqualToPosition1 = position.id === this.#position1.id;
        const isEqualToPosition2 = position.id === this.#position2.id;
        return  isEqualToPosition1 || isEqualToPosition2;    
    }


    add(position) {
        if (this.#position1) {
            this.#position2 = position;
        } else {
            this.#position1 = position;
        }
    }


}