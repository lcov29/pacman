import BackgroundCanvas from './BackgroundCanvas.mjs';
import MainCanvas from './MainCanvas.mjs';
import Configuration from '../../../Configuration.mjs';


export default class CanvasView {


    #backgroundCanvas = null;
    #mainCanvas = null;
    #animationFrameId;


    constructor() {
        this.#backgroundCanvas = new BackgroundCanvas();
        this.#mainCanvas = new MainCanvas();
    }


    initializeCanvasSize() {
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


    animateNextStep() {
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
        this.#mainCanvas.moveAnimationObjectsBy(Configuration.actorMovementSpeedInPixel);
        this.#animationFrameId = requestAnimationFrame(this.callBackAnimation.bind(this));
    }


}