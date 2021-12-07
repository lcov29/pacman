"use strict";

class Board {

   
   constructor(board_text) {
      this.board = new BoardParser().parse(board_text);
      this.initial_pacman_positions = [];
      this.initial_ghost_positions = [];
      this.teleporter_positions = [];
      this.searchCurrentPositions();
   }


   setElementAt(position, element) {
      this.board[position.getY()][position.getX()].setElement(element);
   }
   
   
   getElementAt(position) {
      return this.board[position.getY()][position.getX()].getElement();
   }


   getElementAtIndex(xPosition, yPosition) {
      return this.board[yPosition][xPosition].getElement();
   }
   

   getIdAt(position) {
      return this.board[position.getY()][position.getX()].getID();
   } 


   getIdAtIndex(xPosition, yPosition) {
      return this.board[yPosition][xPosition].getID();
   }
   

   getRowCount() {
      return this.board.length;
   }


   getColumnCountFor(index) {
      return this.board[index].length;
   }


   getInitialPacmanPositions() {
      return this.initial_pacman_positions;
   }


   getInitialGhostPositions() {
      return this.initial_ghost_positions;
   }


   getTeleporterPositions() {
      return this.teleporter_positions;
   }


   searchCurrentPositions() {
      for (var y = 0; y < this.board.length; y++) {
         for (var x = 0; x < this.board[y].length; x++) {
            switch (this.getElementAtIndex(x, y)) {

               case Configuration.pacman_character:
                  this.initial_pacman_positions.push(new BoardPosition(x, y));
                  break;

               case Configuration.ghost_character:
                  this.initial_ghost_positions.push(new BoardPosition(x, y));
                  break;

               case Configuration.teleporter_1_tile_character:
               case Configuration.teleporter_2_tile_character:
               case Configuration.teleporter_3_tile_character:
                  this.teleporter_positions.push(new BoardPosition(x, y));
                  break;
            }
         }
      }
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
   

   clone() {
      var output = undefined;
      var board_clone = [];
      var row = [];
      var element_clone = '';
      for (var y = 0; y < this.board.length; y++) {
         for (var x = 0; x < this.board[y].length; x++) {
            element_clone = this.board[y][x].clone();
            row.push(element_clone);
         }
         board_clone.push(row);
         row = [];
      }
      output = new Board("");
      output.board = board_clone;
      return output;
   }
   
}