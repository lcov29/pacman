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

    static directionNameToDirectionMap = new Map();
    static directionNameInverseMap = new Map();
    static directionToNameMap = new Map();
    static directionIdToNameMap = new Map();
    static directionIdToDirectionMap = new Map();


    static initializeDirectionMaps() {
        Directions.directionNameToDirectionMap.set(Configuration.directionNameUp, Directions.directionUp);
        Directions.directionNameToDirectionMap.set(Configuration.directionNameRight, Directions.directionRight);
        Directions.directionNameToDirectionMap.set(Configuration.directionNameDown, Directions.directionDown);
        Directions.directionNameToDirectionMap.set(Configuration.directionNameLeft, Directions.directionLeft);

        Directions.directionNameInverseMap.set(Configuration.directionNameUp, Configuration.directionNameDown);
        Directions.directionNameInverseMap.set(Configuration.directionNameRight, Configuration.directionNameLeft);
        Directions.directionNameInverseMap.set(Configuration.directionNameDown, Configuration.directionNameUp);
        Directions.directionNameInverseMap.set(Configuration.directionNameLeft, Configuration.directionNameRight);

        Directions.directionToNameMap.set('(0,-1)', Configuration.directionNameUp);
        Directions.directionToNameMap.set('(1,0)', Configuration.directionNameRight);
        Directions.directionToNameMap.set('(0,1)', Configuration.directionNameDown);
        Directions.directionToNameMap.set('(-1,0)', Configuration.directionNameLeft);

        Directions.directionIdToNameMap.set(0, Configuration.directionNameUp);
        Directions.directionIdToNameMap.set(1, Configuration.directionNameRight);
        Directions.directionIdToNameMap.set(2, Configuration.directionNameDown);
        Directions.directionIdToNameMap.set(3, Configuration.directionNameLeft);

        Directions.directionIdToDirectionMap.set(0, Directions.directionUp);
        Directions.directionIdToDirectionMap.set(1, Directions.directionRight);
        Directions.directionIdToDirectionMap.set(2, Directions.directionDown);
        Directions.directionIdToDirectionMap.set(3, Directions.directionLeft);
    }
    

    static getMinDirectionID() {
        return Directions.minDirectionId;
    }


    static getMaxDirectionID() {
        return Directions.maxDirectionId;
    }


    static getDirectionByName(name) {
        return Directions.directionNameToDirectionMap.get(name);
    }


    static getDirectionNameByIndex(x, y) {
        const index = `(${x},${y})`;
        return Directions.directionToNameMap.get(index);
    }


    static getReversedDirectionName(name) {
        return Directions.directionNameInverseMap.get(name);
    }


    static getDirectionByID(directionId) {
        return Directions.directionIdToDirectionMap.get(directionId);
    }


    static getRandomDirectionName() {
        const minDirectionId = Directions.minDirectionId;
        const maxDirectionId = Directions.maxDirectionId;
        const directionId = Utility.getRandomIntegerBetweenInclusive(minDirectionId, maxDirectionId);
        return Directions.directionIdToNameMap.get(directionId);
    }

    
}