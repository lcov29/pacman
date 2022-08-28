import Configuration from "../../../../global/Configuration.mjs";


export default class ActorRespawnAnimation {


    #xPosition = -1;
    #yPosition = -1;
    #currentRespawnStage = -1;
    #maxRespawnStage = -1;
    #currentRectangleHeightInPixel = -1;
    #minRectangleHeightInPixel = -1
    #tileHeightInPixel = -1;
    #respawnAnimationSpeedInPixel = -1;


    constructor(respawnRequest, tileWidth, tileHeight) {
        this.#xPosition = respawnRequest.xPosition * tileWidth;
        this.#yPosition = respawnRequest.yPosition * tileHeight;
        this.#currentRespawnStage = respawnRequest.respawnStage - 1;
        this.#maxRespawnStage = Configuration.ghostMaxRespawnStage;
        this.#tileHeightInPixel = tileHeight;

        this.#currentRectangleHeightInPixel = this.#calculateStartRectangleHeightInPixel();
        this.#minRectangleHeightInPixel = this.#calculateMinRectangleHeightInPixel();
    }


    get xPosition() {
        return this.#xPosition;
    }


    get yPosition() {
        return this.#yPosition;
    }


    get rectangleHeightInPixel() {
        return this.#currentRectangleHeightInPixel;
    }


    isAnimationComplete() {
        return this.#currentRectangleHeightInPixel === this.#minRectangleHeightInPixel;
    }


    move(movementSpeedInPixel) {
        if (this.#respawnAnimationSpeedInPixel === -1) {
            this.#convertActorMovementSpeedToRespawnSpeed(movementSpeedInPixel);
        }

        if (!this.isAnimationComplete()) {
            const calculatedRectangleHeightInPixel = this.#currentRectangleHeightInPixel - this.#respawnAnimationSpeedInPixel;
            this.#currentRectangleHeightInPixel = this.#handleUnderrunMinRectangleHeight(calculatedRectangleHeightInPixel);
        }
    }


    #convertActorMovementSpeedToRespawnSpeed(actorMovementSpeedInPixel) {
        const tileHeightPerRespawnStage =  this.#calculateTileHeightPerRespawnStageInPixel();
        const numberOfAnimationIterations = this.#tileHeightInPixel / actorMovementSpeedInPixel;

        this.#respawnAnimationSpeedInPixel = tileHeightPerRespawnStage / numberOfAnimationIterations;
    }


    #calculateStartRectangleHeightInPixel() {
        const numberOfRespawnStagesLeftBeforeAnimation = this.#maxRespawnStage - this.#currentRespawnStage;
        const tileHeightPerRespawnStage = this.#calculateTileHeightPerRespawnStageInPixel();
        
        return numberOfRespawnStagesLeftBeforeAnimation * tileHeightPerRespawnStage;
    }


    #calculateMinRectangleHeightInPixel() {
        const numberOfRespawnStagesLeftAfterAnimation = this.#maxRespawnStage - this.#currentRespawnStage - 1;
        const tileHeightPerRespawnStage = this.#calculateTileHeightPerRespawnStageInPixel();

        return numberOfRespawnStagesLeftAfterAnimation * tileHeightPerRespawnStage;
    }


    #calculateTileHeightPerRespawnStageInPixel() {
        return this.#tileHeightInPixel / this.#maxRespawnStage;
    }


    #handleUnderrunMinRectangleHeight(calculatedRectangleHeightInPixel) {
        const isMinRectangleHeightUnderrun = calculatedRectangleHeightInPixel < this.#minRectangleHeightInPixel;
        const calculatedHeight = (isMinRectangleHeightUnderrun) ? this.#minRectangleHeightInPixel : calculatedRectangleHeightInPixel;
        return calculatedHeight;
    }


}