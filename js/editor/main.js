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
let editor_container = document.getElementById('editor_container');
editor_container.addEventListener('mousedown', editorContainerMouseDownCallback);
editor_container.addEventListener('mouseup', editorContainerMouseUpCallback);
editor_container.addEventListener('mouseleave', editorContainerMouseLeaveCallback);


// add handler to map dimension apply button
document.getElementById('map_width').addEventListener('blur', validateMapWidthInput);
document.getElementById('map_height').addEventListener('blur', validateMapHeightInput);
document.getElementById('button_map_sizer').addEventListener('click', buttonMapDimensionChangeCallback);


// add handlers to scatter spawn control group
let scatter_spawn_inputs = document.querySelectorAll('input[class="input_position"]');
for (let scatter_spawn_input of scatter_spawn_inputs) {
    scatter_spawn_input.addEventListener('mouseenter', inputScatterSpawnMouseEnterCallback);
    scatter_spawn_input.addEventListener('mouseleave', inputScatterSpawnMouseLeaveCallback);
}


// add handlers to scatter select buttons
let scatter_buttons = document.querySelectorAll('button[name="button_scatter_position"]');
for (let scatter_button of scatter_buttons) {
    scatter_button.addEventListener('click', buttonScatterSelectionCallback);
}


// add handlers to spawn select buttons
let spawn_buttons = document.querySelectorAll('button[name="button_spawn_position"]');
for (let spawn_button of spawn_buttons) {
    spawn_button.addEventListener('click', buttonSpawnSelectionCallback);
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
        let input_number = parseInt(input.value);
        if ((input_number < Configuration.EDITOR_BOARD_MIN_WIDTH) ||
            (input_number > Configuration.EDITOR_BOARD_MAX_WIDTH)) {
            input.value = "";
        }
    } catch(e) {
        input.value = "";
    }
}


function validateMapHeightInput() {
    try {
        let input = document.getElementById(this.id);
        let input_number = parseInt(input.value);
        if ((input_number < Configuration.EDITOR_BOARD_MIN_HEIGHT) ||
            (input_number > Configuration.EDITOR_BOARD_MAX_HEIGHT)) {
            input.value = "";
        }
    } catch(e) {
        input.value = "";
    }
}


function inputScatterSpawnMouseEnterCallback() {
    let border_color = Configuration.EDITOR_SCATTER_SPAWN_SELECTION_POINTER_HIGHTLIGHT_COLOR_HEX;
    let coordinate_string = document.getElementById(this.id).value;
    if (coordinate_string !== "") {
        document.getElementById(coordinate_string).style.borderColor = border_color;
        document.getElementById(coordinate_string).style.borderWidth = '5px';
    }
}


function inputScatterSpawnMouseLeaveCallback() {
    let coordinate_string = document.getElementById(this.id).value;
    if (coordinate_string !== "") {
        document.getElementById(coordinate_string).style = null;
    }
}


function buttonMapDimensionChangeCallback() {
    let input_height = document.getElementById("map_height").value;
    let input_width = document.getElementById("map_width").value;
    if (input_height !== "" && input_width !== "") {
        let new_state = new EditorMapDimensionChangeState();
        new_state.setEditorTileClickCallback(editorTileClickCallback);
        new_state.setEditorTileMouseEnterCallback(editorTileMouseEnterCallback);
        new_state.setEditorTileMouseLeaveCallback(editorTileMouseLeaveCallback);
        new_state.setEditorTileMouseOverCallback(editorTileMouseOverCallback);
        editor.setState(new_state);
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