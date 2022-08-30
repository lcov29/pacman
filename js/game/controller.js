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

window.addEventListener('load', () => game.initialize() ); // ensure all resources are completely loaded 

mainCanvas.addEventListener('click', () => game.start() );
document.addEventListener('keydown', callBackKeyDown, true);
document.getElementsByClassName('buttonMobileMenu')[0].addEventListener('click', callBackMobileMenuButton);


function callBackMobileMenuButton() {
   this.classList.toggle('mobileMenuVisible');
}


function callBackKeyDown(event) {
   switch(event.code) {
   
      case 'ArrowUp':
      case 'KeyW':
         game.setNextPacmanDirection(Configuration.directionNameUp);
         event.preventDefault();
         break;
      
      case 'ArrowRight':
      case 'KeyD':
         game.setNextPacmanDirection(Configuration.directionNameRight);
         event.preventDefault();
         break;
      
      case 'ArrowDown':
      case 'KeyS':
         game.setNextPacmanDirection(Configuration.directionNameDown);
         event.preventDefault();
         break;

      case 'ArrowLeft':
      case 'KeyA':
         game.setNextPacmanDirection(Configuration.directionNameLeft);
         event.preventDefault();
         break;

      case 'Enter':
      case 'Space':
         game.start();
         event.preventDefault();
         break;

      case 'KeyP':
         game.togglePause();
         break;
   }         
}