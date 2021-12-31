"use strict";

class Board {

   
   constructor(board_text) {
      this.board = new BoardParser().parse(board_text);
      this.initial_pacman_positions = [];
      this.initial_ghost_positions = [];
      this.teleporter_positions = [];
      this.searchCurrentPositions();
   }


   setPosition(position) {
      let internal_position = this.board[position.getY()][position.getX()];
      internal_position.setCharacter(position.getCharacter());
      internal_position.setMovementDirection(position.getMovementDirection());
   }
   

   getPosition(x, y) {
      return this.board[y][x].clone();
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


   isAccessibleAt(x, y) {
      return this.board[y][x].getID() != Configuration.id_unaccessible_board_element;
   }


   isIndexOnBoard(x, y) {
      return 0 <= y && y < this.board.length &&
             0 <= x && x < this.board[y].length;
   }


   getBoardPositionArray() {
      var output = [];
      var row = [];
      for (var y = 0; y < this.board.length; y++) {
         for (var x = 0; x < this.board[y].length; x++) {
            row.push(this.getPosition(x, y));
         }
         output.push(row);
         row = [];
      }
      return output;
   }


   getAccessibleBoardPositionList() {
      var output = [];
      for (var y = 0; y < this.board.length; y++) {
         for (var x = 0; x < this.board[y].length; x++) {
            if (this.isAccessibleAt(x, y)) {
               output.push(this.getPosition(x, y));
            }
         }
      }
      return output;
   }


   getAccessibleNeighborIdList() {
      var output = [];
      for (var y = 0; y < this.board.length; y++) {
         for (var x = 0; x < this.board[y].length; x++) {
            if (this.isAccessibleAt(x, y)) {
               output.push(this.getNeighboringIDs(x, y));
            }
         }
      }
      return output;
   }


   getNeighboringIDs(xPosition, yPosition) {
      var neighbor_ids = [];
      var direction = undefined;
      var neighbor_x = undefined;
      var neighbor_y = undefined;

      for (var i = Directions.min_direction_id; i <= Directions.max_direction_id; i++) {
         direction = Directions.getDirectionByID(i);
         neighbor_x = xPosition + direction.x;
         neighbor_y = yPosition + direction.y;
         if (this.isIndexOnBoard(neighbor_x, neighbor_y) && this.isAccessibleAt(neighbor_x, neighbor_y)) {
            neighbor_ids.push(this.board[neighbor_y][neighbor_x].getID());
         }
      }
      return neighbor_ids;
   }


   searchCurrentPositions() {
      for (var y = 0; y < this.board.length; y++) {
         for (var x = 0; x < this.board[y].length; x++) {
            let current_position = this.getPosition(x, y);
            switch (current_position.getCharacter()) {

               case Configuration.pacman_character:
                  this.initial_pacman_positions.push(current_position);
                  break;

               case Configuration.ghost_blinky_character:                  // add different ghost types
                  this.initial_ghost_positions.push(current_position);
                  break;

               case Configuration.teleporter_1_tile_character:
               case Configuration.teleporter_2_tile_character:
               case Configuration.teleporter_3_tile_character:
                  this.teleporter_positions.push(current_position);
                  break;
            }
         }
      }
   }

  
   countAvailablePoints() {
      var number_of_points = 0;
      for (var y = 0; y < this.board.length; y++) {
         for (var x = 0; x < this.board[y].length; x++) {
            if (this.board[y][x].getCharacter() == Configuration.point_character) {
               number_of_points++;
            }
         }
      }
      return number_of_points;
   }
   
}