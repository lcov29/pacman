"use strict";

import LevelInitializer from "./LevelInitializer.mjs";
import UpdateManager from "./UpdateManager.mjs";
import Configuration from "../Configuration.mjs";
import Utility from "../Utility.mjs";
import Board from "./Board.mjs";

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
        this.updateManager = null;
        this.teleporters = [];
        this.pacmans = [];
        this.ghosts = [];
        this.availablePoints = 0;
        this.totalPacmanLifes = 0;
        this.score = 0;
        this.updateRequests = [];
    }


    initialize(levelJson) {
        this.board = new Board(levelJson);
        this.updateManager = new UpdateManager(this, this.board);
        this.teleporters = LevelInitializer.initializeTeleporters(this.board);
        this.pacmans = LevelInitializer.initializePacmans(this.board, this);
        this.ghosts = LevelInitializer.initializeGhosts(this.board, this.teleporters, this);
        this.availablePoints = this.countAvailablePoints();
        this.totalPacmanLifes = this.countInitialPacmanLifes();
    }


    executeTurn() {
        this.movePacmans();
        if (this.isWon() === false && this.isLost() === false) {
            this.moveGhosts();
        }
        this.updateManager.updateView();
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

    
    decrementAvailablePoints() {
        this.availablePoints--;
    }


    decrementTotalPacmanLifes() {
        this.totalPacmanLifes--;
    }


    sendViewUpdate(position, styleClass) {
        this.game.updateView(position, styleClass, this.score, this.totalPacmanLifes);
    }


    updateBoard() {
        this.updateManager.updateBoard();
    }


    setNextPacmanDirection(directionName) {
        for (let pacman of this.pacmans) {
           pacman.setMovementDirectionName(directionName);
        }
    } 


    resetTurnCompletionStatusOfPacmans() {
        for (let pacman of this.pacmans) {
            pacman.setTurnCompletionStatus(false);
        }
    }


    getBoardPositionAt(x, y) {
        return this.board.getPosition(x, y);
    }


    getBoardPositionArray() {
        return this.board.buildBoardPositionArray();
    }


    getPacmanIDs() {
        let ids = [];
        for (let pacman of this.pacmans) {
            ids.push(pacman.getCurrentPosition().getID());
        }
        return ids;
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


    addUpdateRequest(request) {
        this.updateManager.addRequest(request);
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
        return this.board.countOccurrencesOfCharacters(Configuration.POINT_CHARACTERS);
    }


    countInitialPacmanLifes() {
        return this.pacmans.length * Configuration.INITIAL_PACMAN_LIFES;
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