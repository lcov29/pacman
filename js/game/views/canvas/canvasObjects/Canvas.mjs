export default class Canvas {


    #canvas = null;
    #context = null;
    #spriteMapper = null;
    #tileWidth = -1;
    #tileHeight = -1;
    #columnNumber = -1;
    #rowNumber = -1;


    constructor(canvasElement, spriteMapper) {
        this.#canvas = canvasElement;
        this.#spriteMapper = spriteMapper;
        this.#context = this.#canvas.getContext('2d');
    }


    get tileWidth() {
        return this.#tileWidth;
    }


    get tileHeight() {
        return this.#tileHeight;
    }


    get columnNumber() {
        return this.#columnNumber;
    }


    get rowNumber() {
        return this.#rowNumber;
    }

    
    set tileWidth(width) {
        if (width < 1) {
            throw new RangeError('tileWidth must be greater than zero');
        } else {
            this.#tileWidth = width;
        }
    }


    set tileHeight(height) {
        if (height < 1) {
            throw new RangeError('tileHeight must be greater than zero');
        } else {
            this.#tileHeight = height;
        }
    }


    set columnNumber(number) {
        if (number < 1) {
            throw new RangeError('columnNumber must be greater than zero');
        } else {
            this.#columnNumber = number;
        }
    }


    set rowNumber(number) {
        if (number < 1) {
            throw new RangeError('rowNumber must be greater than zero');
        } else {
            this.#rowNumber = number;
        }
    }


    resize() {
        const canvasWidth = this.#tileWidth * this.#columnNumber;
        const canvasHeight = this.#tileHeight * this.#rowNumber;
        this.#canvas.width = canvasWidth;
        this.#canvas.height = canvasHeight;
    }


    mapActorToMainSprite(argumentObject) {
        return this.#spriteMapper.mapActorToMainSprite(argumentObject);
    }


    mapActorToAlternateSprite(argumentObject) {
        return this.#spriteMapper.mapActorToAlternateSprite(argumentObject);
    }


    mapBackgroundToSprite(backgroundCharacter) {
        return this.#spriteMapper.mapBackgroundToSprite(backgroundCharacter);
    }


    setBackgroundTo(backgroundCanvas) {
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.#context.drawImage(backgroundCanvas, 0, 0);
    }


    clearTileAt(xCanvasPosition, yCanvasPosition) {
        this.#context.save();
        this.#context.translate(xCanvasPosition, yCanvasPosition);
        this.#context.clearRect(0, 0, this.#tileWidth, this.#tileHeight);
        this.#context.restore();
    }


    drawSprite(xCanvasPosition, yCanvasPosition, sprite) {      
        this.#context.save();
        this.#context.translate(xCanvasPosition, yCanvasPosition);
        this.#context.drawImage(sprite, 0, 0, this.#tileWidth, this.#tileHeight);
        this.#context.restore();
    }


    drawRectangle(argumentObject) {
        const {xCanvasPosition, yCanvasPosition, widthInPixel, heightInPixel, color} = argumentObject;

        this.#context.save();
        this.#context.translate(xCanvasPosition, yCanvasPosition);
        this.#context.fillStyle = color;
        this.#context.fillRect(0, 0, widthInPixel, heightInPixel);
        this.#context.restore();
    }


    drawText(argumentObject) {
        const {xCanvasPosition, yCanvasPosition, text, maxWidthXPosition, style, font} = argumentObject;

        for (let i = xCanvasPosition; i <= maxWidthXPosition; i++) {
            this.clearTileAt(i, yCanvasPosition);
        }

        this.#context.save();
        this.#context.translate(xCanvasPosition, yCanvasPosition);
        this.#context.fillStyle = style;
        this.#context.font = font;
        this.#context.fillText(text, xCanvasPosition * this.#tileWidth, yCanvasPosition * this.#tileHeight + (this.#tileHeight / 2));
        this.#context.restore();
    }


}