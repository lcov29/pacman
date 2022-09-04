import Configuration from '../global/Configuration.mjs';
import EditorDefaultState from './editorStates/EditorDefaultState.mjs';
import EditorElementMapper from './EditorElementMapper.mjs';
import EditorInternalLevelRotation from './EditorInternalLevelRotation.mjs';
import EditorBoardEditingArea from './editorGuiComponents/EditorBoardEditingArea.mjs';
import EditorBoardDimensionInput from './editorGuiComponents/EditorBoardDimensionInput.mjs';
import EditorLifeInput from './editorGuiComponents/EditorLifeInput.mjs';
import EditorLevelIterationInput from './editorGuiComponents/EditorLevelIterationInput.mjs';
import EditorScatterSpawnInput from './editorGuiComponents/EditorScatterSpawnInput.mjs';
import EditorLevelRotationBar from './editorGuiComponents/EditorLevelRotationBar.mjs';


export default class Editor {


    #boardEditingArea = null;
    #inputBoardDimension = null;
    #inputLife = null;
    #inputLevelIteration = null;
    #inputScatterSpawn = null;
    #levelRotationBar = null;

    #lastAssignedLevelId = 0;


    #internalLevelRotation = null;
    #internalLevel = null;
    #currentState = null;


    constructor() {
        this.#boardEditingArea = new EditorBoardEditingArea('editorContainer', this);
        this.#inputBoardDimension = new EditorBoardDimensionInput(this);
        this.#inputLife = new EditorLifeInput('initialLifeInput');
        this.#inputLevelIteration = new EditorLevelIterationInput(this);
        this.#inputScatterSpawn = new EditorScatterSpawnInput(this);
        this.#levelRotationBar = new EditorLevelRotationBar(this);



        this.#currentState = new EditorDefaultState();
        EditorElementMapper.initializeMaps();
    }


    initialize() {
        this.#inputBoardDimension.initialize();
        this.buildBoardEditingArea();
        this.#inputLife.initialize();
        this.#inputLevelIteration.initialize();
        this.#inputScatterSpawn.initialize();
        this.#levelRotationBar.initialize();

        this.#initializeInternalLevelRotation();

    }


    buildNextLevelId() {
        this.#lastAssignedLevelId++;
        return `level${this.#lastAssignedLevelId}`;
    }


    buildBoardEditingArea() {
        this.#boardEditingArea.build(this.#inputBoardDimension.width, this.#inputBoardDimension.height);
    }


    validateMapWidthInput() {
        this.#inputBoardDimension.validateMapWidthInput();
    }
    
    
    validateMapHeightInput() {
        this.#inputBoardDimension.validateMapHeightInput();
    }


    validateLifeInput() {
        this.#inputLife.validate();
    }


    updateIterationNumberForCurrentLevel() {
        const levelIterationNumber = this.#inputLevelIteration.levelIterationNumber;
        this.#levelRotationBar.setIterationNumberForSelectedLevel(levelIterationNumber);
    }


    setState(state) {
        this.#currentState.exit();
        this.#currentState = state;
        this.#currentState.initialize(this);
    }


    setSpawnScatterControlDisplayStatusFor(ghostCharacter, isDisplayed) {
        this.#inputScatterSpawn.setSpawnScatterControlDisplayStatusFor(ghostCharacter, isDisplayed);
    }


    resetSpawnScatterControlDisplayStatus() {
        this.#inputScatterSpawn.resetSpawnScatterControlDisplayStatus();
    }


    resetInternalLevel() {
        this.#internalLevel.initialize(this.#inputBoardDimension.width, this.#inputBoardDimension.height);
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


    getScatterSpawnControlDisplayStatusFor(ghostCharacter) {
        return this.#inputScatterSpawn.getScatterSpawnControlDisplayStatusFor(ghostCharacter);
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
        this.#internalLevelRotation.initialize(this.#inputBoardDimension.height, this.#inputBoardDimension.width);
        this.#internalLevel = this.#internalLevelRotation.getLevel();
    }


    #getLevelRotationJSONString() {
        const initialPacmanLifes = parseInt(this.#inputLife.life);
        const rotationJsonString = this.#internalLevelRotation.buildLevelRotationJSONString(initialPacmanLifes);
        return rotationJsonString;
    }


}