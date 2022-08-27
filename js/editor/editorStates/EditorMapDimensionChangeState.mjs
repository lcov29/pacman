export default class EditorMapDimensionChangeState {


    #editor = null;

    
    constructor() {}


    initialize(editor) {
        this.#editor = editor;
        this.#editor.resetSpawnScatterControlDisplayStatus();
        this.#editor.resetInternalLevel();
        this.#editor.clearMap();
        this.#resetScatterInputs();
        this.#resetSpawnInputs();
        this.#initializeEditingArea();
    }


    handleEditorContainerMouseDown(callerId) {}


    handleEditorContainerMouseUp(callerId) {}


    handleEditorContainerMouseLeave(callerId) {}


    handleEditorTileClick(callerId) {}


    handleEditorTileMouseOver(callerId) {}


    handleEditorTileMouseEnter(callerId) {}


    handleEditorTileMouseLeave(callerId) {}


    exit() {}


    #resetScatterInputs() {
        const inputIdList = ['scatterPositionGhostBlinky', 'scatterPositionGhostPinky',
                             'scatterPositionGhostClyde', 'scatterPositionGhostInky'];

        const controlIdList = ['scatterControlGhostBlinky', 'scatterControlGhostPinky',
                               'scatterControlGhostClyde', 'scatterControlGhostInky'];

        this.#resetInputs(inputIdList, controlIdList);
    }


    #resetSpawnInputs() {
        const inputIdList = ['spawnPositionGhostBlinky', 'spawnPositionGhostPinky',
                             'spawnPositionGhostClyde', 'spawnPositionGhostInky'];

        const controlIdList = ['spawnControlGhostBlinky', 'spawnControlGhostPinky',
                               'spawnControlGhostClyde', 'spawnControlGhostInky'];

        this.#resetInputs(inputIdList, controlIdList);
    }


    #resetInputs(inputIdList, controlIdList) {
        for (let inputId of inputIdList) {
            document.getElementById(inputId).value = '';
        }

        for (let controlId of controlIdList) {
            document.getElementById(controlId).classList.add('invisible');
        }
    }


    #initializeEditingArea() {
        const width = this.#editor.getMapWidthInput();
        const height = this.#editor.getMapHeightInput();
        this.#editor.setEditorContainerDimension(width, height);
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const newDiv = document.createElement('div');
                const newId = `(${x},${y})`;
                newDiv.setAttribute('id', newId);
                newDiv.setAttribute('title', newId);
                newDiv.setAttribute('class', 'editorTile undefinedTile');
                newDiv.addEventListener('mouseover', this.#editor.handleEditorTileMouseOver.bind(this.#editor));
                newDiv.addEventListener('mouseenter', this.#editor.handleEditorTileMouseEnter.bind(this.#editor));
                newDiv.addEventListener('mouseleave', this.#editor.handleEditorTileMouseLeave.bind(this.#editor));
                newDiv.addEventListener('click', this.#editor.handleEditorTileClick.bind(this.#editor));
                this.#editor.addEditorTile(newDiv);
            }
        }
    }


}