'use strict';

import Editor from './Editor.mjs';


const editor = new Editor();
editor.initialize();


// add handlers to level elements in selector bar
const radioList = document.querySelectorAll('input[name="selectors"]');
for (const radio of radioList) {
    radio.addEventListener('click', editor.handleSelectionTileClick.bind(editor));
}