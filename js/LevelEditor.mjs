"use strict";

import Configuration from "./Configuration.mjs";


export default class LevelEditor {


    constructor() {
        this.editor_container = null;
        this.scatter_positions_container = null;
        this.optional_spawn_positions_container = null;
        this.input_map_width = null;
        this.input_map_height = null;
        this.level_board = [];
        this.level_scatter_positions = [];
        this.level_optional_spawn_positions = [];
        this.currently_selected_tile_type = "undefined_tile";
        this.is_mouse_pressed_inside_editor_area = false;
    }


    setEditorContainer(id) {
        this.editor_container = document.getElementById(id);
    }


    setScatterPositionsContainer(id) {
        this.scatter_positions_container = document.getElementById(id);
    }


    setOptionalSpawnPositionsContainer(id) {
        this.optional_spawn_positions_container = document.getElementById(id);
    }


    setReferenceInputMapWidth(id) {
        this.input_map_width = document.getElementById(id);
    }


    setReferenceInputMapHeight(id) {
        this.input_map_height = document.getElementById(id);
    }


    setCurrentlySelectedTileType(tile_type) {
        this.currently_selected_tile_type = tile_type;
    }


    setMousePressedStatus(status) {
        this.is_mouse_pressed_inside_editor_area = status;
    }


    handleMapDimensionChange(callback_mousedown, callback_click) {
        this.clearMap();
        this.initializeEditingArea(callback_mousedown, callback_click);
        this.initializeInternalLevelBoard();
    }


    handleTileTypeSelectionCallback(id) {
        this.setCurrentlySelectedTileType(id);
        this.highlightChosenSelectorTile();
    }


    handleTileManipuationMousedownCallback(caller_id) {
        if (this.is_mouse_pressed_inside_editor_area) {
            this.handleTileManipulationClickCallback(caller_id);
        }
    }

    handleTileManipulationClickCallback(caller_id) {
        let styleclass = this.currently_selected_tile_type;
        if (['point_tile', 'powerup_tile'].includes(this.currently_selected_tile_type)) {
            styleclass = `empty_tile ${styleclass}`;
        }
        document.getElementById(caller_id).setAttribute('class', styleclass);
    }


    handleScatterSelection() {
        window.alert("implement scatter selection");
    }


    handleSpawnSelection() {
        window.alert("implement spawn selection");
    }


    handlePlay() {
        window.alert("implement play");
    }


    highlightChosenSelectorTile() {
        let radios = document.querySelectorAll('input[name="selectors"]');
        let selected_radio_id = document.querySelector('input[name="selectors"]:checked').id;
        for (let radio of radios) {
            let radio_label = document.querySelector(`label[for="${radio.id}"]`);
            if (selected_radio_id === radio.id) {
                radio_label.style.borderColor = 'red';
            } else {
                radio_label.setAttribute('style', '');
            }
        }
    }


    clearMap() {
        while (this.editor_container.firstChild) {
           this.editor_container.removeChild(this.editor_container.firstChild);
        }
    }



    initializeEditingArea(callback_mousedown, callback_click) {
        let width = this.input_map_width.value;
        let height = this.input_map_height.value;
        
        this.editor_container.style.width = `${width * 30}px`;
        this.editor_container.style.height = `${height * 30}px`;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let new_div = document.createElement('div');
                let new_id = `(${x},${y})`;
                new_div.setAttribute('id', new_id);
                new_div.setAttribute('class', 'undefined_tile');
                new_div.addEventListener('mouseover', callback_mousedown);
                new_div.addEventListener('click', callback_click)
                this.editor_container.appendChild(new_div);
            }
        }
    }


    initializeInternalLevelBoard() {
        this.level_board = [];
        let width = this.input_map_width.value;
        let height = this.input_map_height.value;
        let row = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                row.push(Configuration.UNDEFINED_TILE_CHARACTER);
            }
            this.level_board.push(row);
            row = [];
        }
    }


}