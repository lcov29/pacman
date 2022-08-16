'use strict';

import Configuration from '../Configuration.mjs';
import EditorDefaultState from './EditorDefaultState.mjs';
import EditorSelectionState from './EditorSelectionState.mjs';


export default class EditorScatterSelectionState extends EditorSelectionState {

    
    constructor(buttonId) {
        super(buttonId);
    }


    initialize(editor) {
        super.editor = editor;
        super.editor.removeScatterPositionFor(super.buttonId);
        super.initializeInputReference();
        super.highlightPlacedGhosts();
    }


    handleEditorTileClick(callerId) {
        if (super.isTileAccessible(callerId)) {
            super.editor.addScatterPosition(super.buttonId, callerId);
            super.editor.setState(new EditorDefaultState());
            document.getElementById(callerId).style = null;
        }
    }


}