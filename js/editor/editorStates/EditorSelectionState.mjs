'use strict';

import Configuration from '../../global/Configuration.mjs';
import EditorDefaultState from './EditorDefaultState.mjs';
import EditorElementMapper from '../EditorElementMapper.mjs';


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
        const isTileAccessible = this.isTileAccessible(callerId);
        const isTileSelectedGhostType = this.#isTileSelectedGhostType(callerId);

        if (isTileAccessible && !isTileSelectedGhostType) {
           document.getElementById(callerId).classList.add('scatterSpawnSelectionPointHighlight');
        }
        this.#positionInput.value = (isTileAccessible) ? callerId : '';
    }


    handleEditorTileMouseLeave(callerId) {
        if (!this.#isTileSelectedGhostType(callerId)) {
            document.getElementById(callerId).classList.remove('scatterSpawnSelectionPointHighlight');
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
        const ghostHighlightClass = EditorElementMapper.ghostCharacterToCSSHighlightClassMap.get(ghostCharacter);

        for (let coordinate of this.#getSelectedGhostCoordinateList()) {
            document.getElementById(coordinate).classList.add(ghostHighlightClass);
        }
    }


    isTileAccessible(tileId) {
        const tileCharacter = this.#editor.getBoardCharacterAt(tileId);
        return !Configuration.actorsInaccessibleTileCharacterList.includes(tileCharacter);
    }


    #getSelectedGhostCoordinateList() {
        const ghostCharacter = this.#editor.getGhostCharacterFor(this.#buttonId);
        return this.#editor.getGhostCoordinateListFor(ghostCharacter);    
    }


    #isTileSelectedGhostType(tileId) {
        return this.#getSelectedGhostCoordinateList().includes(tileId);
    }


    #resetHighlightPlacedGhosts() {
        const ghostCharacter = this.#editor.getGhostCharacterFor(this.#buttonId);
        const ghostHighlightClass = EditorElementMapper.ghostCharacterToCSSHighlightClassMap.get(ghostCharacter);

        for (let coordinate of this.#getSelectedGhostCoordinateList()) {
            document.getElementById(coordinate).classList.remove(ghostHighlightClass);
        }
    } 


}