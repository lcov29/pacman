import Configuration from "../../../Configuration.mjs";
import AnimationObject from "./AnimationObject.mjs";


export default class MainCanvas {


    #canvas = null;
    #backgroundCanvas = null;
    #context = null;
    #movementRequestStack = [];
    #animationObjectList = [];
    #spriteMapper = null;
    #tileWidth = -1;
    #tileHeight = -1;
    #columnNumber = -1;
    #rowNumber = -1;


    constructor() {
        this.#canvas = document.getElementById('gameCanvas');
        this.#backgroundCanvas = document.getElementById('backgroundCanvas');
        this.#context = this.#canvas.getContext('2d');
        this.#movementRequestStack = [];
        this.#initializeSpriteMapper();
    }


    set tileWidth(width) {
        if (width < 1) {
            throw new RangeError(`tileWidth must be greater than zero`);
        } else {
            this.#tileWidth = width;
        }
    }


    set tileHeight(height) {
        if (height < 1) {
            throw new RangeError(`tileHeight must be greater than zero`);
        } else {
            this.#tileHeight = height;
        }
    }


    set columnNumber(number) {
        if (number < 1) {
            throw new RangeError(`columnNumber must be greater than zero`);
        } else {
            this.#columnNumber = number;
        }
    }


    set rowNumber(number) {
        if (number < 1) {
            throw new RangeError(`rowNumber must be greater than zero`);
        } else {
            this.#rowNumber = number;
        }
    }


    resize() {
        const canvasWidth = this.#tileWidth * this.#columnNumber;
        const canvasHeight = this.#tileHeight * this.#rowNumber;
        this.#canvas.width = canvasWidth;
        this.#canvas.height = canvasHeight;
    }


    addRequest(movementRequest) {
        this.#movementRequestStack.push(movementRequest);
    }


    initializeAnimationObjectList(numberOfActors) {
        for (let i = 0; i < numberOfActors; i++) {
            const animationObject = new AnimationObject(Configuration.spriteAlternationIntervalLength);
            this.#animationObjectList.push(animationObject);
        }
    }


    #initializeSpriteMapper() {
        this.#spriteMapper = new Map();
        this.#spriteMapper.set(`${Configuration.PACMAN_CHARACTER}_${Configuration.DIRECTION_NAME_UP}`, document.getElementById('pacmanUp'));
        this.#spriteMapper.set(`${Configuration.PACMAN_CHARACTER}_${Configuration.DIRECTION_NAME_RIGHT}`, document.getElementById('pacmanRight'));
        this.#spriteMapper.set(`${Configuration.PACMAN_CHARACTER}_${Configuration.DIRECTION_NAME_DOWN}`, document.getElementById('pacmanDown'));
        this.#spriteMapper.set(`${Configuration.PACMAN_CHARACTER}_${Configuration.DIRECTION_NAME_LEFT}`, document.getElementById('pacmanLeft'));
        this.#spriteMapper.set(Configuration.PACMAN_CHARACTER, document.getElementById('pacmanMouthClosed'));
    }


    processRequestStack() {
        this.#movementRequestStack.forEach(this.loadMovementRequestIntoAnimationObject, this);
        this.#movementRequestStack = [];
    }

    
    loadMovementRequestIntoAnimationObject(request, index) {
        const animationObject = this.#animationObjectList[index];
        const spriteString = `${request.actorCharacter}_${request.directionName}`;
        const mainSprite = this.#spriteMapper.get(spriteString);
        const alternateSprite = this.#spriteMapper.get(request.actorCharacter);
        animationObject.load(request, mainSprite, alternateSprite, this.#tileWidth, this.#tileHeight);
    }


    drawCurrentLevelState() {
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.#context.drawImage(this.#backgroundCanvas, 0, 0);

        for (let animationObject of this.#animationObjectList) {
            this.#context.save();
            this.#context.translate(animationObject.xPosition, animationObject.yPosition);
            this.#context.drawImage(animationObject.sprite, 0, 0, this.#tileWidth, this.#tileHeight);
            this.#context.restore();
        }
    }


    moveAnimationObjectsBy(distanceInPixel) {
        this.#animationObjectList.forEach((animationObject) => { animationObject.move(distanceInPixel); });
    }
    

}