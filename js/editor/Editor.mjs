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
import EditorTileManipulationState from './editorStates/EditorTileManipulationState.mjs';
import EditorSaveButton from './editorGuiComponents/EditorSaveButton.mjs';
import EditorTileSelectionBar from './editorGuiComponents/EditorTileSelectionBar.mjs';


export default class Editor {

    #tileSelectionBar = null;
    #boardEditingArea = null;
    #inputBoardDimension = null;
    #inputLife = null;
    #inputLevelIteration = null;
    #inputScatterSpawn = null;
    #levelRotationBar = null;
    #saveButton = null;

    #lastAssignedLevelId = 0;


    #internalLevelRotation = null;
    #internalLevel = null;
    #currentState = null;


    constructor() {
        this.#tileSelectionBar = new EditorTileSelectionBar(this);
        this.#boardEditingArea = new EditorBoardEditingArea(this);
        this.#inputBoardDimension = new EditorBoardDimensionInput(this);
        this.#inputLife = new EditorLifeInput(this);
        this.#inputLevelIteration = new EditorLevelIterationInput(this);
        this.#inputScatterSpawn = new EditorScatterSpawnInput(this);
        this.#levelRotationBar = new EditorLevelRotationBar(this);
        this.#saveButton = new EditorSaveButton(this);



        this.#currentState = new EditorDefaultState(this);
        EditorElementMapper.initializeMaps();
    }


    initialize() {
        this.#tileSelectionBar.initialize();
        this.#boardEditingArea.initialize();
        this.#inputBoardDimension.initialize();
        this.#inputLife.initialize();
        this.#inputLevelIteration.initialize();
        this.#inputScatterSpawn.initialize();
        this.#levelRotationBar.initialize();
        this.#saveButton.initialize();

        this.#initializeInternalLevelRotation();
    }


    handleBoardDimensionChange() {
        this.#inputScatterSpawn.reset();
        this.#buildBoardEditingArea();
        this.#resetInternalLevel();
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


    #initializeInternalLevelRotation() {
        this.#internalLevelRotation = new EditorInternalLevelRotation();
        this.#internalLevelRotation.initialize(this.#inputBoardDimension.height, this.#inputBoardDimension.width);
        this.#internalLevel = this.#internalLevelRotation.getLevel();
    }


    #getLevelRotationJSONString() {
        const rotationJsonString = this.#internalLevelRotation.buildLevelRotationJSONString();
        return rotationJsonString;
    }


    buildNextLevelId() {
        this.#lastAssignedLevelId++;
        return `level${this.#lastAssignedLevelId}`;
    }


    setState(state) {
        this.#currentState.exit();
        this.#currentState = state;
        this.#currentState.initialize(this);
    }


    updateInternalBoard(coordinateString) {
        const internalCharacter = this.#tileSelectionBar.selectedElement;
        this.#internalLevel.update(coordinateString, internalCharacter);
    }


    setBoardEditorTileToSelectedTile(callerId) {
        const tileType = this.#tileSelectionBar.selectedElementId;
        this.#boardEditingArea.setBoardTileTo(callerId, tileType);
    };


    highlightChosenSelectorTile() {
        this.#tileSelectionBar.highlightChosenTile();
    }


    resetHighlightingOfChosenSelectorTile() {
        this.#tileSelectionBar.resetHighlightingOfChosenTile();
    }


    // TODO: Update
    updateBonusSpawnList(coordinateString, nextTileType) {
        const tileId = this.#tileSelectionBar.selectedElementId;
        const isBonusSpawnOverwritten = this.#internalLevel.isCoordinateBonusSpawnPosition(coordinateString);
        const isBonusSpawnTile = tileId === 'bonus_spawn_tile';

        if (isBonusSpawnOverwritten) {
            this.#internalLevel.removeBonusSpawnPositionAt(coordinateString);
        }

        if (isBonusSpawnTile) {
            this.#internalLevel.addBonusSpawnPosition(coordinateString);
        }
    }


    manageOverwriteOfSpawnScatterWithInaccessibleElement(callerId) {
        const tileCharacter = this.#tileSelectionBar.selectedElement;
        const isTileInaccessible = Configuration.actorsInaccessibleTileCharacterList.includes(tileCharacter);

        const ghostCharacterListScatter = this.#internalLevel.getGhostCharacterListForScatterPosition(callerId);
        const ghostCharacterListSpawn = this.#internalLevel.getGhostCharacterListForSpawnPosition(callerId);
        const isTileScatterOrSpawn = (ghostCharacterListScatter.length > 0) || (ghostCharacterListSpawn.length > 0);
        
        if (isTileInaccessible && isTileScatterOrSpawn) {
            this.#internalLevel.removeScatterPosition(callerId);
            this.#internalLevel.removeSpawnPosition(callerId);
            this.#clearScatterInputFor(ghostCharacterListScatter);
            this.#clearSpawnInputFor(ghostCharacterListSpawn);
        } 
    }


    removeScatterSpawnOfDeletedGhostTypes() {
        for (const ghostCharacter of Configuration.ghostCharacterList) {
            const isGhostTypeOnBoard = this.#internalLevel.getGhostCounterFor(ghostCharacter) > 0;

            if (!isGhostTypeOnBoard) {
                this.#internalLevel.removeScatterPositionFor(ghostCharacter);
                this.#internalLevel.removeSpawnPositionFor(ghostCharacter);
            }
        }
    }


    manageScatterSpawnControlVisibility() {
        for (const ghostCharacter of Configuration.ghostCharacterList) {

            const isGhostTypeOnBoard = this.#internalLevel.getGhostCounterFor(ghostCharacter) > 0;
            const isGhostControlDisplayed = this.#inputScatterSpawn.getScatterSpawnControlDisplayStatusFor(ghostCharacter);
    
            if (isGhostTypeOnBoard && !isGhostControlDisplayed) {
                this.#displayScatterSpawnControlsFor(ghostCharacter);
            }
    
            if (!isGhostTypeOnBoard && isGhostControlDisplayed) {
                this.#hideScatterSpawnControlsFor(ghostCharacter);
            }

        }
    }


    highlightPlacedGhostsOfType(ghostCharacter) {
        const ghostCoordinateList = this.#internalLevel.getGhostCoordinateListFor(ghostCharacter);
        const ghostHighlightClass = EditorElementMapper.ghostCharacterToCSSHighlightClassMap.get(ghostCharacter);

        for (const coordinate of ghostCoordinateList) {
            document.getElementById(coordinate).classList.add(ghostHighlightClass);
        }
    }


    resetHighlightOfPlacedGhostsOfType(ghostCharacter) {
        const ghostCoordinateList = this.#internalLevel.getGhostCoordinateListFor(ghostCharacter);
        const ghostHighlightClass = EditorElementMapper.ghostCharacterToCSSHighlightClassMap.get(ghostCharacter);

        for (const coordinate of ghostCoordinateList) {
            document.getElementById(coordinate).classList.remove(ghostHighlightClass);
        }
    } 


    isTileAccessible(coordinateString) {
        return this.#internalLevel.isTileAccessible(coordinateString);
    }


    #clearScatterInputFor(ghostCharacterList) {
        for (let ghostCharacter of ghostCharacterList) {
            let inputId = this.#getScatterControlId(ghostCharacter);
            inputId = this.#getScatterSpawnControlIdForInputId(inputId);
            document.getElementById(inputId).value = '';
        }
    }


    #clearSpawnInputFor(ghostCharacterList) {
        for (let ghostCharacter of ghostCharacterList) {
            let inputId = this.#getSpawnControlId(ghostCharacter);
            inputId = this.#getScatterSpawnControlIdForInputId(inputId);
            document.getElementById(inputId).value = '';
        }
    }


    #displayScatterSpawnControlsFor(ghostCharacter) {
        const ghostTypeControlIdList = EditorElementMapper.internalElementToScatterSpawnControlIdMap.get(ghostCharacter);

        for (const controlId of ghostTypeControlIdList) {
            document.getElementById(controlId).classList.remove('invisible');
        }
        this.#inputScatterSpawn.setSpawnScatterControlDisplayStatusFor(ghostCharacter, true);
    }


    #hideScatterSpawnControlsFor(ghostCharacter) {
        const ghostTypeControlIdList = EditorElementMapper.internalElementToScatterSpawnControlIdMap.get(ghostCharacter);

        for (const controlId of ghostTypeControlIdList) {
            document.getElementById(controlId).classList.add('invisible');
            const inputId = this.#getScatterSpawnControlIdForInputId(controlId);
            document.getElementById(inputId).value = '';
        }
        this.#inputScatterSpawn.setSpawnScatterControlDisplayStatusFor(ghostCharacter, false);
    }


    #getScatterControlId(ghostCharacter) {
        return EditorElementMapper.internalElementToScatterSpawnControlIdMap.get(ghostCharacter)[0];
    }


    #getSpawnControlId(ghostCharacter) {
        return EditorElementMapper.internalElementToScatterSpawnControlIdMap.get(ghostCharacter)[1];
    }


    #getScatterSpawnControlIdForInputId(inputId) {
        return EditorElementMapper.scatterSpawnControlIdToInputIdMap.get(inputId);
    }


    // =================================================================================


    #resetInternalLevel() {
        this.#internalLevel.initialize(this.#inputBoardDimension.width, this.#inputBoardDimension.height);
    }


    getGhostCoordinateListFor(ghostCharacter) {
        return this.#internalLevel.getGhostCoordinateListFor(ghostCharacter);
    }


    getGhostCharacterFor(buttonId) {
        return EditorElementMapper.buttonIdToGhostCharacterMap.get(buttonId);
    }


    addScatterPosition(buttonId, coordinateString) {
        const ghostCharacter = this.getGhostCharacterFor(buttonId);
        this.#internalLevel.addScatterPosition(ghostCharacter, coordinateString);
    }


    addSpawnPosition(buttonId, coordinateString) {
        const ghostCharacter = this.getGhostCharacterFor(buttonId);
        this.#internalLevel.addOptionalSpawnPosition(ghostCharacter, coordinateString);
    }


    
    removeScatterPositionFor(ghostCharacter) {
        this.#internalLevel.removeScatterPositionFor(ghostCharacter);
    }


    removeSpawnPositionFor(ghostCharacter) {
        this.#internalLevel.removeSpawnPositionFor(ghostCharacter);
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


}