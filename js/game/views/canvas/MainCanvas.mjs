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
            const mainSprite = this.#getMainSpriteFor(request);
            const alternateSprite = this.#getAlternateSpriteFor(request);

            const animationObject = new AnimationObject();
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


    #flushAnimationObjectList() {
        this.#animationObjectList = [];
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


    #getMainSpriteFor(movementRequest) {
        const argumentObject = this.#buildArgumentObjectForSpriteMapping(movementRequest);
        return super.mapActorToMainSprite(argumentObject); 
    }


    #getAlternateSpriteFor(movementRequest) {
        const argumentObject = this.#buildArgumentObjectForSpriteMapping(movementRequest);
        return super.mapActorToAlternateSprite(argumentObject);
    }


    #buildArgumentObjectForSpriteMapping(movementRequest) {
        return {
            actorCharacter: movementRequest.actorCharacter,
            actorStateName: movementRequest.actorStateName,
            teleportationStatus : movementRequest.isTeleportation,
            directionName: movementRequest.directionName
        };
    }
    

}