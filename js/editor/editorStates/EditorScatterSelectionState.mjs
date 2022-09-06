import EditorDefaultState from './EditorDefaultState.mjs';
import EditorSelectionState from './EditorSelectionState.mjs';


export default class EditorScatterSelectionState extends EditorSelectionState {

    
    constructor(editorReference, buttonId) {
        super(editorReference, buttonId);
    }


    initialize() {
        super.initialize();
        super.editor.removeScatterPositionFor(super.ghostCharacter);
        super.editor.highlightPlacedGhostsOfType(super.ghostCharacter);
    }


    handleEditorTileClick(callerId) {
        const isTileAccessible = super.editor.isTileAccessible(callerId);

        if (isTileAccessible) {
            super.editor.addScatterPosition(super.buttonId, callerId);
            super.editor.setState(new EditorDefaultState());
            const boardEditorTile =  document.getElementById(callerId);
            boardEditorTile.classList.remove(super.cssClassHighlightSelectedBoardTile);
        }
    }


}