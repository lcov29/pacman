import Configuration from "../../global/Configuration.mjs";
import EditorSpawnSelectionState from "../editorStates/EditorSpawnSelectionState.mjs";
import EditorScatterSelectionState from "../editorStates/EditorScatterSelectionState.mjs";


export default class EditorScatterSpawnInput {


    #editor = null;
    #inputControlIdList = [];
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
        this.#inputControlIdList = [
            {inputId: 'scatterPositionGhostBlinky', controlId: 'scatterControlGhostBlinky'},
            {inputId: 'scatterPositionGhostPinky', controlId: 'scatterControlGhostPinky'},
            {inputId: 'scatterPositionGhostInky', controlId: 'scatterControlGhostInky'},
            {inputId: 'scatterPositionGhostClyde', controlId: 'scatterControlGhostClyde'},
            {inputId: 'spawnPositionGhostBlinky', controlId: 'spawnControlGhostBlinky'},
            {inputId: 'spawnPositionGhostPinky', controlId: 'spawnControlGhostPinky'},
            {inputId: 'spawnPositionGhostInky', controlId: 'spawnControlGhostInky'},
            {inputId: 'spawnPositionGhostClyde', controlId: 'spawnControlGhostClyde'}
        ];
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