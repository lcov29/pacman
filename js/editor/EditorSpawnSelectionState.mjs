"use strict";

import Configuration from "../Configuration.mjs";
import EditorDefaultState from "./EditorDefaultState.mjs";
import EditorSelectionState from "./EditorSelectionState.mjs";


export default class EditorSpawnSelectionState extends EditorSelectionState {

    
    constructor(buttonId) {
        super(buttonId);
    }


    initialize(editor) {
        super.setEditor(editor);
        super.getEditor().removeSpawnPositionFor(super.getButtonId());
        super.initializeInputReference();
        super.highlightPlacedGhosts();
    }


    handleEditorTileClick(callerId) {
        let editor = super.getEditor();
        let tileCharacter = editor.getBoardCharacterAt(callerId);
        let isTileAccessible = (Configuration.ACTORS_INACCESSIBLE_TILES.includes(tileCharacter) === false);
        if (isTileAccessible) {
            editor.addSpawnPosition(super.getButtonId(), callerId);
            editor.setState(new EditorDefaultState());
            document.getElementById(callerId).style = null;
        }
    }


}