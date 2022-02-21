'use strict';

import BoardPosition from './BoardPosition.mjs';
import Configuration from '../Configuration.mjs';


export default class BoardParser {


    constructor(boardReference) {
        this.boardRef = boardReference;
    }


    parse(levelJson) {
        let parsedLevelJson = JSON.parse(levelJson);
        let board = this.buildBoardPositionArray(parsedLevelJson.board);
        this.indexAccessiblePositions(board);
        this.initializeGhostScatterPositionList(board, parsedLevelJson);
        this.initializeOptionalGhostSpawnPositionLists(board, parsedLevelJson);
        this.initializeOtherPositionLists(board);
        this.boardRef.setBonusSpawnPositions(parsedLevelJson.bonusSpawnPositions);
        this.boardRef.setBoard(board);
    }


    buildBoardPositionArray(board) {
        let output = [...board];
        let currentCharacter = '';
        let currentActorCharacter = '';
        let currentElementCharacter = '';

        for (let y = 0; y < output.length; y++) {
            for (let x = 0; x < output[y].length; x++) {
                currentCharacter = output[y][x];
                if (this.isActor(currentCharacter)) {
                    currentActorCharacter = currentCharacter;
                    currentElementCharacter = Configuration.EMPTY_TILE_CHARACTER;
                } else {
                    currentActorCharacter = Configuration.EMPTY_TILE_CHARACTER;
                    currentElementCharacter = currentCharacter;
                }
                output[y][x] = new BoardPosition(x, y, currentActorCharacter, currentElementCharacter);
            }
        }
        return output;
    }


    indexAccessiblePositions(positionArray) {
        let id = 0;
        let character = '';
        for (let y = 0; y < positionArray.length; y++) {
            for (let x = 0; x < positionArray[y].length; x++) {
                character = positionArray[y][x].getElementCharacter();
                if (this.isAccessibleByActor(character)) {
                    positionArray[y][x].setID(id);
                    id++;
                }
             }
        }
    }


    initializeGhostScatterPositionList(board, parsedJson) {
        let positions = [];
        for (let position of parsedJson.scatterPositions) {
            let boardPositionClone = board[position.y][position.x].clone();
            boardPositionClone.setActorCharacter(Configuration.EMPTY_TILE_CHARACTER);
            boardPositionClone.setElementCharacter(position.ghost);
            positions.push(boardPositionClone);
        }
        this.boardRef.setGhostScatterPositions(positions);
    }


    initializeOptionalGhostSpawnPositionLists(board, parsedJson) {
        let positions = [];
        for (let position of parsedJson.optionalSpawns) {
            let boardPositionClone = board[position.y][position.x].clone();
            boardPositionClone.setActorCharacter(Configuration.EMPTY_TILE_CHARACTER);
            boardPositionClone.setElementCharacter(position.ghost);
            positions.push(boardPositionClone);
        }
        this.boardRef.setGhostOptionalSpawnPositions(positions);
    }


    initializeOtherPositionLists(board) {
        let initialPacmanPositions = [];
        let initialGhostPositions = [];
        let teleporterPositions = [];
        let ghostDoorPositions = [];

        for (let y = 0; y < board.length; y++) {
           for (let x = 0; x < board[y].length; x++) {
              let currentPosition = board[y][x];
              let currentActorCharacter = currentPosition.getActorCharacter();
              let currentElementCharacter = currentPosition.getElementCharacter();
  
              if (currentActorCharacter === Configuration.PACMAN_CHARACTER) {
                 initialPacmanPositions.push(currentPosition);
              }

              if (Configuration.GHOST_CHARACTERS.includes(currentActorCharacter)) {
                 initialGhostPositions.push(currentPosition);
              }
  
              if (Configuration.TELEPORTER_CHARACTERS.includes(currentElementCharacter)) {
                 teleporterPositions.push(currentPosition);
              }
  
              if (currentElementCharacter === Configuration.GHOST_DOOR_CHARACTER) {
                 ghostDoorPositions.push(currentPosition);
              }   
           }
        }
        this.boardRef.setInitialPacmanPositions(initialPacmanPositions);
        this.boardRef.setInitialGhostPositions(initialGhostPositions);
        this.boardRef.setTeleporterPositions(teleporterPositions);
        this.boardRef.setGhostDoorPositions(ghostDoorPositions);
    }


    isActor(character) {
        return Configuration.ACTOR_CHARACTERS.includes(character);
    }


    isAccessibleByActor(character) {
        return (Configuration.ACTORS_INACCESSIBLE_TILES.includes(character) === false)
    }


    
}