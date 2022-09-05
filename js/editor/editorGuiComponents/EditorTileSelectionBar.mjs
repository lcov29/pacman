import EditorElementMapper from "../EditorElementMapper.mjs";
import EditorTileManipulationState from "../editorStates/EditorTileManipulationState.mjs";


export default class EditorTileSelectionBar {


    #editor = null;
    #selectedTileId = '';


    constructor(editorReference) {
        this.#editor = editorReference;
    }


    get selectedElement() {
        return EditorElementMapper.tileTypeToInternalElementMap.get(this.#selectedTileId);
    }


    initialize() {
        this.#addTileClickEventListeners();
    }


    tileClickCallback(event) {
        this.#setSelectedTileId(event.target.id);
        const newState = new EditorTileManipulationState();
        this.#editor.setState(newState);
        window.alert(`tileClickCallback for current element: ${this.selectedElement}`);
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