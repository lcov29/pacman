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
         level = Configuration.jsonDefaultLevel;
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


   processUserCommand(keycode) {
         switch(keycode) {
         
            case Configuration.keyCodeUpArrow:
            case Configuration.keyCodeW:
               this.level.setNextPacmanDirection(Configuration.directionNameUp);
               break;
            
            case Configuration.keyCodeRightArrow:
            case Configuration.keyCodeD:
               this.level.setNextPacmanDirection(Configuration.directionNameRight);
               break;
            
            case Configuration.keyCodeDownArrow:
            case Configuration.keyCodeS:
               this.level.setNextPacmanDirection(Configuration.directionNameDown);
               break;
      
            case Configuration.keyCodeLeftArrow:
            case Configuration.keyCodeA:
               this.level.setNextPacmanDirection(Configuration.directionNameLeft);
               break;

            case Configuration.keyCodeEnter:
            case Configuration.keyCodeSpace:
               this.start();
               break;
         }         
   }
   
   
}