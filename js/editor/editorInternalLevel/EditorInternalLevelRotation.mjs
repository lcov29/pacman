import EditorInternalLevel from "./EditorInternalLevel.mjs";
import Configuration from "../../global/Configuration.mjs";
import Utility from "../../global/Utility.mjs";


export default class EditorInternalLevelRotation {


    #internalLevelList = [];
    #name = '';
    #initialLifeNumber = 0;
    #currentSelectedLevelIndex = 0;


    constructor() {}


    set name(name) {
        this.#name = name;
    }


    set initialLifeNumber(number) {
        this.#initialLifeNumber = number;
    }


    setCurrentLevelIterationNumber(iterationNumber) {
        const currentLevel = this.getLevel();
        currentLevel.numberOfIterations = iterationNumber;
    }


    getLevel() {
        return this.#internalLevelList[this.#currentSelectedLevelIndex];
    }


    initialize() {
        this.#initialLifeNumber = Configuration.editorDefaultLife;
    }


    loadLevelRotation(levelRotation) {
        const internalLevelList = levelRotation.rotation.map(level => {
            const internalLevel = new EditorInternalLevel();
            internalLevel.load(level);
            return internalLevel;
        });

        this.#internalLevelList = internalLevelList;
        this.#name = levelRotation.name;
        this.#initialLifeNumber = levelRotation.initialPacmanLifes;
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


    addLevel(levelId) {
        const width = Configuration.editorBoardDefaultWidth;
        const height = Configuration.editorBoardDefaultHeight;
    
        const newLevel = new EditorInternalLevel();
        newLevel.initialize(width, height, levelId);
        this.#internalLevelList.push(newLevel);
        this.#currentSelectedLevelIndex = this.#internalLevelList.length - 1;
    }


    removeLevel(levelId) {
        const level = this.#internalLevelList.filter(level => level.id === levelId)[0];
        Utility.removeElementFrom(this.#internalLevelList, level);
        this.#currentSelectedLevelIndex--;
    }


    validate() {
        for (const level of this.#internalLevelList) {
            const validator = level.validate();

            if (!validator.isValid()) {
                const errorMessage = validator.getErrorMessageString();
                return {levelId: level.id, errorMessage};
            }
        }
    }


    buildLevelRotationJSONString() {
        const rotation = this.#internalLevelList.map(internalLevel => internalLevel.buildLevelJSON());
        const json = {rotation, initialPacmanLifes: this.#initialLifeNumber, name: this.#name};
        return JSON.stringify(json);
    }


}