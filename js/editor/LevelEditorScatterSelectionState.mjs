"use strict";

import Configuration from "../Configuration.mjs";
import LevelEditorDefaultState from "./LevelEditorDefaultState.mjs";
import LevelEditorSelectionState from "./LevelEditorSelectionState.mjs";


export default class LevelEditorScatterSelectionState extends LevelEditorSelectionState {

    
    constructor(button_id) {
        super(button_id);
    }


    initialize(level_editor_reference) {
        super.setLevelEditor(level_editor_reference);
        super.getLevelEditor().removeScatterPosition(super.getButtonId());
        super.initializeInputReference();
        super.highlightPlacedGhosts();
    }


    handleEditorTileClick(caller_id) {
        let level_editor = super.getLevelEditor();
        let tile_character = level_editor.getBoardCharacterAt(caller_id);
        let is_tile_accessible = (Configuration.ACTORS_INACCESSIBLE_TILES.includes(tile_character) === false);
        if (is_tile_accessible) {
            level_editor.addScatterPosition(super.getButtonId(), caller_id);
            level_editor.setState(new LevelEditorDefaultState());
            document.getElementById(caller_id).style = null;
        }
    }


}