"use strict";

import Configuration from "./Configuration.js";


export default class Teleporter {

    
    constructor() {
        this.position_teleporter_1 = null;
        this.position_teleporter_2 = null;
    }
    

    static isElementTeleporter(element) {
        return element === Configuration.teleporter_1_tile_character ||
               element === Configuration.teleporter_2_tile_character ||
               element === Configuration.teleporter_3_tile_character;
    }


    add(position) {
        if (this.position_teleporter_1 === null) {
            this.position_teleporter_1 = position;
        } else {
            this.position_teleporter_2 = position;
        }
    }

    
    getIDPosition1() {
        return this.position_teleporter_1.getID();
    }


    getIDPosition2() {
        return this.position_teleporter_2.getID();
    }


    getDestinationPositionFor(position) {
        let destination = null;
        if (position.getID() === this.position_teleporter_1.getID()) {
            destination = this.position_teleporter_2.clone();
        } else {
            if (position.getID() === this.position_teleporter_2.getID()) {
                destination = this.position_teleporter_1.clone();
            }
        }
        return destination; 
    }

    
    isInitialized() {
        return this.position_teleporter_1 !== null &&
               this.position_teleporter_2 !== null;
    }

    
    isTeleporterFor(position) {
        return position.getID() === this.position_teleporter_1.getID() ||
               position.getID() === this.position_teleporter_2.getID();
    }


}