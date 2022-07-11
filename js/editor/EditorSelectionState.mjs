'use strict';

import Configuration from '../Configuration.mjs';
import EditorDefaultState from './EditorDefaultState.mjs';
import EditorElementMapper from './EditorElementMapper.mjs';


export default class EditorSelectionState {

    
    constructor(buttonId) {
        this.editor = null;
        this.positionInput = null;
        this.buttonId = buttonId;
    }


    setEditor(editor) {
        this.editor = editor;
    }


    getEditor() {
        return this.editor;
    }


    getButtonId() {
        return this.buttonId;
    }


    handleEditorContainerMouseDown(callerId) {}


    handleEditorContainerMouseUp(callerId) {}


    handleEditorContainerMouseLeave(callerId) {
        this.editor.setState(new EditorDefaultState());
        this.positionInput.value = '';
    }


    handleEditorTileMouseOver(callerId) {}


    handleEditorTileMouseEnter(callerId) {
        let borderColor = Configuration.editorScatterSpawnSelectionPointerHighlightColorHex;
        let ghostCharacter = EditorElementMapper.mapButtonIdToGhostCharacter[this.buttonId];
        let tileCharacter = this.editor.getBoardCharacterAt(callerId);
        let ghostCoordinates = this.editor.getGhostCoordinatesListFor(ghostCharacter);
        let isTileAccessible = (Configuration.actorsInaccessibleTileCharacterList.includes(tileCharacter) === false);
        let isTileSelectedGhostType = ghostCoordinates.includes(callerId);

        if (isTileAccessible && !isTileSelectedGhostType) {
            document.getElementById(callerId).style.borderColor = borderColor;
            document.getElementById(callerId).style.borderWidth = '5px';
        }
        this.positionInput.value = (isTileAccessible) ? callerId : '';
    }


    handleEditorTileMouseLeave(callerId) {
        let ghostCharacter = EditorElementMapper.mapButtonIdToGhostCharacter[this.buttonId];
        let ghostCoordinates = this.editor.getGhostCoordinatesListFor(ghostCharacter);
        if (ghostCoordinates.includes(callerId) === false) {
            document.getElementById(callerId).style = null;
        }
    }


    exit() {
        this.resetHighlightPlacedGhosts();
    }


    initializeInputReference() {
        let inputId = EditorElementMapper.mapButtonIdToInputId[this.buttonId];
        this.positionInput = document.getElementById(inputId);
    }


    highlightPlacedGhosts() {
        let ghostCharacter = EditorElementMapper.mapButtonIdToGhostCharacter[this.buttonId];
        let ghostHighlightColor = EditorElementMapper.mapGhostCharacterToHighlightColor[ghostCharacter];
        let ghostCoordinates = this.editor.getGhostCoordinatesListFor(ghostCharacter);
        for (let coordinate of ghostCoordinates) {
            document.getElementById(coordinate).style.borderColor = ghostHighlightColor;
            document.getElementById(coordinate).style.borderWidth = '5px';
        }
    }


    resetHighlightPlacedGhosts() {
        let ghostCharacter = EditorElementMapper.mapButtonIdToGhostCharacter[this.buttonId];
        let ghostCoordinates = this.editor.getGhostCoordinatesListFor(ghostCharacter);
        for (let coordinate of ghostCoordinates) {
            document.getElementById(coordinate).style = null;
        }
    } 


}