'use strict';


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
        const inputIdList = ['scatter_position_ghost_blinky', 'scatter_position_ghost_pinky',
                             'scatter_position_ghost_clyde', 'scatter_position_ghost_inky'];

        const controlIdList = ['scatter_control_ghost_blinky', 'scatter_control_ghost_pinky',
                               'scatter_control_ghost_clyde', 'scatter_control_ghost_inky'];

        this.#resetInputs(inputIdList, controlIdList);
    }


    #resetSpawnInputs() {
        const inputIdList = ['spawn_position_ghost_blinky', 'spawn_position_ghost_pinky',
                             'spawn_position_ghost_clyde', 'spawn_position_ghost_inky'];

        const controlIdList = ['spawn_control_ghost_blinky', 'spawn_control_ghost_pinky',
                               'spawn_control_ghost_clyde', 'spawn_control_ghost_inky'];

        this.#resetInputs(inputIdList, controlIdList);
    }


    #resetInputs(inputIdList, controlIdList) {
        for (let inputId of inputIdList) {
            document.getElementById(inputId).value = '';
        }

        for (let controlId of controlIdList) {
            document.getElementById(controlId).style = 'display:none';
        }
    }


    #initializeEditingArea() {
        const width = this.#editor.getMapWidthInput();
        const height = this.#editor.getMapHeightInput();
        this.#editor.setEditorContainerDimension(width, height);
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let newDiv = document.createElement('div');
                let newId = `(${x},${y})`;
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