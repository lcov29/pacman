export default class AnimationObject {
    
    
    #xPosition = 0;
    #yPosition = 0;
    #xDestination = 0;
    #yDestination = 0;
    #xDirection = 0;
    #yDirection = 0;
    #mainSprite = null;
    #alternateSprite = null;
    #useMainSprite = true;
    #alternationIntervalLength = 0;
    #alternationCounter = 0;


    constructor(alternationIntervalLength) {
        this.#alternationIntervalLength = alternationIntervalLength;
    }


    get xPosition() {
        return this.#xPosition;
    }


    get yPosition() {
        return this.#yPosition;
    }


    get sprite() {
        if (this.#useMainSprite) {
            return this.#mainSprite;
        } else {
            return this.#alternateSprite
        }
    }


    move(distanceInPx) {
        if (!this.isAnimationComplete()) {
            this.#updateSpriteAlternation();
            const calculatedXPosition = this.#xPosition + this.#xDirection * distanceInPx;
            const calculatedYPosition = this.#yPosition + this.#yDirection * distanceInPx;
            this.#xPosition = this.#handleOverrunXDestination(calculatedXPosition);
            this.#yPosition = this.#handleOverrunYDestination(calculatedYPosition);
        }
    }


    load(movementRequest, mainSprite, alternateSprite, tileWidth, tileHeight) {
        this.#xPosition = movementRequest.xPositionStart * tileWidth;
        this.#yPosition = movementRequest.yPositionStart * tileHeight;

        if (movementRequest.isTeleportation) {
            // move undefined tile for one tile to improve animation of teleportation
            this.#xDestination = (movementRequest.xPositionStart + movementRequest.xDirection) * tileWidth;
            this.#yDestination = (movementRequest.yPositionStart + movementRequest.yDirection) * tileHeight;
        } else {
            this.#xDestination = movementRequest.xPositionDestination * tileWidth;
            this.#yDestination = movementRequest.yPositionDestination * tileHeight;
        }

        this.#xDirection = movementRequest.xDirection;
        this.#yDirection = movementRequest.yDirection;
        this.#mainSprite = mainSprite;
        this.#alternateSprite = alternateSprite;
        this.#useMainSprite = true;
        this.#alternationCounter = 0;
    }


    #handleOverrunXDestination(calculatedXPosition) {
        const isMovingRight = this.#xDirection === 1;
        const isMovingLeft = this.#xDirection === -1;
        const isRightOverrun = isMovingRight && calculatedXPosition > this.#xDestination;
        const isLeftOverrun = isMovingLeft && calculatedXPosition < this.#xDestination;
        const calculatedPosition = (isLeftOverrun || isRightOverrun) ? this.#xDestination : calculatedXPosition;
        return calculatedPosition;
    }


    #handleOverrunYDestination(calculatedYPosition) {
        const isMovingUp = this.#yDirection === -1;
        const isMovingDown = this.#yDirection === 1;
        const isTopOverrun = isMovingUp && calculatedYPosition < this.#yDestination;
        const isDownOverrun = isMovingDown && calculatedYPosition > this.#yDestination;
        const calculatedPosition = (isTopOverrun || isDownOverrun) ? this.#yDestination : calculatedYPosition;
        return calculatedPosition;
    }


    isAnimationComplete() {
        const isXDestinationReached = this.#xPosition === this.#xDestination;
        const isYDestinationReached = this.#yPosition === this.#yDestination;
        return isXDestinationReached && isYDestinationReached;
    }


    #updateSpriteAlternation() {
        if (this.#alternateSprite) {
            const isAlternationIntervalCompleted = this.#alternationCounter === this.#alternationIntervalLength;

            if (isAlternationIntervalCompleted) {
                this.#alternationCounter = 0;
                this.#useMainSprite = !this.#useMainSprite;
            } else {
                this.#alternationCounter++;
            }
        }

    }


}