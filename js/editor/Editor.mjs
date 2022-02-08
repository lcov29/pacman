"use strict";

import Configuration from "../Configuration.mjs";
import EditorInternalLevel from "./EditorInternalLevel.mjs";
import EditorDefaultState from "./EditorDefaultState.mjs";
import EditorElementMapper from "./EditorElementMapper.mjs";


export default class Editor {


    constructor() {
        this.editorContainer = null;
        this.inputMapWidth = null;
        this.inputMapHeight = null;
        this.internalLevel = new EditorInternalLevel();
        this.isGhostBlinkyScatterSpawnControlDisplayed = false;
        this.isGhostPinkyScatterSpawnControlDisplayed = false;
        this.isGhostClydeScatterSpawnControlDisplayed = false;
        this.isGhostInkyScatterSpawnControlDisplayed = false;
        this.mapGhostCharacterToDisplayStatus = null;
        this.currentState = null;
    }


    initialize() {
        let width = Configuration.EDITOR_BOARD_DEFAULT_WIDTH;
        let height = Configuration.EDITOR_BOARD_DEFAULT_HEIGHT;
        this.internalLevel.initialize(width, height);
        this.initializeDimensionInput();
        this.currentState = new EditorDefaultState();
        this.mapGhostCharacterToDisplayStatusName = {
            [Configuration.GHOST_BLINKY_CHARACTER]:     'isGhostBlinkyScatterSpawnControlDisplayed',
            [Configuration.GHOST_PINKY_CHARACTER]:      'isGhostPinkyScatterSpawnControlDisplayed',
            [Configuration.GHOST_CLYDE_CHARACTER]:      'isGhostClydeScatterSpawnControlDisplayed',
            [Configuration.GHOST_INKY_CHARACTER]:       'isGhostInkyScatterSpawnControlDisplayed'
        };
    }


    initializeDimensionInput() {
        this.inputMapHeight.setAttribute("min", Configuration.EDITOR_BOARD_MIN_HEIGHT);
        this.inputMapWidth.setAttribute("min", Configuration.EDITOR_BOARD_MIN_WIDTH);

        this.inputMapHeight.setAttribute("max", Configuration.EDITOR_BOARD_MAX_HEIGHT);
        this.inputMapWidth.setAttribute("max", Configuration.EDITOR_BOARD_MAX_WIDTH);

        this.inputMapHeight.value = Configuration.EDITOR_BOARD_DEFAULT_HEIGHT;
        this.inputMapWidth.value = Configuration.EDITOR_BOARD_DEFAULT_WIDTH;
    }


    setState(state) {
        this.currentState.exit();
        this.currentState = state;
        this.currentState.initialize(this);
    }


    setEditorContainer(id) {
        this.editorContainer = document.getElementById(id);
    }


    setEditorContainerDimension(width, height) {
        this.editorContainer.style.width = `${width * 32}px`;
        this.editorContainer.style.height = `${height * 32}px`;
    }


    setReferenceInputMapWidth(id) {
        this.inputMapWidth = document.getElementById(id);
    }


    setReferenceInputMapHeight(id) {
        this.inputMapHeight = document.getElementById(id);
    }


    setSpawnScatterControlDisplayStatus(ghostCharacter, status) {
        let displayVariableName = this.mapGhostCharacterToDisplayStatusName[ghostCharacter];
        this[displayVariableName] = status;
    }


    resetSpawnScatterControlDisplayStatus() {
        this.isGhostBlinkyScatterSpawnControlDisplayed = false;
        this.isGhostPinkyScatterSpawnControlDisplayed = false;
        this.isGhostClydeScatterSpawnControlDisplayed = false;
        this.isGhostInkyScatterSpawnControlDisplayed = false;
    }


    resetInternalLevel(width, height) {
        this.internalLevel.initialize(width, height);
    }


    getBoardCharacterAt(coordinates) {
        return this.internalLevel.getBoardCharacterAt(coordinates);
    }


    getCounterForGhostType(ghostCharacter) {
        return this.internalLevel.getGhostCounterFor(ghostCharacter);
    }


    getGhostCoordinatesListFor(ghostCharacter) {
        return this.internalLevel.getGhostCoordinatesListFor(ghostCharacter);
    }


    getScatterSpawnControlDisplayStatusForGhostType(ghostCharacter) {
        let displayVariableName = this.mapGhostCharacterToDisplayStatusName[ghostCharacter];
        return this[displayVariableName];
    }


    getMapWidthInput() {
        return this.inputMapWidth.value;
    }


    getMapHeightInput() {
        return this.inputMapHeight.value;
    }


    getGhostCharactersForScatterPosition(coordinateString) {
        return this.internalLevel.getGhostCharactersForScatterPosition(coordinateString);
    }


    getGhostCharactersForSpawnPosition(coordinateString) {
        return this.internalLevel.getGhostCharactersForSpawnPosition(coordinateString);
    }


    // ======== IMPLEMENTATION OF CALLBACK FUNCTIONS ===========
    

    handleEditorContainerMouseDown(callerId) {
        this.currentState.handleEditorContainerMouseDown(callerId);
    }


    handleEditorContainerMouseUp(callerId) {
        this.currentState.handleEditorContainerMouseUp(callerId);
    }


    handleEditorContainerMouseLeave(callerId) {
        this.currentState.handleEditorContainerMouseLeave(callerId);
    }


    handleEditorTileClick(callerId) {
        this.currentState.handleEditorTileClick(callerId);
    }


    handleEditorTileMouseOver(callerId) {
        this.currentState.handleEditorTileMouseOver(callerId);
    }


    handleEditorTileMouseEnter(callerId) {
        this.currentState.handleEditorTileMouseEnter(callerId);
    }


    handleEditorTileMouseLeave(callerId) {
        this.currentState.handleEditorTileMouseLeave(callerId);
    }


    updateInternalBoard(tileCoordinates, element) {
        let internalElement = EditorElementMapper.mapTileTypeToInternalElement[element];
        this.internalLevel.update(tileCoordinates, internalElement);
    }


    addEditorTile(newTile) {
        this.editorContainer.appendChild(newTile);
    }


    addScatterPosition(buttonId, coordinates) {
        let ghostCharacter = EditorElementMapper.mapButtonIdToGhostCharacter[buttonId];
        this.internalLevel.addScatterPosition(ghostCharacter, coordinates);
    }


    addSpawnPosition(buttonId, coordinates) {
        let ghostCharacter = EditorElementMapper.mapButtonIdToGhostCharacter[buttonId];
        this.internalLevel.addOptionalSpawnPosition(ghostCharacter, coordinates);
    }


    removeScatterPositionFor(buttonId) {
        let ghostCharacter = buttonId;
        if (Configuration.GHOST_CHARACTERS.includes(buttonId) === false) {
            ghostCharacter = EditorElementMapper.mapButtonIdToGhostCharacter[buttonId];
        }
        this.internalLevel.removeScatterPositionFor(ghostCharacter);
    }


    removeSpawnPositionFor(buttonId) {
        let ghostCharacter = buttonId;
        if (Configuration.GHOST_CHARACTERS.includes(buttonId) === false) {
            ghostCharacter = EditorElementMapper.mapButtonIdToGhostCharacter[buttonId];
        }
        this.internalLevel.removeSpawnPositionFor(ghostCharacter);
    }


    removeScatterAndSpawnPosition(coordinateString) {
        this.internalLevel.removeScatterPosition(coordinateString);
        this.internalLevel.removeSpawnPosition(coordinateString);
    }


    clearMap() {
        while (this.editorContainer.firstChild) {
           this.editorContainer.removeChild(this.editorContainer.firstChild);
        }
    }


    sendLevelJson() {
        let levelJSONString = this.internalLevel.buildLevelJSONString();
        sessionStorage.setItem("customLevel", levelJSONString);
    }


}