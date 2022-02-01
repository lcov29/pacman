"use strict";

import Configuration from "./Configuration.mjs";
import LevelEditorInternalBoard from "./LevelEditorInternalBoard.mjs";
import LevelEditorDefaultState from "./LevelEditorDefaultState.mjs";


export default class LevelEditor {


    constructor() {
        this.editor_container = null;
        this.internal_board = new LevelEditorInternalBoard();
        this.mapTileTypeToInternalElement = [];
        this.mapButtonIdToInputId = [];
        this.mapButtonIdToGhostCharacter = [];
        this.mapInternalElementToScatterSpawnControlIds = [];
        this.is_ghost_blinky_scatter_spawn_control_displayed = false;
        this.is_ghost_pinky_scatter_spawn_control_displayed = false;
        this.is_ghost_clyde_scatter_spawn_control_displayed = false;
        this.is_ghost_inky_scatter_spawn_control_displayed = false;
        this.current_state = null;
    }


    initialize() {
        let width = this.input_map_width.value;
        let height = this.input_map_height.value;
        this.internal_board.initialize(width, height);
        this.current_state = new LevelEditorDefaultState();

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
            'pacman_tile':                  Configuration.PACMAN_CHARACTER,
            'ghost_blinky_tile':            Configuration.GHOST_BLINKY_CHARACTER,
            'ghost_pinky_tile':             Configuration.GHOST_PINKY_CHARACTER,
            'ghost_inky_tile':              Configuration.GHOST_INKY_CHARACTER,
            'ghost_clyde_tile':             Configuration.GHOST_CLYDE_CHARACTER
        };
        this.mapButtonIdToInputId = {
            'select_scatter_position_ghost_blinky':     'scatter_position_ghost_blinky',
            'select_scatter_position_ghost_pinky':      'scatter_position_ghost_pinky',
            'select_scatter_position_ghost_inky':       'scatter_position_ghost_inky',
            'select_scatter_position_ghost_clyde':      'scatter_position_ghost_clyde',
            'select_spawn_position_ghost_blinky':       'spawn_position_ghost_blinky',
            'select_spawn_position_ghost_pinky':        'spawn_position_ghost_pinky',
            'select_spawn_position_ghost_inky':         'spawn_position_ghost_inky',
            'select_spawn_position_ghost_clyde':        'spawn_position_ghost_clyde'
        };
        this.mapButtonIdToGhostCharacter = {
            'select_scatter_position_ghost_blinky':     Configuration.GHOST_BLINKY_CHARACTER,
            'select_scatter_position_ghost_pinky':      Configuration.GHOST_PINKY_CHARACTER,
            'select_scatter_position_ghost_inky':       Configuration.GHOST_INKY_CHARACTER,
            'select_scatter_position_ghost_clyde':      Configuration.GHOST_CLYDE_CHARACTER,
            'select_spawn_position_ghost_blinky':       Configuration.GHOST_BLINKY_CHARACTER,
            'select_spawn_position_ghost_pinky':        Configuration.GHOST_PINKY_CHARACTER,
            'select_spawn_position_ghost_inky':         Configuration.GHOST_INKY_CHARACTER,
            'select_spawn_position_ghost_clyde':        Configuration.GHOST_CLYDE_CHARACTER
        }
        this.mapInternalElementToScatterSpawnControlIds = {
            [Configuration.GHOST_BLINKY_CHARACTER]: ["scatter_control_ghost_blinky", "spawn_control_ghost_blinky"],
            [Configuration.GHOST_PINKY_CHARACTER]:  ["scatter_control_ghost_pinky", "spawn_control_ghost_pinky"],
            [Configuration.GHOST_CLYDE_CHARACTER]:  ["scatter_control_ghost_clyde", "spawn_control_ghost_clyde"],
            [Configuration.GHOST_INKY_CHARACTER]:   ["scatter_control_ghost_inky", "spawn_control_ghost_inky"]
        };
    }


    setState(state) {
        this.current_state.exit();
        this.current_state = state;
        this.current_state.initialize(this);
    }


    setEditorContainer(id) {
        this.editor_container = document.getElementById(id);
    }


    setEditorContainerDimension(width, height) {
        this.editor_container.style.width = `${width * 32}px`;
        this.editor_container.style.height = `${height * 32}px`;
    }


    setReferenceInputMapWidth(id) {
        this.input_map_width = document.getElementById(id);
    }


    setReferenceInputMapHeight(id) {
        this.input_map_height = document.getElementById(id);
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


    resetInternalLevel(width, height) {
        this.internal_board.initialize(width, height);
    }


    getScatterSpawnInputFor(button_id) {
        return this.mapButtonIdToInputId[button_id];
    }


    getCounterForGhostType(ghost_character) {
        let counter = false;
        switch(ghost_character) {
            case Configuration.GHOST_BLINKY_CHARACTER:
                counter = this.internal_board.getCounterGhostsBlinky();
                break;
            case Configuration.GHOST_PINKY_CHARACTER:
                counter = this.internal_board.getCounterGhostsPinky();;
                break;
            case Configuration.GHOST_CLYDE_CHARACTER:
                counter = this.internal_board.getCounterGhostsClyde();
                break;
            case Configuration.GHOST_INKY_CHARACTER:
                counter = this.internal_board.getCounterGhostsInky();;
                break;
        }
        return counter;
    }


    getInternalElementFor(tile_id) {
        return this.mapTileTypeToInternalElement[tile_id];
    }


    getGhostCharacterFor(button_id) {
        return this.mapButtonIdToGhostCharacter[button_id];
    }


    getGhostCoordinatesListFor(ghost_character) {
        return this.internal_board.getGhostCoordinatesListFor(ghost_character);
    }


    getScatterSpawnControlDisplayStatusForGhostType(ghost_character) {
        let status = false;
        switch(ghost_character) {
            case Configuration.GHOST_BLINKY_CHARACTER:
                status = this.is_ghost_blinky_scatter_spawn_control_displayed;
                break;
            case Configuration.GHOST_PINKY_CHARACTER:
                status = this.is_ghost_pinky_scatter_spawn_control_displayed;
                break;
            case Configuration.GHOST_CLYDE_CHARACTER:
                status = this.is_ghost_clyde_scatter_spawn_control_displayed;
                break;
            case Configuration.GHOST_INKY_CHARACTER:
                status = this.is_ghost_inky_scatter_spawn_control_displayed;
                break;
        }
        return status;
    }


    getScatterSpawnControlIDsForGhostType(ghost_character) {
        return this.mapInternalElementToScatterSpawnControlIds[ghost_character];
    }


    getMapWidthInput() {
        return this.input_map_width.value;
    }


    getMapHeightInput() {
        return this.input_map_height.value;
    }


    // ======== IMPLEMENTATION OF CALLBACK FUNCTIONS ===========
    

    handleEditorContainerMouseDown(caller_id) {
        this.current_state.handleEditorContainerMouseDown(caller_id);
    }


    handleEditorContainerMouseUp(caller_id) {
        this.current_state.handleEditorContainerMouseUp(caller_id);
    }


    handleEditorContainerMouseLeave(caller_id) {
        this.current_state.handleEditorContainerMouseLeave(caller_id);
    }


    handleEditorTileClick(caller_id) {
        this.current_state.handleEditorTileClick(caller_id);
    }


    handleEditorTileMouseOver(caller_id) {
        this.current_state.handleEditorTileMouseOver(caller_id);
    }


    handleEditorTileMouseEnter(caller_id) {
        this.current_state.handleEditorTileMouseEnter(caller_id);
    }


    handleEditorTileMouseLeave(caller_id) {
        this.current_state.handleEditorTileMouseLeave(caller_id);
    }


    updateInternalBoard(tile_coordinates, element) {
        let internal_element = this.getInternalElementFor(element);
        this.internal_board.update(tile_coordinates, internal_element);
    }


    addEditorTile(new_tile) {
        this.editor_container.appendChild(new_tile);
    }


    addScatterSpawnPosition(button_id, coordinates) {
        let ghost_character = this.getGhostCharacterFor(button_id);
        if (button_id.includes('scatter')) {
            this.internal_board.addScatterPosition(ghost_character, coordinates);
        }
        if (button_id.includes('spawn')) {
            this.internal_board.addOptionalSpawnPosition(ghost_character, coordinates);
        }
    }


    clearMap() {
        while (this.editor_container.firstChild) {
           this.editor_container.removeChild(this.editor_container.firstChild);
        }
    }


    loadLevel() {
        let levelJSONString = this.internal_board.buildLevelJSONString();
        sessionStorage.setItem("level", levelJSONString);
        location.href = "index.html";
    }


}