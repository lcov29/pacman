'use strict';

import Directions from "../model/Directions.mjs";
import Configuration from "../../global/Configuration.mjs";


export default class MovementRequest {


    #xPositionStart = -1;
    #yPositionStart = -1
    #xPositionDestination = -1;
    #yPositionDestination = -1;
    #xDirection = -2;
    #yDirection = -2;
    #directionName = '';
    #actorCharacter = '';
    #actorStateName = '';
    #isTeleportation = false;
    #spriteDisplayPriority = -1;


    constructor() {}


    get xPositionStart() {
        return this.#xPositionStart;
    }


    set xPositionStart(x) {
        const isAlreadyInitialized = this.#xPositionStart !== -1;
        if (isAlreadyInitialized) {
            throw new Error(`Can not change already initialized property xPositionStart`);
        }

        const isInputValid = x > -1;
        if (isInputValid) {
            this.#xPositionStart = x;
        } else {
            throw new RangeError(`xPositionStart ${x} must be greater than -1`);
        }
    }


    get yPositionStart() {
        return this.#yPositionStart;
    }


    set yPositionStart(y) {
        const isInputValid = y > -1;
        if (isInputValid) {
            this.#yPositionStart = y;
        } else {
            throw new RangeError(`yPositionStart ${y} must be greater than -1`);
        }
    }


    get xPositionDestination() {
        return this.#xPositionDestination;
    }


    set xPositionDestination(x) {
        const isAlreadyInitialized = this.#xPositionDestination !== -1;
        if (isAlreadyInitialized) {
            throw new Error(`Can not change already initialized property xPositionDestination`);
        }

        const isInputValid = x > -1;
        if (isInputValid) {
            this.#xPositionDestination = x;
        } else {
            throw new RangeError(`xPositionDestination ${x} must be greater than -1`);
        }
    }


    get yPositionDestination() {
        return this.#yPositionDestination;
    }


    set yPositionDestination(y) {
        const isInputValid = y > -1;
        if (isInputValid) {
            this.#yPositionDestination = y;
        } else {
            throw new RangeError(`yPositionDestination ${y} must be greater than -1`);
        }
    }


    get xDirection() {
        return this.#xDirection;
    }
    

    set xDirection(value) {
        const isAlreadyInitialized = this.#xDirection !== -2;
        if (isAlreadyInitialized) {
            throw new Error(`Can not change already initialized property xDirection`);
        }

        if (this.#isDirectionValueValid(value)) {
            this.#xDirection = value;
        } else {
            throw new RangeError(`xDirection ${value} must be either -1, 0 or 1`);
        }
    }


    get yDirection() {
        return this.#yDirection;
    }


    set yDirection(value) {
        const isAlreadyInitialized = this.#yDirection !== -2;
        if (isAlreadyInitialized) {
            throw new Error(`Can not change already initialized property yDirection`);
        }

        if (this.#isDirectionValueValid(value)) {
            this.#yDirection = value;
        } else {
            throw new RangeError(`yDirection ${value} must be either -1, 0 or 1`);
        }
    }


    get directionName() {
        return this.#directionName;
    }


    set directionName(name) {
        const isAlreadyInitialized = this.#directionName !== '';
        if (isAlreadyInitialized) {
            throw new Error(`Can not change already initialized property directionName`);
        }

        if (this.#isDirectionNameValid(name)) {
            this.#directionName = name;
        } else {
            throw new RangeError(`${name} is not a valid direction name`);
        }
    }


    get actorCharacter() {
        return this.#actorCharacter;
    }


    set actorCharacter(character) {
        const isAlreadyInitialized = this.#actorCharacter !== '';
        if (isAlreadyInitialized) {
            throw new Error(`Can not change already initialized property actorCharacter`);
        }

        if (this.#isActorCharacterValid(character)) {
            this.#actorCharacter = character;
        } else {
            throw new RangeError(`${character} is not a valid actor`);
        }
    }


    get actorStateName() {
        return this.#actorStateName;
    }


    set actorStateName(name) {
        const isAlreadyInitialized = this.#actorStateName !== '';
        if (isAlreadyInitialized) {
            throw new Error('Can not change already initialized property actorCharacter');
        }

        if (this.#isActorStateNameValid(name)) {
            this.#actorStateName = name;
        } else {
            throw new Error(`${name} is not a valid ghost state`);
        }
    }


    get isTeleportation() {
        return this.#isTeleportation;
    }

    
    set isTeleportation(value) {

        if (typeof value === 'boolean') {
            this.#isTeleportation = value;
        } else {
            throw new Error('Parameter of setter isTeleportation() must be boolean');
        }

    }


    get spriteDisplayPriority() {
        return this.#spriteDisplayPriority;
    }


    set spriteDisplayPriority(value) {
        const isAlreadyInitialized = this.#spriteDisplayPriority !== -1;
        if (isAlreadyInitialized) {
            throw new Error('Can not change already initialized property spriteDisplayPriority');
        }

        const isInputValid = value > -1;
        if (isInputValid) {
            this.#spriteDisplayPriority = value;
        } else {
            throw new RangeError(`spriteDisplayPriority ${value} must be greater than -1`);
        }
    }


    #isDirectionValueValid(value) {
        return Directions.validDirectionValues.includes(value);
    }


    #isDirectionNameValid(name) {
        return Directions.validDirectionNames.includes(name);
    }


    #isActorCharacterValid(character) {
        return Configuration.actorCharacterList.includes(character);
    }


    #isActorStateNameValid(name) {
        return Configuration.ghostStateNameList.includes(name);
    }


}