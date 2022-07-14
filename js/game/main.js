'use strict';

import Game from './Game.mjs';

/*  
    =================================================================================================================
    Initialization code that gets executed once upon loading the index.html
    =================================================================================================================
*/


const mainCanvas = document.getElementById('gameCanvas');
const backgroundCanvas = document.getElementById('backgroundCanvas');

const game = new Game(mainCanvas, backgroundCanvas);
game.loadLevel();   

mainCanvas.addEventListener('click', () => game.start() );
document.addEventListener('keydown', callBackKeyDown, true);
document.getElementsByClassName('buttonMobileMenu')[0].addEventListener('click', callBackMobileMenuButton);




// HELPER FUNCTIONS

function callBackMobileMenuButton() {
   this.classList.toggle('mobileMenuVisible');
}


function callBackKeyDown(e) {
   game.processUserCommand(e.keyCode);
   e.preventDefault();
}