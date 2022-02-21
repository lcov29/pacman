'use strict';

import Game from './Game.mjs';

/*  
    =================================================================================================================
    Initialization code that gets executed once upon loading the index.html
    =================================================================================================================
*/


let game = new Game('levelContainer', 'score', 'life');
game.loadLevel();   

document.getElementsByClassName('buttonMobileMenu')[0].addEventListener('click', callBackMobileMenuButton);
document.getElementById('levelContainer').addEventListener('click', callBackGameStart);
document.addEventListener('keydown', callBackKeyDown, true);



// HELPER FUNCTIONS

function callBackMobileMenuButton() {
   this.classList.toggle('mobileMenuVisible');
}


function callBackGameStart() {
   game.start();
}


function callBackKeyDown(e) {
   game.processUserCommand(e.keyCode);
   e.preventDefault();
}