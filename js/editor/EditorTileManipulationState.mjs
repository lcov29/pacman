"use strict";

import Configuration from "../Configuration.mjs";
import EditorElementMapper from "./EditorElementMapper.mjs";


export default class EditorTileManipulationState {


    constructor(selector_tile_type) {
        this.selector_tile_type = selector_tile_type;
        this.editor = null;
        this.is_mouse_pressed_inside_editor_area = false;
    }


    initialize(editor) {
        this.editor = editor;
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
        this.editor.updateInternalBoard(caller_id, this.selector_tile_type);
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
            ghost_type_counter = this.editor.getCounterForGhostType(ghost_character);
            ghost_type_control_ids = EditorElementMapper.mapInternalElementToScatterSpawnControlIds[ghost_character];
            is_control_displayed = this.editor.getScatterSpawnControlDisplayStatusForGhostType(ghost_character);
    
            // display invisible controls
            if ((ghost_type_counter > 0) && (is_control_displayed === false)) {
                for (let control_id of ghost_type_control_ids) {
                    document.getElementById(control_id).style = null;
                }
                this.editor.setSpawnScatterControlDisplayStatus(ghost_character, true);
            }
    
            // hide visible controls
            if ((ghost_type_counter === 0) && (is_control_displayed === true)) {
                for (let control_id of ghost_type_control_ids) {
                    document.getElementById(control_id).style = "display:none";
                    let input_id = EditorElementMapper.mapScatterSpawnControlIdsToInputIds[control_id];
                    document.getElementById(input_id).value = "";
                    this.editor.removeScatterPosition(ghost_character);
                    this.editor.removeSpawnPosition(ghost_character);
                }
                this.editor.setSpawnScatterControlDisplayStatus(ghost_character, false);
            }

        }
    }

}