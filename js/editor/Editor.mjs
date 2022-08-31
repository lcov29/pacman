import Configuration from '../global/Configuration.mjs';
import EditorDefaultState from './editorStates/EditorDefaultState.mjs';
import EditorElementMapper from './EditorElementMapper.mjs';
import EditorInternalLevelRotation from './EditorInternalLevelRotation.mjs';


export default class Editor {


    #editorContainer = null;
    #inputMapWidth = null;
    #inputMapHeight = null;
    #inputInitialLifeInput = null;
    #internalLevelRotation = null;
    #internalLevel = null;
    #isGhostBlinkyScatterSpawnControlDisplayed = false;
    #isGhostPinkyScatterSpawnControlDisplayed = false;
    #isGhostClydeScatterSpawnControlDisplayed = false;
    #isGhostInkyScatterSpawnControlDisplayed = false;
    #currentState = null;


    constructor() {
        this.#editorContainer = document.getElementById('editorContainer');
        this.#currentState = new EditorDefaultState();
        this.#inputInitialLifeInput = document.getElementById('initialLifeInput');
        this.#initializeDimensionInput();
        this.#initializeInternalLevelRotation();
        EditorElementMapper.initializeMaps();
    }


    setState(state) {
        this.#currentState.exit();
        this.#currentState = state;
        this.#currentState.initialize(this);
    }


    setEditorContainerDimension(width, height) {
        const rootElement = document.querySelector(':root');
        rootElement.style.setProperty('--editorContainerWidthInTiles', width);
        rootElement.style.setProperty('--editorContainerHeightInTiles', height);
    }


    setSpawnScatterControlDisplayStatus(ghostCharacter, isDisplayed) {
        switch(ghostCharacter) {
            case Configuration.ghostBlinkyCharacter:
                this.#isGhostBlinkyScatterSpawnControlDisplayed = isDisplayed;
                break;
            case Configuration.ghostPinkyCharacter:
                this.#isGhostPinkyScatterSpawnControlDisplayed = isDisplayed;
                break;
            case Configuration.ghostInkyCharacter:
                this.#isGhostInkyScatterSpawnControlDisplayed = isDisplayed;
                break;
            case Configuration.ghostClydeCharacter:
                this.#isGhostClydeScatterSpawnControlDisplayed = isDisplayed;
                break;
        }
    }


    updateCurrentLevelIterationNumber() {
        const iterationNumber = document.getElementById('iterationNumberInput').value;
        const isInfinity = iterationNumber === 'Infinity';
        this.#internalLevel.numberOfIterations = (isInfinity) ? Infinity : parseInt(iterationNumber);

    }


    resetSpawnScatterControlDisplayStatus() {
        this.#isGhostBlinkyScatterSpawnControlDisplayed = false;
        this.#isGhostPinkyScatterSpawnControlDisplayed = false;
        this.#isGhostClydeScatterSpawnControlDisplayed = false;
        this.#isGhostInkyScatterSpawnControlDisplayed = false;
    }


    resetInternalLevel() {
        const width = this.getMapWidthInput();
        const height = this.getMapHeightInput();
        this.#internalLevel.initialize(width, height);
    }


    getBoardCharacterAt(coordinates) {
        return this.#internalLevel.getBoardCharacterAt(coordinates);
    }


    getCounterForGhostType(ghostCharacter) {
        return this.#internalLevel.getGhostCounterFor(ghostCharacter);
    }


    getGhostCoordinateListFor(ghostCharacter) {
        return this.#internalLevel.getGhostCoordinateListFor(ghostCharacter);
    }


    getScatterSpawnControlDisplayStatusForGhostType(ghostCharacter) {
        switch(ghostCharacter) {
            case Configuration.ghostBlinkyCharacter:
                return this.#isGhostBlinkyScatterSpawnControlDisplayed;
            case Configuration.ghostPinkyCharacter:
                return this.#isGhostPinkyScatterSpawnControlDisplayed;
            case Configuration.ghostInkyCharacter:
                return this.#isGhostInkyScatterSpawnControlDisplayed;
            case Configuration.ghostClydeCharacter:
                return this.#isGhostClydeScatterSpawnControlDisplayed;
        }
    }


    getMapWidthInput() {
        return this.#inputMapWidth.value;
    }


    getMapHeightInput() {
        return this.#inputMapHeight.value;
    }


    getInitialLifesInput() {
        return this.#inputInitialLifeInput.value;
    }


    getGhostCharacterListForScatterPosition(coordinateString) {
        return this.#internalLevel.getGhostCharacterListForScatterPosition(coordinateString);
    }


    getGhostCharacterListForSpawnPosition(coordinateString) {
        return this.#internalLevel.getGhostCharacterListForSpawnPosition(coordinateString);
    }


    getGhostCharacterFor(buttonId) {
        return EditorElementMapper.buttonIdToGhostCharacterMap.get(buttonId);
    }


    getInternalElement(tileType) {
        return EditorElementMapper.tileTypeToInternalElementMap.get(tileType);
    }


    isCoordinateBonusSpawnPosition(coordinateString) {
        return this.#internalLevel.isCoordinateBonusSpawnPosition(coordinateString);
    }


    updateInternalBoard(coordinateString, element) {
        const internalElement = this.getInternalElement(element);
        this.#internalLevel.update(coordinateString, internalElement);
    }


    addEditorTile(newTile) {
        this.#editorContainer.appendChild(newTile);
    }


    addScatterPosition(buttonId, coordinateString) {
        const ghostCharacter = this.getGhostCharacterFor(buttonId);
        this.#internalLevel.addScatterPosition(ghostCharacter, coordinateString);
    }


    addSpawnPosition(buttonId, coordinateString) {
        const ghostCharacter = this.getGhostCharacterFor(buttonId);
        this.#internalLevel.addOptionalSpawnPosition(ghostCharacter, coordinateString);
    }


    addBonusSpawnPosition(coordinateString) {
        this.#internalLevel.addBonusSpawnPosition(coordinateString);
    }


    removeScatterPositionFor(ghostCharacter) {
        this.#internalLevel.removeScatterPositionFor(ghostCharacter);
    }


    removeSpawnPositionFor(ghostCharacter) {
        this.#internalLevel.removeSpawnPositionFor(ghostCharacter);
    }


    removeScatterAndSpawnPosition(coordinateString) {
        this.#internalLevel.removeScatterPosition(coordinateString);
        this.#internalLevel.removeSpawnPosition(coordinateString);
    }


    removeBonusSpawnPositionAt(coordinateString) {
        this.#internalLevel.removeBonusSpawnPositionAt(coordinateString);
    }


    clearMap() {
        while (this.#editorContainer.firstChild) {
           this.#editorContainer.removeChild(this.#editorContainer.firstChild);
        }
    }


    sendLevelJson() {
        const itemName = Configuration.customLevelRotationSessionStorageName;
        const rotationJsonString = this.#getLevelRotationJSONString();
        window.sessionStorage.setItem(itemName, rotationJsonString);
    }


    // ======== Delegate callback calls to implementation in current state ===========

    handleEditorContainerMouseDown(event) {
        this.#currentState.handleEditorContainerMouseDown(event.target.id);
    }


    handleEditorContainerMouseUp(event) {
        this.#currentState.handleEditorContainerMouseUp(event.target.id);
    }


    handleEditorContainerMouseLeave(event) {
        this.#currentState.handleEditorContainerMouseLeave(event.target.id);
    }


    handleEditorTileClick(event) {
        this.#currentState.handleEditorTileClick(event.target.id);
    }


    handleEditorTileMouseOver(event) {
        this.#currentState.handleEditorTileMouseOver(event.target.id);
    }


    handleEditorTileMouseEnter(event) {
        this.#currentState.handleEditorTileMouseEnter(event.target.id);
    }


    handleEditorTileMouseLeave(event) {
        this.#currentState.handleEditorTileMouseLeave(event.target.id);
    }


    #initializeInternalLevelRotation() {
        this.#internalLevelRotation = new EditorInternalLevelRotation();
        this.#internalLevelRotation.initialize(this.getMapWidthInput(), this.getMapWidthInput());
        this.#internalLevel = this.#internalLevelRotation.getLevel();
    }


    #initializeDimensionInput() {
        this.#inputMapWidth = document.getElementById('mapWidth');
        this.#inputMapHeight = document.getElementById('mapHeight');

        this.#inputMapWidth.setAttribute('min', Configuration.editorBoardMinWidth);
        this.#inputMapWidth.setAttribute('max', Configuration.editorBoardMaxWidth);

        this.#inputMapHeight.setAttribute('min', Configuration.editorBoardMinHeight);
        this.#inputMapHeight.setAttribute('max', Configuration.editorBoardMaxHeight);

        this.#inputMapWidth.value = Configuration.editorBoardDefaultWidth;
        this.#inputMapHeight.value = Configuration.editorBoardDefaultHeight;
    }


    #getLevelRotationJSONString() {
        const initialPacmanLifes = this.#inputInitialLifeInput.value;
        const rotationJsonString = this.#internalLevelRotation.buildLevelRotationJSONString(initialPacmanLifes);
        return rotationJsonString;
    }


}