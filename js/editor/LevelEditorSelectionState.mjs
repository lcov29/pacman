"use strict";

import Configuration from "../Configuration.mjs";
import LevelEditorDefaultState from "./LevelEditorDefaultState.mjs";


export default class LevelEditorSelectionState {

    
    constructor(button_id) {
        this.level_editor = null;
        this.position_input = null;
        this.button_id = button_id;
    }


    setLevelEditor(level_editor) {
        this.level_editor = level_editor;
    }


    getLevelEditor() {
        return this.level_editor;
    }


    getButtonId() {
        return this.button_id;
    }


    handleEditorContainerMouseDown(caller_id) {}


    handleEditorContainerMouseUp(caller_id) {}


    handleEditorContainerMouseLeave(caller_id) {
        this.level_editor.setState(new LevelEditorDefaultState());
    }


    handleEditorTileMouseOver(caller_id) {}


    handleEditorTileMouseEnter(caller_id) {
        let ghost_character = this.level_editor.getGhostCharacterFor(this.button_id);
        let tile_character = this.level_editor.getBoardCharacterAt(caller_id);
        let ghost_coordinates = this.level_editor.getGhostCoordinatesListFor(ghost_character);
        let is_tile_accessible = (Configuration.ACTORS_INACCESSIBLE_TILES.includes(tile_character) === false);
        let is_tile_selected_ghost_type = ghost_coordinates.includes(caller_id);

        if (is_tile_accessible && !is_tile_selected_ghost_type) {
            document.getElementById(caller_id).style.borderColor = 'green';
            document.getElementById(caller_id).style.borderWidth = "5px";
        }
        this.position_input.value = (is_tile_accessible) ? caller_id : "";
    }


    handleEditorTileMouseLeave(caller_id) {
        let ghost_character = this.level_editor.getGhostCharacterFor(this.button_id);
        let ghost_coordinates = this.level_editor.getGhostCoordinatesListFor(ghost_character);
        if (ghost_coordinates.includes(caller_id) === false) {
            document.getElementById(caller_id).style = null;
        }
    }


    exit() {
        this.resetHighlightPlacedGhosts();
    }


    initializeInputReference() {
        let input_id = this.level_editor.getScatterSpawnInputFor(this.button_id);
        this.position_input = document.getElementById(input_id);
    }


    highlightPlacedGhosts() {
        let ghost_character = this.level_editor.getGhostCharacterFor(this.button_id);
        let ghost_coordinates = this.level_editor.getGhostCoordinatesListFor(ghost_character);
        for (let coordinate of ghost_coordinates) {
            document.getElementById(coordinate).style.borderColor = 'red';
            document.getElementById(coordinate).style.borderWidth = '5px';
        }
    }


    resetHighlightPlacedGhosts() {
        let ghost_character = this.level_editor.getGhostCharacterFor(this.button_id);
        let ghost_coordinates = this.level_editor.getGhostCoordinatesListFor(ghost_character);
        for (let coordinate of ghost_coordinates) {
            document.getElementById(coordinate).style = null;
        }
    } 


}