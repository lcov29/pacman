import Configuration from "../../global/Configuration.mjs";
import EditorElementMapper from "../EditorElementMapper.mjs";


export default class EditorBoardEditingArea {


    #boardEditingArea = null;
    #editor = null;


    constructor(editorReference) {
        this.#editor = editorReference;
        this.#boardEditingArea = document.getElementById('editorContainer');
    }


    initialize() {
        this.#initializeEventListeners();
    }


    build(width, height) {
        this.#setCSSVariables(width, height);
        this.#clearBoardEditingArea();
        this.#buildBoardEditingArea(width, height);
    }


    loadBoard(board) {
        const width = board[0].length;
        const height = board.length;
        this.build(width, height);
        this.#loadBoardIntoEditingArea(board);
    }


    setBoardTileTo(coordinateString, tileType) {
        const styleclass = `editorTile ${tileType}`;
        document.getElementById(coordinateString).setAttribute('class', styleclass);
    }


    mouseDownCallback(event) {
        this.#editor.handleEditorContainerMouseDown(event);
    }

    
    mouseUpCallback(event) {
        this.#editor.handleEditorContainerMouseUp(event);
    }


    mouseLeaveCallback(event) {
        this.#editor.handleEditorContainerMouseLeave(event);
    }


    #initializeEventListeners() {
        // event listeners enable drawing level elements while keeping the mouse pressed
        this.#boardEditingArea.addEventListener('mousedown', this.mouseDownCallback.bind(this));
        this.#boardEditingArea.addEventListener('mouseup', this.mouseUpCallback.bind(this));
        this.#boardEditingArea.addEventListener('mouseleave', this.mouseLeaveCallback.bind(this));
    }


    #setCSSVariables(width, height) {
        const rootElement = document.querySelector(':root');
        rootElement.style.setProperty('--editorContainerWidthInTiles', width);
        rootElement.style.setProperty('--editorContainerHeightInTiles', height);
    }


    #clearBoardEditingArea() {
        while (this.#boardEditingArea.firstChild) {
           this.#boardEditingArea.removeChild(this.#boardEditingArea.firstChild);
        }
    }


    #buildBoardEditingArea(width, height) {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const boardElement = this.#createBoardElement(x, y);
                this.#boardEditingArea.appendChild(boardElement);
            }
        }
    }


    #loadBoardIntoEditingArea(board) {
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                const currentCharacter = board[y][x];
                const coordinateString = `(${x},${y})`;
                const tileType = EditorElementMapper.internalElementToTileTypeMap.get(currentCharacter);
                this.setBoardTileTo(coordinateString, tileType);
            }
        }
    }


    #createBoardElement(x, y) {
        const newDiv = document.createElement('div');
        const newId = `(${x},${y})`;

        newDiv.setAttribute('id', newId);
        newDiv.setAttribute('title', newId);
        newDiv.setAttribute('class', 'editorTile undefinedTile');

        newDiv.addEventListener('mouseover', this.#editor.handleEditorTileMouseOver.bind(this.#editor));
        newDiv.addEventListener('mouseenter', this.#editor.handleEditorTileMouseEnter.bind(this.#editor));
        newDiv.addEventListener('mouseleave', this.#editor.handleEditorTileMouseLeave.bind(this.#editor));
        newDiv.addEventListener('click', this.#editor.handleEditorTileClick.bind(this.#editor));

        return newDiv;
    }


}