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


    calculateNextTurn() {
        this.#movePacmans();
        if (!this.isWon() && !this.isLost()) {
            this.#moveGhosts();
        }
        this.#bonusElementSpawner.handleSpawn(this.#consumedPoints);
        this.#game.notifyTurnCalculationComplete();
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


    setNextPacmanDirection(directionName) {
        for (let pacman of this.#pacmanList) {
           pacman.movementDirectionName = directionName;
        }
    } 


    handleBonusConsumption() {
        this.incrementScoreBy(this.#bonusElementSpawner.scoreValue);
        this.#bonusElementSpawner.resetBonusSpawnStatus();
    }


    #resetTurnCompletionStatusOfPacmans() {
        for (let pacman of this.#pacmanList) {
            pacman.resetTurnCompletionStatus();
        }
    }


    getBoardPositionAt(x, y) {
        return this.#board.getPosition(x, y);
    }


    getPacmanIdList() {
        const idList = [];
        for (let pacman of this.#pacmanList) {
            idList.push(pacman.currentPositionId);
        }
        return idList;
    }


    getGhostPositionListFor(ghostCharacter) {
        const positionList = [];

        for (let ghost of this.#ghostList) {
            const isGhostType = ghost.character === ghostCharacter;

            if (isGhostType) {
                positionList.push(ghost.currentPosition.clone());
            }
        }
        return positionList;
    }    


    getPacmanMovementDirectionFor(positionId) {
        let movementDirection = null;
        for (let pacman of this.#pacmanList) {
            if (pacman.currentPositionId === positionId) {
                movementDirection =  pacman.getCurrentMovementDirection();
                break;
            }
        }
        return movementDirection;
    }


    getPacmanPositionFor(positionId) {
        let pacmanPosition = null;
        for (let pacman of this.#pacmanList) {
            let position = pacman.currentPosition;
            if (position.id === positionId) {
                pacmanPosition = position;
                break;
            }
        }
        return pacmanPosition;
    }


    isPositionOccupiedByHostileGhost(positionId) {
        let result = false;
        for (let ghost of this.#ghostList) {
            if (ghost.currentPositionId === positionId) {
                result = ghost.isHostile();
                if (result === true) { break; }
            }
        }
        return result;
    }


    isPositionOccupiedByKillableGhost(positionId) {
        let result = false;
        for (let ghost of this.#ghostList) {
            if (ghost.currentPositionId === positionId) {
                result = ghost.isKillable();
                if (result === true) { break; }
            }
        }
        return result;
    }


    getTurnCompletionStatusForPacmanAt(positionId) {
        let status = false;
        for (let pacman of this.#pacmanList) {
            if (pacman.currentPositionId === positionId) {
                status = pacman.hasCompletedCurrentTurn;
                break;
            }
        }
        return status;
    }


    getTeleportDestination(position) {
        let destination = null;
        for (let teleporter of this.#teleporterList) {
            if (teleporter.isTeleporter(position)) {
                destination = teleporter.getDestinationPositionFor(position);
                break;
            }
        }
        return destination;
    }


    isWon() {
        return this.#availablePoints === 0;
    }


    isLost() {
        return this.#totalPacmanLifes === 0;
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


    #addInformationToBackgroundRequest(request) {
        request.score = this.#score;
        request.lifeCount = this.#totalPacmanLifes;
    }


    removeDeadPacmanAt(positionId) {
        for (let pacman of this.#pacmanList) {
            if (pacman.currentPositionId === positionId) {
                Utility.removeElementFrom(this.#pacmanList, pacman);
            }
        }  
    }


    getAccessibleNeighborList(xPosition, yPosition) {
        return this.#board.buildAccessibleNeighborList(xPosition, yPosition);
    }


    #countAvailablePoints() {
        return this.#board.countOccurrencesOfCharacters(Configuration.pointCharacterList);
    }


    countScaredGhosts() {
        let counter = 0;
        for (let ghost of this.#ghostList) {
            if (ghost.isScared()) {
                counter++;
            }
        }
        return counter;
    }


    #movePacmans() {
        let unmovedPacmans = [...this.#pacmanList];
        while (unmovedPacmans.length > 0) {
            for (let pacman of unmovedPacmans) {
                if (!pacman.hasCompletedCurrentTurn) {
                    if (pacman.move()) {
                        Utility.removeElementFrom(unmovedPacmans, pacman);
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