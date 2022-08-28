import Configuration from "../../../global/Configuration.mjs";
import MovementRequest from "../../requests/MovementRequest.mjs";
import ActorMovementAnimation from "./ActorMovementAnimation.mjs";


export default class PseudoAnimationObject extends ActorMovementAnimation {


    constructor() {
        super(Configuration.spriteAlternationIntervalLength);
    }


    loadPseudoMovementData(isLevelInitialization, tileWidth, tileHeight) {
        const argumentObject = {
            movementRequest: this.#buildPseudoMovementRequest(isLevelInitialization),
            mainSprite: document.getElementById('undefinedTile'),
            alternateSprite: null,
            tileWidth,
            tileHeight
        };
        super.load(argumentObject);
    }


    #buildPseudoMovementRequest(isLevelInitialization) {
        const request = new MovementRequest();
        request.xPositionStart = 1;
        request.yPositionStart = 1;
        request.xPositionDestination = (isLevelInitialization) ? 1 : 2;     // prevent delay of game start
        request.yPositionDestination = 1;
        request.xDirection = 1;
        request.yDirection = 0;
        return request;
    }


}