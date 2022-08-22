'use strict';


import LevelInitializer from './LevelInitializer.mjs';
import Configuration from '../../../global/Configuration.mjs';
import Utility from '../../../global/Utility.mjs';
import Board from '../board/Board.mjs';
import BonusElementSpawner from '../boardElements/BonusElementSpawner.mjs';
import BackgroundRequest from '../../requests/BackgroundRequest.mjs';
import MovementRequest from '../../requests/MovementRequest.mjs';


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
    #totalPacmanLifes = 0;
    #score = 0;


    constructor(game) {
        this.#game = game;
    }


    initialize(levelJson) {
        this.#board = new Board(levelJson);
        this.#bonusElementSpawner = new BonusElementSpawner(this.#board.bonusSpawnPositionList, 1, this);
        this.#teleporterList = LevelInitializer.initializeTeleporters(this.#board);
        this.#pacmanList = LevelInitializer.initializePacmans(this.#board, this);
        this.#ghostList = LevelInitializer.initializeGhosts(this.#board, this.#teleporterList, this);
        this.#availablePoints = this.#countAvailablePoints();
        this.#totalPacmanLifes = Configuration.initialPacmanLifes;
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
        for (let teleporter of this.#teleporterList) {
            if (teleporter.isTeleporter(position)) {
                return teleporter.getDestinationPositionFor(position);
            }
        }
        return null;
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


    /*
    getGhostPositionListFor(ghostCharacter) {
        const positionList = [];

        for (let ghost of this.#ghostList) {
            const isGhostType = ghost.character === ghostCharacter;

            if (isGhostType) {
                positionList.push(ghost.currentPosition.clone());
            }
        }
        return positionList;
    }*/


    getGhostPositionListFor(ghostCharacter) {
        const ghostList = this.#ghostList.filter(ghost => ghost.character === ghostCharacter);
        const positionList = ghostList.map(ghost => ghost.currentPosition.clone());
        return positionList;
    }


    getInitialBackgroundRequestList() {
        const boardPositionArray = this.#board.buildBoardPositionArray();
        const requestList = [];

        for (let row of boardPositionArray) {
            for (let element of row) {
                const request = new BackgroundRequest(element.x, element.y, element.elementLayerCharacter);
                this.#addInformationToBackgroundRequest(request);
                requestList.push(request);
            }
        }

        return requestList;
    }


    getInitialActorMovementRequestList() {
        const initialPacmanPositionList = this.#board.initialPacmanPositionList;
        const initialGhostPositionList = this.#board.initialGhostPositionList;
        const initialActorPositionList = [...initialPacmanPositionList, ...initialGhostPositionList];
        const requestList = [];

        for (let position of initialActorPositionList) {
            const request = new MovementRequest();

            request.xPositionStart = position.x;
            request.yPositionStart = position.y;
            request.xPositionDestination = position.x;
            request.yPositionDestination = position.y;

            const actorCharacter = position.actorLayerCharacter;
            request.actorCharacter =  actorCharacter;

            const isGhostCharacter = Configuration.ghostCharacterList.includes(actorCharacter);
            if (isGhostCharacter) {
                request.directionName = Configuration.initialGhostSpriteDirection;
                request.actorStateName = Configuration.initialGhostStateName;
            } else {
                request.directionName = Configuration.initialPacmanSpriteDirection;
            }
            
            requestList.push(request);
        }

        return requestList;
    }


    isPositionOccupiedByHostileGhost(positionId) {
        const func = (ghost) => { return ghost.isHostile(); };
        return this.#iterateList(positionId, this.#ghostList, func, false);
    }


    isPositionOccupiedByKillableGhost(positionId) {
        const func = (ghost) => { return ghost.isKillable(); };
        return this.#iterateList(positionId, this.#ghostList, func, false);
    }


    isWon() {
        return this.#availablePoints === 0;
    }


    isLost() {
        return this.#totalPacmanLifes === 0;
    }


    incrementScoreBy(value) {
        this.#score += value;
    }


    incrementConsumedPoints() {
        this.#consumedPoints++;
    }

    
    decrementAvailablePoints() {
        this.#availablePoints--;
    }


    decrementTotalPacmanLifes() {
        this.#totalPacmanLifes--;
    }


    // TODO: THINK ABOUT SITUATION WHERE A GHOST LEAVING A POSITION OVERWRITES BOARD INFORMATION ABOUT ANOTHER GHOST THAT PREVIOUSLY 
    //       ENTERED THE POSITION IN THE SAME TURN
    processMovementRequest(request) {
        this.#board.updateActorLayerPosition(request.xPositionStart, request.yPositionStart, Configuration.emptyTileCharacter);
        this.#board.updateActorLayerPosition(request.xPositionDestination, request.yPositionDestination, request.actorCharacter);
        this.#game.addMovementRequest(request);
    }


    processBackgroundRequest(request) {
        this.#board.updateElementLayerPosition(request.xPosition, request.yPosition, request.elementCharacter);
        this.#addInformationToBackgroundRequest(request);
        this.#game.addBackgroundRequest(request);
    }


    calculateNextTurn() {
        this.#movePacmans();
        if (!this.isWon() && !this.isLost()) {
            this.#moveGhosts();
        }
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


    #addInformationToBackgroundRequest(request) {
        request.score = this.#score;
        request.lifeCount = this.#totalPacmanLifes;
    }


    #countAvailablePoints() {
        return this.#board.countOccurrencesOfCharacters(Configuration.pointCharacterList);
    }


    #movePacmans() {
        const unmovedPacmanList = [...this.#pacmanList];
        while (unmovedPacmanList.length > 0) {
            for (let pacman of unmovedPacmanList) {
                if (!pacman.hasCompletedCurrentTurn) {
                    if (pacman.move()) {
                        Utility.removeElementFrom(unmovedPacmanList, pacman);
                    }
                }
            }
        }
        this.#resetTurnCompletionStatusOfPacmans();
    }


    #moveGhosts() {
        for (let ghost of this.#ghostList) {
            ghost.move();
            if (this.isLost()) { break; }
        }
    }


    #killActor(actors, positionId) {
        for (let actor of actors) {
            if (actor.currentPositionId === positionId) {
                actor.kill();
            }
        }
    }


}