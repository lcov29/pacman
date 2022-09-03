import Configuration from "../../global/Configuration.mjs";


export default class EditorLifeInput {


    #inputLife = null;


    constructor(inputLifeId) {
        this.#inputLife = document.getElementById(inputLifeId);
    }
    

    get life() {
        return this.#inputLife.value;
    }


    initialize() {
        this.#inputLife.setAttribute('min', Configuration.editorMinLife);
        this.#inputLife.setAttribute('max', Configuration.editorMaxLife);
        this.reset();
    }


    reset() {
        this.#inputLife.value = Configuration.editorDefaultLife;
    }


    validate() {
        const inputNumber = parseInt(this.#inputLife.value);
        const isNumber = !isNaN(inputNumber);
        const isInRange = (Configuration.editorMinLife <= inputNumber) && (inputNumber <= Configuration.editorMaxLife);
        const isValid =  isNumber && isInRange;

        this.#inputLife.value = (isValid) ? inputNumber : Configuration.editorDefaultLife;
    }


}