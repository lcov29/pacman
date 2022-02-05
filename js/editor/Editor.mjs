"use strict";

import Configuration from "../Configuration.mjs";
import EditorInternalBoard from "./EditorInternalBoard.mjs";
import EditorDefaultState from "./EditorDefaultState.mjs";
import EditorElementMapper from "./EditorElementMapper.mjs";


export default class Editor {


    constructor() {
        this.editor_container = null;
        this.internal_board = new EditorInternalBoard();
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
        this.current_state = new EditorDefaultState();
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


    getBoardCharacterAt(coordinates) {
        return this.internal_board.getBoardCharacterAt(coordinates);
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
        let internal_element = EditorElementMapper.mapTileTypeToInternalElement[element];
        this.internal_board.update(tile_coordinates, internal_element);
    }


    addEditorTile(new_tile) {
        this.editor_container.appendChild(new_tile);
    }


    addScatterPosition(button_id, coordinates) {
        let ghost_character = EditorElementMapper.mapButtonIdToGhostCharacter[button_id];
        this.internal_board.addScatterPosition(ghost_character, coordinates);
    }


    addSpawnPosition(button_id, coordinates) {
        let ghost_character = EditorElementMapper.mapButtonIdToGhostCharacter[button_id];
        this.internal_board.addOptionalSpawnPosition(ghost_character, coordinates);
    }


    removeScatterPosition(button_id) {
        let ghost_character = button_id;
        if (Configuration.GHOST_CHARACTERS.includes(button_id) === false) {
            ghost_character = EditorElementMapper.mapButtonIdToGhostCharacter[button_id];
        }
        this.internal_board.removeScatterPositionFor(ghost_character);
    }


    removeSpawnPosition(button_id) {
        let ghost_character = button_id;
        if (Configuration.GHOST_CHARACTERS.includes(button_id) === false) {
            ghost_character = EditorElementMapper.mapButtonIdToGhostCharacter[button_id];
        }
        this.internal_board.removeSpawnPositionFor(ghost_character);
    }


    clearMap() {
        while (this.editor_container.firstChild) {
           this.editor_container.removeChild(this.editor_container.firstChild);
        }
    }


    sendLevelJson() {
        let levelJSONString = this.internal_board.buildLevelJSONString();
        sessionStorage.setItem("customLevel", levelJSONString);
    }


}