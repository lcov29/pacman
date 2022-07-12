'use strict';

import LevelInitializer from './LevelInitializer.mjs';
import Configuration from '../Configuration.mjs';
import Utility from '../Utility.mjs';
import Board from './Board.mjs';
import BonusElementSpawner from './BonusElementSpawner.mjs';
import BackgroundRequest from '../BackgroundRequest.mjs';
import MovementRequest from '../MovementRequest.mjs';

/*  
    =================================================================================================================
    Represents the current state of the level.
    Holds references to Board (model), Pacmans, Ghosts and Teleporter. 
    Mediates between its associated game elements.
    Offers high level methods to class Game.js.
    =================================================================================================================
*/


export default class Level {


    constructor(game) {
        this.game = game;
        this.board = null;
        this.bonusElementSpawner = null;
        this.teleporters = [];
        this.pacmans = [];
        this.ghosts = [];
        this.availablePoints = 0;
        this.consumedPoints = 0;
        this.totalPacmanLifes = 0;
        this.score = 0;
    }


    initialize(levelJson) {
        this.board = new Board(levelJson);
        this.bonusElementSpawner = new BonusElementSpawner(this.board.getBonusSpawnPositions(), 1, this);
        this.teleporters = LevelInitializer.initializeTeleporters(this.board);
        this.pacmans = LevelInitializer.initializePacmans(this.board, this);
        this.ghosts = LevelInitializer.initializeGhosts(this.board, this.teleporters, this);
        this.availablePoints = this.countAvailablePoints();
        this.totalPacmanLifes = this.countInitialPacmanLifes();
    }


    getInitialBackgroundRequestList() {
        const boardPositionArray = this.board.buildBoardPositionArray();
        const requestList = [];

        for (let row of boardPositionArray) {
            for (let element of row) {
                const request = new BackgroundRequest(element.getX(), element.getY(), element.getElementLayerCharacter());
                requestList.push(request);
            }
        }

        return requestList;
    }


    getInitialActorMovementRequestList() {
        const initialPacmanPositionList = this.board.getInitialPacmanPositions();
        const initialGhostPositionList = this.board.getInitialGhostPositions();
        const initialActorPositionList = [...initialPacmanPositionList, ...initialGhostPositionList];
        const requestList = [];

        for (let position of initialActorPositionList) {
            const request = new MovementRequest();

            request.xPositionStart = position.getX();
            request.yPositionStart = position.getY();
            request.xPositionDestination = position.getX();
            request.yPositionDestination = position.getY();

            const actorCharacter = position.getActorCharacter();
            request.actorCharacter =  actorCharacter;

            const isGhostCharacter = Configuration.ghostCharacterList.includes(actorCharacter);
            if (isGhostCharacter) {
                request.directionName = Configuration.initialGhostSpriteDirection;
            } else {
                request.directionName = Configuration.initialPacmanSpriteDirection;
            }
            
            requestList.push(request);
        }

        return requestList;
    }




    executeTurn() {
        this.movePacmans();
        if (this.isWon() === false && this.isLost() === false) {
            this.moveGhosts();
        }
        this.bonusElementSpawner.handleSpawn(this.consumedPoints);
        this.game.notifyTurnComplete();
    }



    scareLivingGhosts() {
        for (let ghost of this.ghosts) {
            ghost.scare();
        }
    }


    killGhost(positionId) {
        this.killActor(this.ghosts, positionId);
    }


    killPacman(positionId) {
        this.killActor(this.pacmans, positionId);
    }


    incrementScoreBy(value) {
        this.score += value;
    }


    incrementConsumedPoints() {
        this.consumedPoints++;
    }

    
    decrementAvailablePoints() {
        this.availablePoints--;
    }


    decrementTotalPacmanLifes() {
        this.totalPacmanLifes--;
    }


    setNextPacmanDirection(directionName) {
        for (let pacman of this.pacmans) {
           pacman.setMovementDirectionName(directionName);
        }
    } 


    handleBonusConsumption() {
        this.incrementScoreBy(this.bonusElementSpawner.getScoreValue());
        this.bonusElementSpawner.setBonusSpawnStatus(false);
    }


    resetTurnCompletionStatusOfPacmans() {
        for (let pacman of this.pacmans) {
            pacman.setTurnCompletionStatus(false);
        }
    }


    getBoardPositionAt(x, y) {
        return this.board.getPosition(x, y);
    }


    getPacmanIDs() {
        let ids = [];
        for (let pacman of this.pacmans) {
            ids.push(pacman.getCurrentPosition().getID());
        }
        return ids;
    }


    getGhostPositionsFor(ghostCharacter) {
        let positions = [];
        for (let ghost of this.ghosts) {
            if (ghost.getCharacter() === ghostCharacter) {
                positions.push(ghost.getCurrentPosition().clone());
            }
        }
        return positions;
    }    


    getPacmanMovementDirectionFor(positionId) {
        let movementDirection = null;
        for (let pacman of this.pacmans) {
            if (pacman.getCurrentPosition().getID() === positionId) {
                movementDirection =  pacman.getCurrentMovementDirection();
                break;
            }
        }
        return movementDirection;
    }


    getPacmanPositionFor(positionId) {
        let pacmanPosition = null;
        for (let pacman of this.pacmans) {
            let position = pacman.getCurrentPosition();
            if (position.getID() === positionId) {
                pacmanPosition = position;
                break;
            }
        }
        return pacmanPosition;
    }


    isPositionOccupiedByHostileGhost(positionId) {
        let result = false;
        for (let ghost of this.ghosts) {
            if (ghost.getCurrentPosition().getID() === positionId) {
                result = ghost.isHostile();
                if (result === true) { break; }
            }
        }
        return result;
    }


    isPositionOccupiedByKillableGhost(positionId) {
        let result = false;
        for (let ghost of this.ghosts) {
            if (ghost.getCurrentPosition().getID() === positionId) {
                result = ghost.isKillable();
                if (result === true) { break; }
            }
        }
        return result;
    }


    getTurnCompletionStatusForPacmanAt(positionId) {
        let status = false;
        for (let pacman of this.pacmans) {
            if (pacman.getCurrentPosition().getID() === positionId) {
                status = pacman.getTurnCompletionStatus();
                break;
            }
        }
        return status;
    }


    getTeleportDestination(position) {
        let destination = null;
        for (let teleporter of this.teleporters) {
            if (teleporter.isTeleporterFor(position)) {
                destination = teleporter.getDestinationPositionFor(position);
                break;
            }
        }
        return destination;
    }


    isWon() {
        return this.availablePoints === 0;
    }


    isLost() {
        return this.totalPacmanLifes === 0;
    }


    // NEW
    // TODO: THINK ABOUT SITUATION WHERE A GHOST LEAVING A POSITION OVERWRITES BOARD INFORMATION ABOUT ANOTHER GHOST THAT PREVIOUSLY 
    //       ENTERED THE POSITION IN THE SAME TURN
    processMovementRequest(request) {
        this.board.updateActorLayerPosition(request.xPositionStart, request.yPositionStart, '');
        this.board.updateActorLayerPosition(request.xPositionDestination, request.yPositionDestination, request.actorCharacter);
        this.game.addMovementRequest(request);
    }


    // NEW
    processBackgroundRequest(request) {
        this.board.updateElementLayerPosition(request.xPosition, request.yPosition, request.elementCharacter);
        this.game.addBackgroundRequest(request);
    }


    removeDeadPacmanAt(positionId) {
        for (let pacman of this.pacmans) {
            if (pacman.getCurrentPosition().getID() === positionId) {
                Utility.removeElementFrom(this.pacmans, pacman);
            }
        }  
    }


    buildAccessibleNeighborList(xPosition, yPosition) {
        return this.board.buildAccessibleNeighborList(xPosition, yPosition);
    }


    countAvailablePoints() {
        return this.board.countOccurrencesOfCharacters(Configuration.pointCharacterList);
    }


    countInitialPacmanLifes() {
        return this.pacmans.length * Configuration.initialPacmanLifes;
    } 


    countScaredGhosts() {
        let counter = 0;
        for (let ghost of this.ghosts) {
            if (ghost.isScared()) {
                counter++;
            }
        }
        return counter;
    }


    movePacmans() {
        let unmovedPacmans = [...this.pacmans];
        while (unmovedPacmans.length > 0) {
            for (let pacman of unmovedPacmans) {
                if (pacman.getTurnCompletionStatus() == false) {
                    if (pacman.move()) {
                        Utility.removeElementFrom(unmovedPacmans, pacman);
                    }
                }
            }
        }
        this.resetTurnCompletionStatusOfPacmans();
    }


    moveGhosts() {
        for (let ghost of this.ghosts) {
            ghost.move();
            if (this.isLost()) { break; }
        }
    }


    killActor(actors, positionId) {
        for (let actor of actors) {
            if (actor.getCurrentPosition().getID() === positionId) {
                actor.kill();
            }
        }
    }


}