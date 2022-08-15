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
        const editor = super.editor;
        let tileCharacter = editor.getBoardCharacterAt(callerId);
        let isTileAccessible = (Configuration.actorsInaccessibleTileCharacterList.includes(tileCharacter) === false);
        if (isTileAccessible) {
            editor.addScatterPosition(super.buttonId, callerId);
            editor.setState(new EditorDefaultState());
            document.getElementById(callerId).style = null;
        }
    }


}