"use strict";

export default class Utility {


    static removeElementFrom(array, element) {
        const NUMBER_OF_ELEMENTS_TO_DELETE = 1;
        array.splice(array.indexOf(element), NUMBER_OF_ELEMENTS_TO_DELETE);
    }


    static getRandomIntegerBetweenInclusive(min_int, max_int) {
        return Math.floor(min_int + (max_int - min_int + 1) * Math.random());
    }

}
