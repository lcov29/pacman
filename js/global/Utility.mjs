'use strict';

export default class Utility {


    static removeElementFrom(array, element) {
        const numberOfElementsToDelete = 1;
        const elementIndex = array.indexOf(element);
        array.splice(elementIndex, numberOfElementsToDelete);
    }


    static getRandomIntegerBetweenInclusive(minInt, maxInt) {
        return Math.floor(minInt + (maxInt - minInt + 1) * Math.random());
    }


    static getSpriteName(actorCharacter, actorStateName, teleportationStatus, directionName) {
        return `${actorCharacter}_${actorStateName}_${teleportationStatus}_${directionName}`;
    }

    
}
