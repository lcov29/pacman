"use strict";

import LevelEditor from "./LevelEditor.mjs";
import LevelEditorTileManipulationState from "./LevelEditorTileManipulationState.mjs";
import LevelEditorScatterSelectionState from "./LevelEditorScatterSelectionState.mjs";
import LevelEditorMapDimensionChangeState from "./LevelEditorMapDimensionChangeState.mjs";


let editor = new LevelEditor();
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
document.getElementById('button_map_sizer').addEventListener('click', buttonMapDimensionChangeCallback);



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
document.getElementById('play_level').addEventListener('click', function() { editor.handlePlay(); });




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
    editor.setState(new LevelEditorTileManipulationState(this.id));
}


function buttonMapDimensionChangeCallback() {
    let new_state = new LevelEditorMapDimensionChangeState();
    new_state.setEditorTileClickCallback(editorTileClickCallback);
    new_state.setEditorTileMouseEnterCallback(editorTileMouseEnterCallback);
    new_state.setEditorTileMouseLeaveCallback(editorTileMouseLeaveCallback);
    new_state.setEditorTileMouseOverCallback(editorTileMouseOverCallback);
    editor.setState(new_state);
}


function buttonScatterSelectionCallback() {
    editor.setState(new LevelEditorScatterSelectionState(this.id));
}


function buttonSpawnSelectionCallback() {
    window.alert("implement scatter selection");
}