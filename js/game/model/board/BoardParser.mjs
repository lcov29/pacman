'use strict';

import BoardPosition from './BoardPosition.mjs';
import Configuration from '../../../global/Configuration.mjs';


export default class BoardParser {


    #boardRef = null;


    constructor(boardReference) {
        this.#boardRef = boardReference;
    }


    parse(levelJson) {
        let parsedLevelJson = JSON.parse(levelJson);
        let board = this.#buildBoardPositionArray(parsedLevelJson.board);
        this.#indexAccessiblePositions(board);
        this.#initializeGhostScatterPositionList(board, parsedLevelJson);
        this.#initializeOptionalGhostSpawnPositionLists(board, parsedLevelJson);
        this.#initializeOtherPositionLists(board);
        this.#initializeBonusSpawnPositionList(parsedLevelJson.bonusSpawnPositions);
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
                    positionArray[y][x].setID(id);
                    id++;
                }
             }
        }
    }


    #initializeGhostScatterPositionList(board, parsedJson) {
        const positionList = [];
        for (let position of parsedJson.scatterPositions) {
            const boardPositionClone = board[position.y][position.x].clone();
            boardPositionClone.setActorCharacter(Configuration.emptyTileCharacter);
            boardPositionClone.setElementCharacter(position.ghost);
            positionList.push(boardPositionClone);
        }
        this.#boardRef.ghostScatterPositionList = positionList;
    }


    #initializeOptionalGhostSpawnPositionLists(board, parsedJson) {
        const positionList = [];
        for (let position of parsedJson.optionalSpawns) {
            const boardPositionClone = board[position.y][position.x].clone();
            boardPositionClone.setActorCharacter(Configuration.emptyTileCharacter);
            boardPositionClone.setElementCharacter(position.ghost);
            positionList.push(boardPositionClone);
        }
        this.#boardRef.ghostOptionalSpawnPositionList = positionList;
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


    #initializeBonusSpawnPositionList(bonusSpawnCoordinateArray) {
        const bonusSpawnPositionList = [];
        for (let coordinate of bonusSpawnCoordinateArray) {
            const spawnBoardPosition = new BoardPosition(coordinate.x, coordinate.y);
            bonusSpawnPositionList.push(spawnBoardPosition);
        }
        this.#boardRef.bonusSpawnPositionList = bonusSpawnPositionList;
    }

    
}