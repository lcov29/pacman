"use strict";

import Configuration from "../Configuration.mjs";
import Utility from "../Utility.mjs";


export default class EditorInternalLevel {


    constructor() {
        this.internalBoard = [[]];
        this.scatterPositions = [];
        this.optionalSpawnPositions = [];
        this.coordinatesGhostBlinky = [];
        this.coordinatesGhostPinky = [];
        this.coordinatesGhostClyde = [];
        this.coordinatesGhostInky = [];
        this.mapCharacterToCoordinateList = null;
    }


    initialize(width, height) {
        this.reset();
        this.buildEmptyMap(width, height);
        this.mapCharacterToCoordinateList = {
            [Configuration.GHOST_BLINKY_CHARACTER]:     this.coordinatesGhostBlinky,
            [Configuration.GHOST_PINKY_CHARACTER]:      this.coordinatesGhostPinky,
            [Configuration.GHOST_CLYDE_CHARACTER]:      this.coordinatesGhostClyde,
            [Configuration.GHOST_INKY_CHARACTER]:       this.coordinatesGhostInky
        };
    }


    getBoardCharacterAt(coordinatesString) {
        let coordinates = this.parseCoordinates(coordinatesString);
        return this.internalBoard[coordinates.y][coordinates.x];
    }


    getGhostCoordinatesListFor(ghostCharacter) {
        let coordinates = this.mapCharacterToCoordinateList[ghostCharacter];
        return [...coordinates];
    }


    getGhostCounterFor(ghostCharacter) {
        let coordinates = this.mapCharacterToCoordinateList[ghostCharacter];
        return coordinates.length;
    }


    getGhostCharactersForScatterPosition(coordinateString) {
        let output = [];
        let parsedCoordinates = this.parseCoordinates(coordinateString);
        for (let scatterPosition of this.scatterPositions) {
            if (scatterPosition.x === parsedCoordinates.x && scatterPosition.y === parsedCoordinates.y) {
                output.push(scatterPosition.ghost);
            }
        }
        return output;
    }


    getGhostCharactersForSpawnPosition(coordinateString) {
        let output = [];
        let parsedCoordinates = this.parseCoordinates(coordinateString);
        for (let spawnPosition of this.optionalSpawnPositions) {
            if (spawnPosition.x === parsedCoordinates.x && spawnPosition.y === parsedCoordinates.y) {
                output.push(spawnPosition.ghost);
            }
        }
        return output;
    }


    setBoardCharacter(coordinates, character) {
        this.internalBoard[coordinates.y][coordinates.x] = character;
    }


    buildEmptyMap(width, height) {
        this.internalBoard = [];
        let row = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                row.push(Configuration.UNDEFINED_TILE_CHARACTER);
            }
            this.internalBoard.push(row);
            row = [];
        }
    }


    reset() {
        this.internalBoard = [[]];
        this.scatterPositions = [];
        this.optionalSpawnPositions = [];
        this.coordinatesGhostBlinky = [];
        this.coordinatesGhostPinky = [];
        this.coordinatesGhostClyde = [];
        this.coordinatesGhostInky = [];
    }


    update(coordinatesString, character) {
        let parsedCoordinates = this.parseCoordinates(coordinatesString);
        let currentBoardCharacter = this.getBoardCharacterAt(coordinatesString);
        this.updateGhostCoordinateLists(coordinatesString, currentBoardCharacter, character);
        this.setBoardCharacter(parsedCoordinates, character);
    }


    updateGhostCoordinateLists(coordinatesString, currentBoardCharacter, newCharacter) {
        if (Configuration.GHOST_CHARACTERS.includes(currentBoardCharacter)) {
            this.removeCoordinatesFromGhostList(coordinatesString, currentBoardCharacter);
        }

        if (Configuration.GHOST_CHARACTERS.includes(newCharacter)) {
            this.addCoordinatesToGhostList(coordinatesString, newCharacter);
        }
    }


    addCoordinatesToGhostList(coordinates, ghostCharacter) {
        let ghostCoordinates = this.mapCharacterToCoordinateList[ghostCharacter];
        ghostCoordinates.push(coordinates);
    }


    addScatterPosition(ghostCharacter, coordinates) {
        this.removeScatterPositionFor(ghostCharacter);
        let positionObject = this.buildScatterSpawnPositionObject(ghostCharacter, coordinates);
        this.scatterPositions.push(positionObject);
    }


    addOptionalSpawnPosition(ghostCharacter, coordinates) {
        this.removeSpawnPositionFor(ghostCharacter);
        let positionObject = this.buildScatterSpawnPositionObject(ghostCharacter, coordinates);
        this.optionalSpawnPositions.push(positionObject);
    }


    removeScatterPositionFor(ghostCharacter) {
        for (let scatterPosition of this.scatterPositions) {
            if (scatterPosition.ghost === ghostCharacter) {
                Utility.removeElementFrom(this.scatterPositions, scatterPosition);
            }
        }
    }


    removeSpawnPositionFor(ghostCharacter) {
        for (let optionalSpawnPosition of this.optionalSpawnPositions) {
            if (optionalSpawnPosition.ghost === ghostCharacter) {
                Utility.removeElementFrom(this.optionalSpawnPositions, optionalSpawnPosition);
            }
        }
    }


    removeScatterPosition(coordinateString) {
        let elementsToRemove = [];
        let parsedCoordinate = this.parseCoordinates(coordinateString);
        for (let scatterPosition of this.scatterPositions) {
            if (scatterPosition.x === parsedCoordinate.x && scatterPosition.y === parsedCoordinate.y) {
                elementsToRemove.push(scatterPosition);
            }
        }
        this.removeElementsFromArray(this.scatterPositions, elementsToRemove);
    }


    removeSpawnPosition(coordinateString) {
        let elementsToRemove = [];
        let parseCoordinates = this.parseCoordinates(coordinateString);
        for (let spawnPosition of this.optionalSpawnPositions) {
            if (spawnPosition.x === parseCoordinates.x && spawnPosition.y === parseCoordinates.y) {
                elementsToRemove.push(spawnPosition);
            }
        }
        this.removeElementsFromArray(this.optionalSpawnPositions, elementsToRemove);
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


    buildLevelJSONString() {
        let jsonObject = {};
        jsonObject.board = this.internalBoard;
        jsonObject.scatterPositions = this.scatterPositions;
        jsonObject.optionalSpawns = this.optionalSpawnPositions;
        return JSON.stringify(jsonObject);
    }


    removeCoordinatesFromGhostList(coordinates, ghostCharacter) {
        let ghostCoordinates = this.mapCharacterToCoordinateList[ghostCharacter];
        Utility.removeElementFrom(ghostCoordinates, coordinates);
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