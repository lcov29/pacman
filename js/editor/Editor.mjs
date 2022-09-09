import EditorInternalLevelRotation from './EditorInternalLevelRotation.mjs';
import EditorBoardDimensionInput from './editorGuiComponents/EditorBoardDimensionInput.mjs';
import EditorLevelIterationInput from './editorGuiComponents/EditorLevelIterationInput.mjs';
import EditorScatterSpawnInput from './editorGuiComponents/EditorScatterSpawnInput.mjs';
import EditorBoardEditingArea from './editorGuiComponents/EditorBoardEditingArea.mjs';
import EditorLevelRotationBar from './editorGuiComponents/EditorLevelRotationBar.mjs';
import EditorTileSelectionBar from './editorGuiComponents/EditorTileSelectionBar.mjs';
import EditorElementMapper from './EditorElementMapper.mjs';
import EditorDefaultState from './editorStates/EditorDefaultState.mjs';
import EditorSaveButton from './editorGuiComponents/EditorSaveButton.mjs';
import EditorLifeInput from './editorGuiComponents/EditorLifeInput.mjs';
import Configuration from '../global/Configuration.mjs';


export default class Editor {


    #tileSelectionBar = null;
    #boardEditingArea = null;
    #inputBoardDimension = null;
    #inputLife = null;
    #inputLevelIteration = null;
    #inputScatterSpawn = null;
    #levelRotationBar = null;
    #saveButton = null;
    #internalLevelRotation = null;
    #currentState = null;
    #internalLevel = null;
    #lastAssignedLevelId = 0;


    constructor() {
        this.#tileSelectionBar = new EditorTileSelectionBar(this);
        this.#boardEditingArea = new EditorBoardEditingArea(this);
        this.#inputBoardDimension = new EditorBoardDimensionInput(this);
        this.#inputLife = new EditorLifeInput(this);
        this.#inputLevelIteration = new EditorLevelIterationInput(this);
        this.#inputScatterSpawn = new EditorScatterSpawnInput(this);
        this.#levelRotationBar = new EditorLevelRotationBar(this);
        this.#saveButton = new EditorSaveButton(this);
        this.#internalLevelRotation = new EditorInternalLevelRotation();
        this.#currentState = new EditorDefaultState(this);
    }


    initialize() {
        EditorElementMapper.initialize();
        this.#tileSelectionBar.initialize();
        this.#boardEditingArea.initialize();
        this.#inputBoardDimension.initialize();
        this.#inputLife.initialize();
        this.#inputLevelIteration.initialize();
        this.#inputScatterSpawn.initialize();
        this.#levelRotationBar.initialize();
        this.#saveButton.initialize();
        this.#internalLevelRotation.initialize();
        this.handleAddNewLevel();
    }


    getGhostCoordinateListFor(ghostCharacter) {
        return this.#internalLevel.getGhostCoordinateListFor(ghostCharacter);
    }


    setState(state) {
        this.#currentState.exit();
        this.#currentState = state;
        this.#currentState.initialize(this);
    }


    setBoardEditorTileToSelectedTile(callerId) {
        const tileType = this.#tileSelectionBar.selectedElementId;
        this.#boardEditingArea.setBoardTileTo(callerId, tileType);
    }


    isTileAccessible(coordinateString) {
        return this.#internalLevel.isTileAccessible(coordinateString);
    }


    addScatterPosition(buttonId, coordinateString) {
        const ghostCharacter = EditorElementMapper.buttonIdToGhostCharacterMap.get(buttonId);
        this.#internalLevel.addScatterPosition(ghostCharacter, coordinateString);
    }


    addSpawnPosition(buttonId, coordinateString) {
        const ghostCharacter = EditorElementMapper.buttonIdToGhostCharacterMap.get(buttonId);
        this.#internalLevel.addOptionalSpawnPosition(ghostCharacter, coordinateString);
    }

    
    removeScatterPositionFor(ghostCharacter) {
        this.#internalLevel.removeScatterPositionFor(ghostCharacter);
    }


    removeSpawnPositionFor(ghostCharacter) {
        this.#internalLevel.removeSpawnPositionFor(ghostCharacter);
    }


    updateInternalBoard(coordinateString) {
        const internalCharacter = this.#tileSelectionBar.selectedElement;
        this.#internalLevel.update(coordinateString, internalCharacter);
    }


    updateBonusSpawnList(coordinateString) {
        const tileId = this.#tileSelectionBar.selectedElementId;
        this.#internalLevel.updateBonusSpawnList(tileId, coordinateString);
    }


    highlightChosenSelectorTile() {
        this.#tileSelectionBar.highlightChosenTile();
    }


    resetHighlightingOfChosenSelectorTile() {
        this.#tileSelectionBar.resetHighlightingOfChosenTile();
    }


    highlightPlacedGhostsOfType(ghostCharacter) {
        this.#toggleHighlightOfPlacedGhostsOfType(ghostCharacter);
    }


    resetHighlightOfPlacedGhostsOfType(ghostCharacter) {
        this.#toggleHighlightOfPlacedGhostsOfType(ghostCharacter, true);
    }


    isGhostTypeOnBoard(ghostCharacter) {
        return this.#internalLevel.getGhostCounterFor(ghostCharacter) > 0;
    }


    getScatterPositionFor(ghostCharacter) {
        return this.#internalLevel.getScatterPositionFor(ghostCharacter);
    }


    getSpawnPositionFor(ghostCharacter) {
        return this.#internalLevel.getSpawnPositionFor(ghostCharacter);
    }


    updateScatterSpawnPositions() {
        this.#inputScatterSpawn.updateScatterSpawnPositions();
    }


    manageOverwriteOfSpawnScatterWithInaccessibleElement(callerId) {
        const tileCharacter = this.#tileSelectionBar.selectedElement;
        const isTileInaccessible = Configuration.actorsInaccessibleTileCharacterList.includes(tileCharacter);

        const ghostCharacterListScatter = this.#internalLevel.getGhostCharacterListForScatterPosition(callerId);
        const ghostCharacterListSpawn = this.#internalLevel.getGhostCharacterListForSpawnPosition(callerId);
        const isTileScatterOrSpawn = (ghostCharacterListScatter.length > 0) || (ghostCharacterListSpawn.length > 0);
        
        if (isTileInaccessible && isTileScatterOrSpawn) {
            this.#internalLevel.removeScatterPositionAt(callerId);
            this.#internalLevel.removeSpawnPositionAt(callerId);
            this.#inputScatterSpawn.clearScatterInputFor(ghostCharacterListScatter);
            this.#inputScatterSpawn.clearSpawnInputFor(ghostCharacterListSpawn);
        }
    }


    removeScatterSpawnOfDeletedGhostTypes() {
        this.#internalLevel.removeScatterSpawnOfDeletedGhostTypes();
    }


    buildNextLevelId() {
        this.#lastAssignedLevelId++;
        return `level${this.#lastAssignedLevelId}`;
    }


    handleBoardDimensionChange() {
        this.#inputLevelIteration.reset();
        this.#inputScatterSpawn.reset();
        this.handleLevelIterationNumberChange();
        this.#buildBoardEditingArea();
        this.#resetInternalLevel();
    }


    handleAddNewLevel() {
        const levelId = this.buildNextLevelId();
        this.#internalLevelRotation.addLevel(levelId);
        this.#levelRotationBar.addNewLevelElement(levelId);
        this.#inputBoardDimension.reset();
        this.#inputLevelIteration.reset();
        this.#inputScatterSpawn.reset();
        this.#buildBoardEditingArea();
        this.#internalLevel = this.#internalLevelRotation.getLevel();
    }


    handleLevelSwitch(levelId) {
        this.#internalLevelRotation.loadLevel(levelId);
        this.#internalLevel = this.#internalLevelRotation.getLevel();
        this.#inputBoardDimension.setDimension(this.#internalLevel.width, this.#internalLevel.height);
        this.#inputLevelIteration.levelIterationNumber = this.#internalLevel.numberOfIterations;
        this.#inputScatterSpawn.loadScatterSpawnPositions();
        this.#boardEditingArea.loadBoard(this.#internalLevel.board);
    }


    handleLifeInputChange() {
        const lifeNumber = parseInt(this.#inputLife.life);
        this.#internalLevelRotation.initialLifeNumber = lifeNumber;
    }


    handleLevelIterationNumberChange() {
        const levelIterationNumber = this.#inputLevelIteration.levelIterationNumber;
        this.#levelRotationBar.setIterationNumberForSelectedLevel(levelIterationNumber);
        this.#internalLevelRotation.setCurrentLevelIterationNumber(levelIterationNumber);
    }


    handleButtonSaveClick() {
        this.#sendLevelJson();
        this.#loadIndexPage();
    }


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


    #getLevelRotationJSONString() {
        const rotationJsonString = this.#internalLevelRotation.buildLevelRotationJSONString();
        return rotationJsonString;
    }


    #resetInternalLevel() {
        this.#internalLevel.initialize(this.#inputBoardDimension.width, this.#inputBoardDimension.height);
    }


    #sendLevelJson() {
        const itemName = Configuration.customLevelRotationSessionStorageName;
        const rotationJsonString = this.#getLevelRotationJSONString();
        window.sessionStorage.setItem(itemName, rotationJsonString);
    }


    #loadIndexPage() {
        // workaround for loading of index.html on github pages
        const url = location.href;
        location.href = url.replace(Configuration.fileNameEditor, Configuration.fileNameIndex);
    }


    #buildBoardEditingArea() {
        const width = this.#inputBoardDimension.width;
        const height = this.#inputBoardDimension.height;
        this.#boardEditingArea.build(width, height);
    }


    #toggleHighlightOfPlacedGhostsOfType(ghostCharacter, resetHighlight = false) {
        const ghostCoordinateList = this.#internalLevel.getGhostCoordinateListFor(ghostCharacter);
        const ghostHighlightClass = EditorElementMapper.ghostCharacterToCSSHighlightClassMap.get(ghostCharacter);

        for (const coordinate of ghostCoordinateList) {
            const tileElementClassList = document.getElementById(coordinate).classList;

            if (resetHighlight) {
                tileElementClassList.remove(ghostHighlightClass);
            } else {
                tileElementClassList.add(ghostHighlightClass);
            }
        }
    }
    

}