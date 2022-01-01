"use strict";

class Teleporter {

    
    constructor() {
        this.position_teleporter_1 = undefined;
        this.position_teleporter_2 = undefined;
    }
    

    static isElementTeleporter(element) {
        return element === Configuration.teleporter_1_tile_character ||
               element === Configuration.teleporter_2_tile_character ||
               element === Configuration.teleporter_3_tile_character;
    }

    
    getIDPosition1() {
        return this.position_teleporter_1.getID();
    }


    getIDPosition2() {
        return this.position_teleporter_2.getID();
    }


    isInitialized() {
        return this.position_teleporter_1 !== undefined &&
               this.position_teleporter_2 !== undefined;
    }

    
    isTeleporterFor(position) {
        return position.getID() === this.position_teleporter_1.getID() ||
               position.getID() === this.position_teleporter_2.getID();
    }


    add(position) {
        if (this.position_teleporter_1 === undefined) {
            this.position_teleporter_1 = position;
        } else {
            this.position_teleporter_2 = position;
        }
    }


    getDestinationPositionFor(position) {
        var destination = undefined;
        if (position.getID() === this.position_teleporter_1.getID()) {
            destination = this.position_teleporter_2.clone();
        } else {
            if (position.getID() === this.position_teleporter_2.getID()) {
                destination = this.position_teleporter_1.clone();
            }
        }
        return destination; 
    }


}