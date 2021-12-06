"use strict";

class Board {

   
   constructor(board_text) {
      this.board = this.parseBoard(board_text);
      this.indexAccessibleElements();
   }

    
   parseBoard(board_text) {
      
      var output_board = [];
      var current_row = [];
      var current_character = '';
      var current_object = undefined;
      var is_linefeed = false;
      var is_last_character = false;
      
      for (var i = 0; i < board_text.length; i++) {
         current_character = board_text.charAt(i);
         is_linefeed = (current_character.charCodeAt(0) == Configuration.linefeed_code);
         is_last_character = (i == board_text.length - 1);
         
         if (!is_linefeed) {
            current_object = this.createObject(Configuration.id_unaccessible_board_element, current_character);
            current_row.push(current_object);
         }
         if (is_linefeed || is_last_character) {
            output_board.push(current_row);
            current_row = [];
         }
         
      }
      return output_board;
   }


   indexAccessibleElements() {
      var id = 0;
      for (var y = 0; y < this.board.length; y++) {
         for (var x = 0; x < this.board[y].length; x++) {
            if (this.getElementAtIndex(x,y) != Configuration.wall_character) {
               this.board[y][x].id = id;
               id++;
            }
         }
      }
   }


   setElementAt(position, element) {
      this.board[position.getY()][position.getX()].element = element;
   }
   
   
   getElementAt(position) {
      return this.board[position.getY()][position.getX()].element;
   }


   getElementAtIndex(xPosition, yPosition) {
      return this.board[yPosition][xPosition].element;
   }
   

   getIdAt(position) {
      return this.board[position.getY()][position.getX()].id;
   } 


   getIdAtIndex(xPosition, yPosition) {
      return this.board[yPosition][xPosition].id;
   }
   

   createObject(id, element) {
      return {id: id, element: element};
   }


   getRowCount() {
      return this.board.length;
   }


   getColumnCountFor(index) {
      return this.board[index].length;
   }


   countAvailablePoints() {
      var number_of_points = 0;
      for (var y = 0; y < this.board.length; y++) {
         for (var x = 0; x < this.board[y].length; x++) {
            if (this.getElementAtIndex(x, y) == Configuration.point_character) {
               number_of_points++;
            }
         }
      }
      return number_of_points;
   }
   

   getPacmanPositions() {
      var pacman_positions = [];
      for (var y = 0; y < this.board.length; y++) {
         for (var x = 0; x < this.board[y].length; x++)  {
            if (this.getElementAtIndex(x, y) == Configuration.pacman_character) {
               pacman_positions.push(new BoardPosition(x, y));
            }
         }
      }
      return pacman_positions;
   }
   
 
   getGhostPositions() {
      var ghost_positions = [];
      for (var y = 0; y < this.board.length; y++) {
         for (var x = 0; x < this.board[y].length; x++) {
            if (this.getElementAtIndex(x, y) == Configuration.ghost_character) {
               ghost_positions.push(new BoardPosition(x, y));
            }
         }
      }
      return ghost_positions;
   }


   getTeleporterPositions() {
      var teleporter_positions = [];
      for (var y = 0; y < this.board.length; y++) {
         for (var x = 0; x < this.board[y].length; x++) {
            switch (this.getElementAtIndex(x, y)) {
               case Configuration.teleporter_1_tile_character:
               case Configuration.teleporter_2_tile_character:
               case Configuration.teleporter_3_tile_character:
                  teleporter_positions.push(new BoardPosition(x, y));
                  break;
            }
         }
      }
      return teleporter_positions;
   }


   clone() {
      var output = undefined;
      var board_clone = [];
      var row = [];
      var object_clone = '';
      for (var y = 0; y < this.board.length; y++) {
         for (var x = 0; x < this.board[y].length; x++) {
            object_clone = this.createObject(this.getIdAtIndex(x, y), this.getElementAtIndex(x, y));
            row.push(object_clone);
         }
         board_clone.push(row);
         row = [];
      }
      output = new Board("");
      output.board = board_clone;
      return output;
   }
   
   
}