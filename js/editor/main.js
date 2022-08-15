'use strict';

import Editor from './Editor.mjs';
import EditorTileManipulationState from './EditorTileManipulationState.mjs';
import EditorScatterSelectionState from './EditorScatterSelectionState.mjs';
import EditorMapDimensionChangeState from './EditorMapDimensionChangeState.mjs';
import EditorSpawnSelectionState from './EditorSpawnSelectionState.mjs';
import Configuration from '../Configuration.mjs';


let editor = new Editor();
buttonMapDimensionChangeCallback();
                                


// add handlers to level elements in selector bar
const radioList = document.querySelectorAll('input[name="selectors"]');
for (let radio of radioList) {
    radio.addEventListener('click', radioButtonTileSelectionCallback);
}


// add handlers to editor container (enable drawing level elements while keeping the mouse button pressed)
const editorContainer = document.getElementById('editor_container');
editorContainer.addEventListener('mousedown', editor.handleEditorContainerMouseDown.bind(editor));
editorContainer.addEventListener('mouseup', editor.handleEditorContainerMouseUp.bind(editor));
editorContainer.addEventListener('mouseleave', editor.handleEditorContainerMouseLeave.bind(editor));


// add handler to map dimension apply button
document.getElementById('map_width').addEventListener('blur', validateMapWidthInput);
document.getElementById('map_height').addEventListener('blur', validateMapHeightInput);
document.getElementById('button_map_sizer').addEventListener('click', buttonMapDimensionChangeCallback);


// add handlers to scatter spawn control group
const scatterSpawnInputList = document.querySelectorAll('input[class="inputPosition"]');
for (let scatterSpawnInput of scatterSpawnInputList) {
    scatterSpawnInput.addEventListener('mouseenter', inputScatterSpawnMouseEnterCallback);
    scatterSpawnInput.addEventListener('mouseleave', inputScatterSpawnMouseLeaveCallback);
}


// add handlers to scatter select buttons
const scatterButtonList = document.querySelectorAll('button[name="button_scatter_position"]');
for (let scatterButton of scatterButtonList) {
    scatterButton.addEventListener('click', buttonScatterSelectionCallback);
}


// add handlers to spawn select buttons
const spawnButtonList = document.querySelectorAll('button[name="button_spawn_position"]');
for (let spawnButton of spawnButtonList) {
    spawnButton.addEventListener('click', buttonSpawnSelectionCallback);
}


// add handler to play button
document.getElementById('play_level').addEventListener('click', buttonPlayCallback);


function radioButtonTileSelectionCallback(event) {
    editor.setState(new EditorTileManipulationState(event.target.id));
}


function validateMapWidthInput(event) {
    const input = document.getElementById(event.target.id);
    try {
        const inputNumber = parseInt(input.value);
        const isWidthInputBelowMinimum = inputNumber < Configuration.editorBoardMinWidth;
        const isWidthInputAboveMaximum = inputNumber > Configuration.editorBoardMaxWidth;
        const isWidthInputInvalid = isWidthInputBelowMinimum || isWidthInputAboveMaximum;
        
        if (isWidthInputInvalid) {
            input.value = '';
        }
    } catch(e) {
        input.value = '';
    }
}


function validateMapHeightInput(event) {
    const input = document.getElementById(event.target.id);
    try {
        const inputNumber = parseInt(input.value);
        const isHeightInputBelowMinimum = inputNumber < Configuration.editorBoardMinHeight;
        const isHeightInputAboveMaximum = inputNumber > Configuration.editorBoardMaxHeight;
        const isHeightInputInvalid = isHeightInputBelowMinimum || isHeightInputAboveMaximum;

        if (isHeightInputInvalid) {
            input.value = '';
        }
    } catch(e) {
        input.value = '';
    }
}


function inputScatterSpawnMouseEnterCallback(event) {
    const borderColor = Configuration.editorScatterSpawnSelectionPointerHighlightColorHex;
    const coordinateString = document.getElementById(event.target.id).value;
    const isCoordinateStringValid = coordinateString !== '';
    if (isCoordinateStringValid) {
        document.getElementById(coordinateString).style.borderColor = borderColor;
        document.getElementById(coordinateString).style.borderWidth = '5px';
    }
}


function inputScatterSpawnMouseLeaveCallback(event) {
    let coordinateString = document.getElementById(event.target.id).value;
    if (coordinateString !== '') {
        document.getElementById(coordinateString).style = null;
    }
}


function buttonMapDimensionChangeCallback() {
    const isMapHeightSet = document.getElementById('map_height').value !== '';
    const isMapWidthSet = document.getElementById('map_width').value !== '';
    if (isMapHeightSet && isMapWidthSet) {
        editor.setState(new EditorMapDimensionChangeState());
    }
}


function buttonScatterSelectionCallback(event) {
    editor.setState(new EditorScatterSelectionState(event.target.id));
}


function buttonSpawnSelectionCallback(event) {
    editor.setState(new EditorSpawnSelectionState(event.target.id));
}


function buttonPlayCallback() {
    editor.sendLevelJson();
    loadIndexPage();
}


// workaround to make loading of index.html on github pages possible
function loadIndexPage() {
    let url = location.href;
    location.href = url.replace(Configuration.fileNameEditor, Configuration.fileNameIndex);
}