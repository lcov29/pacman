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