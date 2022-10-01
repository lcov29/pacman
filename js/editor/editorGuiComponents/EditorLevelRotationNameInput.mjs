export default class EditorLevelRotationNameInput {


    #editor = null;
    #inputName = null;
    #defaultName = 'Custom Level';


    constructor(editorReference) {
        this.#editor = editorReference;
        this.#inputName = document.getElementById('levelRotationName');
    }


    setName(name) {
        this.#inputName.value = name;
        this.updateNameInputCallback();
    }


    initialize() {
        this.#initializeEventListener();
        this.#inputName.value = this.#defaultName;
        this.updateNameInputCallback();
    }


    updateNameInputCallback() {
        const name = this.#updateInputNameValue();
        this.#editor.updateLevelRotationName(name);
    }


    #initializeEventListener() {
        this.#inputName.addEventListener('blur', this.updateNameInputCallback.bind(this));
    }


    #updateInputNameValue() {
        let name = this.#getEscapedInputNameValue();
        name = this.#handleEmptyName(name);
        this.#inputName.value = name;
        return name;
    }


    #getEscapedInputNameValue() {
        const regex = /[^a-z0-9\s]/gi;
        let name = this.#inputName.value;
        name = name.replace(regex, '');
        name = name.trim();
        return name;
    }


    #handleEmptyName(name) {
        const regex = /\s/gi;
        const nameWithoutWhiteSpaces = name.replace(regex, '');
        const isValueEmpty = nameWithoutWhiteSpaces === '';
        const output = (isValueEmpty) ? this.#defaultName : name;
        return output;
    }


}