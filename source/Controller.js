//TODO: think about moving this code to Game.js and deleting this class

"use strict";

class Controller {
	
	
	constructor(game) {
		this.game = game;
		this.animation_interval = undefined;
	}
	
	
	startGame() {
		this.game.setController(this);
		this.animation_interval = setInterval(function(ref) {ref.game.nextStep();}, 500, this);	
		document.addEventListener('keydown', this.callBackEventListener, true);
	}
	
	
	callBackEventListener(event) {
			//SOURCE http://www.javascriptkeycode.com	
			const KEY_CODE_LEFT_ARROW = 37;
			const KEY_CODE_UP_ARROW = 38;
			const KEY_CODE_RIGHT_ARROW = 39;
			const KEY_CODE_DOWN_ARROW = 40;
			const KEY_CODE_A = 65;
			const KEY_CODE_D = 68;
			const KEY_CODE_S = 83;
			const KEY_CODE_W = 87;

			switch(event.keyCode) {
				
				case KEY_CODE_UP_ARROW:
				case KEY_CODE_W:
					game.setNextPacmanDirection('up');
					break;
				
				case KEY_CODE_LEFT_ARROW:
				case KEY_CODE_A:
					game.setNextPacmanDirection('left');
					break;
				
				case KEY_CODE_DOWN_ARROW:
				case KEY_CODE_S:
					game.setNextPacmanDirection('down');
					break;
					
				case KEY_CODE_RIGHT_ARROW:
				case KEY_CODE_D:
					game.setNextPacmanDirection('right');
					break;
			}
			
			event.preventDefault();
	}
	
	
	endGame() {
		clearInterval(this.animation_interval);
		document.removeEventListener('keydown', this.callBackEventListener);
	}
	
}