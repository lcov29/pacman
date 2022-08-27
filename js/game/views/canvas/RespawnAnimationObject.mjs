import Configuration from '../../../global/Configuration.mjs';


export default class RespawnAnimationObject {


    #xPosition = -1;
    #yPosition = -1;
    #currentRespawnStage = -1;
    #maxRespawnStage = -1;
    #currentRectangleHeightInPixel = -1;
    #minRectangleHeightInPixel = -1
    #tileHeightInPixel = -1;
    #respawnAnimationSpeedInPixel = -1;


    constructor(respawnRequest, tileHeight) {
        this.#xPosition = respawnRequest.xPosition;
        this.#yPosition = respawnRequest.yPosition;
        this.#currentRespawnStage = respawnRequest.respawnStage;
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


    convertActorMovementSpeed(actorMovementSpeedInPixel) {
        const tileHeightPerRespawnStage =  this.#calculateTileHeightPerRespawnStageInPixel();
        const numberOfAnimationIterations = this.#tileHeightInPixel / actorMovementSpeedInPixel;

        this.#respawnAnimationSpeedInPixel = tileHeightPerRespawnStage / numberOfAnimationIterations;
    }


    isAnimationComplete() {
        return this.#currentRectangleHeightInPixel === this.#minRectangleHeightInPixel;
    }


    move(distanceInPixel) {
        if (this.#respawnAnimationSpeedInPixel === -1) {
            this.convertActorMovementSpeed(distanceInPixel);
        }

        if (!this.isAnimationComplete()) {
            const calculatedRectangleHeightInPixel = this.#currentRectangleHeightInPixel - this.#respawnAnimationSpeedInPixel;
            this.#currentRectangleHeightInPixel = this.#handleUnderrunMinRectangleHeight(calculatedRectangleHeightInPixel);
        }
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