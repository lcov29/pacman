import Configuration from "../../global/Configuration.mjs";
import EditorElementMapper from "../EditorElementMapper.mjs";
import EditorSpawnSelectionState from "../editorStates/EditorSpawnSelectionState.mjs";
import EditorScatterSelectionState from "../editorStates/EditorScatterSelectionState.mjs";


export default class EditorScatterSpawnInput {


    #editor = null;
    #inputControlIdList = [];
    #inputScatterControlIdList = [];
    #inputSpawnControlIdList = [];
    #isGhostBlinkyScatterSpawnControlDisplayed = false;
    #isGhostPinkyScatterSpawnControlDisplayed = false;
    #isGhostClydeScatterSpawnControlDisplayed = false;
    #isGhostInkyScatterSpawnControlDisplayed = false;


    constructor(editorReference) {
        this.#editor = editorReference;
    }


    initialize() {
        this.#initializeInputControlIdList();
        this.#initializeScatterSpawnInputMouseEventListeners();
        this.#initializeScatterButtonsEventListener();
        this.#initializeSpawnButtonsEventListener();
    }


    setSpawnScatterControlDisplayStatusFor(ghostCharacter, isDisplayed) {
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


    getScatterSpawnControlDisplayStatusFor(ghostCharacter) {
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


    loadScatterSpawnPositions() {
        this.reset();
        this.#initializeScatterSpawnControls();
    }


    updateScatterSpawnPositions() {
        for (const ghostCharacter of Configuration.ghostCharacterList) {
            const isGhostTypeOnBoard = this.#editor.isGhostTypeOnBoard(ghostCharacter);
            const isGhostControlDisplayed = this.getScatterSpawnControlDisplayStatusFor(ghostCharacter);
    
            if (isGhostTypeOnBoard && !isGhostControlDisplayed) {
                this.#displayScatterSpawnControlsFor(ghostCharacter);
                this.#loadScatterPositionInputFor(ghostCharacter);
                this.#loadSpawnPositionInputFor(ghostCharacter);
            }
    
            if (!isGhostTypeOnBoard && isGhostControlDisplayed) {
                this.#hideScatterSpawnControlsFor(ghostCharacter);
                this.#clearScatterPositionInputFor(ghostCharacter);
                this.#clearSpawnPositionInputFor(ghostCharacter);
            }
        }
    }


    #initializeScatterSpawnControls() {
        for (const ghostCharacter of Configuration.ghostCharacterList) {
            const isGhostTypeOnBoard = this.#editor.isGhostTypeOnBoard(ghostCharacter);
    
            if (isGhostTypeOnBoard) {
                this.#displayScatterSpawnControlsFor(ghostCharacter);
                this.#loadScatterPositionInputFor(ghostCharacter);
                this.#loadSpawnPositionInputFor(ghostCharacter);
            }
        }
    }


    #displayScatterSpawnControlsFor(ghostCharacter) {
        const ghostTypeControlIdList = this.#getScatterSpawnControlIdListFor(ghostCharacter);

        for (const controlId of ghostTypeControlIdList) {
            document.getElementById(controlId).classList.remove('invisible');
        }
        this.setSpawnScatterControlDisplayStatusFor(ghostCharacter, true);
    }


    #hideScatterSpawnControlsFor(ghostCharacter) {
        const ghostTypeControlIdList = this.#getScatterSpawnControlIdListFor(ghostCharacter);

        for (const controlId of ghostTypeControlIdList) {
            document.getElementById(controlId).classList.add('invisible');
        }
        this.setSpawnScatterControlDisplayStatusFor(ghostCharacter, false);
    }


    #loadScatterPositionInputFor(ghostCharacter) {
        const inputId = this.#getScatterInputIdFor(ghostCharacter);
        const position = this.#editor.getScatterPositionFor(ghostCharacter);
        const value = (position) ? `(${position.x},${position.y})` : '';

        document.getElementById(inputId).value = value;
    }


    #loadSpawnPositionInputFor(ghostCharacter) {
        const inputId = this.#getSpawnInputIdFor(ghostCharacter);
        const position = this.#editor.getSpawnPositionFor(ghostCharacter);
        const value = (position) ? `(${position.x},${position.y})` : '';

        document.getElementById(inputId).value = value;
    }


    clearScatterInputFor(ghostCharacterList) {
        for (const ghostCharacter of ghostCharacterList) {
            this.#clearScatterPositionInputFor(ghostCharacter);
        }
    }


    clearSpawnInputFor(ghostCharacterList) {
        for (const ghostCharacter of ghostCharacterList) {
            this.#clearSpawnPositionInputFor(ghostCharacter);
        }
    }


    #clearScatterPositionInputFor(ghostCharacter) {
        const inputId = this.#getScatterInputIdFor(ghostCharacter);
        document.getElementById(inputId).value = '';
    }


    #clearSpawnPositionInputFor(ghostCharacter) {
        const inputId = this.#getSpawnInputIdFor(ghostCharacter);
        document.getElementById(inputId).value = '';
    }


    reset() {
        this.#resetSpawnScatterInputElements();
        this.#resetSpawnScatterControlDisplayStatus();
    }


    #getScatterSpawnControlIdListFor(ghostCharacter) {
        return EditorElementMapper.internalElementToScatterSpawnControlIdMap.get(ghostCharacter);
    }


    #getScatterInputIdFor(ghostCharacter) {
        return EditorElementMapper.internalElementToScatterInputIdMap.get(ghostCharacter);
    }


    #getSpawnInputIdFor(ghostCharacter) {
        return EditorElementMapper.internalElementToSpawnInputIdMap.get(ghostCharacter);
    }


    #resetSpawnScatterInputElements() {
        for (const element of this.#inputControlIdList) {
            const inputElement = document.getElementById(element.inputId);
            const controlElement = document.getElementById(element.controlId);

            inputElement.value = '';
            controlElement.classList.add('invisible');
        }
    }


    #resetSpawnScatterControlDisplayStatus() {
        this.#isGhostBlinkyScatterSpawnControlDisplayed = false;
        this.#isGhostPinkyScatterSpawnControlDisplayed = false;
        this.#isGhostClydeScatterSpawnControlDisplayed = false;
        this.#isGhostInkyScatterSpawnControlDisplayed = false;
    }


    #initializeInputControlIdList() {
        this.#inputScatterControlIdList = [
            {ghostCharacter: Configuration.ghostBlinkyCharacter, inputId: 'scatterPositionGhostBlinky', controlId: 'scatterControlGhostBlinky'},
            {ghostCharacter: Configuration.ghostPinkyCharacter, inputId: 'scatterPositionGhostPinky', controlId: 'scatterControlGhostPinky'},
            {ghostCharacter: Configuration.ghostInkyCharacter, inputId: 'scatterPositionGhostInky', controlId: 'scatterControlGhostInky'},
            {ghostCharacter: Configuration.ghostClydeCharacter, inputId: 'scatterPositionGhostClyde', controlId: 'scatterControlGhostClyde'}
        ];
        this.#inputSpawnControlIdList = [
            {ghostCharacter: Configuration.ghostBlinkyCharacter, inputId: 'spawnPositionGhostBlinky', controlId: 'spawnControlGhostBlinky'},
            {ghostCharacter: Configuration.ghostPinkyCharacter, inputId: 'spawnPositionGhostPinky', controlId: 'spawnControlGhostPinky'},
            {ghostCharacter: Configuration.ghostInkyCharacter, inputId: 'spawnPositionGhostInky', controlId: 'spawnControlGhostInky'},
            {ghostCharacter: Configuration.ghostClydeCharacter, inputId: 'spawnPositionGhostClyde', controlId: 'spawnControlGhostClyde'}
        ];
        this.#inputControlIdList = [...this.#inputScatterControlIdList, ... this.#inputSpawnControlIdList]; 
    }


    #initializeScatterSpawnInputMouseEventListeners() {
        const scatterSpawnInputList = document.querySelectorAll('input[class="inputPosition"]');
        for (const scatterSpawnInput of scatterSpawnInputList) {
            scatterSpawnInput.addEventListener('mouseenter', this.scatterSpawnMouseEnterCallback.bind(this));
            scatterSpawnInput.addEventListener('mouseleave', this.scatterSpawnMouseLeaveCallback.bind(this));
        }
    }


    #initializeScatterButtonsEventListener() {
        const scatterButtonList = document.querySelectorAll('button[name="buttonScatterPosition"]');
        for (const scatterButton of scatterButtonList) {
            scatterButton.addEventListener('click', this.scatterSelectionButtonCallback.bind(this));
        }
    }


    #initializeSpawnButtonsEventListener() {
        const spawnButtonList = document.querySelectorAll('button[name="buttonSpawnPosition"]');
        for (const spawnButton of spawnButtonList) {
            spawnButton.addEventListener('click', this.spawnSelectionButtonCallback.bind(this));
        }
    }


    // ========== Callback Functions ==========


    scatterSpawnMouseEnterCallback(event) {
        const inputId = event.target.id;
        const coordinateString = document.getElementById(inputId).value;
        const isCoordinateStringValid = coordinateString !== '';
    
        if (isCoordinateStringValid) {
           document.getElementById(coordinateString).classList.add('scatterSpawnSelectionPointHighlight');
        }
    }


    scatterSpawnMouseLeaveCallback(event) {
        const inputId = event.target.id;
        const coordinateString = document.getElementById(inputId).value;
        const isCoordinateStringValid = coordinateString !== '';
    
        if (isCoordinateStringValid) {
            document.getElementById(coordinateString).classList.remove('scatterSpawnSelectionPointHighlight');
        }
    }


    scatterSelectionButtonCallback(event) {
        const inputId = event.target.id;
        const scatterSelectionState = new EditorScatterSelectionState(this.#editor, inputId);
        this.#editor.setState(scatterSelectionState);
    }
    
    
    spawnSelectionButtonCallback(event) {
        const inputId = event.target.id;
        const scatterSelectionState = new EditorSpawnSelectionState(this.#editor, inputId);
        this.#editor.setState(scatterSelectionState);
    }


}