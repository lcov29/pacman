import Canvas from "./Canvas.mjs";


export default class BackgroundCanvas extends Canvas {

    
    constructor(backgroundCanvas, spriteMapper) {
        super(backgroundCanvas, spriteMapper);
    }
    

    processUpdateRequestStack() {
        super.processUpdateRequestStack(this.drawBackgroundRequest, this);
    }


    drawBackgroundRequest(request) {
        const sprite = super.mapBackgroundToSprite(request.elementCharacter);
        super.drawSprite(request.xPosition, request.yPosition, sprite);
    }


}