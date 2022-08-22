'use strict';

import Configuration from '../../global/Configuration.mjs';
import Utility from '../../global/Utility.mjs';


export default class Directions {


    static directionUp = {x:0, y:-1};
    static directionRight = {x:1, y:0};
    static directionDown = {x:0, y:1};
    static directionLeft = {x:-1, y:0};
    static minDirectionId = 0;
    static maxDirectionId = 3;
    static validDirectionValueList = [-1, 0, 1];
    static validDirectionNameList = [Configuration.directionNameUp, Configuration.directionNameRight,
                                     Configuration.directionNameDown, Configuration.directionNameLeft];


    static directionMapNameToDirection = {
        [Configuration.directionNameUp]:    this.directionUp,
        [Configuration.directionNameRight]: this.directionRight,
        [Configuration.directionNameDown]:  this.directionDown,
        [Configuration.directionNameLeft]:  this.directionLeft
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
        0: this.directionUp,
        1: this.directionRight,
        2: this.directionDown,
        3: this.directionLeft
    };
    

    static getMinDirectionID() {
        return this.minDirectionId;
    }


    static getMaxDirectionID() {
        return this.maxDirectionId;
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
        let directionId = Utility.getRandomIntegerBetweenInclusive(this.minDirectionId, this.maxDirectionId);
        return this.directionMapIdToName[directionId];
    }

    
}