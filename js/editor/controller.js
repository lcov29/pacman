'use strict';

import Editor from './Editor.mjs';
import EditorTileManipulationState from './editorStates/EditorTileManipulationState.mjs';
import EditorScatterSelectionState from './editorStates/EditorScatterSelectionState.mjs';
import EditorMapDimensionChangeState from './editorStates/EditorMapDimensionChangeState.mjs';
import EditorSpawnSelectionState from './editorStates/EditorSpawnSelectionState.mjs';
import Configuration from '../global/Configuration.mjs';


const editor = new Editor();
buttonMapDimensionChangeCallback();
                                

// add handlers to level elements in selector bar
const radioList = document.querySelectorAll('input[name="selectors"]');
for (let radio of radioList) {
    radio.addEventListener('click', radioButtonTileSelectionCallback);
}


// add handlers to editor container (enable drawing level elements while keeping the mouse button pressed)
const editorContainer = document.getElementById('editorContainer');
editorContainer.addEventListener('mousedown', editor.handleEditorContainerMouseDown.bind(editor));
editorContainer.addEventListener('mouseup', editor.handleEditorContainerMouseUp.bind(editor));
editorContainer.addEventListener('mouseleave', editor.handleEditorContainerMouseLeave.bind(editor));


// add handlers to map dimension controls
document.getElementById('mapWidth').addEventListener('blur', validateMapWidthInput);
document.getElementById('mapHeight').addEventListener('blur', validateMapHeightInput);
document.getElementById('buttonMapSizer').addEventListener('click', buttonMapDimensionChangeCallback);


// add handlers to level iteration input
document.getElementById('iterationNumberInput').addEventListener('blur', processLevelIterationInput);


// add handlers to scatter spawn control group
const scatterSpawnInputList = document.querySelectorAll('input[class="inputPosition"]');
for (let scatterSpawnInput of scatterSpawnInputList) {
    scatterSpawnInput.addEventListener('mouseenter', inputScatterSpawnMouseEnterCallback);
    scatterSpawnInput.addEventListener('mouseleave', inputScatterSpawnMouseLeaveCallback);
}


// add handlers to scatter select buttons
const scatterButtonList = document.querySelectorAll('button[name="buttonScatterPosition"]');
for (let scatterButton of scatterButtonList) {
    scatterButton.addEventListener('click', buttonScatterSelectionCallback);
}


// add handlers to spawn select buttons
const spawnButtonList = document.querySelectorAll('button[name="buttonSpawnPosition"]');
for (let spawnButton of spawnButtonList) {
    spawnButton.addEventListener('click', buttonSpawnSelectionCallback);
}


// add handler to play button
document.getElementById('playLevel').addEventListener('click', buttonPlayCallback);


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


function processLevelIterationInput(event) {
    validateLevelIterationInput(event);
    editor.updateCurrentLevelIterationNumber();
}


function validateLevelIterationInput(event) {
    const input = document.getElementById(event.target.id);
    const inputValue = input.value.toLowerCase();
    const inputNumber = parseInt(inputValue);
    const isInputValidNumber = !isNaN(inputNumber) && inputNumber > 0;
    const isInputInfinity = inputValue === 'infinity';

    if (!isInputValidNumber) {
        if (isInputInfinity) {
            input.value = "Infinity";
        } else {
            input.value = "1";
        }
    }
}


function inputScatterSpawnMouseEnterCallback(event) {
    const coordinateString = document.getElementById(event.target.id).value;
    const isCoordinateStringValid = coordinateString !== '';

    if (isCoordinateStringValid) {
       document.getElementById(coordinateString).classList.add('scatterSpawnSelectionPointHighlight');
    }
}


function inputScatterSpawnMouseLeaveCallback(event) {
    const coordinateString = document.getElementById(event.target.id).value;
    const isCoordinateStringValid = coordinateString !== '';

    if (isCoordinateStringValid) {
        document.getElementById(coordinateString).classList.remove('scatterSpawnSelectionPointHighlight');
    }
}


function buttonMapDimensionChangeCallback() {
    const isMapHeightSet = document.getElementById('mapHeight').value !== '';
    const isMapWidthSet = document.getElementById('mapWidth').value !== '';
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
    const url = location.href;
    location.href = url.replace(Configuration.fileNameEditor, Configuration.fileNameIndex);
}