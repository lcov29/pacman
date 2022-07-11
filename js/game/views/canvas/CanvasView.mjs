import BackgroundCanvas from './BackgroundCanvas.mjs';
import MainCanvas from './MainCanvas.mjs';
import Configuration from '../../../Configuration.mjs';


export default class CanvasView {

    #game = null;
    #backgroundCanvas = null;
    #mainCanvas = null;
    #animationFrameId;


    constructor(game) {
        this.#game = game;
        this.#backgroundCanvas = new BackgroundCanvas();
        this.#mainCanvas = new MainCanvas();
    }


    initialize() {
        this.#initializeCanvasSize();
        this.processRequestStacks();
        this.#mainCanvas.drawCurrentLevelState();
    }


    #initializeCanvasSize() {
        const tileWidth = 30 * devicePixelRatio;
        const tileHeight = 30 * devicePixelRatio;
        const columnNumber = 27;
        const rowNumber = 22;

        for (let canvas of [this.#backgroundCanvas, this.#mainCanvas]) {
            canvas.tileWidth = tileWidth;
            canvas.tileHeight = tileHeight;
            canvas.columnNumber = columnNumber;
            canvas.rowNumber = rowNumber;
            canvas.resize();
        }
    }


    addBackgroundRequest(request) {
        this.#backgroundCanvas.addRequest(request);
    }


    addMovementRequest(request) {
        this.#mainCanvas.addRequest(request);
    }


    processRequestStacks() {
        this.#backgroundCanvas.processRequestStack();
        this.#mainCanvas.processRequestStack();
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
        const isAnimationComplete = this.#mainCanvas.moveAnimationObjectsBy(Configuration.actorMovementSpeedInPixel);
        if (isAnimationComplete) {
            this.#game.notifyAnimationComplete();
        }
        this.#animationFrameId = requestAnimationFrame(this.callBackAnimation.bind(this));
    }


}