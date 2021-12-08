"use strict";

class Teleporter {

    
    constructor() {
        this.position_teleporter_1 = undefined;
        this.position_teleporter_2 = undefined;
    }


    isTeleporterFor(position) {
        return position.getID() == this.position_teleporter_1.getID() ||
               position.getID() == this.position_teleporter_2.getID();
    }


    add(position) {
        if (this.position_teleporter_1 == undefined) {
            this.position_teleporter_1 = position;
        } else {
            this.position_teleporter_2 = position;
        }
    }


    getDestinationPositionFor(position) {
        var destination = undefined;
        if (position.getID() == this.position_teleporter_1.getID()) {
            destination = this.position_teleporter_2.clone();
        } else {
            if (position.getID() == this.position_teleporter_2.getID()) {
                destination = this.position_teleporter_1.clone();
            }
        }
        return destination; 
    }


}