import Configuration from "../../../global/Configuration.mjs";
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

        super.clearTileAt(xCanvasPosition, yCanvasPosition);

        const isBackgroundTileDefined = (request.elementCharacter !== Configuration.undefinedTileCharacter);
        if (isBackgroundTileDefined) {
            const blackBackgroundSprite = super.mapBackgroundToSprite(Configuration.emptyTileCharacter);
            super.drawSprite(xCanvasPosition, yCanvasPosition, blackBackgroundSprite);

            const currentElementSprite = super.mapBackgroundToSprite(request.elementCharacter);
            super.drawSprite(xCanvasPosition, yCanvasPosition, currentElementSprite);
        }

        super.drawText(0, 0, `Score: ${request.score}`, (request.xPosition + 4) * super.tileWidth);
        this.drawLifeCounterSpriteRepresentation(request.lifeCount);
    }


    drawLifeCounterSpriteRepresentation(numberOfLifes) {
        for (let i = 1; i <= numberOfLifes; i++) {
            const xCanvasPosition = (this.columnNumber - i) * super.tileWidth;
            const yCanvasPosition = 0;
            const sprite = super.mapBackgroundToSprite(Configuration.namePacmanLifeCounterSprite);
            super.clearTileAt(xCanvasPosition, yCanvasPosition);
            super.drawSprite(xCanvasPosition, yCanvasPosition, sprite);
        }
    }


}