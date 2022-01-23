"use strict";

import Configuration from "./Configuration.mjs";
import BoardParser from "./BoardParser.mjs";
import Directions from "./Directions.mjs";


export default class Board {

   
   constructor(level_json) {
      this.board = [];
      this.initial_pacman_positions = [];
      this.initial_ghost_positions = [];
      this.teleporter_positions = [];
      this.ghost_door_positions = [];
      this.ghost_scatter_positions = [];
      this.ghost_optional_spawn_positions = [];
      new BoardParser(this).parse(level_json);
   }


   setBoard(board) {
      this.board = board;
   }


   setInitialPacmanPositions(positions) {
      this.initial_pacman_positions = positions;
   }


   setInitialGhostPositions(positions) {
      this.initial_ghost_positions = positions;
   }


   setTeleporterPositions(positions) {
      this.teleporter_positions = positions;
   }

   
   setGhostDoorPositions(positions) {
      this.ghost_door_positions = positions;
   }


   setGhostScatterPositions(positions) {
      this.ghost_scatter_positions = positions;
   }


   setGhostOptionalSpawnPositions(positions) {
      this.ghost_optional_spawn_positions = positions;
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

      for (let i = Directions.getMinDirectionID(); i <= Directions.getMaxDirectionID(); i++) {
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