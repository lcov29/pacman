"use strict";

import Configuration from "../Configuration.mjs";
import EditorDefaultState from "./EditorDefaultState.mjs";
import EditorSelectionState from "./EditorSelectionState.mjs";


export default class EditorScatterSelectionState extends EditorSelectionState {

    
    constructor(button_id) {
        super(button_id);
    }


    initialize(editor) {
        super.setEditor(editor);
        super.getEditor().removeScatterPositionFor(super.getButtonId());
        super.initializeInputReference();
        super.highlightPlacedGhosts();
    }


    handleEditorTileClick(caller_id) {
        let editor = super.getEditor();
        let tile_character = editor.getBoardCharacterAt(caller_id);
        let is_tile_accessible = (Configuration.ACTORS_INACCESSIBLE_TILES.includes(tile_character) === false);
        if (is_tile_accessible) {
            editor.addScatterPosition(super.getButtonId(), caller_id);
            editor.setState(new EditorDefaultState());
            document.getElementById(caller_id).style = null;
        }
    }


}