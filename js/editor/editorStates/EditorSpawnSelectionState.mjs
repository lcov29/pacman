'use strict';

import EditorDefaultState from './EditorDefaultState.mjs';
import EditorSelectionState from './EditorSelectionState.mjs';


export default class EditorSpawnSelectionState extends EditorSelectionState {

    
    constructor(buttonId) {
        super(buttonId);
    }


    initialize(editor) {
        super.editor = editor;
        const ghostCharacter = super.editor.getGhostCharacterFor(super.buttonId);
        super.editor.removeSpawnPositionFor(ghostCharacter);
        super.initializeInputReference();
        super.highlightPlacedGhosts();
    }


    handleEditorTileClick(callerId) {
        if (super.isTileAccessible(callerId)) {
            super.editor.addSpawnPosition(super.buttonId, callerId);
            super.editor.setState(new EditorDefaultState());
            document.getElementById(callerId).classList.remove('scatterSpawnSelectionPointHighlight');
        }
    }


}