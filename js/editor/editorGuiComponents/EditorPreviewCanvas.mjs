import Configuration from "../../global/Configuration.mjs";
import EditorElementMapper from "../EditorElementMapper.mjs";


export default class EditorPreviewCanvas {


    #canvas = null;
    #context = null;
    #tileWidth = -1;
    #tileHeight = -1;
    #bonusSpawnPositionSprite = null;


    constructor() {
        this.#canvas = document.getElementById('previewCanvas');
        this.#context = this.#canvas.getContext('2d');
        this.#tileWidth = 30 * devicePixelRatio;
        this.#tileHeight = 30 * devicePixelRatio;
        this.#bonusSpawnPositionSprite = document.getElementById('bonusCherry');
    }


    getDataURL() {
        return this.#canvas.toDataURL();
    }


    drawLevel(board, bonusSpawnPositionList) {
        this.#clearCanvas();
        this.#resize(board);
        this.#drawBoard(board);
        this.#drawBonusSpawnPosition(bonusSpawnPositionList); 
        // draw bonus spawn positions, because they do not show up as tile characters on board
    }


    draw(coordinateString, levelCharacter, isBonusSpawnPosition) {
        const coordinate = this.#parseCoordinateString(coordinateString);
        const sprite = (isBonusSpawnPosition) ? this.#bonusSpawnPositionSprite : this.#getSpriteFor(levelCharacter);

        this.#clearTileAt(coordinate.x, coordinate.y);
        this.#drawSprite(coordinate.x, coordinate.y, sprite);
    }


    #drawBoard(board) {
        const columnNumber = board[0].length; // no ragged arrays
        const rowNumber = board.length;

        for (let y = 0; y < rowNumber; y++) {
            for (let x = 0; x < columnNumber; x++) {
                const levelCharacter = board[y][x];
                const sprite = this.#getSpriteFor(levelCharacter);
                this.#drawSprite(x, y, sprite);
            }
        }
    }


    #drawBonusSpawnPosition(bonusSpawnPositionList) {
        for (const spawnPosition of bonusSpawnPositionList) {
            this.#drawSprite(spawnPosition.x, spawnPosition.y, this.#bonusSpawnPositionSprite);
        }
    }


    #resize(board) {
        const columnNumber = board[0].length; // no ragged arrays
        const rowNumber = board.length;

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


    #drawSprite(column, row, sprite) {    
        const xCanvasPosition = this.#calculateXCanvasPositionOf(column);
        const yCanvasPosition = this.#calculateYCanvasPositionOf(row);
        
        this.#context.save();
        this.#context.translate(xCanvasPosition, yCanvasPosition);

        const isSpriteDefined = sprite !== document.getElementById('undefinedTileSprite');
        if (isSpriteDefined) {
            const backgroundSprite = this.#getSpriteFor(Configuration.emptyTileCharacter);
            this.#context.drawImage(backgroundSprite, 0, 0, this.#tileWidth, this.#tileHeight);
        }

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