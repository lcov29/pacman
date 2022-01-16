"use strict";

export default class BoardParser {


    parse(board_text) {
        let board = this.buildBoardPositionArray(board_text);
        this.indexAccessiblePositions(board);
        return board;
    }


    buildBoardPositionArray(board_text) {
        let output = [];
        let current_row = [];
        let current_character = '';
        let current_actor_character = '';
        let current_element_character = '';
        let empty_character = Configuration.empty_tile_character;
        let current_x = 0;
        let current_y = 0;
        
        for (let i = 0; i < board_text.length; i++) {
            current_character = board_text.charAt(i);
            if (!this.isLineFeed(current_character)) {
                current_actor_character = (this.isActor(current_character)) ? current_character : empty_character;
                current_element_character = (this.isActor(current_character)) ? empty_character : current_character;
                current_row.push(new BoardPosition(current_x, 
                                                   current_y, 
                                                   current_actor_character,
                                                   current_element_character));
                current_x++;
            }
            if (this.isLineFeed(current_character) || this.isLastCharacter(i, board_text)) {
                output.push(current_row);
                current_row = [];
                current_x = 0;
                current_y++;
            }
        }
        return output;
     }


    indexAccessiblePositions(position_array) {
        let id = 0;
        let character = "";
        for (let y = 0; y < position_array.length; y++) {
            for (let x = 0; x < position_array[y].length; x++) {
                character = position_array[y][x].getElementCharacter();
                if (this.isAccessibleByActor(character)) {
                    position_array[y][x].setID(id);
                    id++;
                }
             }
        }
    }


    isLineFeed(character) {
        return character.charCodeAt(0) === Configuration.linefeed_code;
    }


    isLastCharacter(index, text) {
        return index === text.length - 1;
    }


    isActor(character) {
        return character === Configuration.pacman_character ||
               character === Configuration.ghost_blinky_character;
    }


    isAccessibleByActor(character) {
        return character !== Configuration.wall_character;
    }

    
}