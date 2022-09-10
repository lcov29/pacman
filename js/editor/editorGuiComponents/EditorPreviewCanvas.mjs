import EditorElementMapper from "../EditorElementMapper.mjs";


export default class EditorPreviewCanvas {


    #canvas = null;
    #context = null;
    #tileWidth = -1;
    #tileHeight = -1;


    constructor() {
        this.#canvas = document.getElementById('previewCanvas');
        this.#context = this.#canvas.getContext('2d');
        this.#tileWidth = 30 * devicePixelRatio;
        this.#tileHeight = 30 * devicePixelRatio;
    }


    getDataURL() {
        return this.#canvas.toDataURL();
    }


    drawLevel(board) {
        const columnNumber = board[0].length; // no ragged arrays
        const rowNumber = board.length;

        this.#resize(columnNumber, rowNumber);
        this.#clearCanvas();

        for (let y = 0; y < rowNumber; y++) {
            for (let x = 0; x < columnNumber; x++) {
                const levelCharacter = board[y][x];
                this.#drawSprite(x, y, levelCharacter);
            }
        }
    }


    draw(coordinateString, levelCharacter) {
        const coordinate = this.#parseCoordinateString(coordinateString);
        this.#clearTileAt(coordinate.x, coordinate.y);
        this.#drawSprite(coordinate.x, coordinate.y, levelCharacter);
    }


    #resize(columnNumber, rowNumber) {
        this.#canvas.width = this.#tileWidth * columnNumber;
        this.#canvas.height = this.#tileHeight * rowNumber;
    }


    #clearCanvas() {
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }


    #clearTileAt(column, row) {
        const xCanvasPosition = this.#calculateXCanvasPositionOf(column);
        const yCanvasPosition = this.#calculateYCanvasPositionOf(row);

        this.#context.save();
        this.#context.translate(xCanvasPosition, yCanvasPosition);
        this.#context.clearRect(0, 0, this.#tileWidth, this.#tileHeight);
        this.#context.restore();
    }


    #drawSprite(column, row, levelCharacter) {    
        const xCanvasPosition = this.#calculateXCanvasPositionOf(column);
        const yCanvasPosition = this.#calculateYCanvasPositionOf(row);
        const sprite = this.#getSpriteFor(levelCharacter);
        
        this.#context.save();
        this.#context.translate(xCanvasPosition, yCanvasPosition);
        this.#context.drawImage(sprite, 0, 0, this.#tileWidth, this.#tileHeight);
        this.#context.restore();
    }


    #calculateXCanvasPositionOf(column) {
        return column * this.#tileWidth;
    }


    #calculateYCanvasPositionOf(row) {
        return row * this.#tileHeight;
    }


    #getSpriteFor(levelCharacter) {
        const spriteId = EditorElementMapper.internalElementToSpriteIdMap.get(levelCharacter);
        return document.getElementById(spriteId);
    }


    #parseCoordinateString(coordinateString) {
        let parsedInput = coordinateString.replace('(', '');
        parsedInput = parsedInput.replace(')', '');
        parsedInput = parsedInput.split(',');
        const x = parseInt(parsedInput[0]);
        const y = parseInt(parsedInput[1]);
        return {x, y};
    }


}