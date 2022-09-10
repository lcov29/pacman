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


    setPreview(levelId, previewDataUrl) {
        const level = document.getElementById(levelId);
        level.setAttribute('style', `background-image: url(${previewDataUrl});`);
    }


    addNewLevelCallback(event) {
        this.#editor.handleAddNewLevel();
    }


    deleteLevelCallback(event) {
        const isDeletionConfirmed = window.confirm(Configuration.editorLevelDeletionPromptMessage);

        if (isDeletionConfirmed) {
            const levelId = this.#getLevelIdForDeleteButton(event.currentTarget);
            this.#editor.removeInternalLevel(levelId);

            this.#removeLevelNode(levelId);
            this.#addNewLevelToEmptyRotation();
            this.#selectRightmostLevelInRotation();
            event.stopPropagation();
        }
    }


    selectLevelCallback(event) {
        const selectedLevelElement = event.currentTarget;
        this.#editor.handleLevelSwitch(event.target.id);
        this.#highlight(selectedLevelElement);
        event.stopPropagation();
    }


    addNewLevelElement(levelId) {
        const levelElement = this.#buildLevelElement(levelId);
        this.#addDeleteButtonEventListenerFor(levelElement);
        this.#addLevelSelectEventListenerFor(levelElement);
        this.#insertInRotation(levelElement);
        this.#setLevelIterationNumberFor(levelElement, Configuration.editorDefaultIterationNumber);
        this.#highlight(levelElement);
    }


    #getLevelIdForDeleteButton(button) {
        return button.parentElement.id;
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


    #removeLevelNode(levelId) {
        document.getElementById(levelId).remove();
    }


    #addNewLevelToEmptyRotation() {
        const isLevelRotationEmpty = !this.#levelRotationContainer.hasChildNodes();
        if (isLevelRotationEmpty) {
            this.addNewLevelCallback();
        }
    }


    #selectRightmostLevelInRotation() {
        const rightmostLevelIndex = this.#levelRotationContainer.children.length - 1;
        const rightmostLevel = this.#levelRotationContainer.children[rightmostLevelIndex];
        rightmostLevel.click();
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