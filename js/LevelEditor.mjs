"use strict";

import Configuration from "./Configuration.mjs";
import LevelEditorInternalBoard from "./LevelEditorInternalBoard.mjs";


export default class LevelEditor {


    constructor() {
        this.editor_container = null;
        this.scatter_positions_container = null;
        this.optional_spawn_positions_container = null;
        this.input_map_width = null;
        this.input_map_height = null;
        this.internal_board = new LevelEditorInternalBoard();
        this.level_scatter_positions = [];
        this.level_optional_spawn_positions = [];
        this.mapTileTypeToInternalElement = [];
        this.currently_selected_tile_type = "undefined_tile";
        this.is_mouse_pressed_inside_editor_area = false;
        this.is_ghost_blinky_scatter_spawn_control_displayed = false;
        this.is_ghost_pinky_scatter_spawn_control_displayed = false;
        this.is_ghost_clyde_scatter_spawn_control_displayed = false;
        this.is_ghost_inky_scatter_spawn_control_displayed = false;
    }


    initialize() {
        let width = this.input_map_width.value;
        let height = this.input_map_height.value;
        this.internal_board.initialize(width, height);
        this.mapTileTypeToInternalElement = {
            'wall_tile':                    Configuration.WALL_CHARACTER,
            'empty_tile':                   Configuration.EMPTY_TILE_CHARACTER,
            'point_tile':                   Configuration.POINT_CHARACTER,
            'powerup_tile':                 Configuration.POWERUP_CHARACTER,
            'ghost_door_horizontal_tile':   Configuration.GHOST_DOOR_CHARACTER,
            'ghost_door_vertical_tile':     Configuration.GHOST_DOOR_CHARACTER,
            'ghost_door_crossing_tile':     Configuration.GHOST_DOOR_CHARACTER,
            'teleporter_1_tile':            Configuration.TELEPORTER_1_CHARACTER,
            'teleporter_2_tile':            Configuration.TELEPORTER_2_CHARACTER,
            'teleporter_3_tile':            Configuration.TELEPORTER_3_CHARACTER,
            'pacman_right_tile':            Configuration.PACMAN_CHARACTER,
            'ghost_blinky_right_tile':      Configuration.GHOST_BLINKY_CHARACTER,
            'ghost_pinky_right_tile':       Configuration.GHOST_PINKY_CHARACTER,
            'ghost_inky_right_tile':        Configuration.GHOST_INKY_CHARACTER,
            'ghost_clyde_right_tile':       Configuration.GHOST_CLYDE_CHARACTER
        }
    }


    setEditorContainer(id) {
        this.editor_container = document.getElementById(id);
    }


    setScatterPositionsContainer(id) {
        this.scatter_positions_container = document.getElementById(id);
    }


    setOptionalSpawnPositionsContainer(id) {
        this.optional_spawn_positions_container = document.getElementById(id);
    }


    setReferenceInputMapWidth(id) {
        this.input_map_width = document.getElementById(id);
    }


    setReferenceInputMapHeight(id) {
        this.input_map_height = document.getElementById(id);
    }


    setCurrentlySelectedTileType(tile_type) {
        this.currently_selected_tile_type = tile_type;
    }


    setMousePressedStatus(status) {
        this.is_mouse_pressed_inside_editor_area = status;
    }


    setSpawnScatterControlDisplayStatus(internal_character, status) {
        switch(internal_character) {
            case Configuration.GHOST_BLINKY_CHARACTER:
                this.is_ghost_blinky_scatter_spawn_control_displayed = status;
                break;
            case Configuration.GHOST_PINKY_CHARACTER:
                this.is_ghost_pinky_scatter_spawn_control_displayed = status;
                break;
            case Configuration.GHOST_CLYDE_CHARACTER:
                this.is_ghost_clyde_scatter_spawn_control_displayed = status;
                break;
            case Configuration.GHOST_INKY_CHARACTER:
                this.is_ghost_inky_scatter_spawn_control_displayed = status;
                break;
        }
    }


    resetSpawnScatterControlDisplayStatus() {
        this.is_ghost_blinky_scatter_spawn_control_displayed = false;
        this.is_ghost_pinky_scatter_spawn_control_displayed = false;
        this.is_ghost_clyde_scatter_spawn_control_displayed = false;
        this.is_ghost_inky_scatter_spawn_control_displayed = false;
    }


    getInternalElementForCurrentTileType() {
        return this.mapTileTypeToInternalElement[this.currently_selected_tile_type];
    }


    handleMapDimensionChange(callback_mousedown, callback_click) {
        this.clearMap();
        this.internal_board.initializeNewMap(this.input_map_width.value, this.input_map_height.value);
        this.initializeEditingArea(callback_mousedown, callback_click);
        this.resetSpawnScatterControlDisplayStatus();
    }


    handleTileTypeSelectionCallback(id) {
        this.setCurrentlySelectedTileType(id);
        this.highlightChosenSelectorTile();
    }


    handleTileManipuationMouseoverCallback(caller_id) {
        if (this.is_mouse_pressed_inside_editor_area) {
            this.handleTileManipulationClickCallback(caller_id);
        }
    }


    handleTileManipulationClickCallback(caller_id) {
        document.getElementById(caller_id).setAttribute('class', this.currently_selected_tile_type);
        let internal_element = this.getInternalElementForCurrentTileType();
        this.internal_board.update(caller_id, internal_element);
        this.manageScatterSpawnControlVisibility();
        //this.internal_board.printInternalBoardToConsole();
    }


    manageScatterSpawnControlVisibility() {
        let ghost_type_counter = 0;
        let ghost_type_control_display_status = false;
        let ghost_type_control_ids = [];

        for (let ghost_character of Configuration.GHOST_CHARACTERS) {

            switch(ghost_character) {
                case Configuration.GHOST_BLINKY_CHARACTER:
                    ghost_type_counter = this.internal_board.getCounterGhostsBlinky();
                    ghost_type_control_display_status = this.is_ghost_blinky_scatter_spawn_control_displayed;
                    ghost_type_control_ids = ["scatter_control_ghost_blinky", "spawn_control_ghost_blinky"];
                    break;
                case Configuration.GHOST_PINKY_CHARACTER:
                    ghost_type_counter = this.internal_board.getCounterGhostsPinky();
                    ghost_type_control_display_status = this.is_ghost_pinky_scatter_spawn_control_displayed;
                    ghost_type_control_ids = ["scatter_control_ghost_pinky", "spawn_control_ghost_pinky"];
                    break;
                case Configuration.GHOST_CLYDE_CHARACTER:
                    ghost_type_counter = this.internal_board.getCounterGhostsClyde();
                    ghost_type_control_display_status = this.is_ghost_clyde_scatter_spawn_control_displayed;
                    ghost_type_control_ids = ["scatter_control_ghost_clyde", "spawn_control_ghost_clyde"];
                    break;
                case Configuration.GHOST_INKY_CHARACTER:
                    ghost_type_counter = this.internal_board.getCounterGhostsInky();
                    ghost_type_control_display_status = this.is_ghost_inky_scatter_spawn_control_displayed;
                    ghost_type_control_ids = ["scatter_control_ghost_inky", "spawn_control_ghost_inky"];
                    break;
            }
    
            if ((ghost_type_counter) > 0 && (ghost_type_control_display_status === false)) {
                for (let control_id of ghost_type_control_ids) {
                    document.getElementById(control_id).style = null;
                }
                this.setSpawnScatterControlDisplayStatus(ghost_character, true);
            }
    
            if ((ghost_type_counter === 0) && (ghost_type_control_display_status === true)) {
                for (let control_id of ghost_type_control_ids) {
                    document.getElementById(control_id).style = "display:none";
                }
                this.setSpawnScatterControlDisplayStatus(ghost_character, false);
            }

        }
    }


    handleScatterSelection() {
        window.alert("implement scatter selection");
    }


    handleSpawnSelection() {
        window.alert("implement spawn selection");
    }


    handlePlay() {
        window.alert("implement play");
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


    clearMap() {
        while (this.editor_container.firstChild) {
           this.editor_container.removeChild(this.editor_container.firstChild);
        }
    }


    initializeEditingArea(callback_mouseover, callback_click) {
        let width = this.input_map_width.value;
        let height = this.input_map_height.value;
        
        this.editor_container.style.width = `${width * 30}px`;
        this.editor_container.style.height = `${height * 30}px`;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let new_div = document.createElement('div');
                let new_id = `(${x},${y})`;
                new_div.setAttribute('id', new_id);
                new_div.setAttribute('class', 'undefined_tile');
                new_div.addEventListener('mouseover', callback_mouseover);
                new_div.addEventListener('click', callback_click)
                this.editor_container.appendChild(new_div);
            }
        }
    }


}