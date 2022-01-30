"use strict";

import Configuration from "./Configuration.mjs";
import Utility from "./Utility.mjs";


export default class LevelEditorInternalBoard {


    constructor() {
        this.internal_board = [[]];
        this.coordinates_ghost_blinky = [];
        this.coordinates_ghost_pinky = [];
        this.coordinates_ghost_clyde = [];
        this.coordinates_ghost_inky = [];
        this.counter_ghosts_blinky = 0;
        this.counter_ghosts_pinky = 0;
        this.counter_ghosts_clyde = 0;
        this.counter_ghosts_inky = 0;
    }


    getBoardCharacterAt(coordinates) {
        return this.internal_board[coordinates.y][coordinates.x];
    }


    getGhostCoordinatesListFor(ghost_character) {
        let output = [];
        switch(ghost_character) {
            case Configuration.GHOST_BLINKY_CHARACTER:
                output = [...this.coordinates_ghost_blinky];
                break;
            case Configuration.GHOST_PINKY_CHARACTER:
                output = [...this.coordinates_ghost_pinky];
                break;
            case Configuration.GHOST_CLYDE_CHARACTER:
                output = [...this.coordinates_ghost_clyde];
                break;
            case Configuration.GHOST_INKY_CHARACTER:
                output = [...this.coordinates_ghost_inky];
                break;
        }
        return output;
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


    setBoardCharacter(coordinates, character) {
        this.internal_board[coordinates.y][coordinates.x] = character;
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


    update(coordinates_string, character) {
        let parsed_coordinates = this.parseCoordinates(coordinates_string);
        let current_board_character = this.getBoardCharacterAt(parsed_coordinates);
        this.updateGhostCoordinateLists(coordinates_string, current_board_character, character);
        this.updateGhostCounters(current_board_character, character);
        this.setBoardCharacter(parsed_coordinates, character);
    }


    updateGhostCoordinateLists(coordinates_string, current_board_character, new_character) {
        if (Configuration.GHOST_CHARACTERS.includes(current_board_character)) {
            this.removeCoordinatesFromGhostList(coordinates_string, current_board_character);
        }

        if (Configuration.GHOST_CHARACTERS.includes(new_character)) {
            this.addCoordinatesToGhostList(coordinates_string, new_character);
        }
    }


    addCoordinatesToGhostList(coordinates, ghost_character) {
        switch(ghost_character) {
            case Configuration.GHOST_BLINKY_CHARACTER:
                this.coordinates_ghost_blinky.push(coordinates);
                break;
            case Configuration.GHOST_PINKY_CHARACTER:
                this.coordinates_ghost_pinky.push(coordinates);
                break;
            case Configuration.GHOST_CLYDE_CHARACTER:
                this.coordinates_ghost_clyde.push(coordinates);
                break;
            case Configuration.GHOST_INKY_CHARACTER:
                this.coordinates_ghost_inky.push(coordinates);
                break;
        }
    }


    removeCoordinatesFromGhostList(coordinates, ghost_character) {
        switch(ghost_character) {
            case Configuration.GHOST_BLINKY_CHARACTER:
                Utility.removeElementFrom(this.coordinates_ghost_blinky, coordinates);
                break;
            case Configuration.GHOST_PINKY_CHARACTER:
                Utility.removeElementFrom(this.coordinates_ghost_pinky, coordinates);
                break;
            case Configuration.GHOST_CLYDE_CHARACTER:
                Utility.removeElementFrom(this.coordinates_ghost_clyde, coordinates);
                break;
            case Configuration.GHOST_INKY_CHARACTER:
                Utility.removeElementFrom(this.coordinates_ghost_inky, coordinates);
                break;
        }
    }


    updateGhostCounters(current_board_character, new_character) {

        // decrement counter for overwritten ghost
        if (Configuration.GHOST_CHARACTERS.includes(current_board_character)) {
            this.decrementGhostCounterFor(current_board_character);
        }

        if (Configuration.GHOST_CHARACTERS.includes(new_character)) {
            this.incrementGhostCounterFor(new_character);
        }
    }


    incrementGhostCounterFor(ghost_character) {
        switch(ghost_character) {
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


    decrementGhostCounterFor(ghost_character) {
        switch(ghost_character) {
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