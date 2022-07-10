'use strict';

import Configuration from '../Configuration.mjs';
import BoardParser from './BoardParser.mjs';
import Directions from './Directions.mjs';


export default class Board {

   
   constructor(levelJson) {
      this.board = [];
      this.initialPacmanPositions = [];
      this.initialGhostPositions = [];
      this.teleporterPositions = [];
      this.bonusSpawnPositions = [];
      this.ghostDoorPositions = [];
      this.ghostScatterPositions = [];
      this.ghostOptionalSpawnPositions = [];
      new BoardParser(this).parse(levelJson);
   }


   setBoard(board) {
      this.board = board;
   }


   setInitialPacmanPositions(positions) {
      this.initialPacmanPositions = positions;
   }


   setInitialGhostPositions(positions) {
      this.initialGhostPositions = positions;
   }


   setTeleporterPositions(positions) {
      this.teleporterPositions = positions;
   }


   setBonusSpawnPositions(positions) {
      this.bonusSpawnPositions = positions;
   }

   
   setGhostDoorPositions(positions) {
      this.ghostDoorPositions = positions;
   }


   setGhostScatterPositions(positions) {
      this.ghostScatterPositions = positions;
   }


   setGhostOptionalSpawnPositions(positions) {
      this.ghostOptionalSpawnPositions = positions;
   }


   /*
   setPosition(position) {
      let internalPosition = this.board[position.getY()][position.getX()];
      internalPosition.setActorCharacter(position.getActorCharacter());
      internalPosition.setElementCharacter(position.getElementCharacter());
   } */


   updateActorLayerPosition(x, y, character) {
      const internalPosition = this.board[y][x];
      internalPosition.setActorCharacter(character);
   }


   updateElementLayerPosition(x, y, character) {
      const internalPosition = this.board[y][x];
      internalPosition.setElementCharacter(character);
   }


   getPosition(x, y) {
      return this.board[y][x].clone();
   }


   getInitialPacmanPositions() {
      return this.initialPacmanPositions;
   }


   getInitialGhostPositions() {
      return this.initialGhostPositions;
   }


   getTeleporterPositions() {
      return this.teleporterPositions;
   }


   getBonusSpawnPositions() {
      return this.bonusSpawnPositions;
   }


   getGhostDoorPositions() {
      return this.ghostDoorPositions;
   }


   getGhostScatterPositions() {
      return this.ghostScatterPositions;
   }


   getOptionalGhostSpawnPositions() {
      return this.ghostOptionalSpawnPositions;
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
      let neighborPositions = [];
      let direction = null;
      let neighborX = -1;
      let neighborY = -1;

      for (let i = Directions.getMinDirectionID(); i <= Directions.getMaxDirectionID(); i++) {
         direction = Directions.getDirectionByID(i);
         neighborX = xPosition + direction.x;
         neighborY = yPosition + direction.y;
         if (this.isIndexOnBoard(neighborX, neighborY) && this.isAccessibleAt(neighborX, neighborY)) {
            neighborPositions.push(this.getPosition(neighborX, neighborY));
         }
      }
      return neighborPositions;
   }


   isAccessibleAt(x, y) {
      return this.board[y][x].getID() !== Configuration.ID_UNACCESSIBLE_BOARD_TILES;
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
   
   
}