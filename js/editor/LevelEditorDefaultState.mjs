"use strict";


export default class LevelEditorDefaultState {

    
    constructor() {
        this.level_editor = null;
    }


    initialize(level_editor_reference) {
        this.level_editor = level_editor_reference;
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