import MainCanvas from './MainCanvas.mjs';
import BackgroundCanvas from './BackgroundCanvas.mjs';
import SpriteMapper from './SpriteMapper.mjs';
import Configuration from '../../../global/Configuration.mjs';


export default class CanvasView {

    
    #game = null;
    #backgroundCanvas = null;
    #mainCanvas = null;
    #animationFrameId;


    constructor(mainCanvas, backgroundCanvas, game) {
        const spriteMapper = new SpriteMapper();
        this.#mainCanvas = new MainCanvas(mainCanvas, backgroundCanvas, spriteMapper);
        this.#backgroundCanvas = new BackgroundCanvas(backgroundCanvas, spriteMapper);
        this.#game = game;
    }


    initialize() {
        this.#initializeCanvasSize();
        this.#mainCanvas.initializeAnimationObjectList();
        this.#backgroundCanvas.processUpdateRequestStack();
        this.#mainCanvas.processUpdateRequestStack(true);
        this.#mainCanvas.drawCurrentLevelState();
    }


    addBackgroundRequest(request) {
        const canvasOffsetRowForScore = 1;
        request.yPosition = request.yPosition + canvasOffsetRowForScore;
        this.#backgroundCanvas.addRequest(request);
    }


    addRespawnRequest(request) {
        const canvasOffsetRowForScore = 1;
        request.yPosition =request.yPosition + canvasOffsetRowForScore;
        this.#mainCanvas.addRequest(request);
    }


    addMovementRequest(request) {
        const canvasOffsetRowForScore = 1;
        request.yPositionStart = request.yPositionStart + canvasOffsetRowForScore;
        request.yPositionDestination = request.yPositionDestination + canvasOffsetRowForScore;
        this.#mainCanvas.addRequest(request);
    }


    processUpdateRequestStack() {
        this.#mainCanvas.processUpdateRequestStack();
    }


    startAnimationLoop() {
        if (!this.#animationFrameId) {
            this.#animationFrameId = requestAnimationFrame(this.callBackAnimation.bind(this));
        }
    }


    stopAnimationLoop() {
        cancelAnimationFrame(this.#animationFrameId);
        this.#animationFrameId = undefined;
    }


    callBackAnimation() {
        this.#mainCanvas.drawCurrentLevelState();
        this.#mainCanvas.moveAnimationObjectsBy(Configuration.actorMovementSpeedInPixel);
        
        if (this.#mainCanvas.isAnimationComplete()) {
            this.#backgroundCanvas.processUpdateRequestStack();
            this.#game.notifyAnimationComplete();
        }

        if (this.#game.isAnimationLoopContinuationNecessary()) {
            this.#animationFrameId = requestAnimationFrame(this.callBackAnimation.bind(this));
        }
    }


    #initializeCanvasSize() {
        const tileWidth = 30 * devicePixelRatio;
        const tileHeight = 30 * devicePixelRatio;
        const columnNumber = 27;
        const rowNumber = 22 + 1;

        for (let canvas of [this.#backgroundCanvas, this.#mainCanvas]) {
            canvas.tileWidth = tileWidth;
            canvas.tileHeight = tileHeight;
            canvas.columnNumber = columnNumber;
            canvas.rowNumber = rowNumber;
            canvas.resize();
        }
    }


}