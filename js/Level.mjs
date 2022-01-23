"use strict";

import GhostDoorDirectionMapper from "./GhostDoorDirectionMapper.mjs";
import LevelInitializer from "./LevelInitializer.mjs";
import UpdateManager from "./UpdateManager.mjs";
import Configuration from "./Configuration.mjs";
import Teleporter from "./Teleporter.mjs";
import Utility from "./Utility.mjs";
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
        this.update_manager = null;
        this.teleporters = [];
        this.pacmans = [];
        this.ghosts = [];
        this.available_points = 0;
        this.total_pacman_lifes = 0;
        this.score = 0;
        this.update_requests = [];
    }


    initialize(level_json) {
        this.board = new Board(level_json);
        this.update_manager = new UpdateManager(this, this.board);
        this.teleporters = LevelInitializer.initializeTeleporters(this.board);
        this.pacmans = LevelInitializer.initializePacmans(this.board, this);
        this.ghosts = LevelInitializer.initializeGhosts(this.board, this.teleporters, this);
        this.available_points = this.countAvailablePoints();
        this.total_pacman_lifes = this.countInitialPacmanLifes();
    }


    executeTurn() {
        this.movePacmans();
        if (this.isWon() === false && this.isLost() === false) {
            this.moveGhosts();
        }
        this.update_manager.updateView();
    }



    scareLivingGhosts() {
        for (let ghost of this.ghosts) {
            ghost.scare();
        }
    }


    killGhost(position_id) {
        this.killActor(this.ghosts, position_id);
    }


    killPacman(position_id) {
        this.killActor(this.pacmans, position_id);
    }


    incrementScoreBy(value) {
        this.score += value;
    }

    
    decrementAvailablePoints() {
        this.available_points--;
    }


    decrementTotalPacmanLifes() {
        this.total_pacman_lifes--;
    }


    sendViewUpdate(position, style_class) {
        this.game.updateView(position, style_class, this.score, this.total_pacman_lifes);
    }


    updateBoard() {
        this.update_manager.updateBoard();
    }


    setNextPacmanDirection(direction_name) {
        for (let pacman of this.pacmans) {
           pacman.setMovementDirectionName(direction_name);
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


    isPositionOccupiedByHostileGhost(position_id) {
        let result = false;
        for (let ghost of this.ghosts) {
            if (ghost.getCurrentPosition().getID() === position_id) {
                result = ghost.isHostile();
                if (result === true) { break; }
            }
        }
        return result;
    }


    isPositionOccupiedByKillableGhost(position_id) {
        let result = false;
        for (let ghost of this.ghosts) {
            if (ghost.getCurrentPosition().getID() === position_id) {
                result = ghost.isKillable();
                if (result === true) { break; }
            }
        }
        return result;
    }


    getTurnCompletionStatusForPacmanAt(position_id) {
        let status = false;
        for (let pacman of this.pacmans) {
            if (pacman.getCurrentPosition().getID() === position_id) {
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
        return this.available_points === 0;
    }


    isLost() {
        return this.total_pacman_lifes === 0;
    }


    addUpdateRequest(request) {
        this.update_manager.addRequest(request);
    }


    removeDeadPacmanAt(position_id) {
        for (let pacman of this.pacmans) {
            if (pacman.getCurrentPosition().getID() === position_id) {
                Utility.removeElementFrom(this.pacmans, pacman);
            }
        }  
    }


    buildGhostDoorDirectionMap() {
        let ghost_door_positions = this.board.getGhostDoorPositions();
        return GhostDoorDirectionMapper.buildMap(ghost_door_positions, this);
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
        let unmoved_pacmans = [...this.pacmans];
        while (unmoved_pacmans.length > 0) {
            for (let pacman of unmoved_pacmans) {
                if (pacman.getTurnCompletionStatus() == false) {
                    if (pacman.move()) {
                        Utility.removeElementFrom(unmoved_pacmans, pacman);
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


    killActor(actors, position_id) {
        for (let actor of actors) {
            if (actor.getCurrentPosition().getID() === position_id) {
                actor.kill();
            }
        }
    }


}