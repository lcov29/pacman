"use strict";

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
        return this.positionTeleporter1.getID();
    }


    getIDPosition2() {
        return this.positionTeleporter2.getID();
    }


    getDestinationPositionFor(position) {
        let destination = null;
        if (position.getID() === this.positionTeleporter1.getID()) {
            destination = this.positionTeleporter2.clone();
        } else {
            if (position.getID() === this.positionTeleporter2.getID()) {
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
        return position.getID() === this.positionTeleporter1.getID() ||
               position.getID() === this.positionTeleporter2.getID();
    }


}