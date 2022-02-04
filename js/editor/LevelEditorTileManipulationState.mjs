"use strict";

import Configuration from "../Configuration.mjs";


export default class LevelEditorTileManipulationState {


    constructor(selector_tile_type) {
        this.selector_tile_type = selector_tile_type;
        this.level_editor = null;
        this.is_mouse_pressed_inside_editor_area = false;
    }


    initialize(level_editor_reference) {
        this.level_editor = level_editor_reference;
        this.highlightChosenSelectorTile();
    }


    handleEditorContainerMouseDown(caller_id) {
        this.is_mouse_pressed_inside_editor_area = true;
    }


    handleEditorContainerMouseUp(caller_id) {
        this.is_mouse_pressed_inside_editor_area = false;
    }


    handleEditorContainerMouseLeave(caller_id) {
        this.is_mouse_pressed_inside_editor_area = false;
    }


    handleEditorTileClick(caller_id) {
        let styleclass = `editor_tile ${this.selector_tile_type}`;
        document.getElementById(caller_id).setAttribute('class', styleclass);
        this.level_editor.updateInternalBoard(caller_id, this.selector_tile_type);
        this.manageScatterSpawnControlVisibility();
    }


    handleEditorTileMouseOver(caller_id) {
        if (this.is_mouse_pressed_inside_editor_area) {
            this.handleEditorTileClick(caller_id);
        }
    }


    handleEditorTileMouseEnter(caller_id) {}


    handleEditorTileMouseLeave(caller_id) {}


    exit() {
        this.resetHighlighOfChosenSelectorTile();
    }


    highlightChosenSelectorTile() {
        let radios = document.querySelectorAll('input[name="selectors"]');
        let selected_radio_id = document.querySelector('input[name="selectors"]:checked').id;
        for (let radio of radios) {
            let radio_label = document.querySelector(`label[for="${radio.id}"]`);
            if (selected_radio_id === radio.id) {
                radio_label.style.borderColor = 'red';
            } else {
                radio_label.setAttribute('style', '');
            }
        }
    }


    resetHighlighOfChosenSelectorTile() {
        let selected_radio_id = document.querySelector('input[name="selectors"]:checked').id;
        let selected_radio_label = document.querySelector(`label[for="${selected_radio_id}"]`);
        selected_radio_label.setAttribute('style', '');
    }


    manageScatterSpawnControlVisibility() {
        let ghost_type_counter = 0;
        let is_control_displayed = false;
        let ghost_type_control_ids = [];

        for (let ghost_character of Configuration.GHOST_CHARACTERS) {
            ghost_type_counter = this.level_editor.getCounterForGhostType(ghost_character);
            ghost_type_control_ids = this.level_editor.getScatterSpawnControlIDsForGhostType(ghost_character);
            is_control_displayed = this.level_editor.getScatterSpawnControlDisplayStatusForGhostType(ghost_character);
    
            // display invisible controls
            if ((ghost_type_counter > 0) && (is_control_displayed === false)) {
                for (let control_id of ghost_type_control_ids) {
                    document.getElementById(control_id).style = null;
                }
                this.level_editor.setSpawnScatterControlDisplayStatus(ghost_character, true);
            }
    
            // hide visible controls
            if ((ghost_type_counter === 0) && (is_control_displayed === true)) {
                for (let control_id of ghost_type_control_ids) {
                    document.getElementById(control_id).style = "display:none";
                    let input_id = this.level_editor.getScatterSpawnInputIdForControlId(control_id);
                    document.getElementById(input_id).value = "";
                    this.level_editor.removeScatterPosition(ghost_character);
                    this.level_editor.removeSpawnPosition(ghost_character);
                }
                this.level_editor.setSpawnScatterControlDisplayStatus(ghost_character, false);
            }

        }
    }

}