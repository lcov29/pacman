'use strict';


export default class BackgroundRequest {


    #xPosition = 0;
    #yPosition = 0;
    #character = '';


    constructor(xPosition, yPosition, character) {
        this.#xPosition = xPosition;
        this.#yPosition = yPosition;
        this.#character = character;
    }


    get xPosition() {
        return this.#xPosition;
    }


    get yPosition() {
        return this.#yPosition;
    }


    get character() {
        return this.#character;
    }


}