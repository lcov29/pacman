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
document.getElementById('button_build_level').addEventListener('click', callBackBuildLevelButton);
document.addEventListener('keydown', callBackKeyDown, true);



// HELPER FUNCTIONS

function callBackStartButton() {
   if (!game.isInProgress()) {
      game.start();
   }
}


function callBackBuildLevelButton() {
   let level_text = document.getElementById("level_input").value;
   game.loadLevel(level_text);
}


function callBackKeyDown(e) {
   game.processUserCommand(e.keyCode);
   e.preventDefault();
}