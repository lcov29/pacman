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
        this.reset();
        this.#buildEmptyMap(width, height);
        this.#initializeCharacterToCoordinateListMap();
    }


    #initializeCharacterToCoordinateListMap() {
        this.#characterToCoordinateListMap.set(Configuration.ghostBlinkyCharacter, this.#ghostBlinkyCoordinateList);
        this.#characterToCoordinateListMap.set(Configuration.ghostPinkyCharacter, this.#ghostPinkyCoordinateList);
        this.#characterToCoordinateListMap.set(Configuration.ghostInkyCharacter, this.#ghostInkyCoordinateList);
        this.#characterToCoordinateListMap.set(Configuration.ghostClydeCharacter, this.#ghostClydeCoordinateList);
    }


    getBoardCharacterAt(coordinateString) {
        const coordinate = this.parseCoordinates(coordinateString);
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


    getGhostCharactersForScatterPosition(coordinateString) {
        return this.#getGhostCharacterListForPositionAt(this.#scatterPositionList, coordinateString);
    }


    getGhostCharactersForSpawnPosition(coordinateString) {
        return this.#getGhostCharacterListForPositionAt(this.#optionalSpawnPositionList, coordinateString);
    }


    #getGhostCharacterListForPositionAt(positionList, coordinateString) {
        const output = [];
        const coordinate = this.parseCoordinates(coordinateString);
        for (let position of positionList) {
            const isSamePosition = position.x === coordinate.x && position.y === coordinate.y;
            if (isSamePosition) {
                output.push(position.ghost);
            }
        }
        return output;
    }


    setBoardCharacter(coordinates, character) {
        this.#internalBoard[coordinates.y][coordinates.x] = character;
    }


    isCoordinateBonusSpawnPosition(coordinateString) {
        let result = false;
        const coordinate = this.parseCoordinates(coordinateString);
        for (let spawnPosition of this.#bonusSpawnPositionList) {
            if (spawnPosition.x === coordinate.x && spawnPosition.y === coordinate.y) {
                result = true;
                break;
            }
        }
        return result;
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


    reset() {
        this.#internalBoard = [[]];
        this.#scatterPositionList = [];
        this.#optionalSpawnPositionList = [];
        this.#bonusSpawnPositionList = [];
        this.#ghostBlinkyCoordinateList = [];
        this.#ghostPinkyCoordinateList = [];
        this.#ghostInkyCoordinateList = [];
        this.#ghostClydeCoordinateList = [];
    }


    update(coordinateString, character) {
        const coordinate = this.parseCoordinates(coordinateString);
        const currentBoardCharacter = this.getBoardCharacterAt(coordinateString);
        this.updateGhostCoordinateLists(coordinateString, currentBoardCharacter, character);
        this.setBoardCharacter(coordinate, character);
    }


    updateGhostCoordinateList(coordinateString, currentBoardCharacter, newCharacter) {

        const isCurrentCharacterGhost = Configuration.ghostCharacterList.includes(currentBoardCharacter);
        if (isCurrentCharacterGhost) {
            this.removeCoordinatesFromGhostList(coordinateString, currentBoardCharacter);
        }

        const isNewCharacterGhost = Configuration.ghostCharacterList.includes(newCharacter);
        if (isNewCharacterGhost) {
            this.addCoordinatesToGhostList(coordinateString, newCharacter);
        }
    }


    addCoordinatesToGhostList(coordinates, ghostCharacter) {
        let ghostCoordinates = this.#characterToCoordinateListMap.get(ghostCharacter);
        ghostCoordinates.push(coordinates);
    }


    addScatterPosition(ghostCharacter, coordinates) {
        this.removeScatterPositionFor(ghostCharacter);
        let positionObject = this.buildScatterSpawnPositionObject(ghostCharacter, coordinates);
        this.#scatterPositionList.push(positionObject);
    }


    addOptionalSpawnPosition(ghostCharacter, coordinates) {
        this.removeSpawnPositionFor(ghostCharacter);
        let positionObject = this.buildScatterSpawnPositionObject(ghostCharacter, coordinates);
        this.#optionalSpawnPositionList.push(positionObject);
    }


    addBonusSpawnPosition(coordinates) {
        this.removeBonusSpawnPositionAt(coordinates);
        let positionObject = this.buildBonusSpawnPositionObject(coordinates);
        this.#bonusSpawnPositionList.push(positionObject);
    }


    removeScatterPositionFor(ghostCharacter) {
        for (let scatterPosition of this.#scatterPositionList) {
            if (scatterPosition.ghost === ghostCharacter) {
                Utility.removeElementFrom(this.#scatterPositionList, scatterPosition);
            }
        }
    }


    removeSpawnPositionFor(ghostCharacter) {
        for (let optionalSpawnPosition of this.#optionalSpawnPositionList) {
            if (optionalSpawnPosition.ghost === ghostCharacter) {
                Utility.removeElementFrom(this.#optionalSpawnPositionList, optionalSpawnPosition);
            }
        }
    }


    removeBonusSpawnPositionAt(coordinates) {
        let parsedCoordinates = this.parseCoordinates(coordinates);
        for (let bonusSpawnPosition of this.#bonusSpawnPositionList) {
            if (bonusSpawnPosition.x === parsedCoordinates.x &&
                bonusSpawnPosition.y === parsedCoordinates.y) {
                    Utility.removeElementFrom(this.#bonusSpawnPositionList, bonusSpawnPosition);
                }
        }
    }


    removeScatterPosition(coordinateString) {
        let elementsToRemove = [];
        let parsedCoordinate = this.parseCoordinates(coordinateString);
        for (let scatterPosition of this.#scatterPositionList) {
            if (scatterPosition.x === parsedCoordinate.x && scatterPosition.y === parsedCoordinate.y) {
                elementsToRemove.push(scatterPosition);
            }
        }
        this.removeElementsFromArray(this.#scatterPositionList, elementsToRemove);
    }


    removeSpawnPosition(coordinateString) {
        let elementsToRemove = [];
        let parseCoordinates = this.parseCoordinates(coordinateString);
        for (let spawnPosition of this.#optionalSpawnPositionList) {
            if (spawnPosition.x === parseCoordinates.x && spawnPosition.y === parseCoordinates.y) {
                elementsToRemove.push(spawnPosition);
            }
        }
        this.removeElementsFromArray(this.#optionalSpawnPositionList, elementsToRemove);
    }


    removeElementsFromArray(array, elementsToRemove) {
        for (let element of elementsToRemove) {
            Utility.removeElementFrom(array, element);
        }
    }


    buildScatterSpawnPositionObject(ghostCharacter, coordinates) {
        let parsedCoordinates = this.parseCoordinates(coordinates);
        let outputObject = {};
        outputObject.ghost = ghostCharacter;
        outputObject.x = parsedCoordinates.x;
        outputObject.y = parsedCoordinates.y;
        return outputObject;
    }


    buildBonusSpawnPositionObject(coordinates) {
        let parsedCoordinates = this.parseCoordinates(coordinates);
        let outputObject = {};
        outputObject.x = parsedCoordinates.x;
        outputObject.y = parsedCoordinates.y;
        return outputObject;
    }


    buildLevelJSONString() {
        let jsonObject = {};
        jsonObject.board = this.#internalBoard;
        jsonObject.scatterPositions = this.#scatterPositionList;
        jsonObject.optionalSpawns = this.#optionalSpawnPositionList;
        jsonObject.bonusSpawnPositions = this.#bonusSpawnPositionList;
        return JSON.stringify(jsonObject);
    }


    removeCoordinatesFromGhostList(coordinate, ghostCharacter) {
        const ghostCoordinateList = this.#characterToCoordinateListMap.get(ghostCharacter);
        Utility.removeElementFrom(ghostCoordinateList, coordinate);
    }


    parseCoordinates(coordinates) {
        let parsedInput = coordinates.replace('(', '');
        parsedInput = parsedInput.replace(')', '');
        parsedInput = parsedInput.split(',');
        let x = parseInt(parsedInput[0]);
        let y = parseInt(parsedInput[1]);
        return {'x': x, 'y': y};
    }

    
}