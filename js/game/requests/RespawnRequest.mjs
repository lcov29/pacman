export default class RespawnRequest {


    #xPosition = -1;
    #yPosition = -1;
    #respawnStage = -1;


    constructor(boardPosition, respawnStage) {
        this.#xPosition = boardPosition.x;
        this.#yPosition = boardPosition.y;
        this.#respawnStage = respawnStage;
    }


    get xPosition() {
        return this.#xPosition;
    }


    get yPosition() {
        return this.#yPosition;
    }


    get respawnStage() {
        return this.#respawnStage;
    }


} 