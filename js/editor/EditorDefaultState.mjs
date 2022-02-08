"use strict";


export default class EditorDefaultState {

    
    constructor() {
        this.editor = null;
    }


    initialize(editor) {
        this.editor = editor;
    }


    handleEditorContainerMouseDown(callerId) {}


    handleEditorContainerMouseUp(callerId) {}


    handleEditorContainerMouseLeave(callerId) {}


    handleEditorTileClick(callerId) {}


    handleEditorTileMouseOver(callerId) {}


    handleEditorTileMouseEnter(callerId) {}


    handleEditorTileMouseLeave(callerId) {}


    exit() {}


}