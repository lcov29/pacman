import Canvas from "./Canvas.mjs";


export default class BackgroundCanvas extends Canvas {

    
    constructor(backgroundCanvas, spriteMapper) {
        super(backgroundCanvas, spriteMapper);
    }
    

    processUpdateRequestStack() {
        super.processUpdateRequestStack(this.drawBackgroundRequest, this);
    }


    drawBackgroundRequest(request) {
        const xCanvasPosition = request.xPosition * super.tileWidth;
        const yCanvasPosition = request.yPosition * super.tileHeight;
        const sprite = super.mapBackgroundToSprite(request.elementCharacter);
        super.clearTileAt(xCanvasPosition, yCanvasPosition);
        super.drawSprite(xCanvasPosition, yCanvasPosition, sprite);
    }


}