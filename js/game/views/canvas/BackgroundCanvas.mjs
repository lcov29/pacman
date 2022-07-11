import Configuration from "../../../Configuration.mjs";


export default class BackgroundCanvas {


    #canvas = null;
    #context = null;
    #backgroundRequestStack = null;
    #spriteMapper = null;
    #tileWidth = 0;
    #tileHeight = 0;
    #columnNumber = 0;
    #rowNumber = 0;

    
    constructor() {
        this.#canvas = document.getElementById('backgroundCanvas');
        this.#context = this.#canvas.getContext('2d');
        this.#backgroundRequestStack = [];
        this.#initializeSpriteMapper();
        
    }


    set tileWidth(width) {
        if (width < 1) {
            throw new RangeError(`tileWidth must be greater than zero`);
        } else {
            this.#tileWidth = width;
        }
    }


    set tileHeight(height) {
        if (height < 1) {
            throw new RangeError(`tileHeight must be greater than zero`);
        } else {
            this.#tileHeight = height;
        }
    }


    set columnNumber(number) {
        if (number < 1) {
            throw new RangeError(`columnNumber must be greater than zero`);
        } else {
            this.#columnNumber = number;
        }
    }


    set rowNumber(number) {
        if (number < 1) {
            throw new RangeError(`rowNumber must be greater than zero`);
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


    addRequest(backgroundRequest) {
        this.#backgroundRequestStack.push(backgroundRequest);
    }


    processRequestStack() {
        this.#backgroundRequestStack.forEach(this.drawOnBackground, this);
        this.#backgroundRequestStack = [];
    }
    
    
    drawOnBackground(request) {
        const sprite = this.#spriteMapper.get(request.elementCharacter);
        const xPosition = request.xPosition * this.#tileWidth;
        const yPosition = request.yPosition * this.#tileHeight;

        this.#context.save();
        this.#context.translate(xPosition, yPosition);
        this.#context.clearRect(0, 0, this.#tileWidth, this.#tileHeight);
        this.#context.drawImage(sprite, 0, 0, this.#tileWidth, this.#tileHeight);
        this.#context.restore();
    }


    #initializeSpriteMapper() {
        this.#spriteMapper = new Map();
        this.#spriteMapper.set(Configuration.WALL_CHARACTER, document.getElementById('wall'));
        this.#spriteMapper.set(Configuration.EMPTY_TILE_CHARACTER, document.getElementById('emptySpace'));
        this.#spriteMapper.set(Configuration.TELEPORTER_1_CHARACTER, document.getElementById('teleporter1'));
        this.#spriteMapper.set(Configuration.TELEPORTER_2_CHARACTER, document.getElementById('teleporter2'))
        this.#spriteMapper.set(Configuration.TELEPORTER_3_CHARACTER, document.getElementById('teleporter3'))
        this.#spriteMapper.set(Configuration.POINT_CHARACTER, document.getElementById('point'));
        this.#spriteMapper.set(Configuration.POWERUP_CHARACTER, document.getElementById('powerUp'));
    }


}