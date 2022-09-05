import EditorElementMapper from "../EditorElementMapper.mjs";
import EditorTileManipulationState from "../editorStates/EditorTileManipulationState.mjs";


export default class EditorTileSelectionBar {


    #editor = null;
    #tileList = null;
    #selectedTileId = '';
    #cssClassNameSelectedTile = '';


    constructor(editorReference) {
        this.#editor = editorReference;
        this.#tileList = document.querySelectorAll('input[name="selectors"]');
        this.#cssClassNameSelectedTile = 'selectorSelected';
    }


    get selectedElement() {
        return EditorElementMapper.tileTypeToInternalElementMap.get(this.#selectedTileId);
    }


    get selectedElementId() {
        return this.#selectedTileId;
    }


    initialize() {
        this.#addTileClickEventListeners();
    }


    highlightChosenTile() {
        const selectedTileId = document.querySelector('input[name="selectors"]:checked').id;

        for (let tile of this.#tileList) {
            const tileLabel = document.querySelector(`label[for="${tile.id}"]`);
            const isCurrentRadioSelected = selectedTileId === tile.id;
            tileLabel.classList.toggle(this.#cssClassNameSelectedTile, isCurrentRadioSelected);
        }
    }


    resetHighlightingOfChosenTile() {
        const selectedTileId = document.querySelector('input[name="selectors"]:checked').id;
        const selectedTileLabel = document.querySelector(`label[for="${selectedTileId}"]`);
        selectedTileLabel.classList.remove(this.#cssClassNameSelectedTile);
    }


    tileClickCallback(event) {
        this.#setSelectedTileId(event.target.id);
        const newState = new EditorTileManipulationState();
        this.#editor.setState(newState);
    }


    #addTileClickEventListeners() {
        const radioList = document.querySelectorAll('input[name="selectors"]');
        for (const radio of radioList) {
            radio.addEventListener('click', this.tileClickCallback.bind(this));
        }
    }


    #setSelectedTileId(tileId) {
        this.#selectedTileId = tileId;
    }


}