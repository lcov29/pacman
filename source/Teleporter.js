"use strict";

class Teleporter {

    constructor() {
        this.xPosition_teleporter1 = -1;
        this.yPosition_teleporter1 = -1;
        this.xPosition_teleporter2 = -1;
        this.yPosition_teleporter2 = -1;
    }


    isTeleporterFor(xPosition, yPosition) {
        return (xPosition == this.xPosition_teleporter1 && 
                yPosition == this.yPosition_teleporter1) ||
               (xPosition == this.xPosition_teleporter2 &&
                yPosition == this.yPosition_teleporter2);
    }


    add(xPosition, yPosition) {
        if (this.xPosition_teleporter1 == -1 && this.yPosition_teleporter1 == -1) {
            this.xPosition_teleporter1 = xPosition;
            this.yPosition_teleporter1 = yPosition;
        }  else {
            this.xPosition_teleporter2 = xPosition;
            this.yPosition_teleporter2 = yPosition;
        }
    }


    getDestinationPositionFor(xPosition, yPosition) {
        var destination = undefined;
        if (xPosition == this.xPosition_teleporter1 && yPosition == this.yPosition_teleporter1) {
            destination = {xPosition: this.xPosition_teleporter2, yPosition: this.yPosition_teleporter2};
        } else {
            if (xPosition == this.xPosition_teleporter2 && yPosition == this.yPosition_teleporter2) {
                destination = {xPosition: this.xPosition_teleporter1, yPosition: this.yPosition_teleporter1};
            }
        }
        return destination;
    }


}