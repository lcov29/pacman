"use strict";

class Level {


    constructor(game, level_text) {
        this.game = game;
        this.board = new Board(level_text);
        this.teleporters = [];
        this.pacmans = [];
        this.ghosts = [];
        this.available_points = 0;
        this.total_pacman_lifes = 0;
        this.score = Configuration.initial_score;
        this.update_requests = [];
    }


    initialize() {
        this.teleporters = this.initializeTeleporters();
        this.pacmans = this.initializePacmans();
        this.ghosts = this.initializeGhosts();
        this.available_points = this.board.countAvailablePoints();
        this.total_pacman_lifes = this.countNumberOfPacmanLifes();
        this.initializeGhostDoorDirections();
    }


    setNextPacmanDirection(direction_name) {
        for (let pacman of this.pacmans) {
           pacman.setMovementDirectionName(direction_name);
        }
    } 


    getNumberOfPacmanLifes() {
        return this.total_pacman_lifes;
    }


    getTeleportDestination(position) {
        let destination = undefined;
        for (let teleporter of this.teleporters) {
            if (teleporter.isTeleporterFor(position)) {
                destination = teleporter.getDestinationPositionFor(position);
                break;
            }
        }
        return destination;
    }


    getPacmanIDs() {
        let ids = [];
        for (let pacman of this.pacmans) {
            ids.push(pacman.getCurrentPosition().getID());
        }
        return ids;
    }


    getBoardPositionAt(x, y) {
        return this.board.getPosition(x, y);
    }


    getBoardPositionArray() {
        return this.board.buildBoardPositionArray();
    }


    isBoardElementTeleporter(element) {
        return Teleporter.isElementTeleporter(element);
    }


    addUpdateRequest(request) {
        this.update_requests.push(request);
    }


    addTeleportersToNeighborIDList(neighbor_id_list) {
        for (let teleporter of this.teleporters) {
            neighbor_id_list[teleporter.getIDPosition1()].push(teleporter.getIDPosition2());
            neighbor_id_list[teleporter.getIDPosition2()].push(teleporter.getIDPosition1());
        }
    }


    buildAccessibleNeighborIdList() {
        let neighbor_id_list = this.board.buildAccessibleNeighborIdList();
        this.addTeleportersToNeighborIDList(neighbor_id_list);
        return neighbor_id_list;

    }


    incrementScoreBy(value) {
        this.score += value;
    }

    
    decrementAvailablePoints() {
        this.available_points--;
    }


    decrementLifeOfPacman(pacman_id) {
        for (let pacman of this.pacmans) {
            if (pacman.getCurrentPosition().getID() === pacman_id) {
                pacman.decrementLife();
                this.total_pacman_lifes--;
            }
        }
    }


    movePacmans() {
        for (let pacman of this.pacmans) {
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
        let index = -1;
        for (let pacman of this.pacmans) {
            if (pacman.isDead()) {
                index = this.pacmans.indexOf(pacman); 
                this.pacmans.splice(index, 1);
            }
        }   
    } 


    countNumberOfPacmanLifes() {
        let lifes = 0;
        for (let pacman of this.pacmans) {
            lifes += pacman.getNumberOfLifes();
        }
        return lifes;
    }


    initializeTeleporters() {
        let teleporters = [new Teleporter(), new Teleporter(), new Teleporter()];
        let output = [];
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
        let pacmans = [];
        for (let position of this.board.getInitialPacmanPositions()) {
            pacmans.push(new Pacman(this, position));
            this.board.setPosition(position); // set initial movement direction
        }
        return pacmans;
    }


    initializeGhosts() {
        let ghosts = [];
        let accessible_position_list = this.board.buildAccessibleBoardPositionList();
        let neighbor_id_list = this.buildAccessibleNeighborIdList();
        let routing = new Routing(accessible_position_list, neighbor_id_list);
        for (let position of this.board.getInitialGhostPositions()) {
            switch (position.getCharacter()) {
                case Configuration.ghost_blinky_character:                     // add different ghost types
                    ghosts.push(new Blinky(this, position, routing));
                    break;
            }
            this.board.setPosition(position); // set initial movement direction
        }
        return ghosts;
    }


    initializeGhostDoorDirections() {
        let ghost_door_direction = "";
        let accessible_neighbors = undefined;

        for(let position of this.board.getGhostDoorPositions()) {
            accessible_neighbors = this.board.buildAccessibleNeighborList(position.getX(), position.getY());
            ghost_door_direction = this.calculateGhostDoorDirection(accessible_neighbors);
            position.setMovementDirection(ghost_door_direction);
            this.board.setPosition(position);
        }
    }


    calculateGhostDoorDirection(accessible_neighbors) {
        let output = "";
        switch (accessible_neighbors.length) {
            case 0:
            case 1:
            case 3:
            case 4:
                output = Configuration.ghost_door_direction_suffix_diagonal;
                break;

            case 2:
                let start_position = undefined;
                let end_position = undefined;
                for(let x = 0; x < accessible_neighbors.length; x++) {
                    start_position = accessible_neighbors[x];
                    for(let y = x + 1; y < accessible_neighbors.length; y++) {
                        end_position = accessible_neighbors[y];
                        output = Directions.calculateGhostDoorNeighborDirectionName(start_position, end_position);
                        if(output !== "") { break; }
                    }
                    if (output !== "") { break; }
                }
                break;
        }
        return output;
    }
    

}