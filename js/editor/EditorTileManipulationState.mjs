'use strict';

import Configuration from '../Configuration.mjs';
import EditorElementMapper from './EditorElementMapper.mjs';


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
        this.#manageScatterSpawnControlVisibility();
        this.#manageOverwriteOfSpawnScatterWithInaccessibleElement(callerId);
        this.#updateEditingTileTo(callerId, this.#selectorTileType);
    }


    handleEditorTileMouseOver(callerId) {
        if (this.#isMousePressedInsideEditorArea) {
            this.handleEditorTileClick(callerId);
        }
    }


    handleEditorTileMouseEnter(callerId) {}


    handleEditorTileMouseLeave(callerId) {}


    exit() {
        this.#resetHighlighOfChosenSelectorTile();
    }


    #highlightChosenSelectorTile() {
        const radioList = document.querySelectorAll('input[name="selectors"]');
        const selectedRadioId = document.querySelector('input[name="selectors"]:checked').id;

        for (let radio of radioList) {

            const radioLabel = document.querySelector(`label[for="${radio.id}"]`);
            const isCurrentRadioSelected = selectedRadioId === radio.id;

            if (isCurrentRadioSelected) {
                radioLabel.style.borderColor = Configuration.editorTileSelectionHighlightColorHex;
            } else {
                radioLabel.setAttribute('style', '');
            }
        }
    }


    #updateEditingTileTo(coordinateString, tileType) {
        const styleclass = `editorTile ${tileType}`;
        document.getElementById(coordinateString).setAttribute('class', styleclass);
    }


    #updateBonusSpawnList(coordinateString, nextTileType) {
        // handle overwriting a spawn position
        if (this.#editor.isCoordinateBonusSpawnPosition(coordinateString)) {
            this.#editor.removeBonusSpawnPositionAt(coordinateString);
        }
        if (nextTileType === 'bonus_spawn_tile') {
            this.#editor.addBonusSpawnPosition(coordinateString);
        }
    }


    #resetHighlighOfChosenSelectorTile() {
        let selectedRadioId = document.querySelector('input[name="selectors"]:checked').id;
        let selectedRadioLabel = document.querySelector(`label[for="${selectedRadioId}"]`);
        selectedRadioLabel.setAttribute('style', '');
    }


    #manageScatterSpawnControlVisibility() {
        let ghostTypeCounter = 0;
        let isControlDisplayed = false;
        let ghostTypeControlIdList = [];

        for (let ghostCharacter of Configuration.ghostCharacterList) {
            ghostTypeCounter = this.#editor.getCounterForGhostType(ghostCharacter);
            ghostTypeControlIdList = EditorElementMapper.internalElementToScatterSpawnControlIdMap.get(ghostCharacter);
            isControlDisplayed = this.#editor.getScatterSpawnControlDisplayStatusForGhostType(ghostCharacter);
    
            // display invisible controls
            if ((ghostTypeCounter > 0) && (isControlDisplayed === false)) {
                for (let controlId of ghostTypeControlIdList) {
                    document.getElementById(controlId).style = null;
                }
                this.#editor.setSpawnScatterControlDisplayStatus(ghostCharacter, true);
            }
    
            // hide visible controls
            if ((ghostTypeCounter === 0) && (isControlDisplayed === true)) {
                for (let controlId of ghostTypeControlIdList) {
                    document.getElementById(controlId).style = 'display:none';
                    const inputId = this.#getScatterSpawnControlIdForInputId(controlId);
                    document.getElementById(inputId).value = '';
                    this.#editor.removeScatterPositionFor(ghostCharacter);
                    this.#editor.removeSpawnPositionFor(ghostCharacter);
                }
                this.#editor.setSpawnScatterControlDisplayStatus(ghostCharacter, false);
            }

        }
    }


    #manageOverwriteOfSpawnScatterWithInaccessibleElement(callerId) {
        const character = this.#editor.getInternalElement(this.#selectorTileType);
        let isTileInaccessible = Configuration.actorsInaccessibleTileCharacterList.includes(character);
        let ghostCharacterListScatter = this.#editor.getGhostCharacterListForScatterPosition(callerId);
        let ghostCharacterListSpawn = this.#editor.getGhostCharacterListForSpawnPosition(callerId);
        let isTileScatterOrSpawn = (ghostCharacterListScatter.length > 0) || (ghostCharacterListSpawn.length > 0);
        if (isTileInaccessible && isTileScatterOrSpawn) {
            this.#editor.removeScatterAndSpawnPosition(callerId);           
            this.#clearScatterInputFor(ghostCharacterListScatter);
            this.#clearSpawnInputFor(ghostCharacterListSpawn);
        } 
    }


    #clearScatterInputFor(ghostCharacters) {
        for (let ghostCharacter of ghostCharacters) {
            let inputId = this.#getScatterControlId(ghostCharacter);
            inputId = this.#getScatterSpawnControlIdForInputId(inputId);
            document.getElementById(inputId).value = '';
        }
    }


    #clearSpawnInputFor(ghostCharacters) {
        for (let ghostCharacter of ghostCharacters) {
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