"use strict";

class Game {

	
	constructor(field, view) {
		this.field = field;
		this.view = view;
		this.controller = undefined;
		this.pacmans = field.initializePacmans(this);
		this.ghosts = field.initializeGhosts(this);
		this.available_points = field.countAvailablePoints();
		this.routing = new Routing(this);
		this.score = 0;
	}

	
	setController(controller) {
		this.controller = controller;
	}
	
	
	//TODO: implement level validation
	isLevelInputValid(level_text) {	}
	
	
	nextStep() {
		this.movePacmans();
		this.field.update();
		this.moveGhosts();
		this.field.update();
		this.deleteDeadPacmans();
		this.view.update(this.score, this.getNumberOfLifes());
		this.handleWin();
		this.handleDefeat();
	}
	
	
	movePacmans() {
		var index = -1;
		for (var pacman of this.pacmans) {
			pacman.move();
		}
	}
	
	
	moveGhosts() {
		var new_position = undefined;
		for (var ghost of this.ghosts) {
			new_position = this.routing.calculateNextPosition(ghost.xPosition, ghost.yPosition);
			ghost.moveToPosition(new_position);
		}
	}
	
	
	deleteDeadPacmans(pacman) {
		var index = -1;
		for (var pacman of this.pacmans) {
			if (pacman.isDead()) {
				index = this.pacmans.indexOf(pacman); 
				this.pacmans.splice(index, 1);
			}
		}	
	}
		
	
	handleWin() {
		if (this.isGameWon()) {
			this.view.printVictoryMessage();
			this.controller.endGame();
		}
	}
	
	
	handleDefeat() {
		if (this.isGameLost()) {
			this.view.printDefeatMessage();
			this.controller.endGame();
		}
	}
	
	
	isGameWon() {
		return this.available_points == 0;
	}

	
	isGameLost() {
		return this.getNumberOfLifes() == 0;
	}
	
	
	setNextPacmanDirection(direction_name) {
		for (var pacman of this.pacmans) {
			pacman.setNextDirection(direction_name);
		}
	}
	
	
	getNumberOfLifes() {
		var lifes = 0;
		for (var pacman of this.pacmans) {
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