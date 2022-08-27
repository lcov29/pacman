import Configuration from "../../../global/Configuration.mjs";
import AnimationObject from "./AnimationObject.mjs";
import Canvas from "./Canvas.mjs";
import PseudoAnimationObject from "./PseudoAnimationObject.mjs";


// TODO: add method addMovementRequest() referencing Canvas.addUpdateRequest():
export default class MainCanvas extends Canvas {


    #backgroundCanvas = null;
    #numberOfAnimationsRequiringMovement = 0;
    #animationObjectList = [];
    #pseudoAnimationObject = null;
    #respawnRequestList = [];


    constructor(mainCanvas, backgroundCanvas, spriteMapper) {
        super(mainCanvas, spriteMapper);
        this.#backgroundCanvas = backgroundCanvas;
        this.#pseudoAnimationObject = new PseudoAnimationObject();
    }


    initializeAnimationObjectList() {
        const numberOfActorRequests = super.numberOfPendingUpdateRequests;

        for (let i = 0; i < numberOfActorRequests; i++) {
            const animationObject = new AnimationObject(Configuration.spriteAlternationIntervalLength);
            this.#animationObjectList.push(animationObject);
        }

        this.#animationObjectList.push(this.#pseudoAnimationObject);
    }


    addRespawnRequest(request) {
        this.#respawnRequestList.push(request);
    }


    processUpdateRequests(isLevelInitialization = false) {
        this.#processMovementRequestList(isLevelInitialization);
        this.#processRespawnRequestList();
        this.#countAnimationsRequiringMovement();
    }


    #processMovementRequestList(isLevelInitialization) {
        super.processUpdateRequestStack(this.loadMovementRequestIntoAnimationObject, this);
        this.#pseudoAnimationObject.loadPseudoMovementData(isLevelInitialization, super.tileWidth, super.tileHeight);
    }


    #processRespawnRequestList() {
        for (respawnRequest of this.#respawnRequestList) {
            const animationObject = new RespawnAnimationObject(respawnRequest, super.tileHeight);
            this.#animationObjectList.push(animationObject);
        }
        this.#respawnRequestList = [];
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
        const animationObject = this.#animationObjectList[index];

        animationObject.load(request, mainSprite, alternateSprite, super.tileWidth, super.tileHeight);
    }


    drawCurrentLevelState() {
        super.setBackgroundTo(this.#backgroundCanvas);

        for (let animationObject of this.#animationObjectList) {
            super.drawSprite(animationObject.xPosition, animationObject.yPosition, animationObject.sprite);
        }
    }
    

    moveAnimationObjectsBy(distanceInPixel) {
        for (let animationObject of this.#animationObjectList) {

            if (!animationObject.isAnimationComplete()) {
                animationObject.move(distanceInPixel);
                if (animationObject.isAnimationComplete()) {
                    this.#decrementNumberOfAnimationsRequiringMovement();
                } 
            }

        }
    }


    #countAnimationsRequiringMovement() {
        const countList = this.#animationObjectList.filter(object => !object.isAnimationComplete());
        this.#numberOfAnimationsRequiringMovement = countList.length;
    } 


    #decrementNumberOfAnimationsRequiringMovement() {
        if (!this.isAnimationComplete()) {
            this.#numberOfAnimationsRequiringMovement--;
        }
    }
    

}