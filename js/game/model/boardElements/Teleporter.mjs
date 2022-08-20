'use strict';

export default class Teleporter {


    #positionTeleporter1 = null;
    #positionTeleporter2 = null;

    
    constructor() {}


    add(position) {
        if (this.#positionTeleporter1 === null) {
            this.#positionTeleporter1 = position;
        } else {
            this.#positionTeleporter2 = position;
        }
    }

    
    get idPosition1() {
        return this.#positionTeleporter1.id;
    }


    get idPosition2() {
        return this.#positionTeleporter2.id;
    }


    getDestinationPositionFor(position) {
        let destination = null;
        if (position.id === this.#positionTeleporter1.id) {
            destination = this.#positionTeleporter2.clone();
        } else {
            if (position.id === this.#positionTeleporter2.id) {
                destination = this.#positionTeleporter1.clone();
            }
        }
        return destination; 
    }

    
    isInitialized() {
        return this.#positionTeleporter1 !== null &&
               this.#positionTeleporter2 !== null;
    }

    
    isTeleporterFor(position) {
        return position.id === this.#positionTeleporter1.id ||
               position.id === this.#positionTeleporter2.id;
    }


}