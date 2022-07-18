'use strict';


export default class BackgroundRequest {


    #xPosition = 0;
    #yPosition = 0;
    #elementCharacter = '';
    #score = -1;
    #lifeCount = -1;


    constructor(xPosition, yPosition, elementCharacter) {
        this.#xPosition = xPosition;
        this.#yPosition = yPosition;
        this.#elementCharacter = elementCharacter;
    }


    get xPosition() {
        return this.#xPosition;
    }


    get yPosition() {
        return this.#yPosition;
    }


    get elementCharacter() {
        return this.#elementCharacter;
    }


    get score() {
        return this.#score;
    }


    set score(value) {
        if (value > -1) {
            this.#score = value;
        } else {
            throw new RangeError('score must be greater or equal zero');
        }
    }


    get lifeCount() {
        return this.#lifeCount;
    }


    set lifeCount(value) {
        if (value > -1) {
            this.#lifeCount = value;
        } else {
            throw new RangeError('life count must be greater or equal zero');
        }
    }


}