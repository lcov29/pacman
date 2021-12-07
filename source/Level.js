"use strict";

class Level {


    constructor(level_text, view) {
        this.board = new Board(level_text);
        this.view = view;
        this.pacmans = this.initializePacmans();
        this.ghosts = this.initializeGhosts();
        this.teleporters = this.initializeTeleporters();
        this.available_points = this.board.countAvailablePoints();
        this.score = Configuration.initial_score;
        this.update_requests = [];
    }


    initializePacmans() {
        var pacmans = [];
        for (let position of this.board.getInitialPacmanPositions()) {
            pacmans.push(new Pacman(this, position));
        }
        return pacmans;
    }


    getPacmanIDs() {
        var ids = [];
        for (let pacman of this.pacmans) {
            ids.push(pacman.getCurrentPositionID());
        }
        return ids;
    }


    initializeGhosts() {
        var ghosts = [];
        var routing = new Routing(this.board.clone());
        for (let position of this.board.getInitialGhostPositions()) {
            switch (this.board.getElementAt(position)) {
                case Configuration.ghost_character:                     // add different ghost types
                    ghosts.push(new Ghost(this, position, routing));
                    break;
            }
        }
        return ghosts;
    }


    initializeTeleporters() {
        var teleporter1 = new Teleporter();
        var teleporter2 = new Teleporter();
        var teleporter3 = new Teleporter();

        for (let position of this.board.getTeleporterPositions()) {
            switch (this.board.getElementAt(position)) {
                case Configuration.teleporter_1_tile_character:
                    teleporter1.add(x, y);
                    break;
                case Configuration.teleporter_2_tile_character:
                    teleporter2.add(x, y);
                    break;
                case Configuration.teleporter_3_tile_character:
                    teleporter3.add(x, y);
                    break;
            }
        }
        return [teleporter1, teleporter2, teleporter3];
    }


    addUpdateRequest(request) {
        this.update_requests.push(request);
        this.view.addUpdateRequest(request);
    }
 

    update() {
        for (let request of this.update_requests) {
            this.board.setElementAt(request.position, request.object);
        }
        this.update_requests = [];
        this.view.update(this.score, this.getNumberOfLifes());
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


    deleteDeadPacmans(pacman) {
        var index = -1;
        for (let pacman of this.pacmans) {
            if (pacman.isDead()) {
                index = this.pacmans.indexOf(pacman); 
                this.pacmans.splice(index, 1);
            }
        }   
    } 


    setNextPacmanDirection(direction_name) {
        for (var pacman of this.pacmans) {
           pacman.setNextDirection(direction_name);
        }
    } 


    getNumberOfLifes() {
        var lifes = 0;
        for (let pacman of this.pacmans) {
            lifes += pacman.getNumberOfLifes();
        }
        return lifes;
    }


    incrementScoreBy(value) {
        this.score += value;
    }


    decrementPoint() {
        this.available_points--;
    }


    getBoardPositionID(position) {
        return this.board.getIdAt(position);
    }

    
    getBoardPositionElement(position) {
        return this.board.getElementAtIndex(position.getX(), position.getY());
    }


}