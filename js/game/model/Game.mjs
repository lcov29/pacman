import Directions from './Directions.mjs';
import CanvasView from '../views/canvas/CanvasView.mjs';
import LevelRotation from './level/LevelRotation.mjs';


export default class Game {


   #currentLevel = null;
   #levelRotation = [];
   #mainView = null;
   #viewList = [];
   #isAnimationNecessary = false;
   #remainingPacmanLifes = 0;
   #completedLevelScore = 0;
   #currentTotalScore = 0;


   constructor(mainCanvas, backgroundCanvas) {
      this.#mainView = new CanvasView(mainCanvas, backgroundCanvas, this);
      this.#viewList = [this.#mainView];
      Directions.initializeDirectionMaps();
   }


   get isAnimationNecessary() {
      return this.#isAnimationNecessary;
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
      this.#isAnimationNecessary = false;
   }


   setNextPacmanDirection(directionName) {
      this.#currentLevel.setNextPacmanDirection(directionName);
   }


   addMovementRequest(request) {
      this.#viewList.forEach(view => view.addMovementRequest(request));
   }


   addRespawnRequest(request) {
      this.#viewList.forEach(view => view.addRespawnRequest(request));
   }


   addBackgroundRequest(request) {
      request.lifeCount = this.#remainingPacmanLifes;
      this.#viewList.forEach(view => view.addBackgroundRequest(request));
   }


   start() {
      this.#mainView.startAnimationLoop();
      this.#isAnimationNecessary = true;
   }


   pause() {
      this.#mainView.stopAnimationLoop();
      this.#isAnimationNecessary = false;
   }


   notifyTurnCalculationComplete() {
      this.#viewList.forEach(view => view.processRequests());
   }


   calculateNextTurn() {
      this.#currentLevel.calculateNextTurn();
   }


   decrementPacmanLifes() {
      if (this.#remainingPacmanLifes > 0) {
         this.#remainingPacmanLifes--
      }
   }


   #isGameOver() {
      this.#remainingPacmanLifes === 0;
   }


   #initializeViews() {
      this.#sendInitialBackgroundRequests();
      this.#sendInitialMovementRequests();

      const boardDimension = this.#levelRotation.getCurrentLevelBoardDimension();
      this.#viewList.forEach(view => view.initialize(boardDimension));
   }


   #handleDefeat() {
      if (this.#isGameOver()) {
         window.alert('Game over'); // Placeholder, replace later
      }
   }


   #sendInitialBackgroundRequests() {
      const requestList = this.#currentLevel.getInitialBackgroundRequestList();
      requestList.forEach(request => this.addBackgroundRequest(request));
   }


   #sendInitialMovementRequests() {
      const requestList = this.#currentLevel.getInitialActorMovementRequestList();
      requestList.forEach(request => this.addMovementRequest(request));
   }


}