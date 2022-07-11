'use strict';

import Level from './Level.mjs';
import CanvasView from './views/canvas/CanvasView.mjs';
import Configuration from '../Configuration.mjs';


export default class Game {


   constructor(boardContainerId, scoreId, lifeId) {
      this.level = null;
      this.mainView = new CanvasView(this);
      this.viewList = [this.mainCanvas];
   }


   loadLevel() {
      this.level = new Level(this);
      this.level.initialize(this.readLevelJson());
      this.initializeViews();
   }


   initializeViews() {
      this.sendInitialBackgroundRequests();
      this.sendInitialMovementRequests();
      this.viewList.forEach((view) => { view.initialize(); });
   }


   sendInitialBackgroundRequests() {
      const requestList = this.level.getInitialBackgroundRequestList();
      for (let request of requestList) {
         this.addBackgroundRequest(request);
      }
   }


   sendInitialMovementRequests() {
      const requestList = this.level.getInitialActorMovementRequestList();
      for (let request of requestList) {
         this.addMovementRequest(request);
      }
   }


   addMovementRequest(request) {
      this.viewList.forEach((view) => { view.addMovementRequest(request); });
   }


   addBackgroundRequest(request) {
      this.viewList.forEach((view) => { view.addBackgroundRequest(request); });
   }


   readLevelJson() {
      let level = sessionStorage.getItem('customLevel');
      sessionStorage.removeItem('customLevel');
      if (level === null) {
         level = Configuration.DEFAULT_LEVEL_JSON;
      }
      return level;
   }


   notifyTurnComplete() {
      this.viewList.forEach((view) => { view.processRequestStacks(); })
   }


   notifyAnimationComplete() {
      this.level.executeTurn();
   }
   

   start() {
      this.mainView.startAnimationLoop();
   }


   end() {
      this.mainView.stopAnimationLoop();
   }


   /*
   nextTurn() {
      this.level.executeTurn();
      this.handleWin();
      this.handleDefeat();
   }*/


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


   /*
   updateView(boardPositions, styleClass, score, numberOfLifes) {
      this.view.update(boardPositions, styleClass, score, numberOfLifes);
   }*/


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