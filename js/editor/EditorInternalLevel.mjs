import EditorLevelValidator from "./EditorLevelValidator.mjs";
import Configuration from '../global/Configuration.mjs';
import Utility from '../global/Utility.mjs';


export default class EditorInternalLevel {


    #levelId = '';
    #internalBoard = [[]];
    #scatterPositionList = [];
    #optionalSpawnPositionList = [];
    #bonusSpawnPositionList = [];
    #numberOfIterations = 1;
    #previewImageUrl = '';
    #ghostBlinkyCoordinateList = [];
    #ghostPinkyCoordinateList = [];
    #ghostInkyCoordinateList = [];
    #ghostClydeCoordinateList = [];
    #characterToCoordinateListMap = null;


    constructor() {
        this.#characterToCoordinateListMap = new Map();
    }


    get id() {
        return this.#levelId;
    }


    get board() {
        return [...this.#internalBoard];
    }


    get scatterPositionList() {
        return [...this.#scatterPositionList];
    }


    get optionalSpawnPositionList() {
        return [...this.#optionalSpawnPositionList];
    }


    get bonusSpawnPositionList() {
        return [...this.#bonusSpawnPositionList];
    }


    get width() {
        return this.#internalBoard[0].length;
    }


    get height() {
        return this.#internalBoard.length;
    }


    get numberOfIterations() {
        return this.#numberOfIterations;
    }


    set numberOfIterations(number) {
        const isValidInput = number > 0;

        if (isValidInput) {
            this.#numberOfIterations = number;
        } else {
            throw new RangeError('Invalid argument: number of iterations must be greater zero');
        }
    }


    set previewImageUrl(url) {
        this.#previewImageUrl = url;
    }


    initialize(width, height, levelId) {
        this.#levelId = (levelId) ? levelId : this.#levelId;
        this.#reset();
        this.#buildEmptyBoard(width, height);
        this.#initializeCharacterToCoordinateListMap();
    }


    getGhostCoordinateListFor(ghostCharacter) {
        const ghostCoordinateList = this.#characterToCoordinateListMap.get(ghostCharacter);
        return [...ghostCoordinateList];
    }


    getScatterPositionFor(ghostCharacter) {
        const scatterPositionList = this.#scatterPositionList.filter(element => element.ghost === ghostCharacter);
        const result = (scatterPositionList.length > 0) ? scatterPositionList[0] : null;
        return result;
    }


    getSpawnPositionFor(ghostCharacter) {
        const spawnPositionList = this.#optionalSpawnPositionList.filter(element => element.ghost === ghostCharacter);
        const result = (spawnPositionList.length > 0) ? spawnPositionList[0] : null;
        return result;
    }


    getGhostCounterFor(ghostCharacter) {
        const ghostCoordinateList = this.#characterToCoordinateListMap.get(ghostCharacter);
        return ghostCoordinateList.length;
    }


    getGhostCharacterListForScatterPosition(coordinateString) {
        return this.#getGhostCharacterListForPositionAt(this.#scatterPositionList, coordinateString);
    }


    getGhostCharacterListForSpawnPosition(coordinateString) {
        return this.#getGhostCharacterListForPositionAt(this.#optionalSpawnPositionList, coordinateString);
    }


    isTileAccessible(coordinateString) {
        const tileCharacter = this.#getBoardCharacterAt(coordinateString);
        return !Configuration.actorsInaccessibleTileCharacterList.includes(tileCharacter);
    }


    isCoordinateBonusSpawnPosition(coordinateString) {
        let result = false;
        const coordinate = this.#parseCoordinateString(coordinateString);

        for (let spawnPosition of this.#bonusSpawnPositionList) {
            const isSamePosition = spawnPosition.x === coordinate.x && spawnPosition.y === coordinate.y;
            if (isSamePosition) {
                result = true;
                break;
            }
        }
        return result;
    }


    load(level) {
        this.#reset();
        this.#levelId = level.id;
        this.#internalBoard = level.board;
        this.#scatterPositionList = level.scatterPositionList;
        this.#optionalSpawnPositionList = level.optionalGhostSpawnList;
        this.#bonusSpawnPositionList = level.bonusSpawnPositionList;
        this.#numberOfIterations = level.numberOfIterations;
        this.#initializeCharacterToCoordinateListMap();
        this.#initializeGhostCoordinateStringList(level.board);
    }


    update(coordinateString, character) {
        const currentBoardCharacter = this.#getBoardCharacterAt(coordinateString);
        this.#updateGhostCoordinateList(coordinateString, currentBoardCharacter, character);

        const coordinate = this.#parseCoordinateString(coordinateString);
        this.#setBoardCharacter(coordinate, character);
    }


    updateBonusSpawnList(tileId, coordinateString) {
        const isBonusSpawnOverwritten = this.isCoordinateBonusSpawnPosition(coordinateString);
        const isBonusSpawnTile = tileId === 'bonusSpawnTile';

        if (isBonusSpawnOverwritten) {
            this.#removeBonusSpawnPositionAt(coordinateString);
        }

        if (isBonusSpawnTile) {
            this.#addBonusSpawnPosition(coordinateString);
        }
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


    removeScatterSpawnOfDeletedGhostTypes() {
        for (const ghostCharacter of Configuration.ghostCharacterList) {
            const isGhostTypeOnBoard = this.getGhostCounterFor(ghostCharacter) > 0;

            if (!isGhostTypeOnBoard) {
                this.removeScatterPositionFor(ghostCharacter);
                this.removeSpawnPositionFor(ghostCharacter);
            }
        }
    }


    removeScatterPositionFor(ghostCharacter) {
        this.#removeCharacterFromPositionList(this.#scatterPositionList, ghostCharacter);
    }


    removeSpawnPositionFor(ghostCharacter) {
        this.#removeCharacterFromPositionList(this.#optionalSpawnPositionList, ghostCharacter);
    }


    removeScatterPositionAt(coordinateString) {
       this.#removeCoordinateFromPositionList(this.#scatterPositionList, coordinateString);
    }


    removeSpawnPositionAt(coordinateString) {
       this.#removeCoordinateFromPositionList(this.#optionalSpawnPositionList, coordinateString)
    }


    validate() {
        const validator = new EditorLevelValidator(this.#internalBoard, this.scatterPositionList);
        validator.validate();
        return validator;
    }


    buildLevelJSON() {
        const json = {
            id: this.#levelId,
            board: this.#internalBoard,
            scatterPositionList: this.#scatterPositionList,
            optionalGhostSpawnList: this.#optionalSpawnPositionList,
            bonusSpawnPositionList: this.#bonusSpawnPositionList,
            numberOfIterations: this.#numberOfIterations.toString(),
            previewImageUrl: this.#previewImageUrl
        };
        return json;
    }


    #initializeCharacterToCoordinateListMap() {
        this.#characterToCoordinateListMap.set(Configuration.ghostBlinkyCharacter, this.#ghostBlinkyCoordinateList);
        this.#characterToCoordinateListMap.set(Configuration.ghostPinkyCharacter, this.#ghostPinkyCoordinateList);
        this.#characterToCoordinateListMap.set(Configuration.ghostInkyCharacter, this.#ghostInkyCoordinateList);
        this.#characterToCoordinateListMap.set(Configuration.ghostClydeCharacter, this.#ghostClydeCoordinateList);
    }


    #initializeGhostCoordinateStringList(board) {
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                const currentCharacter = board[y][x];
                const isGhostCharacter = Configuration.ghostCharacterList.includes(currentCharacter);

                if (isGhostCharacter) {
                    const ghostCoordinateList = this.#characterToCoordinateListMap.get(currentCharacter);
                    ghostCoordinateList.push(`(${x},${y})`);
                }
            }
        }
    }


    #getBoardCharacterAt(coordinateString) {
        const coordinate = this.#parseCoordinateString(coordinateString);
        return this.#internalBoard[coordinate.y][coordinate.x];
    }


    #getGhostCharacterListForPositionAt(positionList, coordinateString) {
        const ghostCharacterList = [];
        const coordinate = this.#parseCoordinateString(coordinateString);

        for (let position of positionList) {
            const isSamePosition = position.x === coordinate.x && position.y === coordinate.y;
            if (isSamePosition) {
                ghostCharacterList.push(position.ghost);
            }
        }
        return ghostCharacterList;
    }


    #setBoardCharacter(coordinates, character) {
        this.#internalBoard[coordinates.y][coordinates.x] = character;
    }


    #addBonusSpawnPosition(coordinateString) {
        this.#removeBonusSpawnPositionAt(coordinateString);
        const positionObject = this.#buildBonusSpawnPositionObject(coordinateString);
        this.#bonusSpawnPositionList.push(positionObject);
    }


    #removeBonusSpawnPositionAt(coordinateString) {
        this.#removeCoordinateFromPositionList(this.#bonusSpawnPositionList, coordinateString);
    }


    #buildEmptyBoard(width, height) {
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


    #addCoordinateToGhostList(coordinateString, ghostCharacter) {
        const ghostCoordinateList = this.#characterToCoordinateListMap.get(ghostCharacter);
        ghostCoordinateList.push(coordinateString);
    }


    #removeCharacterFromPositionList(positionList, ghostCharacter) {
        let currentIndex = 0;

        while (currentIndex < positionList.length) {
            const currentPosition = positionList[currentIndex];
            const isSameCharacter = currentPosition.ghost === ghostCharacter;

            if (isSameCharacter) {
                // method can not be called within a for each loop because of index manipulation
                Utility.removeElementFrom(positionList, currentPosition);
            } else {
                currentIndex++;
            }
        }
    }


    #removeCoordinateFromPositionList(positionList, coordinateString) {
        const coordinate = this.#parseCoordinateString(coordinateString);
        let currentIndex = 0;

        while (currentIndex < positionList.length) {
            const currentPosition = positionList[currentIndex];
            const isSameCoordinate = currentPosition.x === coordinate.x && currentPosition.y === coordinate.y;

            if (isSameCoordinate) {
                // method can not be called within a for each loop because of index manipulation
                Utility.removeElementFrom(positionList, currentPosition);
            } else {
                currentIndex++;
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
        parsedInput = parsedInput.replace(' ', '');
        parsedInput = parsedInput.split(',');
        const x = parseInt(parsedInput[0]);
        const y = parseInt(parsedInput[1]);
        return {x, y};
    }

    
}