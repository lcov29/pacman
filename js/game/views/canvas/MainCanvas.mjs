import Configuration from "../../../global/Configuration.mjs";
import AnimationObject from "./AnimationObject.mjs";
import Canvas from "./Canvas.mjs";
import PseudoAnimationObject from "./PseudoAnimationObject.mjs";


export default class MainCanvas extends Canvas {


    #backgroundCanvas = null;
    #numberOfAnimationsRequiringMovement = 0;
    #actorAnimationObjectList = [];
    #pseudoAnimationObject = null;


    constructor(mainCanvas, backgroundCanvas, spriteMapper) {
        super(mainCanvas, spriteMapper);
        this.#backgroundCanvas = backgroundCanvas;
        this.#pseudoAnimationObject = new PseudoAnimationObject();
    }


    initializeAnimationObjectList() {
        const numberOfActorRequests = super.numberOfPendingUpdateRequests;

        for (let i = 0; i < numberOfActorRequests; i++) {
            const animationObject = new AnimationObject(Configuration.spriteAlternationIntervalLength);
            this.#actorAnimationObjectList.push(animationObject);
        }

        this.#actorAnimationObjectList.push(this.#pseudoAnimationObject);
    }


    processUpdateRequestStack() {
        super.processUpdateRequestStack(this.loadMovementRequestIntoAnimationObject, this);
        this.#pseudoAnimationObject.loadPseudoMovementData(super.tileWidth, super.tileHeight);
        this.#countAnimationsRequiringMovement();
    }


    #countAnimationsRequiringMovement() {
        const countList = this.#actorAnimationObjectList.filter(object => !object.isAnimationComplete());
        this.#numberOfAnimationsRequiringMovement = countList.length;
    } 


    #decrementNumberOfAnimationsRequiringMovement() {
        if (!this.isAnimationComplete()) {
            this.#numberOfAnimationsRequiringMovement--;
        }
    }


    isAnimationComplete() {
        return this.#numberOfAnimationsRequiringMovement === 0;
    }


    loadMovementRequestIntoAnimationObject(request, index) {
        const argumentObject = {
            actorCharacter: request.actorCharacter,
            actorStateName: request.actorStateName,
            teleportationStatus : request.isTeleportation,
            directionName: request.directionName,
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

            if (!animationObject.isAnimationComplete()) {
                animationObject.move(distanceInPixel);
                if (animationObject.isAnimationComplete()) {
                    this.#decrementNumberOfAnimationsRequiringMovement();
                } 
            }

        }
    }
    

}