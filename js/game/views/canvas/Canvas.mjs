export default class Canvas {


    #canvas = null;
    #context = null;
    #spriteMapper = null;
    #tileWidth = -1;
    #tileHeight = -1;
    #columnNumber = -1;
    #rowNumber = -1;
    #updateRequestStack = [];


    constructor(canvasElement, spriteMapper) {
        this.#canvas = canvasElement;
        this.#spriteMapper = spriteMapper;
        this.#context = this.#canvas.getContext('2d');
    }


    get tileWidth() {
        return this.#tileWidth;
    }


    set tileWidth(width) {
        if (width < 1) {
            throw new RangeError('tileWidth must be greater than zero');
        } else {
            this.#tileWidth = width;
        }
    }


    get tileHeight() {
        return this.#tileHeight;
    }


    set tileHeight(height) {
        if (height < 1) {
            throw new RangeError('tileHeight must be greater than zero');
        } else {
            this.#tileHeight = height;
        }
    }


    get columnNumber() {
        return this.#columnNumber;
    }


    set columnNumber(number) {
        if (number < 1) {
            throw new RangeError('columnNumber must be greater than zero');
        } else {
            this.#columnNumber = number;
        }
    }


    get rowNumber() {
        return this.#rowNumber;
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


    mapActorToSprite(actorCharacter, actorStateName) {
        return this.#spriteMapper.mapActorToSprite(actorCharacter, actorStateName);
    }


    mapBackgroundToSprite(backgroundCharacter) {
        return this.#spriteMapper.mapBackgroundToSprite(backgroundCharacter);
    }


    addRequest(request) {
        this.#updateRequestStack.push(request);
    }


    processUpdateRequestStack(processFunction, thisArgument) {
        this.#updateRequestStack.forEach(processFunction, thisArgument);
        this.#updateRequestStack = [];
    }


    setBackgroundTo(backgroundCanvas) {
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.#context.drawImage(backgroundCanvas, 0, 0);
    }


    drawSprite(x, y, sprite) {
        this.#context.save();
        this.#context.translate(x, y);
        this.#context.clearRect(0, 0, this.#tileWidth, this.#tileHeight);
        this.#context.drawImage(sprite, 0, 0, this.#tileWidth, this.#tileHeight);
        this.#context.restore();
    }


}