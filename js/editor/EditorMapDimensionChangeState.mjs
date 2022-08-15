'use strict';


export default class EditorMapDimensionChangeState {


    #editor = null;

    
    constructor() {}


    initialize(editor) {
        this.#editor = editor;
        this.#editor.resetSpawnScatterControlDisplayStatus();
        this.#editor.resetInternalLevel();
        this.#editor.clearMap();
        this.resetScatterSpawnInputs();
        this.initializeEditingArea();
    }


    handleEditorContainerMouseDown(callerId) {}


    handleEditorContainerMouseUp(callerId) {}


    handleEditorContainerMouseLeave(callerId) {}


    handleEditorTileClick(callerId) {}


    handleEditorTileMouseOver(callerId) {}


    handleEditorTileMouseEnter(callerId) {}


    handleEditorTileMouseLeave(callerId) {}


    exit() {}


    resetScatterSpawnInputs() {
        let inputIds = ['scatter_position_ghost_blinky', 'scatter_position_ghost_pinky',
                         'scatter_position_ghost_clyde', 'scatter_position_ghost_inky',
                         'spawn_position_ghost_blinky', 'spawn_position_ghost_pinky',
                         'spawn_position_ghost_clyde', 'spawn_position_ghost_inky'];
        for (let inputId of inputIds) {
            document.getElementById(inputId).value = '';
        }

        let controlIds = ['scatter_control_ghost_blinky', 'scatter_control_ghost_pinky',
                                 'scatter_control_ghost_clyde', 'scatter_control_ghost_inky',
                                 'spawn_control_ghost_blinky', 'spawn_control_ghost_pinky',
                                 'spawn_control_ghost_clyde', 'spawn_control_ghost_inky'];
        for (let controlId of controlIds) {
            document.getElementById(controlId).style = 'display:none';
        }
    }


    initializeEditingArea() {
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