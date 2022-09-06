import EditorDefaultState from './EditorDefaultState.mjs';
import EditorElementMapper from '../EditorElementMapper.mjs';


export default class EditorSelectionState {


    #editor = null;
    #buttonId = null;
    #inputPosition = null;
    #ghostCharacter = '';
    #cssClassHighlightSelectedBoardTile = 'scatterSpawnSelectionPointHighlight';


    constructor(editorReference, buttonId) {
        this.#editor = editorReference;
        this.#buttonId = buttonId;
    }


    initialize() {
        const inputId = EditorElementMapper.buttonIdToInputIdMap.get(this.#buttonId);
        this.#inputPosition = document.getElementById(inputId);
        this.#ghostCharacter = EditorElementMapper.buttonIdToGhostCharacterMap.get(this.#buttonId);
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


    get inputPosition() {
        return this.#inputPosition;
    }


    get ghostCharacter() {
        return this.#ghostCharacter;
    }


    get cssClassHighlightSelectedBoardTile() {
        return this.#cssClassHighlightSelectedBoardTile;
    }


    handleEditorContainerMouseDown(callerId) {}


    handleEditorContainerMouseUp(callerId) {}


    handleEditorContainerMouseLeave(callerId) {
        this.#editor.setState(new EditorDefaultState());
        this.#inputPosition.value = '';
    }


    handleEditorTileMouseOver(callerId) {}


    handleEditorTileMouseEnter(callerId) {
        const isTileAccessible = this.#editor.isTileAccessible(callerId);
        const isTileSelectedGhostType = this.#isTileSelectedGhostType(callerId);

        if (isTileAccessible && !isTileSelectedGhostType) {
           document.getElementById(callerId).classList.add(this.#cssClassHighlightSelectedBoardTile);
        }
        this.#inputPosition.value = (isTileAccessible) ? callerId : '';
    }


    handleEditorTileMouseLeave(callerId) {
        const isTileSelectedGhostType = this.#isTileSelectedGhostType(callerId);

        if (!isTileSelectedGhostType) {
            document.getElementById(callerId).classList.remove(this.#cssClassHighlightSelectedBoardTile);
        }
    }


    exit() {
        this.#editor.resetHighlightOfPlacedGhostsOfType(this.#ghostCharacter);
    }


    #isTileSelectedGhostType(coordinate) {
        const ghostCoordinateList = this.#editor.getGhostCoordinateListFor(this.#ghostCharacter);
        return ghostCoordinateList.includes(coordinate);
    }


}