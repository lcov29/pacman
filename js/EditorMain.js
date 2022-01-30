"use strict";

import LevelEditor from "./LevelEditor.mjs";


let editor = new LevelEditor();
editor.setEditorContainer("editor_container");
editor.setReferenceInputMapHeight("map_height");
editor.setReferenceInputMapWidth("map_width");
editor.setScatterPositionsContainer("scatter_position_container");
editor.setOptionalSpawnPositionsContainer("spawn_position_container");
editor.initialize();
editor.handleMapDimensionChange(levelTileMouseoverCallback,
                                scatterSelectionTileMouseenterCallback,
                                scatterSelectionTileMouseleaveCallback, 
                                levelTileClickCallback);
                                

// add handlers to level element selectors in selector bar
let radios = document.querySelectorAll('input[name="selectors"]');
for (let radio of radios) {
    radio.addEventListener('click', selectTileTypeCallback);
}


// add handlers to editor container (enable drawing level elements while keeping the mouse button pressed)
let editor_container = document.getElementById('editor_container');
editor_container.addEventListener('mousedown', function() { editor.setMousePressedStatus(true); });
editor_container.addEventListener('mouseup', function() { editor.setMousePressedStatus(false); });
editor_container.addEventListener('mouseleave', function() { editor.setMousePressedStatus(false);});


// add handler to map dimension apply button
document.getElementById('button_map_sizer').addEventListener('click', changeMapDimension);


// add handlers to scatter select buttons
let scatter_buttons = document.querySelectorAll('button[name="button_scatter_position"]');
for (let scatter_button of scatter_buttons) {
    scatter_button.addEventListener('click', scatterSelectionButtonCallback);
}


// add handlers to spawn select buttons
let spawn_buttons = document.querySelectorAll('button[name="button_spawn_position"]');
for (let spawn_button of spawn_buttons) {
    spawn_button.addEventListener('click', function() { editor.handleSpawnSelection(); });
}


// add handler to play button
document.getElementById('play_level').addEventListener('click', function() { editor.handlePlay(); });








// wrapper functions for callbacks implemented by LevelEditor
function selectTileTypeCallback() {
    editor.handleTileTypeSelectionCallback(this.id);
}


function changeMapDimension() {
    editor.handleMapDimensionChange(levelTileMouseoverCallback,
                                    scatterSelectionTileMouseenterCallback,
                                    scatterSelectionTileMouseleaveCallback, 
                                    levelTileClickCallback);
}


function scatterSelectionButtonCallback() {
    //editor.setCurrentlyActiveScatterInput(this.id);
    //editor.setCurrentlySelectedTileType('');
    editor.scatterSelectionButtonCallback(this.id);
}


function scatterSelectionTileMouseenterCallback() {
    editor.handleScatterSelectionMouseenter(this.id);
}


function scatterSelectionTileMouseleaveCallback() {
    editor.handleScatterSelectionMouseleave(this.id);
}


function levelTileClickCallback() {
    editor.levelTileClickCallback(this.id);
}


function levelTileMouseoverCallback() {
    editor.levelTileMouseoverCallback(this.id);
}