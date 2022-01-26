"use strict";

import LevelEditor from "./LevelEditor.mjs";


let editor = new LevelEditor();
editor.setEditorContainer("editor_container");
editor.setReferenceInputMapHeight("map_height");
editor.setReferenceInputMapWidth("map_width");
editor.setScatterPositionsContainer("scatter_position_container");
editor.setOptionalSpawnPositionsContainer("spawn_position_container");


// add handlers to level element selectors in selector bar
let radios = document.querySelectorAll('input[name="selectors"]');
for (let radio of radios) {
    radio.addEventListener('click', selectTileTypeCallback);
}


// add handler to map dimension apply button
document.getElementById('button_map_sizer').addEventListener('click', changeMapDimension);



// add handlers to scatter select buttons
let scatter_buttons = document.querySelectorAll('button[name="button_scatter_position"]');
for (let scatter_button of scatter_buttons) {
    scatter_button.addEventListener('click', function(){ editor.handleScatterSelection(); });
}


// add handlers to spawn select buttons
let spawn_buttons = document.querySelectorAll('button[name="button_spawn_position"]');
for (let spawn_button of spawn_buttons) {
    spawn_button.addEventListener('click', function() { editor.handleSpawnSelection(); });
}


// add handler to play button
document.getElementById('play_level').addEventListener('click', function() { editor.handlePlay(); });


editor.handleMapDimensionChange(LevelTileCallback);



// wrapper functions for callbacks implemented by LevelEditor
function selectTileTypeCallback() {
    editor.handleTileTypeSelectionCallback(this.id);
}

function changeMapDimension() {
    editor.handleMapDimensionChange(LevelTileCallback);
}


function LevelTileCallback() {
    editor.handleTileManipuationCallback(this.id);
}