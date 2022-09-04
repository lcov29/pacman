import Configuration from "../../global/Configuration.mjs";


export default class EditorLifeInput {


    #editor = null;
    #inputLife = null;
    #previousLife = -1;


    constructor(editorReference) {
        this.#editor = editorReference;
        this.#inputLife = document.getElementById('initialLifeInput');
    }


    get life() {
        return parseInt(this.#inputLife.value);
    }


    initialize() {
        this.#initializeInputElement();
        this.#addInputBlurEventListener();
    }


    updateLifeInputCallback() {
        const isValid = this.#validate();
        const isUpdated = this.#isLifeInputUpdated();

        if (isValid && isUpdated) {
            this.#updatePreviousLife();
            this.#editor.handleLifeInputChange();
        }
    }


    #initializeInputElement() {
        this.#inputLife.setAttribute('min', Configuration.editorMinLife);
        this.#inputLife.setAttribute('max', Configuration.editorMaxLife);
        this.#inputLife.value = Configuration.editorDefaultLife;
        this.#previousLife = Configuration.editorDefaultLife;
    }


    #addInputBlurEventListener() {
        this.#inputLife.addEventListener('blur', this.updateLifeInputCallback.bind(this));
    }


    #validate() {
        const inputNumber = parseInt(this.#inputLife.value);
        const isNumber = !isNaN(inputNumber);
        const isInRange = (Configuration.editorMinLife <= inputNumber) && (inputNumber <= Configuration.editorMaxLife);
        const isValid =  isNumber && isInRange;

        this.#inputLife.value = (isValid) ? inputNumber : this.#previousLife;
        return isValid;
    }


    #isLifeInputUpdated() {
        return parseInt(this.#inputLife.value) !==  this.#previousLife;
    }


    #updatePreviousLife() {
        this.#previousLife = parseInt(this.#inputLife.value);
    }


}