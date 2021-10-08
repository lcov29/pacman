"use strict";

class Level {


    constructor(level_text, view) {
        this.field = new Field(level_text);
        this.routing = new Routing(this);
        this.view = view;
        this.pacmans = this.field.getPacmans(this);
        this.ghosts = this.field.getGhosts(this);
        this.available_points = this.field.getPoints();
        this.score = Configuration.initial_score;
        this.update_requests = [];
    }


    addUpdateRequest(request) {
        this.update_requests.push(request);
        this.view.addUpdateRequest(request);
    }
 

    update() {
        for (let request of this.update_requests) {
            this.field.setFieldObject(request.xPosition, request.yPosition, request.object);
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
        var new_position = undefined;
        for (let ghost of this.ghosts) {
            new_position = this.routing.calculateNextPosition(ghost.xPosition, ghost.yPosition);
            ghost.moveToPosition(new_position);
        }
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


}