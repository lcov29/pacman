'use strict';

export default class Teleporter {

    
    constructor() {
        this.positionTeleporter1 = null;
        this.positionTeleporter2 = null;
    }


    add(position) {
        if (this.positionTeleporter1 === null) {
            this.positionTeleporter1 = position;
        } else {
            this.positionTeleporter2 = position;
        }
    }

    
    getIDPosition1() {
        return this.positionTeleporter1.id;
    }


    getIDPosition2() {
        return this.positionTeleporter2.id;
    }


    getDestinationPositionFor(position) {
        let destination = null;
        if (position.id === this.positionTeleporter1.id) {
            destination = this.positionTeleporter2.clone();
        } else {
            if (position.id === this.positionTeleporter2.id) {
                destination = this.positionTeleporter1.clone();
            }
        }
        return destination; 
    }

    
    isInitialized() {
        return this.positionTeleporter1 !== null &&
               this.positionTeleporter2 !== null;
    }

    
    isTeleporterFor(position) {
        return position.id === this.positionTeleporter1.id ||
               position.id === this.positionTeleporter2.id;
    }


}