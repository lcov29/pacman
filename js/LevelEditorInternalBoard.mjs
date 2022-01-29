"use strict";

import Configuration from "./Configuration.mjs";


export default class LevelEditorInternalBoard {


    constructor() {
        this.internal_board = [[]];
        this.counter_ghosts_blinky = 0;
        this.counter_ghosts_pinky = 0;
        this.counter_ghosts_clyde = 0;
        this.counter_ghosts_inky = 0;
    }


    getCounterGhostsBlinky() {
        return this.counter_ghosts_blinky;
    }


    getCounterGhostsPinky() {
        return this.counter_ghosts_pinky;
    }


    getCounterGhostsClyde() {
        return this.counter_ghosts_clyde;
    }


    getCounterGhostsInky() {
        return this.counter_ghosts_inky;
    }


    initialize(width, height) {
        this.initializeNewMap(width, height);
    }


    initializeNewMap(width, height) {
        this.buildEmptyMap(width, height);
        this.resetGhostCounters();
    }


    buildEmptyMap(width, height) {
        this.internal_board = [];
        let row = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                row.push(Configuration.UNDEFINED_TILE_CHARACTER);
            }
            this.internal_board.push(row);
            row = [];
        }
    }


    resetGhostCounters() {
        this.counter_ghosts_blinky = 0;
        this.counter_ghosts_pinky = 0;
        this.counter_ghosts_clyde = 0;
        this.counter_ghosts_inky = 0;
    }


    update(coordinates, character) {
        let parsed_coordinates = this.parseCoordinates(coordinates);
        this.updateGhostCounters(parsed_coordinates, character);
        this.internal_board[parsed_coordinates.y][parsed_coordinates.x] = character;
    }


    updateGhostCounters(parsed_coordinates, character) {
        let current_character = this.internal_board[parsed_coordinates.y][parsed_coordinates.x];

        // decrement counter for overwritten ghost
        if (Configuration.GHOST_CHARACTERS.includes(current_character)) {
            this.decrementGhostCounterFor(current_character);
        }

        if (Configuration.GHOST_CHARACTERS.includes(character)) {
            this.incrementGhostCounterFor(character);
        }
    }


    incrementGhostCounterFor(character) {
        switch(character) {
            case Configuration.GHOST_BLINKY_CHARACTER:
                this.counter_ghosts_blinky++;
                break;
            case Configuration.GHOST_PINKY_CHARACTER:
                this.counter_ghosts_pinky++;
                break;
            case Configuration.GHOST_CLYDE_CHARACTER:
                this.counter_ghosts_clyde++;
                break;
            case Configuration.GHOST_INKY_CHARACTER:
                this.counter_ghosts_inky++;
                break;
        }
    }


    decrementGhostCounterFor(character) {
        switch(character) {
            case Configuration.GHOST_BLINKY_CHARACTER:
                this.counter_ghosts_blinky--;
                break;
            case Configuration.GHOST_PINKY_CHARACTER:
                this.counter_ghosts_pinky--;
                break;
            case Configuration.GHOST_CLYDE_CHARACTER:
                this.counter_ghosts_clyde--;
                break;
            case Configuration.GHOST_INKY_CHARACTER:
                this.counter_ghosts_inky--;
                break;
        }
    }



    parseCoordinates(coordinates) {
        let parsed_input = coordinates.replace('(', '');
        parsed_input = parsed_input.replace(')', '');
        parsed_input = parsed_input.split(',');
        let x = parseInt(parsed_input[0]);
        let y = parseInt(parsed_input[1]);
        return {'x': x, 'y': y};
    }


    /*
    printInternalBoardToConsole() {
        console.log("==================================");
        for (let y = 0; y < this.internal_board.length; y++) {
            let row = "";
            for (let x = 0; x < this.internal_board[y].length; x++) {
                row += this.internal_board[y][x];
            }
            console.log(row);
        }
    }*/

    
}