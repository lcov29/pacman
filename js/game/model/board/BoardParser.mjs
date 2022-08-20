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
        this.#initializeGhostScatterPositionList(board, parsedLevelJson.scatterPositionList);
        this.#initializeOptionalGhostSpawnPositionList(board, parsedLevelJson.optionalSpawnList);
        this.#initializeBonusSpawnPositionList(parsedLevelJson.bonusSpawnPositionList);
        this.#initializeOtherPositionLists(board);
        this.#boardRef.board = board;
    }


    #buildBoardPositionArray(board) {
        const output = [...board];
        let currentActorCharacter = '';
        let currentElementCharacter = '';

        for (let y = 0; y < output.length; y++) {
            for (let x = 0; x < output[y].length; x++) {
                const currentCharacter = output[y][x];
                const isActorCharacter = Configuration.actorCharacterList.includes(currentCharacter);

                if (isActorCharacter) {
                    currentActorCharacter = currentCharacter;
                    currentElementCharacter = Configuration.emptyTileCharacter;
                } else {
                    currentActorCharacter = Configuration.emptyTileCharacter;
                    currentElementCharacter = currentCharacter;
                }
                output[y][x] = new BoardPosition(x, y, currentActorCharacter, currentElementCharacter);
            }
        }
        return output;
    }


    #indexAccessiblePositions(positionArray) {
        let id = 0;
        for (let y = 0; y < positionArray.length; y++) {
            for (let x = 0; x < positionArray[y].length; x++) {
                const elementCharacter = positionArray[y][x].getElementLayerCharacter();
                const isAccessibleByActor = !Configuration.actorsInaccessibleTileCharacterList.includes(elementCharacter);
                
                if (isAccessibleByActor) {
                    positionArray[y][x].id = id;
                    id++;
                }
             }
        }
    }


    #initializeGhostScatterPositionList(board, scatterPositionList) {
       this.#boardRef.ghostScatterPositionList = this.#buildBoardPositionListFor(board, scatterPositionList);
    }


    #initializeOptionalGhostSpawnPositionList(board, optionalSpawnList) {
        this.#boardRef.ghostOptionalSpawnPositionList = this.#buildBoardPositionListFor(board, optionalSpawnList);
    }


    #initializeBonusSpawnPositionList(bonusSpawnCoordinateList) {
        const bonusSpawnPositionList = [];
        for (let coordinate of bonusSpawnCoordinateList) {
            const spawnBoardPosition = new BoardPosition(coordinate.x, coordinate.y);
            bonusSpawnPositionList.push(spawnBoardPosition);
        }
        this.#boardRef.bonusSpawnPositionList = bonusSpawnPositionList;
    }


    #initializeOtherPositionLists(board) {
        for (let y = 0; y < board.length; y++) {
           for (let x = 0; x < board[y].length; x++) {
              const currentPosition = board[y][x];
              const currentActorCharacter = currentPosition.getActorLayerCharacter();
  
              const isCurrentActorPacman = currentActorCharacter === Configuration.pacmanCharacter;
              if (isCurrentActorPacman) {
                 this.#boardRef.initialPacmanPositionList.push(currentPosition);
              }

              const isCurrentActorGhost = Configuration.ghostCharacterList.includes(currentActorCharacter);
              if (isCurrentActorGhost) {
                this.#boardRef.initialGhostPositionList.push(currentPosition);
              }
  
              const isCurrentElementTeleporter = Configuration.teleporterCharacterList.includes(currentPosition.getElementLayerCharacter());
              if (isCurrentElementTeleporter) {
                this.#boardRef.teleporterPositionList.push(currentPosition);
              }
           }
        }
    }


    #buildBoardPositionListFor(board, positionList) {
        const boardPositionList = [];
        for (let position of positionList) {
            const boardPositionClone = board[position.y][position.x].clone();
            boardPositionClone.actorCharacter = Configuration.emptyTileCharacter;
            boardPositionClone.elementCharacter = position.ghost;
            boardPositionList.push(boardPositionClone);
        }
        return boardPositionList;
    }

    
}