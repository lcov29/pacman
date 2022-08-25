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

        this.#initializeBoardElementPositionList(parsedLevelJson.scatterPositionList, this.#boardRef.ghostScatterPositionList);
        this.#initializeBoardElementPositionList(parsedLevelJson.optionalSpawnList, this.#boardRef.ghostOptionalSpawnPositionList);
        this.#initializeBoardElementPositionList(parsedLevelJson.bonusSpawnPositionList, this.#boardRef.bonusSpawnPositionList);
        this.#initializeOtherPositionLists(parsedLevelJson.board);

        const board = this.#buildBoardPositionArray(parsedLevelJson.board);
        this.#indexAccessiblePositions(board);
        this.#boardRef.board = board;
    }


    #initializeBoardElementPositionList(initialList, boardRefList) {
        const elementCharacter = (position.ghost) ? position.ghost : 'bonusSpawn';
        boardRefList = initialList.map((position) => new BoardPosition(position.x, position.y, elementCharacter));
    }


    #initializeOtherPositionLists(board) {
        for (let y = 0; y < board.length; y++) {
           for (let x = 0; x < board[y].length; x++) {
              const currentCharacter = board[y][x];
  
              const isCurrentCharacterPacman = currentCharacter === Configuration.pacmanCharacter;
              if (isCurrentCharacterPacman) {
                 this.#boardRef.initialPacmanPositionList.push(new BoardPosition(x, y, currentCharacter));
              }

              const isCurrentCharacterGhost = Configuration.ghostCharacterList.includes(currentCharacter);
              if (isCurrentCharacterGhost) {
                this.#boardRef.initialGhostPositionList.push(new BoardPosition(x, y, currentCharacter));
              }
  
              const isCurrentCharacterTeleporter = Configuration.teleporterCharacterList.includes(currentCharacter);
              if (isCurrentCharacterTeleporter) {
                this.#boardRef.teleporterPositionList.push(new BoardPosition(x, y, currentCharacter));
              }
           }
        }
    }


    #buildBoardPositionArray(board) {
        const output = [...board];

        for (let y = 0; y < output.length; y++) {
            for (let x = 0; x < output[y].length; x++) {
                const currentCharacter = output[y][x];
                const isActorCharacter = Configuration.actorCharacterList.includes(currentCharacter);

                if (isActorCharacter) {
                    output[y][x] = new BoardPosition(x, y, Configuration.emptyTileCharacter);
                } else {
                    output[y][x] = new BoardPosition(x, y, currentCharacter);
                }
            }
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