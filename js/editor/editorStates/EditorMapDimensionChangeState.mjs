export default class EditorMapDimensionChangeState {


    #editor = null;

    
    constructor() {}


    initialize(editor) {
        this.#editor = editor;
        this.#editor.resetSpawnScatterControlDisplayStatus();
        this.#editor.resetInternalLevel();
        this.#editor.buildBoardEditingArea();
        this.#resetScatterInputs();
        this.#resetSpawnInputs();
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


}