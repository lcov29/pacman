"use strict";

import Configuration from "./Configuration.mjs";
import Game from "./Game.mjs";

/*  
    =================================================================================================================
    Initialization code that gets executed once upon loading the index.html
    =================================================================================================================
*/


let game = new Game('level_container', 'score', 'life');
game.loadLevel(Configuration.DEFAULT_LEVEL);   
document.getElementById("level_input").value = Configuration.DEFAULT_LEVEL; // THINK ABOUT REMOVING
initializeLevelElementsList();

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
   if (game.isInProgress()) {
      switch(e.keyCode) {
      
         case Configuration.KEY_CODE_UP_ARROW:
         case Configuration.KEY_CODE_W:
            game.setPacmanDirection(Configuration.DIRECTION_NAME_UP);
            break;
         
         case Configuration.KEY_CODE_RIGHT_ARROW:
         case Configuration.KEY_CODE_D:
            game.setPacmanDirection(Configuration.DIRECTION_NAME_RIGHT);
            break;
         
         case Configuration.KEY_CODE_DOWN_ARROW:
         case Configuration.KEY_CODE_S:
            game.setPacmanDirection(Configuration.DIRECTION_NAME_DOWN);
            break;
   
         case Configuration.KEY_CODE_LEFT_ARROW:
         case Configuration.KEY_CODE_A:
            game.setPacmanDirection(Configuration.DIRECTION_NAME_LEFT);
            break;
      }         
      e.preventDefault();
   }
}


function initializeLevelElementsList() {
   let list = document.getElementById("level_elements_list");
   list.childNodes[1].innerHTML = `${Configuration.WALL_CHARACTER} : Wall`;
   list.childNodes[3].innerHTML = `${Configuration.EMPTY_TILE_CHARACTER} : Empty`;
   list.childNodes[5].innerHTML = `${Configuration.GHOST_DOOR_CHARACTER} : Ghost Door`;
   list.childNodes[7].innerHTML = `${Configuration.GHOST_BLINKY_CHARACTER} : Blinky (red ghost)`;
   list.childNodes[9].innerHTML = `${Configuration.PACMAN_CHARACTER} : Pacman`;
   list.childNodes[11].innerHTML = `${Configuration.POINT_CHARACTER} : Point`;
   list.childNodes[13].innerHTML = `${Configuration.TELEPORTER_1_CHARACTER} : Teleporter 1 (requires destination)`;
   list.childNodes[15].innerHTML = `${Configuration.TELEPORTER_2_CHARACTER} : Teleporter 2 (requires destination)`;
   list.childNodes[17].innerHTML = `${Configuration.TELEPORTER_3_CHARACTER} : Teleporter 3 (requires destination)`;
}