import Configuration from "../../../global/Configuration.mjs";
import MovementRequest from "../../requests/MovementRequest.mjs";
import AnimationObject from "./AnimationObject.mjs";


export default class PseudoAnimationObject extends AnimationObject {


    constructor() {
        super(Configuration.spriteAlternationIntervalLength);

    }


    loadPseudoMovementData(tileWidth, tileHeight) {
        const pseudoMovementRequest = this.#buildPseudoMovementRequest();
        const mainSprite = document.getElementById('undefinedTile');
        const alternateSprite = null;
        super.load(pseudoMovementRequest, mainSprite, alternateSprite, tileWidth, tileHeight);
    }


    #buildPseudoMovementRequest() {
        const request = new MovementRequest();
        request.xPositionStart = 1;
        request.yPositionStart = 1;
        request.xPositionDestination = 2;
        request.yPositionDestination = 1;
        request.xDirection = 1;
        request.yDirection = 0;
        return request;
    }


}