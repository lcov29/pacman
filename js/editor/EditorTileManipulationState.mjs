'use strict';

import Configuration from '../Configuration.mjs';
import EditorElementMapper from './EditorElementMapper.mjs';


export default class EditorTileManipulationState {


    constructor(selectorTileType) {
        this.selectorTileType = selectorTileType;
        this.editor = null;
        this.isMousePressedInsideEditorArea = false;
    }


    initialize(editor) {
        this.editor = editor;
        this.highlightChosenSelectorTile();
    }


    handleEditorContainerMouseDown(callerId) {
        this.isMousePressedInsideEditorArea = true;
    }


    handleEditorContainerMouseUp(callerId) {
        this.isMousePressedInsideEditorArea = false;
    }


    handleEditorContainerMouseLeave(callerId) {
        this.isMousePressedInsideEditorArea = false;
    }


    handleEditorTileClick(callerId) {
        this.editor.updateInternalBoard(callerId, this.selectorTileType);
        this.updateBonusSpawnList(callerId, this.selectorTileType);
        this.manageScatterSpawnControlVisibility();
        this.manageOverwriteOfSpawnScatterWithInaccessibleElement(callerId);
        this.updateEditingTileTo(callerId, this.selectorTileType);
    }


    handleEditorTileMouseOver(callerId) {
        if (this.isMousePressedInsideEditorArea) {
            this.handleEditorTileClick(callerId);
        }
    }


    handleEditorTileMouseEnter(callerId) {}


    handleEditorTileMouseLeave(callerId) {}


    exit() {
        this.resetHighlighOfChosenSelectorTile();
    }


    highlightChosenSelectorTile() {
        let radios = document.querySelectorAll('input[name="selectors"]');
        let selectedRadioId = document.querySelector('input[name="selectors"]:checked').id;
        for (let radio of radios) {
            let radioLabel = document.querySelector(`label[for="${radio.id}"]`);
            if (selectedRadioId === radio.id) {
                radioLabel.style.borderColor = Configuration.editorTileSelectionHighlightColorHex;
            } else {
                radioLabel.setAttribute('style', '');
            }
        }
    }


    updateEditingTileTo(coordinateString, tileType) {
        let styleclass = `editorTile ${tileType}`;
        document.getElementById(coordinateString).setAttribute('class', styleclass);
    }


    updateBonusSpawnList(coordinateString, nextTileType) {
        // handle overwriting a spawn position
        if (this.editor.isCoordinateBonusSpawnPosition(coordinateString)) {
            this.editor.removeBonusSpawnPositionAt(coordinateString);
        }
        if (nextTileType === 'bonus_spawn_tile') {
            this.editor.addBonusSpawnPosition(coordinateString);
        }
    }


    resetHighlighOfChosenSelectorTile() {
        let selectedRadioId = document.querySelector('input[name="selectors"]:checked').id;
        let selectedRadioLabel = document.querySelector(`label[for="${selectedRadioId}"]`);
        selectedRadioLabel.setAttribute('style', '');
    }


    manageScatterSpawnControlVisibility() {
        let ghostTypeCounter = 0;
        let isControlDisplayed = false;
        let ghostTypeControlIds = [];

        for (let ghostCharacter of Configuration.ghostCharacterList) {
            ghostTypeCounter = this.editor.getCounterForGhostType(ghostCharacter);
            ghostTypeControlIds = EditorElementMapper.mapInternalElementToScatterSpawnControlIds[ghostCharacter];
            isControlDisplayed = this.editor.getScatterSpawnControlDisplayStatusForGhostType(ghostCharacter);
    
            // display invisible controls
            if ((ghostTypeCounter > 0) && (isControlDisplayed === false)) {
                for (let controlId of ghostTypeControlIds) {
                    document.getElementById(controlId).style = null;
                }
                this.editor.setSpawnScatterControlDisplayStatus(ghostCharacter, true);
            }
    
            // hide visible controls
            if ((ghostTypeCounter === 0) && (isControlDisplayed === true)) {
                for (let controlId of ghostTypeControlIds) {
                    document.getElementById(controlId).style = 'display:none';
                    let inputId = EditorElementMapper.mapScatterSpawnControlIdsToInputIds[controlId];
                    document.getElementById(inputId).value = '';
                    this.editor.removeScatterPositionFor(ghostCharacter);
                    this.editor.removeSpawnPositionFor(ghostCharacter);
                }
                this.editor.setSpawnScatterControlDisplayStatus(ghostCharacter, false);
            }

        }
    }


    manageOverwriteOfSpawnScatterWithInaccessibleElement(callerId) {
        const character = this.editor.getInternalElement(this.selectorTileType);
        let isTileInaccessible = Configuration.actorsInaccessibleTileCharacterList.includes(character);
        let ghostCharacterListScatter = this.editor.getGhostCharacterListForScatterPosition(callerId);
        let ghostCharacterListSpawn = this.editor.getGhostCharacterListForSpawnPosition(callerId);
        let isTileScatterOrSpawn = (ghostCharacterListScatter.length > 0) || (ghostCharacterListSpawn.length > 0);
        if (isTileInaccessible && isTileScatterOrSpawn) {
            this.editor.removeScatterAndSpawnPosition(callerId);           
            this.clearScatterInputFor(ghostCharacterListScatter);
            this.clearSpawnInputFor(ghostCharacterListSpawn);
        } 
    }


    clearScatterInputFor(ghostCharacters) {
        for (let ghostCharacter of ghostCharacters) {
            let inputId = EditorElementMapper.mapInternalElementToScatterSpawnControlIds[ghostCharacter][0];
            inputId = EditorElementMapper.mapScatterSpawnControlIdsToInputIds[inputId];
            document.getElementById(inputId).value = '';
        }
    }


    clearSpawnInputFor(ghostCharacters) {
        for (let ghostCharacter of ghostCharacters) {
            let inputId = EditorElementMapper.mapInternalElementToScatterSpawnControlIds[ghostCharacter][1];
            inputId = EditorElementMapper.mapScatterSpawnControlIdsToInputIds[inputId];
            document.getElementById(inputId).value = '';
        }
    }


}