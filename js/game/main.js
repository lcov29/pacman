"use strict";

import Game from "./Game.mjs";

/*  
    =================================================================================================================
    Initialization code that gets executed once upon loading the index.html
    =================================================================================================================
*/


let game = new Game('level_container', 'score', 'life');
game.loadLevel();   

document.getElementById('button_start').addEventListener('click', callBackStartButton);
document.addEventListener('keydown', callBackKeyDown, true);



// HELPER FUNCTIONS

function callBackStartButton() {
   if (!game.isInProgress()) {
      game.start();
   }
}


function callBackKeyDown(e) {
   game.processUserCommand(e.keyCode);
   e.preventDefault();
}