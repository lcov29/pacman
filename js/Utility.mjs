'use strict';

export default class Utility {


    static removeElementFrom(array, element) {
        const NUMBER_OF_ELEMENTS_TO_DELETE = 1;
        array.splice(array.indexOf(element), NUMBER_OF_ELEMENTS_TO_DELETE);
    }


    static getRandomIntegerBetweenInclusive(minInt, maxInt) {
        return Math.floor(minInt + (maxInt - minInt + 1) * Math.random());
    }


    static getSpriteName(actorCharacter, actorStateName, teleportationStatus, directionName) {
        return `${actorCharacter}_${actorStateName}_${teleportationStatus}_${directionName}`;
    }

    
}
