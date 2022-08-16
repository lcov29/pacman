'use strict';

import Configuration from '../Configuration.mjs';
import Utility from '../Utility.mjs';


export default class EditorInternalLevel {


    #internalBoard = [[]];
    #scatterPositionList = [];
    #optionalSpawnPositionList = [];
    #bonusSpawnPositionList = [];
    #ghostBlinkyCoordinateList = [];
    #ghostPinkyCoordinateList = [];
    #ghostInkyCoordinateList = [];
    #ghostClydeCoordinateList = [];
    #characterToCoordinateListMap = null;


    constructor() {
        this.#internalBoard = [[]];
        this.#scatterPositionList = [];
        this.#optionalSpawnPositionList = [];
        this.#bonusSpawnPositionList = [];
        this.#ghostBlinkyCoordinateList = [];
        this.#ghostPinkyCoordinateList = [];
        this.#ghostInkyCoordinateList = [];
        this.#ghostClydeCoordinateList = [];
        this.#characterToCoordinateListMap = new Map();
    }


    initialize(width, height) {
        this.#reset();
        this.#buildEmptyMap(width, height);
        this.#initializeCharacterToCoordinateListMap();
    }


    getBoardCharacterAt(coordinateString) {
        const coordinate = this.#parseCoordinateString(coordinateString);
        return this.#internalBoard[coordinate.y][coordinate.x];
    }


    getGhostCoordinateListFor(ghostCharacter) {
        const coordinate = this.#characterToCoordinateListMap.get(ghostCharacter);
        return [...coordinate];
    }


    getGhostCounterFor(ghostCharacter) {
        const coordinate = this.#characterToCoordinateListMap.get(ghostCharacter);
        return coordinate.length;
    }


    getGhostCharacterListForScatterPosition(coordinateString) {
        return this.#getGhostCharacterListForPositionAt(this.#scatterPositionList, coordinateString);
    }


    getGhostCharacterListForSpawnPosition(coordinateString) {
        return this.#getGhostCharacterListForPositionAt(this.#optionalSpawnPositionList, coordinateString);
    }


    isCoordinateBonusSpawnPosition(coordinateString) {
        let result = false;
        const coordinate = this.#parseCoordinateString(coordinateString);
        for (let spawnPosition of this.#bonusSpawnPositionList) {
            if (spawnPosition.x === coordinate.x && spawnPosition.y === coordinate.y) {
                result = true;
                break;
            }
        }
        return result;
    }


    update(coordinateString, character) {
        const coordinate = this.#parseCoordinateString(coordinateString);
        const currentBoardCharacter = this.getBoardCharacterAt(coordinateString);
        this.#updateGhostCoordinateList(coordinateString, currentBoardCharacter, character);
        this.#setBoardCharacter(coordinate, character);
    }


    addScatterPosition(ghostCharacter, coordinateString) {
        this.removeScatterPositionFor(ghostCharacter);
        const positionObject = this.#buildScatterSpawnPositionObject(ghostCharacter, coordinateString);
        this.#scatterPositionList.push(positionObject);
    }


    addOptionalSpawnPosition(ghostCharacter, coordinateString) {
        this.removeSpawnPositionFor(ghostCharacter);
        const positionObject = this.#buildScatterSpawnPositionObject(ghostCharacter, coordinateString);
        this.#optionalSpawnPositionList.push(positionObject);
    }


    addBonusSpawnPosition(coordinateString) {
        this.removeBonusSpawnPositionAt(coordinateString);
        const positionObject = this.#buildBonusSpawnPositionObject(coordinateString);
        this.#bonusSpawnPositionList.push(positionObject);
    }


    removeScatterPositionFor(ghostCharacter) {
        this.#removeCharacterFromPositionList(this.#scatterPositionList, ghostCharacter);
    }


    removeSpawnPositionFor(ghostCharacter) {
        this.#removeCharacterFromPositionList(this.#optionalSpawnPositionList, ghostCharacter);
    }


    removeBonusSpawnPositionAt(coordinateString) {
        this.#removeCoordinateFromPositionList(this.#bonusSpawnPositionList, coordinateString);
    }


    removeScatterPosition(coordinateString) {
       this.#removeCoordinateFromPositionList(this.#scatterPositionList, coordinateString);
    }


    removeSpawnPosition(coordinateString) {
       this.#removeCoordinateFromPositionList(this.#optionalSpawnPositionList, coordinateString)
    }


    buildLevelJSONString() {
        const jsonObject = {};
        jsonObject.board = this.#internalBoard;
        jsonObject.scatterPositions = this.#scatterPositionList;
        jsonObject.optionalSpawns = this.#optionalSpawnPositionList;
        jsonObject.bonusSpawnPositions = this.#bonusSpawnPositionList;
        return JSON.stringify(jsonObject);
    }


    #initializeCharacterToCoordinateListMap() {
        this.#characterToCoordinateListMap.set(Configuration.ghostBlinkyCharacter, this.#ghostBlinkyCoordinateList);
        this.#characterToCoordinateListMap.set(Configuration.ghostPinkyCharacter, this.#ghostPinkyCoordinateList);
        this.#characterToCoordinateListMap.set(Configuration.ghostInkyCharacter, this.#ghostInkyCoordinateList);
        this.#characterToCoordinateListMap.set(Configuration.ghostClydeCharacter, this.#ghostClydeCoordinateList);
    }


    #getGhostCharacterListForPositionAt(positionList, coordinateString) {
        const output = [];
        const coordinate = this.#parseCoordinateString(coordinateString);
        for (let position of positionList) {
            const isSamePosition = position.x === coordinate.x && position.y === coordinate.y;
            if (isSamePosition) {
                output.push(position.ghost);
            }
        }
        return output;
    }


    #setBoardCharacter(coordinates, character) {
        this.#internalBoard[coordinates.y][coordinates.x] = character;
    }


    #buildEmptyMap(width, height) {
        this.#internalBoard = [];
        const row = [];
        for (let x = 0; x < width; x++) {
            row.push(Configuration.undefinedTileCharacter);
        }
        for (let y = 0; y < height; y++) {
            this.#internalBoard.push([...row]);
        }
    }


    #reset() {
        this.#internalBoard = [[]];
        this.#scatterPositionList = [];
        this.#optionalSpawnPositionList = [];
        this.#bonusSpawnPositionList = [];
        this.#ghostBlinkyCoordinateList = [];
        this.#ghostPinkyCoordinateList = [];
        this.#ghostInkyCoordinateList = [];
        this.#ghostClydeCoordinateList = [];
    }


    #updateGhostCoordinateList(coordinateString, currentBoardCharacter, newCharacter) {

        const isCurrentCharacterGhost = Configuration.ghostCharacterList.includes(currentBoardCharacter);
        if (isCurrentCharacterGhost) {
            this.#removeCoordinateStringFromGhostList(coordinateString, currentBoardCharacter);
        }

        const isNewCharacterGhost = Configuration.ghostCharacterList.includes(newCharacter);
        if (isNewCharacterGhost) {
            this.#addCoordinateToGhostList(coordinateString, newCharacter);
        }
    }


    #addCoordinateToGhostList(coordinate, ghostCharacter) {
        const ghostCoordinateList = this.#characterToCoordinateListMap.get(ghostCharacter);
        ghostCoordinateList.push(coordinate);
    }


    #removeCharacterFromPositionList(positionList, ghostCharacter) {
        for (let position of positionList) {
            const isSameCharacter = position.ghost === ghostCharacter;
            if (isSameCharacter) {
                Utility.removeElementFrom(positionList, position);
            }
        }
    }


    #removeCoordinateFromPositionList(positionList, coordinateString) {
        const coordinate = this.#parseCoordinateString(coordinateString);
        for (let position of positionList) {
            const isSameCoordinate = position.x === coordinate.x && position.y === coordinate.y;
            if (isSameCoordinate) {
                Utility.removeElementFrom(positionList, position);
            }
        }
    }


    #buildScatterSpawnPositionObject(ghostCharacter, coordinateString) {
        const coordinate = this.#parseCoordinateString(coordinateString);
        const positionObject = {};
        positionObject.ghost = ghostCharacter;
        positionObject.x = coordinate.x;
        positionObject.y = coordinate.y;
        return positionObject;
    }


    #buildBonusSpawnPositionObject(coordinateString) {
        const coordinate = this.#parseCoordinateString(coordinateString);
        const positionObject = {};
        positionObject.x = coordinate.x;
        positionObject.y = coordinate.y;
        return positionObject;
    }


    #removeCoordinateStringFromGhostList(coordinateString, ghostCharacter) {
        const ghostCoordinateList = this.#characterToCoordinateListMap.get(ghostCharacter);
        Utility.removeElementFrom(ghostCoordinateList, coordinateString);
    }


    #parseCoordinateString(coordinateString) {
        let parsedInput = coordinateString.replace('(', '');
        parsedInput = parsedInput.replace(')', '');
        parsedInput = parsedInput.split(',');
        const x = parseInt(parsedInput[0]);
        const y = parseInt(parsedInput[1]);
        return {'x': x, 'y': y};
    }

    
}