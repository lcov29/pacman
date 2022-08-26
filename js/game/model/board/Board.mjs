import Configuration from '../../../global/Configuration.mjs';
import BoardParser from './BoardParser.mjs';
import Directions from '../Directions.mjs';


export default class Board {


   #board = [];
   #initialPacmanPositionList = [];
   #initialGhostPositionList = [];
   #teleporterPositionList = [];
   #bonusSpawnPositionList = [];
   #ghostScatterPositionList = [];
   #ghostOptionalSpawnPositionList = [];


   constructor(levelJson) {
      const parsedLevel = new BoardParser().parse(levelJson);

      this.#board = parsedLevel.board;
      this.#initialPacmanPositionList = parsedLevel.pacmanPositionList;
      this.#initialGhostPositionList = parsedLevel.ghostPositionList;
      this.#teleporterPositionList = parsedLevel.teleporterPositionList;
      this.#bonusSpawnPositionList = parsedLevel.spawnPositionList;
      this.#ghostScatterPositionList = parsedLevel.scatterPositionList;
      this.#ghostOptionalSpawnPositionList = parsedLevel.optionalSpawnPositionList;
   }


   get initialPacmanPositionList() {
      return this.#initialPacmanPositionList;
   }


   get initialGhostPositionList() {
      return this.#initialGhostPositionList;
   }


   get teleporterPositionList() {
      return this.#teleporterPositionList;
   }


   get bonusSpawnPositionList() {
      return this.#bonusSpawnPositionList;
   }


   get ghostScatterPositionList() {
      return this.#ghostScatterPositionList;
   }


   get ghostOptionalSpawnPositionList() {
      return this.#ghostOptionalSpawnPositionList;
   }


   getPosition(x, y) {
      return this.#board[y][x].clone();
   }


   updateCharacterAt(x, y, character) {
      const internalPosition = this.#board[y][x];
      internalPosition.elementCharacter = character;
   }


   buildBoardPositionArray() {
      const outputList = [];
      let row = [];
      for (let y = 0; y < this.#board.length; y++) {
         for (let x = 0; x < this.#board[y].length; x++) {
            row.push(this.getPosition(x, y));
         }
         outputList.push(row);
         row = [];
      }
      return outputList;
   }


   buildAccessibleBoardPositionList() {
      const outputList = [];

      const addAccessiblePosition = (x, y) => {
         if (this.#isAccessibleAt(x, y)) {
            outputList.push(this.getPosition(x, y));
         }
      }

      this.#forEachBoardPosition(addAccessiblePosition);
      return outputList;
   }


   buildAccessibleNeighborIdList() {
      const outputList = [];
      let idList = [];

      const addAccessibleNeighborId = (x, y) => {
         if (this.#isAccessibleAt(x, y)) {
            for(let position of this.buildAccessibleNeighborList(x, y)) {
               idList.push(position.id);
            }
            outputList.push(idList);
            idList = [];
         }
      };

      this.#forEachBoardPosition(addAccessibleNeighborId);
      return outputList;
   }


   buildAccessibleNeighborList(xPosition, yPosition) {
      const neighborPositionList = [];

      for (let i = Directions.getMinDirectionID(); i <= Directions.getMaxDirectionID(); i++) {
         const direction = Directions.getDirectionByID(i);
         const neighborX = xPosition + direction.x;
         const neighborY = yPosition + direction.y;
         if (this.#isIndexOnBoard(neighborX, neighborY) && this.#isAccessibleAt(neighborX, neighborY)) {
            neighborPositionList.push(this.getPosition(neighborX, neighborY));
         }
      }
      return neighborPositionList;
   }


   countOccurrencesOfCharacters(characterList) {
      let counter = 0;

      const countCharacters = (x, y) => {
         for (let character of characterList) {
            if (this.#board[y][x].elementCharacter === character) {
               counter++;
               break;
            }
         }
      };

      this.#forEachBoardPosition(countCharacters);
      return counter;
   }


   #isAccessibleAt(x, y) {
      return this.#board[y][x].id !== Configuration.idInaccessibleBoardTiles;
   }


   #isIndexOnBoard(x, y) {
      return 0 <= y && y < this.#board.length && 
             0 <= x && x < this.#board[y].length;
   }


   #forEachBoardPosition(func) {
      for (let y = 0; y < this.#board.length; y++) {
         for (let x = 0; x < this.#board[y].length; x++) {
            func(x, y);
         }
      }
   }
   
   
}