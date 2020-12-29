"use strict";

class MovableObject {
    
	constructor(game, xPosition, yPosition) {
		this.game = game;
		this.xPosition = xPosition;
		this.yPosition = yPosition;
		this.next_xPosition = xPosition;
		this.next_yPosition = yPosition;
	}
	
	
	calculateNewPosition(direction) {
		this.next_xPosition = this.xPosition + direction.x;
		this.next_yPosition = this.yPosition + direction.y;
	}
	
	
	isNextFieldPositionEqual(object) {
		return this.game.field.getFieldObject(this.next_xPosition, this.next_yPosition) == object;
	}
	
}