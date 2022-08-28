import ActorRespawnAnimation from "../Animations/ActorRespawnAnimation.mjs";
import PseudoMovementAnimation from "../Animations/PseudoMovementAnimation.mjs";
import ActorMovementAnimation from "../Animations/ActorMovementAnimation.mjs";
import Canvas from "./Canvas.mjs";
import Utility from "../../../../global/Configuration.mjs";


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
        this.#flushAnimationList();
        this.#loadMovementRequestListIntoAnimationList(movementRequestList);
        this.#pseudoMovementAnimation.loadPseudoMovementData(isLevelInitialization, super.tileWidth, super.tileHeight);
        this.#countAnimationsRequiringMovement();
    }


    processRespawnRequestList(respawnRequestList) {
        const respawnAnimationList = respawnRequestList.map(request => {
            return new ActorRespawnAnimation(request, super.tileWidth, super.tileHeight);
        });

        this.#animationList = this.#animationList.concat(respawnAnimationList);
        this.#countAnimationsRequiringMovement();
    }


    #loadMovementRequestListIntoAnimationList(movementRequestList) {
        const animationList = movementRequestList.map(request => {
            const animation = new ActorMovementAnimation();

            const argumentObject = {
                movementRequest: request,
                mainSprite: this.#getMainSpriteFor(request),
                alternateSprite: this.#getAlternateSpriteFor(request),
                tileWidth: super.tileWidth,
                tileHeight: super.tileHeight
            };
            
            animation.load(argumentObject);
            return animation;
        });

        this.#animationList = animationList;
    }


    isAnimationComplete() {
        return this.#numberOfAnimationsRequiringMovement === 0;
    }


    drawCurrentLevelState() {
        super.setBackgroundTo(this.#backgroundCanvas);

        for (let animation of this.#animationList) {

            if (animation instanceof ActorMovementAnimation) {
                super.drawSprite(animation.xPosition, animation.yPosition, animation.sprite);
            }

            if (animation instanceof ActorRespawnAnimation) {
                const argumentObject  = {
                    xCanvasPosition: animation.xPosition,
                    yCanvasPosition: animation.yPosition,
                    widthInPixel: super.tileWidth,
                    heightInPixel: animation.rectangleHeightInPixel,
                    color: 'black'
                };

                super.drawRectangle(argumentObject);
            }
        }
    }
    

    moveAnimationsBy(distanceInPixel) {
        for (let animation of this.#animationList) {

            if (!animation.isAnimationComplete()) {
                animation.move(distanceInPixel);
                if (animation.isAnimationComplete()) {
                    this.#decrementNumberOfAnimationsRequiringMovement();

                    if (animation instanceof ActorRespawnAnimation) {
                        Utility.removeElementFrom(this.#animationList, animation);
                    }
                } 
            }

        }
    }


    #flushAnimationList() {
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