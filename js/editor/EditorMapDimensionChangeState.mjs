"use strict";


export default class EditorMapDimensionChangeState {

    
    constructor() {
        this.editor = null;
        this.inputMapWidth = null;
        this.inputMapHeight = null;
        this.callbackClick = null;
        this.callbackMouseover = null;
        this.callbackMouseenter = null;
        this.callbackMouseleave = null;
    }


    setEditorTileClickCallback(callback) {
        this.callbackClick = callback;
    }


    setEditorTileMouseOverCallback(callback) {
        this.callbackMouseover = callback;
    }


    setEditorTileMouseEnterCallback(callback) {
        this.callbackMouseenter = callback;
    }


    setEditorTileMouseLeaveCallback(callback) {
        this.callbackMouseleave = callback;
    }


    initialize(editor) {
        this.editor = editor;
        this.inputMapWidth = document.getElementById("map_width");
        this.inputMapHeight = document.getElementById("map_height");
        this.editor.resetSpawnScatterControlDisplayStatus();
        this.editor.resetInternalLevel(this.inputMapWidth.value, this.inputMapHeight.value);
        this.editor.clearMap();
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
        let inputIds = ["scatter_position_ghost_blinky", "scatter_position_ghost_pinky",
                         "scatter_position_ghost_clyde", "scatter_position_ghost_inky",
                         "spawn_position_ghost_blinky", "spawn_position_ghost_pinky",
                         "spawn_position_ghost_clyde", "spawn_position_ghost_inky"];
        for (let inputId of inputIds) {
            document.getElementById(inputId).value = "";
        }

        let controlIds = ["scatter_control_ghost_blinky", "scatter_control_ghost_pinky",
                                 "scatter_control_ghost_clyde", "scatter_control_ghost_inky",
                                 "spawn_control_ghost_blinky", "spawn_control_ghost_pinky",
                                 "spawn_control_ghost_clyde", "spawn_control_ghost_inky"];
        for (let controlId of controlIds) {
            document.getElementById(controlId).style = "display:none";
        }
    }


    initializeEditingArea() {
        let width = this.editor.getMapWidthInput();
        let height = this.editor.getMapHeightInput();
        this.editor.setEditorContainerDimension(width, height);
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let newDiv = document.createElement('div');
                let newId = `(${x},${y})`;
                newDiv.setAttribute('id', newId);
                newDiv.setAttribute('title', newId);
                newDiv.setAttribute('class', 'editor_tile undefined_tile');
                newDiv.addEventListener('mouseover', this.callbackMouseover);
                newDiv.addEventListener('mouseenter', this.callbackMouseenter);
                newDiv.addEventListener('mouseleave', this.callbackMouseleave);
                newDiv.addEventListener('click', this.callbackClick);
                this.editor.addEditorTile(newDiv);
            }
        }
    }


}