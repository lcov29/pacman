"use strict";


//TODO: check for better solutions (key-value pairs of dict are redundant)
class Dictionary {
	
	
	static getSymbol(object) {
		var dict = {
			'wall': '#',
			'ghost': 'g',
			'point': 'o',
			'pacman': 'p',
			'empty': 'x'
		};
		return dict[object];
	}
	
	
	static getObject(symbol) {
		var dict = {
			'#': 'wall',
			'g': 'ghost',
			'o': 'point',
			'p': 'pacman',
			'x': 'empty'
		};
		return dict[symbol];
	}
	
	
	static getDirectionByID(direction_id) {
		var dict = {
			0: {name:'up', x:0, y:-1},
			1: {name:'right', x:1, y:0},
			2: {name:'down', x:0, y:1},
			3: {name:'left', x:-1, y:0}
		};
		return dict[direction_id];
	}
	
	
	static getDirectionByName(name) {
		var dict = {
			'up': {x:0, y:-1},
			'right': {x:1, y:0},
			'down': {x:0, y:1},
			'left': {x:-1, y:0}
		};
		return dict[name];
	}
	
	
}