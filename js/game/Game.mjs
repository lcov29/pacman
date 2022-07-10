'use strict';

import Level from './Level.mjs';
import View from './View.mjs';
import Configuration from '../Configuration.mjs';


export default class Game {


   constructor(boardContainerId, scoreId, lifeId) {
      this.animationInterval = null;
      this.level = null;
      // this.view = new View(boardContainerId, scoreId, lifeId);
      this.viewList = [];
      this.inProgress = false;
   }


   loadLevel() {
      this.level = new Level(this);
      this.level.initialize(this.readLevelJson());
      this.view.initialize(this.level.getBoardPositionArray());
   }


   addMovementRequest(request) {
      this.viewList.forEach((view) => { view.addMovementRequest(request); });
   }


   readLevelJson() {
      let level = sessionStorage.getItem('customLevel');
      sessionStorage.removeItem('customLevel');
      if (level === null) {
         level = Configuration.DEFAULT_LEVEL_JSON;
      }
      return level;
   }
   

   start() {
      if (this.inProgress === false) {  
         this.animationInterval = setInterval(function(ref) {ref.nextTurn();}, Configuration.INTERVAL_DELAY_IN_MILLISECONDS, this);
         this.inProgress = true; 
      }
   }


   nextTurn() {
      this.level.executeTurn();
      this.handleWin();
      this.handleDefeat();
   }


   handleWin() {
      if (this.level.isWon()) {
         this.view.printMessage('Victory')
         this.end();
      }
   }
   
   
   handleDefeat() {
      if (this.level.isLost()) {
         this.view.printMessage('Game over');
         this.end();
      }
   }


   end() {
      clearInterval(this.animationInterval);
      this.inProgress = false;
   }


   updateView(boardPositions, styleClass, score, numberOfLifes) {
      this.view.update(boardPositions, styleClass, score, numberOfLifes);
   }


   isInProgress() {
      return this.inProgress;
   }


   processUserCommand(keycode) {
         switch(keycode) {
         
            case Configuration.KEY_CODE_UP_ARROW:
            case Configuration.KEY_CODE_W:
               this.level.setNextPacmanDirection(Configuration.DIRECTION_NAME_UP);
               break;
            
            case Configuration.KEY_CODE_RIGHT_ARROW:
            case Configuration.KEY_CODE_D:
               this.level.setNextPacmanDirection(Configuration.DIRECTION_NAME_RIGHT);
               break;
            
            case Configuration.KEY_CODE_DOWN_ARROW:
            case Configuration.KEY_CODE_S:
               this.level.setNextPacmanDirection(Configuration.DIRECTION_NAME_DOWN);
               break;
      
            case Configuration.KEY_CODE_LEFT_ARROW:
            case Configuration.KEY_CODE_A:
               this.level.setNextPacmanDirection(Configuration.DIRECTION_NAME_LEFT);
               break;

            case Configuration.KEY_CODE_ENTER:
            case Configuration.KEY_CODE_SPACE:
               this.start();
               break;
         }         
   }
   
   
}