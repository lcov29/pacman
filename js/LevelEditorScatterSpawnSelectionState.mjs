"use strict";

import LevelEditorDefaultState from "./LevelEditorDefaultState.mjs";


export default class LevelEditorScatterSpawnSelectionState {

    
    constructor(button_id) {
        this.level_editor = null;
        this.position_input = null;
        this.button_id = button_id;
    }


    initialize(level_editor_reference) {
        this.level_editor = level_editor_reference;
        this.initializeInputReference();
        this.highlightPlacedGhosts();
    }


    handleEditorContainerMouseDown(caller_id) {}


    handleEditorContainerMouseUp(caller_id) {}


    handleEditorContainerMouseLeave(caller_id) {}


    handleEditorTileClick(caller_id) {
        this.level_editor.setState(new LevelEditorDefaultState());
        document.getElementById(caller_id).style = null;
    }


    handleEditorTileMouseOver(caller_id) {}


    handleEditorTileMouseEnter(caller_id) {
        let ghost_character = this.level_editor.getGhostCharacterFor(this.button_id);
        let ghost_coordinates = this.level_editor.getGhostCoordinatesListFor(ghost_character);
        if (ghost_coordinates.includes(caller_id) === false) {
            document.getElementById(caller_id).style.borderColor = 'green';
            document.getElementById(caller_id).style.borderWidth = "5px";
        }
        this.position_input.value = caller_id;
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