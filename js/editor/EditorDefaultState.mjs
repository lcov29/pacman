"use strict";


export default class EditorDefaultState {

    
    constructor() {
        this.editor = null;
    }


    initialize(editor) {
        this.editor = editor;
    }


    handleEditorContainerMouseDown(caller_id) {}


    handleEditorContainerMouseUp(caller_id) {}


    handleEditorContainerMouseLeave(caller_id) {}


    handleEditorTileClick(caller_id) {}


    handleEditorTileMouseOver(caller_id) {}


    handleEditorTileMouseEnter(caller_id) {}


    handleEditorTileMouseLeave(caller_id) {}


    exit() {}


}