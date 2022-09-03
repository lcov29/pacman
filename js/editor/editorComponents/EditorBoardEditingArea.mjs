export default class EditorBoardEditingArea {


    #boardEditingArea = null;
    #editor = null;


    constructor(id, editorReference) {
        this.#boardEditingArea = document.getElementById(id);
        this.#editor = editorReference;
    }


    build(width, height) {
        this.#initializeCSSVariables(width, height);
        this.#clearBoardEditingArea();
        this.#initializeBoardEditingArea(width, height);
    }


    #initializeCSSVariables(width, height) {
        const rootElement = document.querySelector(':root');
        rootElement.style.setProperty('--editorContainerWidthInTiles', width);
        rootElement.style.setProperty('--editorContainerHeightInTiles', height);
    }


    #clearBoardEditingArea() {
        while (this.#boardEditingArea.firstChild) {
           this.#boardEditingArea.removeChild(this.#boardEditingArea.firstChild);
        }
    }


    #initializeBoardEditingArea(width, height) {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const boardElement = this.#createBoardElement(x, y);
                this.#boardEditingArea.appendChild(boardElement);
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