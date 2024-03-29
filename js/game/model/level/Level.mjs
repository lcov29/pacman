import BonusElementSpawner from '../boardElements/BonusElementSpawner.mjs';
import RequestInitializer from '../../requests/RequestInitializer.mjs';
import LevelInitializer from './LevelInitializer.mjs';
import Configuration from '../../../global/Configuration.mjs';
import Utility from '../../../global/Utility.mjs';
import Board from '../board/Board.mjs';


/*  
    =================================================================================================================
    Represents the current state of the level.
    Holds references to Board (model), Pacmans, Ghosts and Teleporter. 
    Mediates between its associated game elements.
    Offers high level methods to class Game.js.
    =================================================================================================================
*/


export default class Level {


    #game = null;
    #board = null;
    #bonusElementSpawner = null;
    #teleporterList = [];
    #pacmanList = [];
    #ghostList = [];
    #availablePoints = 0;
    #consumedPoints = 0;


    constructor(game) {
        this.#game = game;
    }


    initialize(levelJson) {
        this.#board = new Board(levelJson);
        this.#bonusElementSpawner = new BonusElementSpawner(this.#board.bonusSpawnPositionList, 1, this);
        this.#teleporterList = LevelInitializer.initializeTeleporters(this.#board.teleporterPositionList);
        this.#pacmanList = LevelInitializer.initializePacmans(this.#board.initialPacmanPositionList, this);
        this.#ghostList = this.#initializeGhosts();
        this.#availablePoints = this.#countAvailablePoints();
    }


    setNextPacmanDirection(directionName) {
        for (let pacman of this.#pacmanList) {
           pacman.movementDirectionName = directionName;
        }
    }


    getBoardPositionAt(x, y) {
        return this.#board.getPosition(x, y);
    }


    getAccessibleNeighborList(xPosition, yPosition) {
        return this.#board.buildAccessibleNeighborList(xPosition, yPosition);
    }


    getTeleportDestination(position) {
        const matchingTeleporterList = this.#teleporterList.filter(teleporter => teleporter.isTeleporter(position));
        const destination = matchingTeleporterList[0].getDestinationPositionFor(position);
        return destination;
    }


    getPacmanIdList() {
        const idList = this.#pacmanList.map(pacman => pacman.currentPositionId);
        return idList;
    }


    getPacmanPositionFor(positionId) {
        const func = (pacman) => { return pacman.currentPosition; };
        return this.#iterateList(positionId, this.#pacmanList, func, null);
    }


    getPacmanMovementDirectionFor(positionId) {
        const func = (pacman) => { return pacman.getCurrentMovementDirection(); };
        return this.#iterateList(positionId, this.#pacmanList, func, null);
    }


    getTurnCompletionStatusForPacmanAt(positionId) {
        const func = (pacman) => { return pacman.hasCompletedCurrentTurn; };
        return this.#iterateList(positionId, this.#pacmanList, func, false);
    }


    getGhostPositionListFor(ghostCharacter) {
        const ghostList = this.#ghostList.filter(ghost => ghost.character === ghostCharacter);
        const positionList = ghostList.map(ghost => ghost.currentPosition.clone());
        return positionList;
    }


    getInitialBackgroundRequestList() {
        const boardPositionArray = this.#board.buildBoardPositionArray();
        return RequestInitializer.buildInitialBackgroundRequestList(boardPositionArray);
    }
    
    
    getInitialActorMovementRequestList() {
        const initialPacmanPositionList = this.#board.initialPacmanPositionList;
        const initialGhostPositionList = this.#board.initialGhostPositionList;
        const initialActorPositionList = [...initialPacmanPositionList, ...initialGhostPositionList];
        return RequestInitializer.buildInitialActorMovementRequestList(initialActorPositionList);
    }


    isPositionOccupiedByPacman(positionId) {
        const func = function() { return true; };
        return this.#iterateList(positionId, this.#pacmanList, func, false);
    }
    

    isPositionOccupiedByHostileGhost(positionId) {
        const filterFunction = (ghost) => {
            const isSamePosition = ghost.currentPositionId === positionId;
            return isSamePosition && ghost.isHostile();
        }
        const hostileGhostsAtPositionList = this.#ghostList.filter(filterFunction);
        return hostileGhostsAtPositionList.length > 0;
    }


    isPositionOccupiedByKillableGhost(positionId) {
        const filterFunction = (ghost) => {
            const isSamePosition = ghost.currentPositionId === positionId;
            return isSamePosition && ghost.isKillable();
        }
        const killableGhostsAtPositionList = this.#ghostList.filter(filterFunction);
        return killableGhostsAtPositionList.length > 0;
    }


    isWon() {
        return this.#availablePoints === 0;
    }


    isLost() {
        return this.#pacmanList.length === 0;
    }


    incrementScoreBy(value) {
        this.#game.incrementScoreBy(value);
    }


    incrementConsumedPoints() {
        this.#consumedPoints++;
    }

    
    decrementAvailablePoints() {
        this.#availablePoints--;
    }


    processMovementRequest(request) {
        this.#game.addMovementRequest(request);
    }


    processRespawnRequest(request) {
        this.#game.addRespawnRequest(request);
    }


    processBackgroundRequest(request) {
        this.#board.updateCharacterAt(request.xPosition, request.yPosition, request.elementCharacter);
        this.#game.addBackgroundRequest(request);
    }


    // TODO: divide handling of win/lose from actual movement
    calculateNextTurn() {
        if (this.isWon()) {
            this.#game.saveCurrentLevelScore();
            this.#game.loadNextLevel();
            return;
        }

        if (this.isLost()) {
            this.#game.resetCurrentLevelScore();
            this.#game.decrementPacmanLifes();
            this.#game.reloadCurrentLevel();
            this.#game.handleGameOver();
            return;
        }

        this.#movePacmans();
        this.#moveGhosts();
        this.#bonusElementSpawner.handleSpawn(this.#consumedPoints);
        this.#game.notifyTurnCalculationComplete();
    }


    countScaredGhosts() {
        const scaredGhostList = this.#ghostList.filter(ghost => ghost.isScared());
        return scaredGhostList.length;
    }


    scareLivingGhosts() {
        for (let ghost of this.#ghostList) {
            ghost.scare();
        }
    }


    killGhost(positionId) {
        this.#killActor(this.#ghostList, positionId);
    }


    killPacman(positionId) {
        this.#killActor(this.#pacmanList, positionId);
    }


    removeDeadPacmanAt(positionId) {
        const func = (pacman) => { Utility.removeElementFrom(this.#pacmanList, pacman); };
        this.#iterateList(positionId, this.#pacmanList, func, null);
    }


    handleBonusConsumption() {
        this.incrementScoreBy(this.#bonusElementSpawner.scoreValue);
        this.#bonusElementSpawner.resetBonusSpawnStatus();
    }


    #initializeGhosts() {
        const argumentObject = {};
        argumentObject.initialGhostPositionList = this.#board.initialGhostPositionList;
        argumentObject.ghostScatterPositionList = this.#board.ghostScatterPositionList;
        argumentObject.ghostOptionalSpawnPositionList = this.#board.ghostOptionalSpawnPositionList;
        argumentObject.teleporterList = this.#teleporterList;
        argumentObject.accessibleBoardPositionList = this.#board.buildAccessibleBoardPositionList();
        argumentObject.accessibleNeighborIdList = this.#board.buildAccessibleNeighborIdList();
        argumentObject.levelReference = this;

        return LevelInitializer.initializeGhosts(argumentObject);
    }


    #iterateList(positionId, elementList, func, defaultReturn) {
        for (let element of elementList) {
            const isMatchingPosition = element.currentPositionId === positionId;

            if (isMatchingPosition) {
                return func(element);
            }
        }
        return defaultReturn;
    }


    #resetTurnCompletionStatusOfPacmans() {
        for (let pacman of this.#pacmanList) {
            pacman.resetTurnCompletionStatus();
        }
    }


    #countAvailablePoints() {
        return this.#board.countOccurrencesOfCharacters(Configuration.pointCharacterList);
    }


    #movePacmans() {
        const unmovedPacmanList = [...this.#pacmanList];
        const movePacman = (pacman) => {
            if (!pacman.hasCompletedCurrentTurn) {
                if (pacman.move()) {
                    Utility.removeElementFrom(unmovedPacmanList, pacman);
                }
            }
        };

        while (unmovedPacmanList.length > 0) {
            unmovedPacmanList.forEach(movePacman);
        }
        
        this.#resetTurnCompletionStatusOfPacmans();
    }


    #moveGhosts() {
        for (let ghost of this.#ghostList) {
            if (this.isLost()) {
                break;
            } else {
                ghost.move();
            }
        }
    }


    #killActor(actorList, positionId) {
        const actorAtPositionList = actorList.filter(actor => { return actor.currentPositionId === positionId; });
        actorAtPositionList.forEach(actor => actor.kill());
    }


}