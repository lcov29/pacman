//TODO: use dedicated function with callback-function as parameter for iterating through every fieldposition

"use strict";

class Board {

   
   constructor(board_text) {
      this.board = this.parseBoard(board_text);
      this.indexAccessibleElements();
   }

    
   parseBoard(board_text) {
      
      var output_field = [];
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
            output_field.push(current_row);
            current_row = [];
         }
         
      }
      return output_field;
   }


   indexAccessibleElements() {
      var id = 0;
      for (var y = 0; y < this.board.length; y++) {
         for (var x = 0; x < this.board[y].length; x++) {
            if (this.getElementAt(x,y) != Configuration.wall_character) {
               this.board[y][x].id = id;
               id++;
            }
         }
      }
   }


   setElementAt(xPosition, yPosition, element) {
      this.board[yPosition][xPosition].element = element;
   }
   
   
   getElementAt(xPosition, yPosition) {
      return this.board[yPosition][xPosition].element;
   }


   getIdAt(xPosition, yPosition) {
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


   getPoints() {
      var number_of_points = 0;
      for (var y = 0; y < this.board.length; y++) {
         for (var x = 0; x < this.board[y].length; x++) {
            if (this.getElementAt(x, y) == Configuration.point_character) {
               number_of_points++;
            }
         }
      }
      return number_of_points;
   }
   

   getPacmans(ref_level) {
      var pacmans = [];
      for (var y = 0; y < this.board.length; y++) {
         for (var x = 0; x < this.board[y].length; x++)  {
            if (this.getElementAt(x, y) == Configuration.pacman_character) {
               pacmans.push(new Pacman(ref_level, x, y));
            }
         }
      }
      return pacmans;
   }
   
 
   getGhosts(ref_level) {
      var ghosts = [];
      for (var y = 0; y < this.board.length; y++) {
         for (var x = 0; x < this.board[y].length; x++) {
            if (this.getElementAt(x, y) == Configuration.ghost_character) {
               ghosts.push(new Ghost(ref_level, x, y));
            }
         }
      }
      return ghosts;
   }
   

   clone() {
      var output = undefined;
      var field_clone = [];
      var row = [];
      var object_clone = '';
      for (var y = 0; y < this.board.length; y++) {
         for (var x = 0; x < this.board[y].length; x++) {
            object_clone = this.createObject(this.getIdAt(x, y), this.getElementAt(x, y));
            row.push(object_clone);
         }
         field_clone.push(row);
         row = [];
      }
      output = new Board("");
      output.board = field_clone;
      return output;
   }
   
   
}