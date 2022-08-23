'use strict';

import Level from './level/Level.mjs';
import Directions from './Directions.mjs';
import CanvasView from '../views/canvas/CanvasView.mjs';
import Configuration from '../../global/Configuration.mjs';


export default class Game {


   #level = null;
   #mainView = null;
   #viewList = [];
   #isAnimationLoopContinuationNeeded = true;


   constructor(mainCanvas, backgroundCanvas) {
      this.#mainView = new CanvasView(mainCanvas, backgroundCanvas, this);
      this.#viewList = [this.#mainView];
      this.#isAnimationLoopContinuationNeeded = true;
      Directions.initializeDirectionMaps();
   }


   loadLevel() {
      this.#level = new Level(this);
      const jsonLevel = this.#readLevelJson();
      this.#level.initialize(jsonLevel);
      this.#initializeViews();
   }


   addMovementRequest(request) {
      this.#viewList.forEach((view) => { view.addMovementRequest(request); });
   }


   addBackgroundRequest(request) {
      this.#viewList.forEach((view) => { view.addBackgroundRequest(request); });
   }


   start() {
      this.#mainView.startAnimationLoop();
   }


   end() {
      this.#mainView.stopAnimationLoop();
   }


   isAnimationLoopContinuationNecessary() {
      return this.#isAnimationLoopContinuationNeeded;
   }


   notifyTurnCalculationComplete() {
      this.#viewList.forEach((view) => { view.processUpdateRequestStack(); });
   }


   notifyAnimationComplete() {
      const isGameInProgress = this.#isGameInProgress();

      this.#handleWin();
      this.#handleDefeat();
      if (isGameInProgress) {
         this.#level.calculateNextTurn();
      } else {
         this.end();
      }
      this.#isAnimationLoopContinuationNeeded = isGameInProgress;
   }


   #readLevelJson() {
      const itemName = Configuration.customLevelSessionStorageItemName;
      let level = window.sessionStorage.getItem(itemName);
      window.sessionStorage.removeItem(itemName);
      if (level === null) {
         level = Configuration.jsonDefaultLevel;
      }
      return level;
   }


   #initializeViews() {
      this.#sendInitialBackgroundRequests();
      this.#sendInitialMovementRequests();
      this.#viewList.forEach((view) => { view.initialize(); });
   }


   #isGameInProgress() {
      const isNotWon = !this.#level.isWon();
      const isNotLost = !this.#level.isLost();
      return isNotWon && isNotLost;
   }


   #handleWin() {
      if (this.#level.isWon()) {
         window.alert('Victory');   // Placeholder, replace later
      }
   }


   #handleDefeat() {
      if (this.#level.isLost()) {
         window.alert('Game over'); // Placeholder, replace later
      }
   }


   #sendInitialBackgroundRequests() {
      const requestList = this.#level.getInitialBackgroundRequestList();
      for (let request of requestList) {
         this.addBackgroundRequest(request);
      }
   }


   #sendInitialMovementRequests() {
      const requestList = this.#level.getInitialActorMovementRequestList();
      for (let request of requestList) {
         this.addMovementRequest(request);
      }
   }


   processUserCommand(keycode) {
         switch(keycode) {
         
            case Configuration.keyCodeUpArrow:
            case Configuration.keyCodeW:
               this.#level.setNextPacmanDirection(Configuration.directionNameUp);
               break;
            
            case Configuration.keyCodeRightArrow:
            case Configuration.keyCodeD:
               this.#level.setNextPacmanDirection(Configuration.directionNameRight);
               break;
            
            case Configuration.keyCodeDownArrow:
            case Configuration.keyCodeS:
               this.#level.setNextPacmanDirection(Configuration.directionNameDown);
               break;
      
            case Configuration.keyCodeLeftArrow:
            case Configuration.keyCodeA:
               this.#level.setNextPacmanDirection(Configuration.directionNameLeft);
               break;

            case Configuration.keyCodeEnter:
            case Configuration.keyCodeSpace:
               this.start();
               break;
         }         
   }
   
   
}