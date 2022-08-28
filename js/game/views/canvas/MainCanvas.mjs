import ActorRespawnAnimation from "./ActorRespawnAnimation.mjs";
import PseudoMovementAnimation from "./PseudoMovementAnimation.mjs";
import ActorMovementAnimation from "./ActorMovementAnimation.mjs";
import Canvas from "./Canvas.mjs";
import Utility from "../../../global/Utility.mjs";


export default class MainCanvas extends Canvas {


    #backgroundCanvas = null;
    #numberOfAnimationsRequiringMovement = 0;
    #animationList = [];
    #pseudoMovementAnimation = null;


    constructor(mainCanvas, backgroundCanvas, spriteMapper) {
        super(mainCanvas, spriteMapper);
        this.#backgroundCanvas = backgroundCanvas;
        this.#pseudoMovementAnimation = new PseudoMovementAnimation();
    }


    processMovementRequestList(movementRequestList, isLevelInitialization = false) {
        this.#flushAnimationObjectList();
        this.#loadMovementRequestListIntoAnimationObjectList(movementRequestList);
        this.#pseudoMovementAnimation.loadPseudoMovementData(isLevelInitialization, super.tileWidth, super.tileHeight);
        this.#countAnimationsRequiringMovement();
    }


    processRespawnRequestList(respawnRequestList) {
        const respawnAnimationObjectList = respawnRequestList.map(request => {
            return new ActorRespawnAnimation(request, super.tileWidth, super.tileHeight);
        });

        this.#animationList = this.#animationList.concat(respawnAnimationObjectList);
        this.#countAnimationsRequiringMovement();
    }


    #loadMovementRequestListIntoAnimationObjectList(movementRequestList) {
        const animationList = movementRequestList.map(request => {
            const animationObject = new ActorMovementAnimation();

            const argumentObject = {
                movementRequest: request,
                mainSprite: this.#getMainSpriteFor(request),
                alternateSprite: this.#getAlternateSpriteFor(request),
                tileWidth: super.tileWidth,
                tileHeight: super.tileHeight
            };
            
            animationObject.load(argumentObject);
            return animationObject;
        });

        this.#animationList = animationList;
    }


    isAnimationComplete() {
        return this.#numberOfAnimationsRequiringMovement === 0;
    }


    drawCurrentLevelState() {
        super.setBackgroundTo(this.#backgroundCanvas);

        for (let animationObject of this.#animationList) {

            if (animationObject instanceof ActorMovementAnimation) {
                super.drawSprite(animationObject.xPosition, animationObject.yPosition, animationObject.sprite);
            }

            if (animationObject instanceof ActorRespawnAnimation) {
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
        for (let animationObject of this.#animationList) {

            if (!animationObject.isAnimationComplete()) {
                animationObject.move(distanceInPixel);
                if (animationObject.isAnimationComplete()) {
                    this.#decrementNumberOfAnimationsRequiringMovement();

                    if (animationObject instanceof ActorRespawnAnimation) {
                        Utility.removeElementFrom(this.#animationList, animationObject);
                    }
                } 
            }

        }
    }


    #flushAnimationObjectList() {
        this.#animationList = [];
    }


    #countAnimationsRequiringMovement() {
        const countList = this.#animationList.filter(object => !object.isAnimationComplete());
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