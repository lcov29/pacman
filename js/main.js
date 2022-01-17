"use strict";

import Configuration from "./Configuration.js";
import Game from "./Game.js";

/*  
    =================================================================================================================
    Initialization code that gets executed once upon loading the index.html
    =================================================================================================================
*/


let game = new Game('level_container', 'score', 'life');
game.loadLevel(Configuration.default_map);   
document.getElementById("level_input").value = Configuration.default_map; // THINK ABOUT REMOVING
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
      
         case Configuration.key_code_up_arrow:
         case Configuration.key_code_w:
            game.setPacmanDirection('up');
            break;
         
         case Configuration.key_code_right_arrow:
         case Configuration.key_code_d:
            game.setPacmanDirection('right');
            break;
         
         case Configuration.key_code_down_arrow:
         case Configuration.key_code_s:
            game.setPacmanDirection('down');
            break;
   
         case Configuration.key_code_left_arrow:
         case Configuration.key_code_a:
            game.setPacmanDirection('left');
            break;
      }         
      e.preventDefault();
   }
}


function initializeLevelElementsList() {
   let list = document.getElementById("level_elements_list");
   list.childNodes[1].innerHTML = `${Configuration.wall_character} : Wall`;
   list.childNodes[3].innerHTML = `${Configuration.empty_tile_character} : Empty`;
   list.childNodes[5].innerHTML = `${Configuration.ghost_door_character} : Ghost Door`;
   list.childNodes[7].innerHTML = `${Configuration.ghost_blinky_character} : Blinky (red ghost)`;
   list.childNodes[9].innerHTML = `${Configuration.pacman_character} : Pacman`;
   list.childNodes[11].innerHTML = `${Configuration.point_character} : Point`;
   list.childNodes[13].innerHTML = `${Configuration.teleporter_1_tile_character} : Teleporter 1 (requires destination)`;
   list.childNodes[15].innerHTML = `${Configuration.teleporter_2_tile_character} : Teleporter 2 (requires destination)`;
   list.childNodes[17].innerHTML = `${Configuration.teleporter_3_tile_character} : Teleporter 3 (requires destination)`;
}