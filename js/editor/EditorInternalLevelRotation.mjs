import EditorInternalLevel from "./EditorInternalLevel.mjs";
import Utility from "../global/Utility.mjs";


export default class EditorInternalLevelRotation {


    #internalLevelList = [];
    #currentSelectedLevelIndex = 0;


    constructor() {}


    initialize(initialLevelWidth, initialLevelHeight) {
        const initialLevel = new EditorInternalLevel();
        initialLevel.initialize(initialLevelWidth, initialLevelHeight);
        this.#internalLevelList = [initialLevel];
    }


    addLevel(internalLevel) {
        this.#internalLevelList.push(internalLevel);
    }


    removeLevel(internalLevel) {
        Utility.removeElementFrom(this.#internalLevelList, internalLevel);        
    }


    getLevel() {
        return this.#internalLevelList[this.#currentSelectedLevelIndex];
    }


    next() {
        isEndOfRotationReached = this.#currentSelectedLevelIndex === this.#internalLevelList.length - 1;

        if (!isEndOfRotationReached) {
            this.#currentSelectedLevelIndex++;
        }
    }


    previous() {
        isIndexDecrementable = this.#currentSelectedLevelIndex > 0;

        if (isIndexDecrementable) {
            this.#currentSelectedLevelIndex--;
        }
    }


    selectLevelAt(index) {
        const isValidIndex = (0 <= index) && (index < this.#internalLevelList.length);

        if (isValidIndex) {
            this.#currentSelectedLevelIndex = index;
        } else {
            throw new RangeError('Invalid index');
        }
    }


    buildLevelRotationJSONString(initialPacmanLifes) {
        const rotation = this.#internalLevelList.map(internalLevel => internalLevel.buildLevelJSON());
        const json = {rotation, initialPacmanLifes};
        return JSON.stringify(json);
    }


}