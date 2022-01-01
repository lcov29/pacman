"use strict";

class BoardParser {

    parse(board_text) {
        var board = this.buildBoardPositionArray(board_text);
        this.indexAccessiblePositions(board);
        return board;
    }


    buildBoardPositionArray(board_text) {
        var output = [];
        var current_row = [];
        var current_character = '';
        var current_x = 0;
        var current_y = 0;
        
        for (var i = 0; i < board_text.length; i++) {
            current_character = board_text.charAt(i);
            if (!this.isLineFeed(current_character)) {
                current_row.push(new BoardPosition(current_x, current_y, current_character));
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
        var id = 0;
        var character = "";
        for (var y = 0; y < position_array.length; y++) {
            for (var x = 0; x < position_array[y].length; x++) {
                character = position_array[y][x].getCharacter();
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


    isAccessibleByActor(character) {
        return character !== Configuration.wall_character;
    }

}