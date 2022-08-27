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


   setNextPacmanDirection(directionName) {
      this.#level.setNextPacmanDirection(directionName);
   }



   addMovementRequest(request) {
      this.#viewList.forEach((view) => { view.addMovementRequest(request); });
   }


   addRespawnRequest(request) {
      this.#viewList.forEach((view) => { view.addRespawnRequest(request); });
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
      const customLevelItemName = Configuration.customLevelSessionStorageItemName;
      const customLevel = window.sessionStorage.getItem(customLevelItemName);

      if (customLevel) {
         window.sessionStorage.removeItem(customLevelItemName);
         return customLevel;
      } else {
         return Configuration.jsonDefaultLevel;
      }
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
   
   
}