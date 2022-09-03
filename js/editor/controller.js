'use strict';

import Editor from './Editor.mjs';
import EditorTileManipulationState from './editorStates/EditorTileManipulationState.mjs';
import EditorScatterSelectionState from './editorStates/EditorScatterSelectionState.mjs';
import EditorMapDimensionChangeState from './editorStates/EditorMapDimensionChangeState.mjs';
import EditorSpawnSelectionState from './editorStates/EditorSpawnSelectionState.mjs';
import Configuration from '../global/Configuration.mjs';


const editor = new Editor();
buttonMapDimensionChangeCallback();



// ========== Add Event Listeners ==========


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


document.getElementById('initialLifeInput').addEventListener('blur', validateInitialLifeInput);
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



// ========== Callback Functions For Event Listeners ==========


function radioButtonTileSelectionCallback(event) {
    editor.setState(new EditorTileManipulationState(event.target.id));
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


function validateInitialLifeInput(event) {
    const input = document.getElementById(event.target.id);
    const inputNumber = parseInt(input.value);
    const isInputValidNumber = !isNaN(inputNumber) && inputNumber > 0;

    if (!isInputValidNumber) {
        input.value = 1;
    } else {
        input.value = inputNumber;
    }
}


function processLevelIterationInput(event) {
    validateLevelIterationInput(event);
    editor.updateCurrentLevelIterationNumber();
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
        } else {
            input.value = inputNumber;
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
        } else {
            input.value = inputNumber;
        }
    } catch(e) {
        input.value = '';
    }
}


// ========== Helper Functions ==========


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
    } else {
        input.value = inputNumber;
    }
}


// workaround to make loading of index.html on github pages possible
function loadIndexPage() {
    const url = location.href;
    location.href = url.replace(Configuration.fileNameEditor, Configuration.fileNameIndex);
}



// ========== Level Rotation Bar ==========

let nextUnusedLevelNumber = 1;

addLevelCallback();


const addButton = document.getElementById('levelAddButton');
addButton.addEventListener('click', addLevelCallback);


function addLevelCallback() {
    const newLevelNode = buildNewLevelNode();
    addDeleteButtonEventListener(newLevelNode);
    addLevelSelectEventListener(newLevelNode);
    insertLevelInRotation(newLevelNode);
    highlightNewLevel();
    setIterationNumberForSelectedLevel();
}


function buildNewLevelNode() {
    const deepCopy = true;
    const newLevelNode = document.getElementById('levelElementTemplate').cloneNode(deepCopy);
    newLevelNode.setAttribute('id', `level${nextUnusedLevelNumber}`);
    nextUnusedLevelNumber++;
    return newLevelNode;
}


function addDeleteButtonEventListener(levelElement) {
    const deleteButton = levelElement.children[1];
    deleteButton.addEventListener('click', handleLevelDeletion);
}


function addLevelSelectEventListener(levelElement) {
    levelElement.addEventListener('click', highlightSelectedLevel);
}


function insertLevelInRotation(levelElement) {
    const levelRotation = document.getElementById('rotationContainer');
    levelRotation.appendChild(levelElement);
}


function highlightNewLevel() {
    const levelRotation = document.getElementById('rotationContainer');
    const classNameSelectedLevel = 'levelSelected';

    for(const levelElement of levelRotation.children) {
        if (levelElement.nextElementSibling) {
            levelElement.classList.remove(classNameSelectedLevel);
        } else {
            levelElement.classList.add(classNameSelectedLevel);
        }
    }
}


function setIterationNumberForSelectedLevel() {
    const selectedLevel = document.getElementsByClassName('levelSelected')[0];
    const iterationDiv = selectedLevel.children[0];
    const iterationNumber = document.getElementById('iterationNumberInput').value;
    const isInfiniteIteration = iterationNumber === 'Infinity';
    const classInfiniteSymbol = 'displayInfiniteSymbol';

    if (isInfiniteIteration) {
        iterationDiv.classList.add(classInfiniteSymbol);
        iterationDiv.innerText = '';
    } else {
        iterationDiv.classList.remove(classInfiniteSymbol);
        iterationDiv.innerText = `${iterationNumber}x`;
    }
}


function handleLevelDeletion(event) {
    const isDeletionConfirmed = window.confirm('Delete this level?');
    if (isDeletionConfirmed) {
        removeLevelNode(event);
        selectFirstLevelInRotation();
        event.stopPropagation();
    }
}


function highlightSelectedLevel(event) {
    const levelRotation = document.getElementById('rotationContainer');
    const selectedLevelElement = event.target;

    for (const levelElement of levelRotation.children) {
        const isSelectedLevelElement = levelElement === selectedLevelElement;
        const classNameSelectedLevel = 'levelSelected';

        if (isSelectedLevelElement) {
            levelElement.classList.add(classNameSelectedLevel);
        } else {
            levelElement.classList.remove(classNameSelectedLevel);
        }
    }
}


function removeLevelNode(event) {
    const deleteButton = event.currentTarget;
    const levelElement = deleteButton.parentElement;
    levelElement.remove();
}


function selectFirstLevelInRotation() {
    const levelRotation = document.getElementById('rotationContainer');
    const isLevelRotationEmpty = levelRotation.children.length === 0;

    if (isLevelRotationEmpty) {
        addLevel();
    }
    levelRotation.children[0].click();
}