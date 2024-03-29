import Configuration from "../../../../global/Configuration.mjs";
import Canvas from "./Canvas.mjs";


export default class BackgroundCanvas extends Canvas {

    
    constructor(backgroundCanvas, spriteMapper) {
        super(backgroundCanvas, spriteMapper);
    }


    processBackgroundRequestList(backgroundRequestList) {
        const isListFilled = backgroundRequestList.length > 0;

        if (isListFilled) {
            const request = backgroundRequestList[0];
            this.#drawLifeCounterSpriteRepresentation(request.lifeCount);
            this.#drawScore(request);

            backgroundRequestList.forEach(request => this.#drawBackgroundTileFor(request));
        }
    }


    #drawBackgroundTileFor(request) {
        const xCanvasPosition = request.xPosition * super.tileWidth;
        const yCanvasPosition = request.yPosition * super.tileHeight;

        super.clearTileAt(xCanvasPosition, yCanvasPosition);

        const isBackgroundTileDefined = request.elementCharacter !== Configuration.undefinedTileCharacter;
        if (isBackgroundTileDefined) {
            const blackBackgroundSprite = super.mapBackgroundToSprite(Configuration.emptyTileCharacter);
            super.drawSprite(xCanvasPosition, yCanvasPosition, blackBackgroundSprite);

            const currentElementSprite = super.mapBackgroundToSprite(request.elementCharacter);
            super.drawSprite(xCanvasPosition, yCanvasPosition, currentElementSprite);
        }
    }


    #drawLifeCounterSpriteRepresentation(numberOfLifes) {
        for (let i = 1; i <= numberOfLifes; i++) {
            const xCanvasPosition = (this.columnNumber - i) * super.tileWidth;
            const yCanvasPosition = 0;
            const sprite = super.mapBackgroundToSprite(Configuration.namePacmanLifeCounterSprite);
            super.clearTileAt(xCanvasPosition, yCanvasPosition);
            super.drawSprite(xCanvasPosition, yCanvasPosition, sprite);
        }
    }


    #drawScore(request) {
        const maxTextWidthColumn = 5;

        const argumentObject = {
            xCanvasPosition: 0, 
            yCanvasPosition: 0, 
            text: `Score: ${request.score}`, 
            maxWidthXPosition: maxTextWidthColumn * super.tileWidth,
            style: 'white', 
            font: 'bold 1em sans-serif'
        };

        super.drawText(argumentObject);
    }


}