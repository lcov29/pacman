"use strict";

class Level {


    constructor(level_text, view) {
        this.board = new Board(level_text);
        this.view = view;
        this.teleporters = this.initializeTeleporters();
        this.pacmans = this.initializePacmans();
        this.ghosts = this.initializeGhosts();
        this.available_points = this.board.countAvailablePoints();
        this.score = Configuration.initial_score;
        this.update_requests = [];
    }


    getNumberOfLifes() {
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
            }
        }
    }


    addUpdateRequest(request) {
        this.update_requests.push(request);
        this.view.addUpdateRequest(request);
    }

    
    getBoardPositionID(xPosition, yPosition) {
        return this.board.getIdAtIndex(xPosition, yPosition);
    }

    
    getBoardPositionElement(position) {
        return this.board.getElementAtIndex(position.getX(), position.getY());
    }

    
    isBoardElementTeleporter(element) {
        return Teleporter.isElementTeleporter(element);
    }


    incrementScoreBy(value) {
        this.score += value;
    }

    
    decrementPoint() {
        this.available_points--;
    }

    
    initializeTeleporters() {
        var teleporters = [new Teleporter(), new Teleporter(), new Teleporter()];
        var output = [];

        for (let position of this.board.getTeleporterPositions()) {
            switch (this.board.getElementAt(position)) {
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
        var routing_node_list = this.board.getRoutingNodeList();
        var neighbor_id_list = this.buildRoutingNeighborIDList();
        var routing = new Routing(routing_node_list, neighbor_id_list);
        for (let position of this.board.getInitialGhostPositions()) {
            switch (this.board.getElementAt(position)) {
                case Configuration.ghost_blinky_character:                     // add different ghost types
                    ghosts.push(new Blinky(this, position, routing));
                    break;
            }
        }
        return ghosts;
    }


    buildRoutingNeighborIDList() {
        var neighbor_id_list = this.board.buildRoutingNeighborIdList();
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
        for (let request of this.update_requests) {
            this.board.setElementAt(request.position, request.object);
        }
        this.update_requests = [];
        this.view.update(this.score, this.getNumberOfLifes());
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