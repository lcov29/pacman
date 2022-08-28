import RespawnAnimationObject from "./RespawnAnimationObject.mjs";
import PseudoAnimationObject from "./PseudoAnimationObject.mjs";
import AnimationObject from "./AnimationObject.mjs";
import Configuration from "../../../global/Configuration.mjs";
import Canvas from "./Canvas.mjs";
import Utility from "../../../global/Utility.mjs";


export default class MainCanvas extends Canvas {


    #backgroundCanvas = null;
    #numberOfAnimationsRequiringMovement = 0;
    #animationObjectList = [];
    #pseudoAnimationObject = null;


    constructor(mainCanvas, backgroundCanvas, spriteMapper) {
        super(mainCanvas, spriteMapper);
        this.#backgroundCanvas = backgroundCanvas;
        this.#pseudoAnimationObject = new PseudoAnimationObject();
    }


    #flushAnimationObjectList() {
        this.#animationObjectList = [];
    }


    processMovementRequestList(movementRequestList, isLevelInitialization = false) {
        this.#flushAnimationObjectList();
        this.#loadMovementRequestListIntoAnimationObjectList(movementRequestList);
        this.#pseudoAnimationObject.loadPseudoMovementData(isLevelInitialization, super.tileWidth, super.tileHeight);
        this.#countAnimationsRequiringMovement();
    }


    processRespawnRequestList(respawnRequestList) {
        const respawnAnimationObjectList = respawnRequestList.map(request => {
            return new RespawnAnimationObject(request, super.tileWidth, super.tileHeight);
        });

        this.#animationObjectList = this.#animationObjectList.concat(respawnAnimationObjectList);
        this.#countAnimationsRequiringMovement();
    }


    #loadMovementRequestListIntoAnimationObjectList(movementRequestList) {
        const animationObjectList = movementRequestList.map(request => {

            // TODO: move to method getActorMainSprite() and getActorAlternateSprite()
            const argumentObject = {
                actorCharacter: request.actorCharacter,
                actorStateName: request.actorStateName,
                teleportationStatus : request.isTeleportation,
                directionName: request.directionName,
            };
    
            const mainSprite = super.mapActorToMainSprite(argumentObject);
            const alternateSprite = super.mapActorToAlternateSprite(argumentObject);

            // TODO: think about moving parameter into constructor of AnimationObject
            const animationObject = new AnimationObject(Configuration.spriteAlternationIntervalLength);
            animationObject.load(request, mainSprite, alternateSprite, super.tileWidth, super.tileHeight);

            return animationObject;
        });

        this.#animationObjectList = animationObjectList;
    }


    isAnimationComplete() {
        return this.#numberOfAnimationsRequiringMovement === 0;
    }


    drawCurrentLevelState() {
        super.setBackgroundTo(this.#backgroundCanvas);

        for (let animationObject of this.#animationObjectList) {

            if (animationObject instanceof AnimationObject) {
                super.drawSprite(animationObject.xPosition, animationObject.yPosition, animationObject.sprite);
            }

            if (animationObject instanceof RespawnAnimationObject) {
                const argumentObject  = {
                    xCanvasPosition: animationObject.xPosition,
                    yCanvasPosition: animationObject.yPosition,
                    widthInPixel: super.tileWidth,
                    heightInPixel: animationObject.rectangleHeightInPixel,
                    color: 'black'
                };

                super.drawRectangle(argumentObject);
            }
        }
    }
    

    moveAnimationObjectsBy(distanceInPixel) {
        for (let animationObject of this.#animationObjectList) {

            if (!animationObject.isAnimationComplete()) {
                animationObject.move(distanceInPixel);
                if (animationObject.isAnimationComplete()) {
                    this.#decrementNumberOfAnimationsRequiringMovement();

                    if (animationObject instanceof RespawnAnimationObject) {
                        Utility.removeElementFrom(this.#animationObjectList, animationObject);
                    }
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