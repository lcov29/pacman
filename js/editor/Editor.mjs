import EditorLevelRotationNameInput from './editorGuiComponents/EditorLevelRotationNameInput.mjs';
import EditorInternalLevelRotation from './EditorInternalLevelRotation.mjs';
import EditorBoardDimensionInput from './editorGuiComponents/EditorBoardDimensionInput.mjs';
import EditorLevelIterationInput from './editorGuiComponents/EditorLevelIterationInput.mjs';
import EditorScatterSpawnInput from './editorGuiComponents/EditorScatterSpawnInput.mjs';
import EditorBoardEditingArea from './editorGuiComponents/EditorBoardEditingArea.mjs';
import EditorLevelRotationBar from './editorGuiComponents/EditorLevelRotationBar.mjs';
import EditorTileSelectionBar from './editorGuiComponents/EditorTileSelectionBar.mjs';
import EditorPreviewCanvas from './editorGuiComponents/EditorPreviewCanvas.mjs';
import EditorElementMapper from './EditorElementMapper.mjs';
import EditorDefaultState from './editorStates/EditorDefaultState.mjs';
import EditorSaveButton from './editorGuiComponents/EditorSaveButton.mjs';
import EditorLifeInput from './editorGuiComponents/EditorLifeInput.mjs';
import IndexedDatabase from '../database/IndexedDatabase.mjs';
import Configuration from '../global/Configuration.mjs';
import Utility from '../global/Utility.mjs';



export default class Editor {


    #tileSelectionBar = null;
    #boardEditingArea = null;
    #inputLife = null;
    #inputLevelRotationName = null;
    #inputBoardDimension = null;
    #inputLevelIteration = null;
    #inputScatterSpawn = null;
    #levelRotationBar = null;
    #saveButton = null;
    #internalLevelRotation = null;
    #previewCanvas = null;
    #currentState = null;
    #indexedDatabase = null;
    #internalLevel = null;
    #lastAssignedLevelId = 0;


    constructor() {
        this.#tileSelectionBar = new EditorTileSelectionBar(this);
        this.#boardEditingArea = new EditorBoardEditingArea(this);
        this.#inputLife = new EditorLifeInput(this);
        this.#inputLevelRotationName = new EditorLevelRotationNameInput(this);
        this.#inputBoardDimension = new EditorBoardDimensionInput(this);
        this.#inputLevelIteration = new EditorLevelIterationInput(this);
        this.#inputScatterSpawn = new EditorScatterSpawnInput(this);
        this.#levelRotationBar = new EditorLevelRotationBar(this);
        this.#saveButton = new EditorSaveButton(this);
        this.#internalLevelRotation = new EditorInternalLevelRotation();
        this.#previewCanvas = new EditorPreviewCanvas();
        this.#currentState = new EditorDefaultState(this);
        this.#indexedDatabase = new IndexedDatabase();
    }


    async initialize() {
        EditorElementMapper.initialize();
        this.#tileSelectionBar.initialize();
        this.#boardEditingArea.initialize();
        this.#inputLife.initialize();
        this.#inputLevelRotationName.initialize();
        this.#inputBoardDimension.initialize();
        this.#inputLevelIteration.initialize();
        this.#inputScatterSpawn.initialize();
        this.#levelRotationBar.initialize();
        this.#saveButton.initialize();
        this.#internalLevelRotation.initialize();
        await this.#indexedDatabase.openConnection();
        this.handleAddNewLevel();
    }


    getGhostCoordinateListFor(ghostCharacter) {
        return this.#internalLevel.getGhostCoordinateListFor(ghostCharacter);
    }


    getScatterPositionFor(ghostCharacter) {
        return this.#internalLevel.getScatterPositionFor(ghostCharacter);
    }


    getSpawnPositionFor(ghostCharacter) {
        return this.#internalLevel.getSpawnPositionFor(ghostCharacter);
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


    isGhostTypeOnBoard(ghostCharacter) {
        return this.#internalLevel.getGhostCounterFor(ghostCharacter) > 0;
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


    updateLevelRotationName(name) {
        this.#internalLevelRotation.name = name;
    }


    updateInternalBoard(coordinateString) {
        const internalCharacter = this.#tileSelectionBar.selectedElement;
        this.#internalLevel.update(coordinateString, internalCharacter);
    }


    updateBonusSpawnList(coordinateString) {
        const tileId = this.#tileSelectionBar.selectedElementId;
        this.#internalLevel.updateBonusSpawnList(tileId, coordinateString);
    }


    updateLevelPreview(coordinateString) {
        const internalCharacter = this.#tileSelectionBar.selectedElement;
        const isBonusSpawnPosition = this.#internalLevel.isCoordinateBonusSpawnPosition(coordinateString);
        this.#previewCanvas.draw(coordinateString, internalCharacter, isBonusSpawnPosition);

        const levelId = this.#internalLevel.id;
        const previewDataUrl = this.#previewCanvas.getDataURL();
        this.#levelRotationBar.setPreview(levelId, previewDataUrl);
    }


    updateScatterSpawnPositions() {
        this.#inputScatterSpawn.updateScatterSpawnPositions();
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


    manageScatterSpawnControlVisibility() {
        const scatterControlClassList = document.getElementById('scatterPositionFieldset').classList;
        const spawnControlClassList = document.getElementById('spawnPositionFieldset').classList;
        const cssClassInvisible = 'invisible';

        if (this.#hasGhostsOnBoard()) {
            scatterControlClassList.remove(cssClassInvisible);
            spawnControlClassList.remove(cssClassInvisible);
        } else {
            scatterControlClassList.add(cssClassInvisible);
            spawnControlClassList.add(cssClassInvisible);
        }
    }


    removeScatterSpawnOfDeletedGhostTypes() {
        this.#internalLevel.removeScatterSpawnOfDeletedGhostTypes();
    }


    removeInternalLevel(levelId) {
        this.#internalLevelRotation.removeLevel(levelId);
        this.#internalLevel = this.#internalLevelRotation.getLevel();
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
        this.#internalLevel = this.#internalLevelRotation.getLevel();
        this.#previewCanvas.drawLevel(this.#internalLevel.board, this.#internalLevel.bonusSpawnPositionList);
        this.#levelRotationBar.setPreview(this.#internalLevel.id, this.#previewCanvas.getDataURL());
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
        this.#previewCanvas.drawLevel(this.#internalLevel.board, this.#internalLevel.bonusSpawnPositionList);
    }


    handleLevelSwitch(levelId) {
        this.#internalLevelRotation.loadLevel(levelId);
        this.#internalLevel = this.#internalLevelRotation.getLevel();
        this.#inputBoardDimension.setDimension(this.#internalLevel.width, this.#internalLevel.height);
        this.#inputLevelIteration.levelIterationNumber = this.#internalLevel.numberOfIterations;
        this.#inputScatterSpawn.loadScatterSpawnPositions();
        this.#boardEditingArea.loadBoard(this.#internalLevel.board, this.#internalLevel.bonusSpawnPositionList);
        this.#previewCanvas.drawLevel(this.#internalLevel.board, this.#internalLevel.bonusSpawnPositionList);
        this.#levelRotationBar.setPreview(this.#internalLevel.id, this.#previewCanvas.getDataURL());
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


    async handleButtonSaveClick() {
        const validationResult = this.#internalLevelRotation.validate();

        if (validationResult) {
            document.getElementById(validationResult.levelId).click();
            window.alert(validationResult.errorMessage);
        } else {
            await this.#storeLevelJsonInDatabase();
            this.#sendLevelJson();
            Utility.loadPage(Configuration.fileNameEditor, Configuration.fileNameIndex);
        }
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


    #hasGhostsOnBoard() {
        for (const ghostCharacter of Configuration.ghostCharacterList) {
            const isOnBoard = this.isGhostTypeOnBoard(ghostCharacter);
            if (isOnBoard) {
                return true;
            }
        }
        return false;
    }


    async #storeLevelJsonInDatabase() {
        const levelRotation = JSON.parse(this.#getLevelRotationJSONString());
        await this.#indexedDatabase.storeLevelRotation(levelRotation);
    }


    #sendLevelJson() {
        const itemName = Configuration.customLevelRotationSessionStorageName;
        const rotationJsonString = this.#getLevelRotationJSONString();
        window.sessionStorage.setItem(itemName, rotationJsonString);
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