"use strict";

import Configuration from "../Configuration.mjs";
import EditorInternalLevel from "./EditorInternalLevel.mjs";
import EditorDefaultState from "./EditorDefaultState.mjs";
import EditorElementMapper from "./EditorElementMapper.mjs";


export default class Editor {


    constructor() {
        this.editor_container = null;
        this.input_map_width = null;
        this.input_map_height = null;
        this.internal_level = new EditorInternalLevel();
        this.is_ghost_blinky_scatter_spawn_control_displayed = false;
        this.is_ghost_pinky_scatter_spawn_control_displayed = false;
        this.is_ghost_clyde_scatter_spawn_control_displayed = false;
        this.is_ghost_inky_scatter_spawn_control_displayed = false;
        this.mapGhostCharacterToDisplayStatus = null;
        this.current_state = null;
    }


    initialize() {
        let width = Configuration.EDITOR_BOARD_DEFAULT_WIDTH;
        let height = Configuration.EDITOR_BOARD_DEFAULT_HEIGHT;
        this.internal_level.initialize(width, height);
        this.initializeDimensionInput();
        this.current_state = new EditorDefaultState();
        this.mapGhostCharacterToDisplayStatusName = {
            [Configuration.GHOST_BLINKY_CHARACTER]:     'is_ghost_blinky_scatter_spawn_control_displayed',
            [Configuration.GHOST_PINKY_CHARACTER]:      'is_ghost_pinky_scatter_spawn_control_displayed',
            [Configuration.GHOST_CLYDE_CHARACTER]:      'is_ghost_clyde_scatter_spawn_control_displayed',
            [Configuration.GHOST_INKY_CHARACTER]:       'is_ghost_inky_scatter_spawn_control_displayed'
        };
    }


    initializeDimensionInput() {
        this.input_map_height.setAttribute("min", Configuration.EDITOR_BOARD_MIN_HEIGHT);
        this.input_map_width.setAttribute("min", Configuration.EDITOR_BOARD_MIN_WIDTH);

        this.input_map_height.setAttribute("max", Configuration.EDITOR_BOARD_MAX_HEIGHT);
        this.input_map_width.setAttribute("max", Configuration.EDITOR_BOARD_MAX_WIDTH);

        this.input_map_height.value = Configuration.EDITOR_BOARD_DEFAULT_HEIGHT;
        this.input_map_width.value = Configuration.EDITOR_BOARD_DEFAULT_WIDTH;
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


    setSpawnScatterControlDisplayStatus(ghost_character, status) {
        let displayVariableName = this.mapGhostCharacterToDisplayStatusName[ghost_character];
        this[displayVariableName] = status;
    }


    resetSpawnScatterControlDisplayStatus() {
        this.is_ghost_blinky_scatter_spawn_control_displayed = false;
        this.is_ghost_pinky_scatter_spawn_control_displayed = false;
        this.is_ghost_clyde_scatter_spawn_control_displayed = false;
        this.is_ghost_inky_scatter_spawn_control_displayed = false;
    }


    resetInternalLevel(width, height) {
        this.internal_level.initialize(width, height);
    }


    getBoardCharacterAt(coordinates) {
        return this.internal_level.getBoardCharacterAt(coordinates);
    }


    getCounterForGhostType(ghost_character) {
        return this.internal_level.getGhostCounterFor(ghost_character);
    }


    getGhostCoordinatesListFor(ghost_character) {
        return this.internal_level.getGhostCoordinatesListFor(ghost_character);
    }


    getScatterSpawnControlDisplayStatusForGhostType(ghost_character) {
        let displayVariableName = this.mapGhostCharacterToDisplayStatusName[ghost_character];
        return this[displayVariableName];
    }


    getMapWidthInput() {
        return this.input_map_width.value;
    }


    getMapHeightInput() {
        return this.input_map_height.value;
    }


    getGhostCharactersForScatterPosition(coordinate_string) {
        return this.internal_level.getGhostCharactersForScatterPosition(coordinate_string);
    }


    getGhostCharactersForSpawnPosition(coordinate_string) {
        return this.internal_level.getGhostCharactersForSpawnPosition(coordinate_string);
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
        this.internal_level.update(tile_coordinates, internal_element);
    }


    addEditorTile(new_tile) {
        this.editor_container.appendChild(new_tile);
    }


    addScatterPosition(button_id, coordinates) {
        let ghost_character = EditorElementMapper.mapButtonIdToGhostCharacter[button_id];
        this.internal_level.addScatterPosition(ghost_character, coordinates);
    }


    addSpawnPosition(button_id, coordinates) {
        let ghost_character = EditorElementMapper.mapButtonIdToGhostCharacter[button_id];
        this.internal_level.addOptionalSpawnPosition(ghost_character, coordinates);
    }


    removeScatterPositionFor(button_id) {
        let ghost_character = button_id;
        if (Configuration.GHOST_CHARACTERS.includes(button_id) === false) {
            ghost_character = EditorElementMapper.mapButtonIdToGhostCharacter[button_id];
        }
        this.internal_level.removeScatterPositionFor(ghost_character);
    }


    removeSpawnPositionFor(button_id) {
        let ghost_character = button_id;
        if (Configuration.GHOST_CHARACTERS.includes(button_id) === false) {
            ghost_character = EditorElementMapper.mapButtonIdToGhostCharacter[button_id];
        }
        this.internal_level.removeSpawnPositionFor(ghost_character);
    }


    removeScatterAndSpawnPosition(coordinate_string) {
        this.internal_level.removeScatterPosition(coordinate_string);
        this.internal_level.removeSpawnPosition(coordinate_string);
    }


    clearMap() {
        while (this.editor_container.firstChild) {
           this.editor_container.removeChild(this.editor_container.firstChild);
        }
    }


    sendLevelJson() {
        let levelJSONString = this.internal_level.buildLevelJSONString();
        sessionStorage.setItem("customLevel", levelJSONString);
    }


}