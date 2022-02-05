"use strict";

import Configuration from "../Configuration.mjs";
import EditorDefaultState from "./EditorDefaultState.mjs";
import EditorElementMapper from "./EditorElementMapper.mjs";


export default class EditorSelectionState {

    
    constructor(button_id) {
        this.editor = null;
        this.position_input = null;
        this.button_id = button_id;
    }


    setEditor(editor) {
        this.editor = editor;
    }


    getEditor() {
        return this.editor;
    }


    getButtonId() {
        return this.button_id;
    }


    handleEditorContainerMouseDown(caller_id) {}


    handleEditorContainerMouseUp(caller_id) {}


    handleEditorContainerMouseLeave(caller_id) {
        this.editor.setState(new EditorDefaultState());
    }


    handleEditorTileMouseOver(caller_id) {}


    handleEditorTileMouseEnter(caller_id) {
        let ghost_character = EditorElementMapper.mapButtonIdToGhostCharacter[this.button_id];
        let tile_character = this.editor.getBoardCharacterAt(caller_id);
        let ghost_coordinates = this.editor.getGhostCoordinatesListFor(ghost_character);
        let is_tile_accessible = (Configuration.ACTORS_INACCESSIBLE_TILES.includes(tile_character) === false);
        let is_tile_selected_ghost_type = ghost_coordinates.includes(caller_id);

        if (is_tile_accessible && !is_tile_selected_ghost_type) {
            document.getElementById(caller_id).style.borderColor = 'green';
            document.getElementById(caller_id).style.borderWidth = "5px";
        }
        this.position_input.value = (is_tile_accessible) ? caller_id : "";
    }


    handleEditorTileMouseLeave(caller_id) {
        let ghost_character = EditorElementMapper.mapButtonIdToGhostCharacter[this.button_id];
        let ghost_coordinates = this.editor.getGhostCoordinatesListFor(ghost_character);
        if (ghost_coordinates.includes(caller_id) === false) {
            document.getElementById(caller_id).style = null;
        }
    }


    exit() {
        this.resetHighlightPlacedGhosts();
    }


    initializeInputReference() {
        let input_id = EditorElementMapper.mapButtonIdToInputId[this.button_id];
        this.position_input = document.getElementById(input_id);
    }


    highlightPlacedGhosts() {
        let ghost_character = EditorElementMapper.mapButtonIdToGhostCharacter[this.button_id];
        let ghost_coordinates = this.editor.getGhostCoordinatesListFor(ghost_character);
        for (let coordinate of ghost_coordinates) {
            document.getElementById(coordinate).style.borderColor = 'red';
            document.getElementById(coordinate).style.borderWidth = '5px';
        }
    }


    resetHighlightPlacedGhosts() {
        let ghost_character = EditorElementMapper.mapButtonIdToGhostCharacter[this.button_id];
        let ghost_coordinates = this.editor.getGhostCoordinatesListFor(ghost_character);
        for (let coordinate of ghost_coordinates) {
            document.getElementById(coordinate).style = null;
        }
    } 


}