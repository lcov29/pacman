export default class EditorSaveButton {


    #editor = null;
    #buttonSave = null;


    constructor(editorReference) {
        this.#editor = editorReference;
        this.#buttonSave = document.getElementById('playLevel');
    }


    initialize() {
        this.#addButtonSaveClickEventListener();
    }


    clickButtonSaveCallback() {
        this.#editor.handleButtonSaveClick();
    }


    #addButtonSaveClickEventListener() {
        this.#buttonSave.addEventListener('click', this.clickButtonSaveCallback.bind(this));
    }


}