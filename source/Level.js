"use strict";

class Level {


    constructor(game, level_text) {
        this.game = game;
        this.board = new Board(level_text);
        this.teleporters = this.initializeTeleporters();
        this.pacmans = this.initializePacmans();
        this.ghosts = this.initializeGhosts();
        this.available_points = this.board.countAvailablePoints();
        this.total_pacman_lifes = this.countNumberOfPacmanLifes();
        this.score = Configuration.initial_score;
        this.update_requests = [];
    }


    getNumberOfPacmanLifes() {
        return this.total_pacman_lifes;
    }


    countNumberOfPacmanLifes() {
        var lifes = 0;
        for (let pacman of this.pacmans) {
            lifes += pacman.getNumberOfLifes();
        }
        return lifes;
    }


    getTeleportDestination(position) {
        var destination = undefined;
        for (let teleporter of this.teleporters) {
            if (teleporter.isTeleporterFor(position)) {
                destination = teleporter.getDestinationPositionFor(position);
                break;
            }
        }
        return destination;
    }


    getPacmanIDs() {
        var ids = [];
        for (let pacman of this.pacmans) {
            ids.push(pacman.getCurrentPositionID());
        }
        return ids;
    }


    setNextPacmanDirection(direction_name) {
        for (var pacman of this.pacmans) {
           pacman.setMovementDirectionName(direction_name);
        }
    } 


    decrementLifeOfPacman(pacman_id) {
        for (let pacman of this.pacmans) {
            if (pacman.getCurrentPositionID() == pacman_id) {
                pacman.decrementLife();
                this.total_pacman_lifes--;
            }
        }
    }


    addUpdateRequest(request) {
        this.update_requests.push(request);
    }


    getBoardPositionAt(x, y) {
        return this.board.getPosition(x, y);
    }


    getBoardPositionArray() {
        return this.board.getBoardPositionArray();
    }

    
    isBoardElementTeleporter(element) {
        return Teleporter.isElementTeleporter(element);
    }


    incrementScoreBy(value) {
        this.score += value;
    }

    
    decrementAvailablePoints() {
        this.available_points--;
    }

    
    initializeTeleporters() {
        var teleporters = [new Teleporter(), new Teleporter(), new Teleporter()];
        var output = [];
        for (let position of this.board.getTeleporterPositions()) {
            switch (position.getCharacter()) {
                case Configuration.teleporter_1_tile_character:
                    teleporters[0].add(position);
                    break;
                case Configuration.teleporter_2_tile_character:
                    teleporters[1].add(position);
                    break;
                case Configuration.teleporter_3_tile_character:
                    teleporters[2].add(position);
                    break;
            }
        }
        for (let teleporter of teleporters) {
            if (teleporter.isInitialized()) {
                output.push(teleporter);
            }
        }
        return output;
    }


    initializePacmans() {
        var pacmans = [];
        for (let position of this.board.getInitialPacmanPositions()) {
            pacmans.push(new Pacman(this, position));
        }
        return pacmans;
    }


    initializeGhosts() {
        var ghosts = [];
        var accessible_position_list = this.board.getAccessibleBoardPositionList();
        var neighbor_id_list = this.getAccessibleNeighborIdList();
        var routing = new Routing(accessible_position_list, neighbor_id_list);
        for (let ghost_position of this.board.getInitialGhostPositions()) {
            switch (ghost_position.getCharacter()) {
                case Configuration.ghost_blinky_character:                     // add different ghost types
                    ghosts.push(new Blinky(this, ghost_position, routing));
                    break;
            }
        }
        return ghosts;
    }


    getAccessibleNeighborIdList() {
        var neighbor_id_list = this.board.getAccessibleNeighborIdList();
        this.addTeleportersToNeighborIDList(neighbor_id_list);
        return neighbor_id_list;

    }


    addTeleportersToNeighborIDList(neighbor_id_list) {
        for (let teleporter of this.teleporters) {
            neighbor_id_list[teleporter.getIDPosition1()].push(teleporter.getIDPosition2());
            neighbor_id_list[teleporter.getIDPosition2()].push(teleporter.getIDPosition1());
        }
    }


    movePacmans() {
        for (var pacman of this.pacmans) {
            pacman.move();
        }
    }


    moveGhosts() {
        for (let ghost of this.ghosts) {
            ghost.move();
        }
    }


    update() {
        for (let position of this.update_requests) {
            this.board.setPosition(position);
        }
        this.game.updateView(this.update_requests, this.score, this.getNumberOfPacmanLifes());
        this.update_requests = [];
    }


    deleteDeadPacmans(pacman) {
        var index = -1;
        for (let pacman of this.pacmans) {
            if (pacman.isDead()) {
                index = this.pacmans.indexOf(pacman); 
                this.pacmans.splice(index, 1);
            }
        }   
    } 


}