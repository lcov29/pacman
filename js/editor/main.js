"use strict";

import Editor from "./Editor.mjs";
import EditorTileManipulationState from "./EditorTileManipulationState.mjs";
import EditorScatterSelectionState from "./EditorScatterSelectionState.mjs";
import EditorMapDimensionChangeState from "./EditorMapDimensionChangeState.mjs";
import EditorSpawnSelectionState from "./EditorSpawnSelectionState.mjs";
import Configuration from "../Configuration.mjs";


let editor = new Editor();
editor.setEditorContainer("editor_container");
editor.setReferenceInputMapHeight("map_height");
editor.setReferenceInputMapWidth("map_width");
editor.initialize();
buttonMapDimensionChangeCallback();
                                


// add handlers to level elements in selector bar
let radios = document.querySelectorAll('input[name="selectors"]');
for (let radio of radios) {
    radio.addEventListener('click', radioButtonTileSelectionCallback);
}


// add handlers to editor container (enable drawing level elements while keeping the mouse button pressed)
let editorContainer = document.getElementById('editor_container');
editorContainer.addEventListener('mousedown', editorContainerMouseDownCallback);
editorContainer.addEventListener('mouseup', editorContainerMouseUpCallback);
editorContainer.addEventListener('mouseleave', editorContainerMouseLeaveCallback);


// add handler to map dimension apply button
document.getElementById('map_width').addEventListener('blur', validateMapWidthInput);
document.getElementById('map_height').addEventListener('blur', validateMapHeightInput);
document.getElementById('button_map_sizer').addEventListener('click', buttonMapDimensionChangeCallback);


// add handlers to scatter spawn control group
let scatterSpawnInputs = document.querySelectorAll('input[class="input_position"]');
for (let scatterSpawnInput of scatterSpawnInputs) {
    scatterSpawnInput.addEventListener('mouseenter', inputScatterSpawnMouseEnterCallback);
    scatterSpawnInput.addEventListener('mouseleave', inputScatterSpawnMouseLeaveCallback);
}


// add handlers to scatter select buttons
let scatterButtons = document.querySelectorAll('button[name="button_scatter_position"]');
for (let scatterButton of scatterButtons) {
    scatterButton.addEventListener('click', buttonScatterSelectionCallback);
}


// add handlers to spawn select buttons
let spawnButtons = document.querySelectorAll('button[name="button_spawn_position"]');
for (let spawnButton of spawnButtons) {
    spawnButton.addEventListener('click', buttonSpawnSelectionCallback);
}


// add handler to play button
document.getElementById('play_level').addEventListener('click', buttonPlayCallback);




// Callback wrappers
function editorContainerMouseDownCallback() {
    editor.handleEditorContainerMouseDown(this.id);
}


function editorContainerMouseUpCallback() {
    editor.handleEditorContainerMouseUp(this.id);
}


function editorContainerMouseLeaveCallback() {
    editor.handleEditorContainerMouseLeave(this.id);
}


function editorTileClickCallback() {
    editor.handleEditorTileClick(this.id);
}


function editorTileMouseOverCallback() {
    editor.handleEditorTileMouseOver(this.id);
}


function editorTileMouseEnterCallback() {
    editor.handleEditorTileMouseEnter(this.id);
}


function editorTileMouseLeaveCallback() {
    editor.handleEditorTileMouseLeave(this.id);
}


function radioButtonTileSelectionCallback() {
    editor.setState(new EditorTileManipulationState(this.id));
}


function validateMapWidthInput() {
    try {
        let input = document.getElementById(this.id);
        let inputNumber = parseInt(input.value);
        if ((inputNumber < Configuration.EDITOR_BOARD_MIN_WIDTH) ||
            (inputNumber > Configuration.EDITOR_BOARD_MAX_WIDTH)) {
            input.value = "";
        }
    } catch(e) {
        input.value = "";
    }
}


function validateMapHeightInput() {
    try {
        let input = document.getElementById(this.id);
        let inputNumber = parseInt(input.value);
        if ((inputNumber < Configuration.EDITOR_BOARD_MIN_HEIGHT) ||
            (inputNumber > Configuration.EDITOR_BOARD_MAX_HEIGHT)) {
            input.value = "";
        }
    } catch(e) {
        input.value = "";
    }
}


function inputScatterSpawnMouseEnterCallback() {
    let borderColor = Configuration.EDITOR_SCATTER_SPAWN_SELECTION_POINTER_HIGHTLIGHT_COLOR_HEX;
    let coordinateString = document.getElementById(this.id).value;
    if (coordinateString !== "") {
        document.getElementById(coordinateString).style.borderColor = borderColor;
        document.getElementById(coordinateString).style.borderWidth = '5px';
    }
}


function inputScatterSpawnMouseLeaveCallback() {
    let coordinateString = document.getElementById(this.id).value;
    if (coordinateString !== "") {
        document.getElementById(coordinateString).style = null;
    }
}


function buttonMapDimensionChangeCallback() {
    let inputHeight = document.getElementById("map_height").value;
    let inputWidth = document.getElementById("map_width").value;
    if (inputHeight !== "" && inputWidth !== "") {
        let newState = new EditorMapDimensionChangeState();
        newState.setEditorTileClickCallback(editorTileClickCallback);
        newState.setEditorTileMouseEnterCallback(editorTileMouseEnterCallback);
        newState.setEditorTileMouseLeaveCallback(editorTileMouseLeaveCallback);
        newState.setEditorTileMouseOverCallback(editorTileMouseOverCallback);
        editor.setState(newState);
    }
}


function buttonScatterSelectionCallback() {
    editor.setState(new EditorScatterSelectionState(this.id));
}


function buttonSpawnSelectionCallback() {
    editor.setState(new EditorSpawnSelectionState(this.id));
}


function buttonPlayCallback() {
    editor.sendLevelJson();
    location.href = "../../index.html";
}