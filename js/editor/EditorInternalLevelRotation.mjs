import EditorInternalLevel from "./EditorInternalLevel.mjs";
import Utility from "../global/Utility.mjs";
import Configuration from "../global/Configuration.mjs";


export default class EditorInternalLevelRotation {


    #internalLevelList = [];
    #initialLifeNumber = 0;
    #currentSelectedLevelIndex = 0;


    constructor() {}


    initialize() {
        this.#initialLifeNumber = Configuration.editorDefaultLife;
    }


    set initialLifeNumber(number) {
        this.#initialLifeNumber = number;
    }


    setCurrentLevelIterationNumber(iterationNumber) {
        const currentLevel = this.getLevel();
        currentLevel.numberOfIterations = iterationNumber;
    }


    addLevel(levelId) {
        const width = Configuration.editorBoardDefaultWidth;
        const height = Configuration.editorBoardDefaultHeight;
    
        const newLevel = new EditorInternalLevel();
        newLevel.initialize(width, height, levelId);
        this.#internalLevelList.push(newLevel);
        this.#currentSelectedLevelIndex = this.#internalLevelList.length - 1;
    }


    loadLevel(levelId) {
        for (let i = 0; i < this.#internalLevelList.length; i++) {
            const level = this.#internalLevelList[i];
            const isMatchingLevel = level.id === levelId;

            if (isMatchingLevel) {
                this.#currentSelectedLevelIndex = i;
                break;
            }
        }
    }


    getLevel() {
        return this.#internalLevelList[this.#currentSelectedLevelIndex];
    }


    buildLevelRotationJSONString() {
        const rotation = this.#internalLevelList.map(internalLevel => internalLevel.buildLevelJSON());
        const json = {rotation, initialPacmanLifes: this.#initialLifeNumber};
        return JSON.stringify(json);
    }


}