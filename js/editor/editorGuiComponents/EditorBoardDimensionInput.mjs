import Configuration from "../../global/Configuration.mjs";


export default class EditorBoardDimensionInput {


    #inputWidth = null;
    #inputHeight = null;


    constructor(inputWidthId, inputHeightId) {
        this.#inputWidth = document.getElementById(inputWidthId);
        this.#inputHeight = document.getElementById(inputHeightId);
    }


    get width() {
        return this.#inputWidth.value;
    }


    get height() {
        return this.#inputHeight.value;
    }


    initialize() {
        this.#inputWidth.setAttribute('min', Configuration.editorBoardMinWidth);
        this.#inputWidth.setAttribute('max', Configuration.editorBoardMaxWidth);

        this.#inputHeight.setAttribute('min', Configuration.editorBoardMinHeight);
        this.#inputHeight.setAttribute('max', Configuration.editorBoardMaxHeight);

        this.reset();
    }


    reset() {
        this.#inputWidth.value = Configuration.editorBoardDefaultWidth;
        this.#inputHeight.value = Configuration.editorBoardDefaultHeight;
    }


    validateMapWidthInput() {
        this.#validateInput(this.#inputWidth, Configuration.editorBoardMinWidth, Configuration.editorBoardMaxWidth);
    }
    
    
    validateMapHeightInput() {
        this.#validateInput(this.#inputHeight, Configuration.editorBoardMinHeight, Configuration.editorBoardMaxHeight);
    }


    #validateInput(input, minValue, maxValue) {
        try {
            const inputNumber = parseInt(input.value);
            const isInputBelowMinimum = inputNumber < minValue;
            const isInputAboveMaximum = inputNumber > maxValue;
            const isInputInvalid = isInputBelowMinimum || isInputAboveMaximum;
    
            if (isInputInvalid) {
                input.value = '';
            } else {
                input.value = inputNumber;
            }
        } catch(e) {
            input.value = '';
        }
    }


}