import Configuration from "../../global/Configuration.mjs";
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


    displayScatterPositionList(scatterPositionList) {
        this.#displayScatterSpawnPositionList(scatterPositionList, this.#inputScatterControlIdList);
    }


    displaySpawnPositionList(spawnPositionList) {
        this.#displayScatterSpawnPositionList(spawnPositionList, this.#inputSpawnControlIdList);
    }


    #displayScatterSpawnPositionList(positionList, inputControlIdList) {
        for (const position of positionList) {
            const ghostCharacter = position.ghost;
            const controlIdObject = inputControlIdList.filter(element => element.ghostCharacter === ghostCharacter)[0];
            const controlClassList = document.getElementById(controlIdObject.controlId).classList;
            const inputPosition = document.getElementById(controlIdObject.inputId);
          
            controlClassList.remove('invisible');
            inputPosition.value = `(${position.x},${position.y})`;
        }
    }


    reset() {
        this.#resetSpawnScatterInputElements();
        this.#resetSpawnScatterControlDisplayStatus();
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