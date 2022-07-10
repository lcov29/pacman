'use strict';


export default class BackgroundRequest {


    #xPosition = 0;
    #yPosition = 0;
    #elementCharacter = '';


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


}