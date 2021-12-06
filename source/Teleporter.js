"use strict";

class Teleporter {

    constructor() {
        this.xPosition_teleporter1 = -1;
        this.yPosition_teleporter1 = -1;
        this.xPosition_teleporter2 = -1;
        this.yPosition_teleporter2 = -1;
    }


    isTeleporterFor(position) {
        return (position.getX() == this.xPosition_teleporter1 && 
                position.getY() == this.yPosition_teleporter1) ||
               (position.getX() == this.xPosition_teleporter2 &&
                position.getY() == this.yPosition_teleporter2);
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


    getDestinationPositionFor(position) {
        var destination = undefined;
        if (position.getX() == this.xPosition_teleporter1 && position.getY() == this.yPosition_teleporter1) {
            destination = new BoardPosition(this.xPosition_teleporter2, this.yPosition_teleporter2);
        } else {
            if (position.getX() == this.xPosition_teleporter2 && position.getY() == this.yPosition_teleporter2) {
                destination = new BoardPosition(this.xPosition_teleporter1, this.yPosition_teleporter1);
            }
        }
        return destination;
    }


}