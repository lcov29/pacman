import Configuration from "../../../Configuration.mjs";
import AnimationObject from "./AnimationObject.mjs";
import Canvas from "./Canvas.mjs";


export default class MainCanvas extends Canvas {


    #backgroundCanvas = null;
    #animationsInProgress = 0;
    #actorAnimationObjectList = [];


    constructor(mainCanvas, backgroundCanvas, spriteMapper) {
        super(mainCanvas, spriteMapper);
        this.#backgroundCanvas = backgroundCanvas;
    }


    initializeAnimationObjectList() {
        const numberOfActorRequests = super.numberOfPendingUpdateRequests;

        for (let i = 0; i < numberOfActorRequests; i++) {
            const animationObject = new AnimationObject(Configuration.spriteAlternationIntervalLength);
            this.#actorAnimationObjectList.push(animationObject);
        }
    }


    processUpdateRequestStack() {
        super.processUpdateRequestStack(this.loadMovementRequestIntoAnimationObject, this);
        this.#animationsInProgress = this.#actorAnimationObjectList.length;
    }


    loadMovementRequestIntoAnimationObject(request, index) {
        const argumentObject = {
            actorCharacter: request.actorCharacter,
            actorStateName: request.actorStateName,
            directionName: request.directionName
        };

        const mainSprite = super.mapActorToMainSprite(argumentObject);
        const alternateSprite = super.mapActorToAlternateSprite(argumentObject);
        const animationObject = this.#actorAnimationObjectList[index];

        animationObject.load(request, mainSprite, alternateSprite, super.tileWidth, super.tileHeight);
    }


    drawCurrentLevelState() {
        super.setBackgroundTo(this.#backgroundCanvas);

        for (let animationObject of this.#actorAnimationObjectList) {
            super.drawSprite(animationObject.xPosition, animationObject.yPosition, animationObject.sprite);
        }
    }


    moveAnimationObjectsBy(distanceInPixel) {

        for (let animationObject of this.#actorAnimationObjectList) {
            animationObject.move(distanceInPixel);
            if (animationObject.isAnimationComplete()) {
                this.#animationsInProgress--;
            } 
        }
        
        const isAnimationComplete = this.#animationsInProgress === 0;
        return isAnimationComplete;
    }
    

}