import Configuration from "../../global/Configuration.mjs";


export default class EditorBoardDimensionInput {


    #editor = null;
    #inputWidth = null;
    #inputHeight = null;
    #previousWidth = -1;
    #previousHeight = -1;


    constructor(editorReference) {
        this.#editor = editorReference;
        this.#inputWidth = document.getElementById('mapWidth');
        this.#inputHeight = document.getElementById('mapHeight');
    }


    get width() {
        return parseInt(this.#inputWidth.value);
    }


    get height() {
        return parseInt(this.#inputHeight.value);
    }


    initialize() {
        this.reset();
        this.#initializeWidthHeightInputEventListeners();
        this.#initializeMinMaxAttributes();
    }


    reset() {
        this.#inputWidth.value = Configuration.editorBoardDefaultWidth;
        this.#previousWidth = Configuration.editorBoardDefaultWidth

        this.#inputHeight.value = Configuration.editorBoardDefaultHeight;
        this.#previousHeight = Configuration.editorBoardDefaultHeight;
    }


    updateWidthInputCallback() {
        const isValid = this.#validateWidthInput();
        const isUpdated = this.#isWidthInputUpdated();

        if (isValid && isUpdated) {
            this.#updatePreviousWidth();
            this.#editor.buildBoardEditingArea();        
        }
    }


    updateHeightInputCallback() {
        const isValid = this.#validateHeightInput();
        const isUpdated = this.#isHeightInputUpdated();

        if (isValid && isUpdated) {
            this.#updatePreviousHeight();
            this.#editor.buildBoardEditingArea();
        }
    }


    #initializeWidthHeightInputEventListeners() {
        this.#inputWidth.addEventListener('blur', this.updateWidthInputCallback.bind(this));
        this.#inputHeight.addEventListener('blur', this.updateHeightInputCallback.bind(this));
    }


    #initializeMinMaxAttributes() {
        this.#inputWidth.setAttribute('min', Configuration.editorBoardMinWidth);
        this.#inputWidth.setAttribute('max', Configuration.editorBoardMaxWidth);

        this.#inputHeight.setAttribute('min', Configuration.editorBoardMinHeight);
        this.#inputHeight.setAttribute('max', Configuration.editorBoardMaxHeight);
    }


    #validateWidthInput() {
        const argumentObject = {
            input: this.#inputWidth,
            minValue: Configuration.editorBoardMinWidth,
            maxValue: Configuration.editorBoardMaxWidth,
            previousValue: this.#previousWidth
        };
        return this.#validateInput(argumentObject);
    }
    
    
    #validateHeightInput() {
        const argumentObject = {
            input: this.#inputHeight,
            minValue: Configuration.editorBoardMinHeight,
            maxValue: Configuration.editorBoardMaxHeight,
            previousValue: this.#previousHeight
        };
        return this.#validateInput(argumentObject);
    }


    #validateInput(argumentObject) {
        const {input, minValue, maxValue, previousValue} = argumentObject;

        const inputNumber = parseInt(input.value);
        const isNumber = !isNaN(inputNumber);
        const isInRange = (minValue <= inputNumber) && (inputNumber <= maxValue);
        const isValid = isNumber && isInRange;

        input.value = (isValid) ? inputNumber : previousValue;
        return isValid;
    }


    #isWidthInputUpdated() {
        return parseInt(this.#inputWidth.value) !== this.#previousWidth;
    }


    #isHeightInputUpdated() {
        return parseInt(this.#inputHeight.value) !== this.#previousHeight;
    }


    #updatePreviousWidth() {
        this.#previousWidth = parseInt(this.#inputWidth.value);
    }


    #updatePreviousHeight() {
        this.#previousHeight = parseInt(this.#inputHeight.value);
    }


}