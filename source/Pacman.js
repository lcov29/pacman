"use strict";

class Pacman extends MovableObject {
	
	
	constructor(game, xPosition, yPosition) {
		super(game, xPosition, yPosition);
		this.next_direction = '';
		this.lifes = 1;
	}
	
	
	move() {
		if (this.next_direction != '') {
			let direction = Dictionary.getDirectionByName(this.next_direction);
			super.calculateNewPosition(direction);
			this.handleCollisions();
			this.updatePosition();
		}
	}
	
	
	handleCollisions() {
		this.handleWallCollision();
		this.handlePointCollision();
		this.handleGhostCollision();
	}
	
	
	//TODO: move functions manipulating x and y from Pacman.js and Ghost.js to MovableObject.js
	//TODO: move content of this function into move()
	updatePosition() {
		this.updateField();
		this.xPosition = this.next_xPosition;
		this.yPosition = this.next_yPosition;
	}
	
	
	handleWallCollision() {
		if (this.isNextFieldPositionEqual('wall')) {
			this.next_xPosition = this.xPosition;
			this.next_yPosition = this.yPosition;
		}
	}
	
	
	handlePointCollision() {
		if (this.isNextFieldPositionEqual('point')) {
			this.game.incrementScoreBy(10);
			this.game.decrementPoint();
		}
	}
	
	
	handleGhostCollision() {
		if (this.isNextFieldPositionEqual('ghost')) {
			this.decrementLife();
		}
	}
	
	
	updateField() {
		this.game.field.addUpdateRequest(new UpdateRequest(this.xPosition, this.yPosition, 'empty'));
		if (this.lifes > 0) {
			this.game.field.addUpdateRequest(new UpdateRequest(this.next_xPosition, this.next_yPosition, 'pacman'));
		}
	}
	
	
	decrementLife() {
		if (this.lifes > 0) {
			this.lifes--;
		}
	}
	
	
	setNextDirection(direction_name) {
		this.next_direction = direction_name;
	}
	
	
	setNumberOfLifes(lifes) {
		this.lifes = lifes;
	}

	
	getNumberOfLifes() {
		return this.lifes;
	}
	
	
	isDead() {
		return this.lifes == 0;
	}
	
	
}