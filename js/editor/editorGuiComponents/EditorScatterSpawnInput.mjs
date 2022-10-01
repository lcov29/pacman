import Configuration from "../../global/Configuration.mjs";
import EditorElementMapper from "../EditorElementMapper.mjs";
import EditorSpawnSelectionState from "../editorStates/EditorSpawnSelectionState.mjs";
import EditorScatterSelectionState from "../editorStates/EditorScatterSelectionState.mjs";


export default class EditorScatterSpawnInput {


    #editor = null;
    #cssClassNameInvisible = 'invisible';
    #isGhostBlinkyScatterSpawnControlDisplayed = false;
    #isGhostPinkyScatterSpawnControlDisplayed = false;
    #isGhostClydeScatterSpawnControlDisplayed = false;
    #isGhostInkyScatterSpawnControlDisplayed = false;


    constructor(editorReference) {
        this.#editor = editorReference;
    }


    initialize() {
        this.#initializeScatterSpawnInputMouseEventListeners();
        this.#initializeScatterButtonsEventListener();
        this.#initializeSpawnButtonsEventListener();
    }


    loadScatterSpawnPositions() {
        this.reset();
        this.#initializeScatterSpawnControls();
    }


    updateScatterSpawnPositions() {
        for (const ghostCharacter of Configuration.ghostCharacterList) {
            const isGhostTypeOnBoard = this.#editor.isGhostTypeOnBoard(ghostCharacter);
            const isGhostControlDisplayed = this.#getScatterSpawnControlDisplayStatusFor(ghostCharacter);
    
            if (isGhostTypeOnBoard && !isGhostControlDisplayed) {
                this.#displayControlsFor(ghostCharacter);
                this.#loadScatterPositionInputFor(ghostCharacter);
                this.#loadSpawnPositionInputFor(ghostCharacter);
            }
    
            if (!isGhostTypeOnBoard && isGhostControlDisplayed) {
                this.#hideControldFor(ghostCharacter);
                this.#clearScatterPositionInputFor(ghostCharacter);
                this.#clearSpawnPositionInputFor(ghostCharacter);
            }
        }
    }


    reset() {
        for (const ghostCharacter of Configuration.ghostCharacterList) {
            this.#clearInputFor(ghostCharacter);
            this.#hideControldFor(ghostCharacter);
        }
        this.#hideControl('scatterPositionFieldset');
        this.#hideControl('spawnPositionFieldset');
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


    // ========== Callback Functions ==========


    scatterSpawnMouseEnterCallback(event) {
        const inputId = event.target.id;
        const coordinateString = document.getElementById(inputId).value;
        const isCoordinateStringValid = coordinateString !== '';
    
        if (isCoordinateStringValid) {
            const cssHighlightClass = this.#getCssHighlightClassFor(event.target.id);
            document.getElementById(coordinateString).classList.add(cssHighlightClass);
        }
    }


    scatterSpawnMouseLeaveCallback(event) {
        const inputId = event.target.id;
        const coordinateString = document.getElementById(inputId).value;
        const isCoordinateStringValid = coordinateString !== '';
    
        if (isCoordinateStringValid) {
            const cssHighlightClass = this.#getCssHighlightClassFor(event.target.id);
            document.getElementById(coordinateString).classList.remove(cssHighlightClass);
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


    #initializeScatterSpawnControls() {
        for (const ghostCharacter of Configuration.ghostCharacterList) {
            const isGhostTypeOnBoard = this.#editor.isGhostTypeOnBoard(ghostCharacter);
    
            if (isGhostTypeOnBoard) {
                this.#displayControlsFor(ghostCharacter);
                this.#loadScatterPositionInputFor(ghostCharacter);
                this.#loadSpawnPositionInputFor(ghostCharacter);
            }
        }
    }


    #setSpawnScatterControlDisplayStatusFor(ghostCharacter, isDisplayed) {
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


    #getScatterSpawnControlDisplayStatusFor(ghostCharacter) {
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


    #getScatterControlIdFor(ghostCharacter) {
        return EditorElementMapper.internalElementToScatterControlIdMap.get(ghostCharacter);
    }


    #getSpawnControlIdFor(ghostCharacter) {
        return EditorElementMapper.internalElementToSpawnControlIdMap.get(ghostCharacter);
    }


    #getScatterInputIdFor(ghostCharacter) {
        return EditorElementMapper.internalElementToScatterInputIdMap.get(ghostCharacter);
    }


    #getSpawnInputIdFor(ghostCharacter) {
        return EditorElementMapper.internalElementToSpawnInputIdMap.get(ghostCharacter);
    }


    #getCssHighlightClassFor(scatterSpawnInputId) {
        let ghostCharacter = EditorElementMapper.scatterInputIdTointernalElementMap.get(scatterSpawnInputId);
        if (!ghostCharacter) {
            ghostCharacter = EditorElementMapper.spawnInputIdToInternalElementMap.get(scatterSpawnInputId);
        }
        const cssClassScatterSpawnHighlight = EditorElementMapper.ghostCharacterToCSSHighlightClassMap.get(ghostCharacter);
        return cssClassScatterSpawnHighlight;
    }


    #displayControlsFor(ghostCharacter) {
        this.#displayControl('scatterPositionFieldset');
        this.#displayControl('spawnPositionFieldset');
        this.#displayScatterControlFor(ghostCharacter);
        this.#displaySpawnControlFor(ghostCharacter);
        this.#setSpawnScatterControlDisplayStatusFor(ghostCharacter, true);
    }


    #displayScatterControlFor(ghostCharacter) {
        const scatterControlId = this.#getScatterControlIdFor(ghostCharacter);
        this.#displayControl(scatterControlId);
    }


    #displaySpawnControlFor(ghostCharacter) {
        const spawnControlId = this.#getSpawnControlIdFor(ghostCharacter);
        this.#displayControl(spawnControlId);
    }


    #displayControl(controlId) {
        const controlClasslist = document.getElementById(controlId).classList;
        controlClasslist.remove(this.#cssClassNameInvisible); 
    }


    #hideControldFor(ghostCharacter) {
        this.#hideScatterControlFor(ghostCharacter);
        this.#hideSpawnControlFor(ghostCharacter);
        this.#setSpawnScatterControlDisplayStatusFor(ghostCharacter, false);
    }


    #hideScatterControlFor(ghostCharacter) {
        const scatterControlId = this.#getScatterControlIdFor(ghostCharacter);
        this.#hideControl(scatterControlId);
    }


    #hideSpawnControlFor(ghostCharacter) {
        const spawnControlId = this.#getSpawnControlIdFor(ghostCharacter);
        this.#hideControl(spawnControlId);
    }


    #hideControl(controlId) {
        const controlClasslist = document.getElementById(controlId).classList;
        controlClasslist.add(this.#cssClassNameInvisible);
    }


    #clearInputFor(ghostCharacter) {
        this.#clearScatterPositionInputFor(ghostCharacter);
        this.#clearSpawnPositionInputFor(ghostCharacter);
    }


    #clearScatterPositionInputFor(ghostCharacter) {
        const inputId = this.#getScatterInputIdFor(ghostCharacter);
        document.getElementById(inputId).value = '';
    }


    #clearSpawnPositionInputFor(ghostCharacter) {
        const inputId = this.#getSpawnInputIdFor(ghostCharacter);
        document.getElementById(inputId).value = '';
    }


    #loadScatterPositionInputFor(ghostCharacter) {
        const inputId = this.#getScatterInputIdFor(ghostCharacter);
        const position = this.#editor.getScatterPositionFor(ghostCharacter);
        const value = this.#buildPositionInputValue(position);
        document.getElementById(inputId).value = value;
    }


    #loadSpawnPositionInputFor(ghostCharacter) {
        const inputId = this.#getSpawnInputIdFor(ghostCharacter);
        const position = this.#editor.getSpawnPositionFor(ghostCharacter);
        const value = this.#buildPositionInputValue(position);
        document.getElementById(inputId).value = value;
    }


    #buildPositionInputValue(position) {
        if (position) {
            return `(${position.x},${position.y})`;
        } else {
            return '';
        }
    }


}