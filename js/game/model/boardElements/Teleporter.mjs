'use strict';

export default class Teleporter {


    #positionTeleporter1 = null;
    #positionTeleporter2 = null;

    
    constructor() {}


    get idPosition1() {
        return this.#positionTeleporter1.id;
    }


    get idPosition2() {
        return this.#positionTeleporter2.id;
    }


    getDestinationPositionFor(position) {
        switch(position.id) {
            case this.#positionTeleporter1.id:
                return this.#positionTeleporter2.clone();
            case this.#positionTeleporter2.id:
                return this.#positionTeleporter1.clone();
            default:
                return null;
        }
    }


    isInitialized() {
        const isTeleporter1Initialized = this.#positionTeleporter1 !== null;
        const isTeleporter2Initialized = this.#positionTeleporter2 !== null;
        return isTeleporter1Initialized && isTeleporter2Initialized;
    }

    
    isTeleporter(position) {
        const isTeleporter1 = position.id === this.#positionTeleporter1.id;
        const isTeleporter2 = position.id === this.#positionTeleporter2.id;
        return  isTeleporter1 || isTeleporter2;    
    }


    add(position) {
        if (this.#positionTeleporter1) {
            this.#positionTeleporter2 = position;
        } else {
            this.#positionTeleporter1 = position;
        }
    }


}