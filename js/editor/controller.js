'use strict';

import Editor from './Editor.mjs';


const editor = new Editor();
editor.initialize();


// add handlers to level elements in selector bar
const radioList = document.querySelectorAll('input[name="selectors"]');
for (const radio of radioList) {
    radio.addEventListener('click', editor.handleSelectionTileClick.bind(editor));
}


// add handlers to editor container (enable drawing level elements while keeping the mouse pressed)
const editorContainer = document.getElementById('editorContainer');
editorContainer.addEventListener('mousedown', editor.handleEditorContainerMouseDown.bind(editor));
editorContainer.addEventListener('mouseup', editor.handleEditorContainerMouseUp.bind(editor));
editorContainer.addEventListener('mouseleave', editor.handleEditorContainerMouseLeave.bind(editor));