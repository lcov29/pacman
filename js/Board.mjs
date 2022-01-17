"use strict";

import Configuration from "./Configuration.mjs";
import BoardParser from "./BoardParser.mjs";
import Directions from "./Directions.mjs";


export default class Board {

   
   constructor(board_text) {
      this.board = new BoardParser().parse(board_text);
      this.initial_pacman_positions = [];
      this.initial_ghost_positions = [];
      this.teleporter_positions = [];
      this.ghost_door_positions = [];
      this.ghost_scatter_positions = [];
      this.ghost_optional_spawn_positions = [];
      this.searchCurrentPositions();
   }


   setPosition(position) {
      let internal_position = this.board[position.getY()][position.getX()];
      internal_position.setActorCharacter(position.getActorCharacter());
      internal_position.setElementCharacter(position.getElementCharacter());
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


   getGhostDoorPositions() {
      return this.ghost_door_positions;
   }


   getGhostScatterPositions() {
      return this.ghost_scatter_positions;
   }


   getOptionalGhostSpawnPositions() {
      return this.ghost_optional_spawn_positions;
   }


   buildBoardPositionArray() {
      let output = [];
      let row = [];
      for (let y = 0; y < this.board.length; y++) {
         for (let x = 0; x < this.board[y].length; x++) {
            row.push(this.getPosition(x, y));
         }
         output.push(row);
         row = [];
      }
      return output;
   }


   buildAccessibleBoardPositionList() {
      let output = [];
      for (let y = 0; y < this.board.length; y++) {
         for (let x = 0; x < this.board[y].length; x++) {
            if (this.isAccessibleAt(x, y)) {
               output.push(this.getPosition(x, y));
            }
         }
      }
      return output;
   }


   buildAccessibleNeighborIdList() {
      let output = [];
      let ids = [];
      for (let y = 0; y < this.board.length; y++) {
         for (let x = 0; x < this.board[y].length; x++) {
            if (this.isAccessibleAt(x, y)) {
               for(let position of this.buildAccessibleNeighborList(x, y)) {
                  ids.push(position.getID());
               }
               output.push(ids);
               ids = [];
            }
         }
      }
      return output;
   }


   buildAccessibleNeighborList(xPosition, yPosition) {
      let neighbor_positions = [];
      let direction = null;
      let neighbor_x = -1;
      let neighbor_y = -1;

      for (let i = Directions.min_direction_id; i <= Directions.max_direction_id; i++) {
         direction = Directions.getDirectionByID(i);
         neighbor_x = xPosition + direction.x;
         neighbor_y = yPosition + direction.y;
         if (this.isIndexOnBoard(neighbor_x, neighbor_y) && this.isAccessibleAt(neighbor_x, neighbor_y)) {
            neighbor_positions.push(this.getPosition(neighbor_x, neighbor_y));
         }
      }
      return neighbor_positions;
   }


   isAccessibleAt(x, y) {
      return this.board[y][x].getID() !== Configuration.id_unaccessible_board_element;
   }


   isIndexOnBoard(x, y) {
      return 0 <= y && y < this.board.length &&
             0 <= x && x < this.board[y].length;
   }


   searchCurrentPositions() {
      for (let y = 0; y < this.board.length; y++) {
         for (let x = 0; x < this.board[y].length; x++) {
            let current_position = this.getPosition(x, y);

            switch (current_position.getActorCharacter()) {
               case Configuration.pacman_character:
                  this.initial_pacman_positions.push(current_position);
                  break;

               case Configuration.ghost_blinky_character:                  // add different ghost types
                  this.initial_ghost_positions.push(current_position);
                  break;
            }

            switch (current_position.getElementCharacter()) {
               case Configuration.teleporter_1_tile_character:
               case Configuration.teleporter_2_tile_character:
               case Configuration.teleporter_3_tile_character:
                  this.teleporter_positions.push(current_position);
                  break;

               case Configuration.ghost_door_character:
                  this.ghost_door_positions.push(current_position);
                  break;

               case Configuration.scatter_point_character_blinky:
               case Configuration.scatter_point_character_pinky:
               case Configuration.scatter_point_character_inky:
               case Configuration.scatter_point_character_clyde:
                  this.ghost_scatter_positions.push(current_position);
                  break;

               case Configuration.ghost_blinky_spawn_character:
                  this.ghost_optional_spawn_positions.push(current_position);
                  break;
            }
         }
      }
   }


   countOccurrencesOfCharacters(characters) {
      let counter = 0;
      for (let y = 0; y < this.board.length; y++) {
         for (let x = 0; x < this.board[y].length; x++) {
            for (let character of characters) {
               if (this.board[y][x].getActorCharacter() === character ||
                   this.board[y][x].getElementCharacter() === character) {
                  counter++;
                  break;
               }
            }
         }
      }
      return counter;
   }


   setCharactersOfScatterPositionsTo(character) {
      for (let position of this.ghost_scatter_positions) {
         position.setElementCharacter(character);
         this.setPosition(position);
      }
   }


   setCharactersOfOptionalSpawnPositionsTo(character) {
      for (let position of this.ghost_optional_spawn_positions) {
         position.setElementCharacter(character);
         this.setPosition(position);
      }
   }
   
   
}