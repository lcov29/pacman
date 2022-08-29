import Configuration from "../../../global/Configuration.mjs";
import Level from "./Level.mjs";


export default class LevelRotation {


    #jsonLevelRotationList = [];
    #currentJsonLevelIndex = 0;
    #currentJsonLevelRemainingIterations = 0;


    constructor() {}


    initialize() {
        const customLevelRotationName = Configuration.customLevelRotationSessionStorageName;
        let levelRotationString = window.sessionStorage.getItem(customLevelRotationName);
  
        if (levelRotationString) {
           window.sessionStorage.removeItem(customLevelRotationName);
        } else {
           levelRotationString = Configuration.jsonDefaultLevel;
        }
  
        this.#jsonLevelRotationList = JSON.parse(levelRotationString).rotation;
        this.#currentJsonLevelRemainingIterations = this.#getCurrentLevelJson().numberOfIterations;
    }
    

    getNextLevel(gameReference) {
        this.#decrementRemainingIterations();
        const levelObject = this.#parseCurrentJsonLevelIntoLevelObject(gameReference);
        this.#updateCurrentJsonLevelIndex();
        this.#updateRemainingTurnsForNewLevel();
        return levelObject;
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


    #updateRemainingTurnsForNewLevel() {
        const isLevelRotationNecessary = this.#currentJsonLevelRemainingIterations === 0;

        if (isLevelRotationNecessary) {
            this.#currentJsonLevelRemainingIterations = this.#getCurrentLevelJson().numberOfIterations;
        }
    }


    #getCurrentLevelJson() {
        return this.#jsonLevelRotationList[this.#currentJsonLevelIndex];
    }


}