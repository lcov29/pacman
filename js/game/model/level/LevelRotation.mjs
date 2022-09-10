import Configuration from "../../../global/Configuration.mjs";
import Level from "./Level.mjs";


export default class LevelRotation {


    #jsonLevelRotationList = [];
    #currentJsonLevelIndex = 0;
    #currentJsonLevelRemainingIterations = 0;
    #initialPacmanLifes = 0;


    constructor() {}


    initialize() {
        const customLevelRotationName = Configuration.customLevelRotationSessionStorageName;
        let levelRotationString = window.sessionStorage.getItem(customLevelRotationName);
  
        if (levelRotationString) {
           window.sessionStorage.removeItem(customLevelRotationName);
        } else {
           levelRotationString = Configuration.jsonDefaultLevel;
        }
  
        const jsonLevel = JSON.parse(levelRotationString);
        this.#jsonLevelRotationList = jsonLevel.rotation;
        this.#initialPacmanLifes = jsonLevel.initialPacmanLifes;
        this.#currentJsonLevelRemainingIterations = this.#getCurrentLevelJson().numberOfIterations;
    }


    get initialPacmanLifes() {
        return this.#initialPacmanLifes;
    }


    getNextLevel(gameReference) {
        this.#updateCurrentJsonLevelIndex();
        this.#loadRemainingTurnsForNewLevel();
        this.#decrementRemainingIterations();
        const levelObject = this.#parseCurrentJsonLevelIntoLevelObject(gameReference);
        return levelObject;
    }


    getCurrentLevel(gameReference) {
        return this.#parseCurrentJsonLevelIntoLevelObject(gameReference);
    }


    getCurrentLevelBoardDimension() {
        const currentLevelJsonBoard = this.#getCurrentLevelJson().board;
        const rowCount = currentLevelJsonBoard.length;
        const columnCount = currentLevelJsonBoard[0].length; // no ragged arrays
        return {rowCount, columnCount};
    }


    #decrementRemainingIterations() {
        if (this.#currentJsonLevelRemainingIterations > 0) {
            this.#currentJsonLevelRemainingIterations--;
        }
    }


    #parseCurrentJsonLevelIntoLevelObject(gameReference) {
        const level = new Level(gameReference);
        const levelJson = this.#getCurrentLevelJson();
        level.initialize(levelJson);
        return level;
    }


    #updateCurrentJsonLevelIndex() {
        const isLevelRotationNecessary = this.#currentJsonLevelRemainingIterations === 0;
        const isLastLevelInRotation = (this.#currentJsonLevelIndex + 1) === this.#jsonLevelRotationList.length;

        if (isLevelRotationNecessary && isLastLevelInRotation) {
            this.#currentJsonLevelIndex = 0;    // restart rotation at first level 
        }

        if (isLevelRotationNecessary && !isLastLevelInRotation) {
            this.#currentJsonLevelIndex++;
        }
    }


    #loadRemainingTurnsForNewLevel() {
        const isLevelRotationNecessary = this.#currentJsonLevelRemainingIterations === 0;

        if (isLevelRotationNecessary) {
            this.#currentJsonLevelRemainingIterations = this.#getCurrentLevelJson().numberOfIterations;
        }
    }


    #getCurrentLevelJson() {
        return this.#jsonLevelRotationList[this.#currentJsonLevelIndex];
    }


}