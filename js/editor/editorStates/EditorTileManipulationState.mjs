import Configuration from '../../global/Configuration.mjs';
import EditorElementMapper from '../EditorElementMapper.mjs';


export default class EditorTileManipulationState {

    
    #selectorTileType = '';
    #editor = null;
    #isMousePressedInsideEditorArea = false;


    constructor(selectorTileType) {
        this.#selectorTileType = selectorTileType;
    }


    initialize(editor) {
        this.#editor = editor;
        this.#highlightChosenSelectorTile();
    }


    handleEditorContainerMouseDown(callerId) {
        this.#isMousePressedInsideEditorArea = true;
    }


    handleEditorContainerMouseUp(callerId) {
        this.#isMousePressedInsideEditorArea = false;
    }


    handleEditorContainerMouseLeave(callerId) {
        this.#isMousePressedInsideEditorArea = false;
    }


    handleEditorTileClick(callerId) {
        this.#editor.updateInternalBoard(callerId, this.#selectorTileType);
        this.#updateBonusSpawnList(callerId, this.#selectorTileType);
        this.#removeScatterSpawnOfDeletedGhostTypes();
        this.#manageScatterSpawnControlVisibility();
        this.#manageOverwriteOfSpawnScatterWithInaccessibleElement(callerId);
        this.#updateEditorTileTo(callerId, this.#selectorTileType);
    }


    handleEditorTileMouseOver(callerId) {
        if (this.#isMousePressedInsideEditorArea) {
            this.handleEditorTileClick(callerId);
        }
    }


    handleEditorTileMouseEnter(callerId) {}


    handleEditorTileMouseLeave(callerId) {}


    exit() {
        this.#resetHighlightOfChosenSelectorTile();
    }


    #highlightChosenSelectorTile() {
        const radioList = document.querySelectorAll('input[name="selectors"]');
        const selectedRadioId = document.querySelector('input[name="selectors"]:checked').id;

        for (let radio of radioList) {
            const radioLabel = document.querySelector(`label[for="${radio.id}"]`);
            const isCurrentRadioSelected = selectedRadioId === radio.id;
            radioLabel.classList.toggle('selectorSelected', isCurrentRadioSelected);
        }
    }


    #updateEditorTileTo(coordinateString, tileType) {
        const styleclass = `editorTile ${tileType}`;
        document.getElementById(coordinateString).setAttribute('class', styleclass);
    }


    #updateBonusSpawnList(coordinateString, nextTileType) {
        const isBonusSpawnOverwritten =this.#editor.isCoordinateBonusSpawnPosition(coordinateString)
        const isBonusSpawnTile = nextTileType === 'bonus_spawn_tile';

        if (isBonusSpawnOverwritten) {
            this.#editor.removeBonusSpawnPositionAt(coordinateString);
        }

        if (isBonusSpawnTile) {
            this.#editor.addBonusSpawnPosition(coordinateString);
        }
    }


    #resetHighlightOfChosenSelectorTile() {
        const selectedRadioId = document.querySelector('input[name="selectors"]:checked').id;
        const selectedRadioLabel = document.querySelector(`label[for="${selectedRadioId}"]`);
        selectedRadioLabel.classList.remove('selectorSelected');
    }


    #removeScatterSpawnOfDeletedGhostTypes() {
        for (let ghostCharacter of Configuration.ghostCharacterList) {
            const isGhostTypeOnBoard = this.#editor.getCounterForGhostType(ghostCharacter) > 0;

            if (!isGhostTypeOnBoard) {
                this.#editor.removeScatterPositionFor(ghostCharacter);
                this.#editor.removeSpawnPositionFor(ghostCharacter);
            }
        }
    }


    #manageScatterSpawnControlVisibility() {
        for (let ghostCharacter of Configuration.ghostCharacterList) {

            const isGhostTypeOnBoard = this.#editor.getCounterForGhostType(ghostCharacter) > 0;
            const isGhostControlDisplayed = this.#editor.getScatterSpawnControlDisplayStatusFor(ghostCharacter);
    
            if (isGhostTypeOnBoard && !isGhostControlDisplayed) {
                this.#displayScatterSpawnControlsFor(ghostCharacter);
            }
    
            if (!isGhostTypeOnBoard && isGhostControlDisplayed) {
                this.#hideScatterSpawnControlsFor(ghostCharacter);
            }

        }
    }


    #displayScatterSpawnControlsFor(ghostCharacter) {
        const ghostTypeControlIdList = EditorElementMapper.internalElementToScatterSpawnControlIdMap.get(ghostCharacter);

        for (let controlId of ghostTypeControlIdList) {
            document.getElementById(controlId).classList.remove('invisible');
        }

        this.#editor.setSpawnScatterControlDisplayStatusFor(ghostCharacter, true);
    }


    #hideScatterSpawnControlsFor(ghostCharacter) {
        const ghostTypeControlIdList = EditorElementMapper.internalElementToScatterSpawnControlIdMap.get(ghostCharacter);

        for (let controlId of ghostTypeControlIdList) {
            document.getElementById(controlId).classList.add('invisible');
            const inputId = this.#getScatterSpawnControlIdForInputId(controlId);
            document.getElementById(inputId).value = '';
        }

        this.#editor.setSpawnScatterControlDisplayStatusFor(ghostCharacter, false);
    }


    #manageOverwriteOfSpawnScatterWithInaccessibleElement(callerId) {
        const character = this.#editor.getInternalElement(this.#selectorTileType);
        const isTileInaccessible = Configuration.actorsInaccessibleTileCharacterList.includes(character);

        const ghostCharacterListScatter = this.#editor.getGhostCharacterListForScatterPosition(callerId);
        const ghostCharacterListSpawn = this.#editor.getGhostCharacterListForSpawnPosition(callerId);
        const isTileScatterOrSpawn = (ghostCharacterListScatter.length > 0) || (ghostCharacterListSpawn.length > 0);
        
        if (isTileInaccessible && isTileScatterOrSpawn) {
            this.#editor.removeScatterAndSpawnPosition(callerId);           
            this.#clearScatterInputFor(ghostCharacterListScatter);
            this.#clearSpawnInputFor(ghostCharacterListSpawn);
        } 
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


    #getScatterControlId(ghostCharacter) {
        return EditorElementMapper.internalElementToScatterSpawnControlIdMap.get(ghostCharacter)[0];
    }


    #getSpawnControlId(ghostCharacter) {
        return EditorElementMapper.internalElementToScatterSpawnControlIdMap.get(ghostCharacter)[1];
    }


    #getScatterSpawnControlIdForInputId(inputId) {
        return EditorElementMapper.scatterSpawnControlIdToInputIdMap.get(inputId);
    }


}