import Directions from './Directions.mjs';
import CanvasView from '../views/canvas/CanvasView.mjs';
import LevelRotation from './level/LevelRotation.mjs';


export default class Game {


   #currentLevel = null;
   #levelRotation = [];
   #mainView = null;
   #viewList = [];
   #isAnimationLoopContinuationNeeded = true;
   #remainingPacmanLifes = 0;


   constructor(mainCanvas, backgroundCanvas) {
      this.#mainView = new CanvasView(mainCanvas, backgroundCanvas, this);
      this.#viewList = [this.#mainView];
      this.#isAnimationLoopContinuationNeeded = true;
      Directions.initializeDirectionMaps();
   }


   initialize() {
      this.#levelRotation = new LevelRotation();
      this.#levelRotation.initialize();
      this.#remainingPacmanLifes = this.#levelRotation.initialPacmanLifes;
      this.loadNextLevel();
   }


   loadNextLevel() {
      this.#currentLevel = this.#levelRotation.getNextLevel(this);
      this.#initializeViews();
   }


   setNextPacmanDirection(directionName) {
      this.#currentLevel.setNextPacmanDirection(directionName);
   }


   addMovementRequest(request) {
      this.#viewList.forEach((view) => { view.addMovementRequest(request); });
   }


   addRespawnRequest(request) {
      this.#viewList.forEach((view) => { view.addRespawnRequest(request); });
   }


   addBackgroundRequest(request) {
      request.lifeCount = this.#remainingPacmanLifes;
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
      this.#viewList.forEach((view) => { view.processRequests(); });
   }


   notifyAnimationComplete() {
      const isGameInProgress = this.#isGameInProgress();

      this.#handleWin();
      this.#handleDefeat();
      if (isGameInProgress) {
         this.#currentLevel.calculateNextTurn();
      } else {
         this.end();
         this.loadNextLevel();
         this.start();
      }
      this.#isAnimationLoopContinuationNeeded = isGameInProgress;
   }


   decrementPacmanLifes() {
      if (this.#remainingPacmanLifes > 0) {
         this.#remainingPacmanLifes--
      }
   }


   #isLost() {
      this.#remainingPacmanLifes === 0;
   }


   #initializeViews() {
      this.#sendInitialBackgroundRequests();
      this.#sendInitialMovementRequests();

      const boardDimension = this.#levelRotation.getCurrentLevelBoardDimension();
      this.#viewList.forEach((view) => { view.initialize(boardDimension); });
   }


   #isGameInProgress() {
      const isNotWon = !this.#currentLevel.isWon();
      const isNotLost = !this.#isLost();
      return isNotWon && isNotLost;
   }


   #handleWin() {
      if (this.#currentLevel.isWon()) {
         window.alert('Victory');   // Placeholder, replace later
      }
   }


   #handleDefeat() {
      if (this.#isLost()) {
         window.alert('Game over'); // Placeholder, replace later
      }
   }


   #sendInitialBackgroundRequests() {
      const requestList = this.#currentLevel.getInitialBackgroundRequestList();
      for (let request of requestList) {
         this.addBackgroundRequest(request);
      }
   }


   #sendInitialMovementRequests() {
      const requestList = this.#currentLevel.getInitialActorMovementRequestList();
      for (let request of requestList) {
         this.addMovementRequest(request);
      }
   }

   
}