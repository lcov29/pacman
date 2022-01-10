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
        this.score = 0;
        this.update_requests = [];
    }


    initialize() {
        this.teleporters = this.initializeTeleporters();
        this.pacmans = this.initializePacmans();
        this.ghosts = this.initializeGhosts();
        this.available_points = this.board.countAvailablePoints();
        this.total_pacman_lifes = this.pacmans.length * Configuration.initial_pacman_lifes;
        this.score = Configuration.initial_score;
    }


    setNextPacmanDirection(direction_name) {
        for (let pacman of this.pacmans) {
           pacman.setMovementDirectionName(direction_name);
        }
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


    getPacmanIDs() {
        let ids = [];
        for (let pacman of this.pacmans) {
            ids.push(pacman.getCurrentPosition().getID());
        }
        return ids;
    }


    getTurnCompletionStatusForActor(actor_character, actor_id) {
        let result = true;
        let actors = (actor_character === Configuration.pacman_character) ? this.pacmans : this.ghosts;
        for (let actor of actors) {
            if (actor.getCurrentPosition().getID() === actor_id) {
                result = actor.getTurnMovementStatus();
                break;
            }
        }
        return result;
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


    isWon() {
        return this.available_points === 0;
    }


    isLost() {
        return this.total_pacman_lifes === 0;
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


    resetTurnMovementStatusOfActors(actors) {
        for (let actor of actors) {
            actor.setTurnMovementStatus(false);
        }
    }


    executeTurn() {
        this.moveActors(this.pacmans);
        this.update();
        if (this.isWon() === false && this.isLost() === false) {
            this.moveActors(this.ghosts);
            this.update();
        }
        this.deleteDeadPacmans();
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
                this.decrementTotalPacmanLifes();
            }
        }
    }


    decrementTotalPacmanLifes() {
        this.total_pacman_lifes--;
    }


    moveActors(actors) {
        let unmoved_actors = [...actors];
        while (unmoved_actors.length > 0) {
            for (let actor of unmoved_actors) {
                if (actor.getTurnMovementStatus() == false) {
                    if (actor.move()) {
                        this.removeElementFrom(unmoved_actors, actor);
                    }
                }
            }
        }
        this.resetTurnMovementStatusOfActors(actors);
    }


    removeElementFrom(array, element) {
        const NUMBER_OF_ELEMENTS_TO_DELETE = 1;
        array.splice(array.indexOf(element), NUMBER_OF_ELEMENTS_TO_DELETE);
    }


    update() {
        for (let request of this.update_requests) {
            this.board.setPosition(request.getPosition());
            this.game.updateView(request.getPosition(), 
                                 request.getStyleClass(), 
                                 this.score, 
                                 this.total_pacman_lifes);
        }
        this.update_requests = [];
    }


    deleteDeadPacmans() {
        let index = -1;
        for (let pacman of this.pacmans) {
            if (pacman.isDead()) {
                index = this.pacmans.indexOf(pacman); 
                this.pacmans.splice(index, 1);
            }
        }   
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
        let pacman = null;
        for (let position of this.board.getInitialPacmanPositions()) {
            pacman = new Pacman(this, position);
            pacmans.push(pacman);
        }
        return pacmans;
    }


    initializeGhosts() {
        let routing = this.initializeRouting();
        let ghosts = this.initializeGhostObjects(routing);
        this.initializeGhostScatterPoints(ghosts);
        return ghosts;
    }


    initializeRouting() {
        let accessible_position_list = this.board.buildAccessibleBoardPositionList();
        let neighbor_id_list = this.buildAccessibleNeighborIdList();
        return new Routing(accessible_position_list, neighbor_id_list);
    }


    initializeGhostObjects(routing) {
        let ghosts = [];
        for (let position of this.board.getInitialGhostPositions()) {
            switch (position.getCharacter()) {
                case Configuration.ghost_blinky_character:             // add different ghost types
                    ghosts.push(new Blinky(this, position, routing));
                    break;
            }
            //this.board.setPosition(position); // set initial movement direction
        }
        return ghosts;
    }


    initializeGhostScatterPoints(ghosts) {
        for (let position of this.board.getGhostScatterPositions()) {
            for (let ghost of ghosts) {
                if (ghost.getScatterCharacter() === position.getCharacter()) {
                    ghost.setScatterID(position.getID());
                }
            }
        }
        this.board.setCharactersOfScatterPointsTo(Configuration.point_character);
    }


    buildGhostDoorDirectionMap() {
        let ghost_door_direction = "";
        let accessible_neighbors = null;
        let output = [];
        for(let position of this.board.getGhostDoorPositions()) {
            accessible_neighbors = this.board.buildAccessibleNeighborList(position.getX(), position.getY());
            ghost_door_direction = this.calculateGhostDoorDirection(accessible_neighbors);
            output.push({id: position.getID(), direction_suffix: ghost_door_direction});
        }
        return output;
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
                let start_position = null;
                let end_position = null;
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