import Configuration from "../../global/Configuration.mjs";


export default class EditorLevelIterationInput {


    #inputLevelIteration = null;


    constructor(inputLevelIterationId) {
        this.#inputLevelIteration = document.getElementById(inputLevelIterationId);
    }


    get levelIterationNumber() {
        const iterationNumber = this.#inputLevelIteration.value;
        const isInfinity = iterationNumber === 'Infinity';
        const output = (isInfinity) ? Infinity : parseInt(iterationNumber);
        return output;
    }


    initialize() {
        this.reset();
    }


    reset() {
        this.#inputLevelIteration.value = Configuration.editorDefaultIterationNumber;
    }


    validate() {
        const inputText = this.#inputLevelIteration.value;
        const inputNumber = parseInt(inputText);

        const isNumber = !isNaN(inputNumber);
        const isInRange = inputNumber >= Configuration.editorMinIterationNumber;
        const isValidNumber =  isNumber && isInRange;
        const isInfinity = inputText.toLowerCase() === 'infinity';

        if (isValidNumber) {
            this.#inputLevelIteration.value = inputNumber;
        } else {
            this.#inputLevelIteration.value = (isInfinity) ? 'Infinity' : Configuration.editorDefaultIterationNumber;
        }
    }


}