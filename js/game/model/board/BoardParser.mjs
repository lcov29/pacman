'use strict';

import BoardPosition from './BoardPosition.mjs';
import Configuration from '../../../global/Configuration.mjs';


export default class BoardParser {


    parse(levelJson) {
        const parsedLevelJson = JSON.parse(levelJson);

        const board = this.#buildBoardPositionArray(parsedLevelJson.board);
        this.#indexAccessiblePositions(board);

        const spawnPositionList = this.#buildBoardElementPositionList(parsedLevelJson.bonusSpawnPositionList, board);
        const scatterPositionList = this.#buildBoardElementPositionList(parsedLevelJson.scatterPositionList, board);
        const optionalSpawnPositionList = this.#buildBoardElementPositionList(parsedLevelJson.optionalSpawnList, board);

        const pacmanPositionList = this.#buildActorPositionListFor([Configuration.pacmanCharacter], parsedLevelJson.board, board);
        const ghostPositionList = this.#buildActorPositionListFor(Configuration.ghostCharacterList, parsedLevelJson.board, board);
        const teleporterPositionList = this.#buildActorPositionListFor(Configuration.teleporterCharacterList, parsedLevelJson.board, board);

        return {board, spawnPositionList, scatterPositionList, optionalSpawnPositionList,
                pacmanPositionList, ghostPositionList, teleporterPositionList};
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


    #buildBoardElementPositionList(positionList, board) {
        return positionList.map((position) => {
            const elementCharacter = (position.ghost) ? position.ghost : '';
            const boardPosition = new BoardPosition(position.x, position.y, elementCharacter);
            boardPosition.id = board[position.y][position.x].id;
            return boardPosition;
        });
    }


    #buildActorPositionListFor(actorCharacterList, parsedJsonBoard, indexedBoard) {
        const actorBoardPositionList = [];

        const initializeBoardPositionList = (x, y) => {
            const currentCharacter = parsedJsonBoard[y][x];
            const currentBoardPositionId = indexedBoard[y][x].id;

            const isMatchingCharacter = actorCharacterList.includes(currentCharacter);

            if (isMatchingCharacter) {
              const boardPosition = new BoardPosition(x, y, currentCharacter);
              boardPosition.id = currentBoardPositionId;
              actorBoardPositionList.push(boardPosition);
            }
        };

        this.#forEachPosition(initializeBoardPositionList, parsedJsonBoard);
        return actorBoardPositionList;
    }



    #forEachPosition(func, positionArray) {
        for (let y = 0; y < positionArray.length; y++) {
           for (let x = 0; x < positionArray[y].length; x++) {
              func(x, y);
           }
        }
     }

    
}