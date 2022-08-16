'use strict';

import Configuration from '../Configuration.mjs';
import EditorDefaultState from './EditorDefaultState.mjs';
import EditorElementMapper from './EditorElementMapper.mjs';


export default class EditorSelectionState {

    #editor = null;
    #positionInput = null;
    #buttonId = null;


    constructor(buttonId) {
        this.#buttonId = buttonId;
    }


    set editor(editor) {
        this.#editor = editor;
    }


    get editor() {
        return this.#editor;
    }


    get buttonId() {
        return this.#buttonId;
    }


    handleEditorContainerMouseDown(callerId) {}


    handleEditorContainerMouseUp(callerId) {}


    handleEditorContainerMouseLeave(callerId) {
        this.#editor.setState(new EditorDefaultState());
        this.#positionInput.value = '';
    }


    handleEditorTileMouseOver(callerId) {}


    handleEditorTileMouseEnter(callerId) {
        const tileCharacter = this.#editor.getBoardCharacterAt(callerId);
        const isTileAccessible = !Configuration.actorsInaccessibleTileCharacterList.includes(tileCharacter);
        const isTileSelectedGhostType = this.#isTileSelectedGhostType(callerId);

        if (isTileAccessible && !isTileSelectedGhostType) {
            const borderColor = Configuration.editorScatterSpawnSelectionPointerHighlightColorHex;
            document.getElementById(callerId).style.borderColor = borderColor;
            document.getElementById(callerId).style.borderWidth = '5px';
        }
        this.#positionInput.value = (isTileAccessible) ? callerId : '';
    }


    handleEditorTileMouseLeave(callerId) {
        if (!this.#isTileSelectedGhostType(callerId)) {
            document.getElementById(callerId).style = null;
        }
    }


    exit() {
        this.#resetHighlightPlacedGhosts();
    }


    initializeInputReference() {
        const inputId = EditorElementMapper.buttonIdToInputIdMap.get(this.#buttonId);
        this.#positionInput = document.getElementById(inputId);
    }


    highlightPlacedGhosts() {
        const ghostCharacter = this.#editor.getGhostCharacterFor(this.#buttonId);
        const ghostHighlightColor = EditorElementMapper.ghostCharacterToHighlightColorMap.get(ghostCharacter);

        for (let coordinate of this.#getSelectedGhostCoordinateList()) {
            document.getElementById(coordinate).style.borderColor = ghostHighlightColor;
            document.getElementById(coordinate).style.borderWidth = '5px';
        }
    }


    #getSelectedGhostCoordinateList() {
        const ghostCharacter = this.#editor.getGhostCharacterFor(this.#buttonId);
        return this.#editor.getGhostCoordinateListFor(ghostCharacter);    
    }


    #isTileSelectedGhostType(tileId) {
        return this.#getSelectedGhostCoordinateList().includes(tileId);
    }


    #resetHighlightPlacedGhosts() {
        for (let coordinate of this.#getSelectedGhostCoordinateList()) {
            document.getElementById(coordinate).style = null;
        }
    } 


}