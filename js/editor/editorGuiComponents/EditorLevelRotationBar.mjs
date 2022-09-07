import Configuration from '../../global/Configuration.mjs';


export default class EditorLevelRotationBar {


    #editor = null;
    #levelRotationContainer = null;
    #levelAddButton = null;
    #levelTemplateElement = null;
    #cssClassNameSelectedElement = '';
    #cssClassDisplayInfiniteSymbol = '';


    constructor(editorReference) {
        this.#editor = editorReference;
        this.#levelRotationContainer = document.getElementById('rotationContainer');
        this.#levelAddButton = document.getElementById('levelAddButton');
        this.#levelTemplateElement = document.getElementById('levelElementTemplate');
        this.#cssClassNameSelectedElement = 'levelSelected';
        this.#cssClassDisplayInfiniteSymbol = 'displayInfiniteSymbol';
    }


    initialize() {
        this.#levelAddButton.addEventListener('click', this.addNewLevelCallback.bind(this));
    }


    setIterationNumberForSelectedLevel(levelIterationNumber) {
        const selectedLevel = document.getElementsByClassName(this.#cssClassNameSelectedElement)[0];
        this.#setLevelIterationNumberFor(selectedLevel, levelIterationNumber);
    }


    addNewLevelCallback(event) {
        this.#editor.handleAddNewLevel();
    }


    deleteLevelCallback(event) {
        const isDeletionConfirmed = window.confirm(Configuration.editorLevelDeletionPromptMessage);

        if (isDeletionConfirmed) {
            this.#removeLevelNode(event);
            this.#selectFirstLevelInRotation();
            event.stopPropagation();
        }
    }


    selectLevelCallback(event) {
        const selectedLevelElement = event.target;
        this.#editor.handleLevelSwitch(event.target.id);
        this.#highlight(selectedLevelElement);
    }


    addNewLevelElement(levelId) {
        const levelElement = this.#buildLevelElement(levelId);
        this.#addDeleteButtonEventListenerFor(levelElement);
        this.#addLevelSelectEventListenerFor(levelElement);
        this.#insertInRotation(levelElement);
        this.#setLevelIterationNumberFor(levelElement, Configuration.editorDefaultIterationNumber);
        this.#highlight(levelElement);
    }


    #buildLevelElement(levelId) {
        const deepCopy = true;
        const newLevelElement = this.#levelTemplateElement.cloneNode(deepCopy);
        newLevelElement.setAttribute('id', levelId);
        return newLevelElement;
    }


    #addDeleteButtonEventListenerFor(levelElement) {
        const deleteButton = levelElement.children[1];
        deleteButton.addEventListener('click', this.deleteLevelCallback.bind(this));
    }


    #addLevelSelectEventListenerFor(levelElement) {
        levelElement.addEventListener('click', this.selectLevelCallback.bind(this));
    }


    #insertInRotation(levelElement) {
        this.#levelRotationContainer.appendChild(levelElement);
    }


    #removeLevelNode(event) {
        const deleteButton = event.currentTarget;
        const levelElement = deleteButton.parentElement;
        levelElement.remove();
    }


    #selectFirstLevelInRotation() {
        const levelRotationList = this.#levelRotationContainer.children;
        const isLevelRotationEmpty = levelRotationList.length === 0;
    
        if (isLevelRotationEmpty) {
            this.addNewLevelCallback();
        }
        const firstLevelInRotation = this.#levelRotationContainer.children[0];
        firstLevelInRotation.click();
    }


    #setLevelIterationNumberFor(levelElement, levelIterationNumber) {
        const iterationDiv = levelElement.children[0];
        const isInfinity = levelIterationNumber === 'Infinity' || !isFinite(levelIterationNumber);
    
        if (isInfinity) {
            iterationDiv.classList.add(this.#cssClassDisplayInfiniteSymbol);
            iterationDiv.innerText = '';
        } else {
            iterationDiv.classList.remove(this.#cssClassDisplayInfiniteSymbol);
            iterationDiv.innerText = `${levelIterationNumber}x`;
        }
    }


    #highlight(levelElementToHighlight) {
        const levelRotationList = this.#levelRotationContainer.children;
        
        for (const levelElement of levelRotationList) {
            const isToBeHighlightedLevelElement = levelElement === levelElementToHighlight;

            if (isToBeHighlightedLevelElement) {
                levelElement.classList.add(this.#cssClassNameSelectedElement);
            } else {
                levelElement.classList.remove(this.#cssClassNameSelectedElement);
            }
        }
    }


}