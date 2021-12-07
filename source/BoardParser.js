"use strict";

class BoardParser {

    parse(board_text) {
        var board_array = this.buildInternalBoardArray(board_text);
        this.indexAccessibleInternalElements(board_array);
        return board_array;
    }


    buildInternalBoardArray(board_text) {
        var output_board = [];
        var current_row = [];
        var current_character = '';
        var current_element = undefined;
        
        for (var i = 0; i < board_text.length; i++) {
           current_character = board_text.charAt(i);
           
           if (!this.isLineFeed(current_character)) {
              current_element = new BoardInternalElement(current_character);
              current_row.push(current_element);
           }
           if (this.isLineFeed(current_character) || this.isLastCharacter(i, board_text)) {
              output_board.push(current_row);
              current_row = [];
           }
           
        }
        return output_board;
     }


    indexAccessibleInternalElements(board_array) {
        var id = 0;
        var element = "";
        for (var y = 0; y < board_array.length; y++) {
            for (var x = 0; x < board_array[y].length; x++) {
                element = board_array[y][x].getElement();
                if (this.isAccessibleByActor(element)) {
                    board_array[y][x].setID(id);
                    id++;
                }
             }
        }
    }


    isLineFeed(character) {
        return character.charCodeAt(0) == Configuration.linefeed_code;
    }


    isLastCharacter(index, text) {
        return index == text.length - 1;
    }


    isAccessibleByActor(element) {
        return element != Configuration.wall_character;
    }

}