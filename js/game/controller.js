'use strict';

import Game from '../game/model/Game.mjs';
import Configuration from '../global/Configuration.mjs';


/*  
    =================================================================================================================
    Initialization code that gets executed once upon loading the index.html
    =================================================================================================================
*/


const mainCanvas = document.getElementById('gameCanvas');
const backgroundCanvas = document.getElementById('backgroundCanvas');

const game = new Game(mainCanvas, backgroundCanvas);

window.addEventListener('load', () => game.loadLevel() ); // ensure all resources are completely loaded 

mainCanvas.addEventListener('click', () => game.start() );
document.addEventListener('keydown', callBackKeyDown, true);
document.getElementsByClassName('buttonMobileMenu')[0].addEventListener('click', callBackMobileMenuButton);


function callBackMobileMenuButton() {
   this.classList.toggle('mobileMenuVisible');
}


function callBackKeyDown(event) {
   switch(event.keyCode) {
   
      case Configuration.keyCodeUpArrow:
      case Configuration.keyCodeW:
         game.setNextPacmanDirection(Configuration.directionNameUp);
         event.preventDefault();
         break;
      
      case Configuration.keyCodeRightArrow:
      case Configuration.keyCodeD:
         game.setNextPacmanDirection(Configuration.directionNameRight);
         event.preventDefault();
         break;
      
      case Configuration.keyCodeDownArrow:
      case Configuration.keyCodeS:
         game.setNextPacmanDirection(Configuration.directionNameDown);
         event.preventDefault();
         break;

      case Configuration.keyCodeLeftArrow:
      case Configuration.keyCodeA:
         game.setNextPacmanDirection(Configuration.directionNameLeft);
         event.preventDefault();
         break;

      case Configuration.keyCodeEnter:
      case Configuration.keyCodeSpace:
         game.start();
         event.preventDefault();
         break;
   }         
}