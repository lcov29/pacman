'use strict';

import BoardPosition from './BoardPosition.mjs';
import Configuration from '../../../global/Configuration.mjs';


export default class BoardParser {


    #boardRef = null;


    constructor(boardReference) {
        this.#boardRef = boardReference;
    }


    parse(levelJson) {
        const parsedLevelJson = JSON.parse(levelJson);

        const board = this.#buildBoardPositionArray(parsedLevelJson.board);
        this.#indexAccessiblePositions(board);
        this.#boardRef.board = board;

        this.#boardRef.ghostScatterPositionList = this.#buildBoardElementPositionList(parsedLevelJson.scatterPositionList, board);
        this.#boardRef.ghostOptionalSpawnPositionList = this.#buildBoardElementPositionList(parsedLevelJson.optionalSpawnList, board);
        this.#boardRef.bonusSpawnPositionList = this.#buildBoardElementPositionList(parsedLevelJson.bonusSpawnPositionList, board);
        this.#initializeOtherPositionLists(parsedLevelJson.board);
    }


    #buildBoardElementPositionList(positionList, board) {
        return positionList.map((position) => {
            const elementCharacter = (position.ghost) ? position.ghost : '';
            const boardPosition = new BoardPosition(position.x, position.y, elementCharacter);
            boardPosition.id = board[position.y][position.x].id;
            return boardPosition;
        });
    }


    #initializeOtherPositionLists(board) {
        for (let y = 0; y < board.length; y++) {
           for (let x = 0; x < board[y].length; x++) {
              const elementCharacter = board[y][x];
              const currentBoardPositionId = this.#boardRef.getPosition(x, y).id;
  
              const isCurrentActorPacman = elementCharacter === Configuration.pacmanCharacter;
              if (isCurrentActorPacman) {
                const boardPosition = new BoardPosition(x, y, elementCharacter);
                boardPosition.id = currentBoardPositionId;
                this.#boardRef.initialPacmanPositionList.push(boardPosition);
              }

              const isCurrentActorGhost = Configuration.ghostCharacterList.includes(elementCharacter);
              if (isCurrentActorGhost) {
                const boardPosition = new BoardPosition(x, y, elementCharacter);
                boardPosition.id = currentBoardPositionId;
                this.#boardRef.initialGhostPositionList.push(boardPosition);
              }
  
              const isCurrentElementTeleporter = Configuration.teleporterCharacterList.includes(elementCharacter);
              if (isCurrentElementTeleporter) {
                const boardPosition = new BoardPosition(x, y, elementCharacter);
                boardPosition.id = currentBoardPositionId;
                this.#boardRef.teleporterPositionList.push(boardPosition);
              }
           }
        }
    }


    #buildBoardPositionArray(board) {
        const output = [];
        let row = [];

        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                const currentCharacter = board[y][x];
                const isActorCharacter = Configuration.actorCharacterList.includes(currentCharacter);

                if (isActorCharacter) {
                    row.push(new BoardPosition(x, y, Configuration.emptyTileCharacter));
                } else {
                    row.push(new BoardPosition(x, y, currentCharacter));
                }
            }
            output.push(row);
            row = [];
        }
        return output;
    }


    #indexAccessiblePositions(positionArray) {
        let id = 0;
        for (let y = 0; y < positionArray.length; y++) {
            for (let x = 0; x < positionArray[y].length; x++) {
                const elementCharacter = positionArray[y][x].elementCharacter;
                const isAccessibleByActor = !Configuration.actorsInaccessibleTileCharacterList.includes(elementCharacter);
                
                if (isAccessibleByActor) {
                    positionArray[y][x].id = id;
                    id++;
                }
             }
        }
    }
    
}