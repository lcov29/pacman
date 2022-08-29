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
  
        this.#jsonLevelRotationList = JSON.parse(levelRotationString);
        this.#currentJsonLevelRemainingIterations = this.#getCurrentLevelJson().numberOfIterations;
    }
    

    getNextLevel() {
        this.#updateCurrentJsonLevelIndex();
        const level = new Level(this);
        const levelJson = this.#getCurrentLevelJson();
        level.initialize(levelJson);
        return level;
    }


    getCurrentLevelBoardDimension() {
        const currentLevelJsonBoard = this.#getCurrentLevelJson().board;
        const rowCount = currentLevelJsonBoard.length;
        const columnCount = currentLevelJsonBoard[0].length; // no ragged arrays
        return {rowCount, columnCount};
     }


    #getCurrentLevelJson() {
        return this.#jsonLevelRotationList[this.#currentJsonLevelIndex];
    }


    #updateCurrentJsonLevelIndex() {
        const hasRemainingIterationsLeft = this.#currentJsonLevelRemainingIterations > 0;

        if (hasRemainingIterationsLeft) {
            this.#currentJsonLevelRemainingIterations--;
            return;
        }

        const isLastLevelInRotation = this.#currentJsonLevelIndex === this.#jsonLevelRotationList.length;

        if (isLastLevelInRotation) {
            this.#currentJsonLevelIndex = 0;    // proceed with first level       
        } else {
            this.#currentJsonLevelIndex++;
        }
    }
        

}