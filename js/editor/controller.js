'use strict';

import Editor from './Editor.mjs';
import EditorTileManipulationState from './editorStates/EditorTileManipulationState.mjs';
import Configuration from '../global/Configuration.mjs';


const editor = new Editor();
editor.initialize();



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


document.getElementById('initialLifeInput').addEventListener('blur', editor.validateLifeInput.bind(editor));


// add handler to play button
document.getElementById('playLevel').addEventListener('click', buttonPlayCallback);



// ========== Callback Functions For Event Listeners ==========


function radioButtonTileSelectionCallback(event) {
    editor.setState(new EditorTileManipulationState(event.target.id));
}


function buttonPlayCallback() {
    editor.sendLevelJson();
    loadIndexPage();
}



// ========== Helper Functions ==========


// workaround to make loading of index.html on github pages possible
function loadIndexPage() {
    const url = location.href;
    location.href = url.replace(Configuration.fileNameEditor, Configuration.fileNameIndex);
}