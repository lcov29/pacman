"use strict";

class Ghost extends MovableObject {
	
	
	constructor(game, xPosition, yPosition) {
		super(game, xPosition, yPosition);
		this.occupied_field_object = 'empty';
	}
	
	
	moveToPosition(position) {
		this.setNextPosition(position.xPosition, position.yPosition)
		this.handlePacManCollision();
		this.updateField();
		this.updateCurrentPosition();
	}
    

	handlePacManCollision() {
		if (this.isNextFieldPositionEqual('pacman')) {
				this.decrementLifeOfPacman();
		}
	}

	
	updateField() {
		this.game.field.addUpdateRequest(new UpdateRequest(this.xPosition, this.yPosition, this.occupied_field_object));
		this.updateOccupiedFieldObject();
		this.game.field.addUpdateRequest(new UpdateRequest(this.next_xPosition, this.next_yPosition, 'ghost'));
    }
    
    	
	decrementLifeOfPacman() {
		for (let pacman of this.game.pacmans) {
			if (pacman.xPosition == this.next_xPosition && pacman.yPosition == this.next_yPosition) {
				pacman.decrementLife();
			}
		}
	}
	
	
	//TODO: check for edge cases
	updateOccupiedFieldObject() {
		var next_field_object = this.game.field.getFieldObject(this.next_xPosition, this.next_yPosition);
		switch(next_field_object) {
			case 'ghost':
			case 'pacman':
				this.occupied_field_object = 'empty';
				break;
			default:
				this.occupied_field_object = this.game.field.getFieldObject(this.next_xPosition, this.next_yPosition);
				break;
		}
	}
	
}
