import Configuration from "../../global/Configuration.mjs";


export default class EditorLevelIterationInput {


    #editor = null;
    #inputLevelIteration = null;
    #previousLevelIteration = -1;


    constructor(editorReference) {
        this.#editor = editorReference;
        this.#inputLevelIteration = document.getElementById('iterationNumberInput');
    }


    get levelIterationNumber() {
        const iterationNumber = this.#inputLevelIteration.value;
        const isInfinity = iterationNumber === 'Infinity';
        const output = (isInfinity) ? Infinity : parseInt(iterationNumber);
        return output;
    }


    initialize() {
        this.#addInputBlurEventListener();
        this.reset();
    }


    reset() {
        this.#inputLevelIteration.value = Configuration.editorDefaultIterationNumber;
        this.#previousLevelIteration = Configuration.editorDefaultIterationNumber;
    }


    updateLevelIterationInputCallback() {
        const isValid = this.#validate();
        const isUpdated = this.#isLevelIterationUpdated();

        if (isValid && isUpdated) {
            this.#updatePreviousLevelIteration();
            this.#editor.handleLevelIterationNumberChange();
        }
    }


    #addInputBlurEventListener() {
        this.#inputLevelIteration.addEventListener('blur', this.updateLevelIterationInputCallback.bind(this));
    }


    #validate() {
        const inputText = this.#inputLevelIteration.value;
        const inputNumber = parseInt(inputText);

        const isNumber = !isNaN(inputNumber);
        const isInRange = inputNumber >= Configuration.editorMinIterationNumber;
        const isValidNumber =  isNumber && isInRange;
        const isInfinity = inputText.toLowerCase() === 'infinity';

        if (isValidNumber) {
            this.#inputLevelIteration.value = inputNumber;
        } else {
            this.#inputLevelIteration.value = (isInfinity) ? 'Infinity' : this.#previousLevelIteration;
        }
        return isValidNumber || isInfinity;
    }


    #isLevelIterationUpdated() {
        // use unstrict comparison operator because input can contain a string ('Infinity') or number
        return this.#inputLevelIteration.value != this.#previousLevelIteration;
    }


    #updatePreviousLevelIteration() {
        this.#previousLevelIteration = this.#inputLevelIteration.value;
    }


}