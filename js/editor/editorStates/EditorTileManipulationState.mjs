export default class EditorTileManipulationState {

    
    #editor = null;
    #isMousePressedInsideBoardEditingArea = false;


    constructor(editorReference) {
        this.#editor = editorReference;
    }


    initialize() {
        this.#editor.highlightChosenSelectorTile();
    }


    handleEditorContainerMouseDown(callerId) {
        this.#isMousePressedInsideBoardEditingArea = true;
    }


    handleEditorContainerMouseUp(callerId) {
        this.#isMousePressedInsideBoardEditingArea = false;
    }


    handleEditorContainerMouseLeave(callerId) {
        this.#isMousePressedInsideBoardEditingArea = false;
    }


    handleEditorTileClick(callerId) {
        this.#editor.updateInternalBoard(callerId);
        this.#editor.updateBonusSpawnList(callerId);
        this.#editor.removeScatterSpawnOfDeletedGhostTypes();
        this.#editor.manageScatterSpawnControlVisibility();
        this.#editor.manageOverwriteOfSpawnScatterWithInaccessibleElement(callerId);
        this.#editor.setBoardEditorTileToSelectedTile(callerId);
    }


    handleEditorTileMouseOver(callerId) {
        if (this.#isMousePressedInsideBoardEditingArea) {
            this.handleEditorTileClick(callerId);
        }
    }


    handleEditorTileMouseEnter(callerId) {}


    handleEditorTileMouseLeave(callerId) {}


    exit() {
        this.#editor.resetHighlightingOfChosenSelectorTile();
    }


}