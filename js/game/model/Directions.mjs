'use strict';

import Configuration from '../../global/Configuration.mjs';
import Utility from '../../global/Utility.mjs';


export default class Directions {


    static DIRECTION_UP = {x:0, y:-1};
    static DIRECTION_RIGHT = {x:1, y:0};
    static DIRECTION_DOWN = {x:0, y:1};
    static DIRECTION_LEFT = {x:-1, y:0};
    static MIN_DIRECTION_ID = 0;
    static MAX_DIRECTION_ID = 3;
    static validDirectionValues = [-1, 0, 1];
    static validDirectionNames = [Configuration.directionNameUp,
                                  Configuration.directionNameRight,
                                  Configuration.directionNameDown,
                                  Configuration.directionNameLeft];


    static directionMapNameToDirection = {
        [Configuration.directionNameUp]:    this.DIRECTION_UP,
        [Configuration.directionNameRight]: this.DIRECTION_RIGHT,
        [Configuration.directionNameDown]:  this.DIRECTION_DOWN,
        [Configuration.directionNameLeft]:  this.DIRECTION_LEFT
    };


    static directionMapInverse = {
        [Configuration.directionNameUp]:      Configuration.directionNameDown,
        [Configuration.directionNameRight]:   Configuration.directionNameLeft,
        [Configuration.directionNameDown]:    Configuration.directionNameUp,
        [Configuration.directionNameLeft]:    Configuration.directionNameRight
    };


    static directionMapDirectionToName = {
        '(0,-1)': Configuration.directionNameUp,
        '(1,0)':  Configuration.directionNameRight,
        '(0,1)':  Configuration.directionNameDown,
        '(-1,0)': Configuration.directionNameLeft
    };


    static directionMapIdToName = {
        0:  Configuration.directionNameUp,
        1:  Configuration.directionNameRight,
        2:  Configuration.directionNameDown,
        3:  Configuration.directionNameLeft
    }


    static directionMapIdToDirection = {
        0: this.DIRECTION_UP,
        1: this.DIRECTION_RIGHT,
        2: this.DIRECTION_DOWN,
        3: this.DIRECTION_LEFT
    };
    

    static getMinDirectionID() {
        return this.MIN_DIRECTION_ID;
    }


    static getMaxDirectionID() {
        return this.MAX_DIRECTION_ID;
    }


    static getDirectionByName(name) {
        return this.directionMapNameToDirection[name];
    }


    static getDirectionNameByIndex(x, y) {
        let index = `(${x},${y})`;
        return this.directionMapDirectionToName[index];
    }


    static getReversedDirectionName(name) {
        return this.directionMapInverse[name];
    }


    static getDirectionByID(directionId) {
        return this.directionMapIdToDirection[directionId];
    }


    static getRandomDirectionName() {
        let directionId = Utility.getRandomIntegerBetweenInclusive(this.MIN_DIRECTION_ID, this.MAX_DIRECTION_ID);
        return this.directionMapIdToName[directionId];
    }

    
}