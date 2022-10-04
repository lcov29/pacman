import IndexedDatabase from "../database/IndexedDatabase.mjs";
import SessionStorage from "../database/SessionStorage.mjs";
import Configuration from "../global/Configuration.mjs";
import Utility from "../global/Utility.mjs";


export default class CustomLevelSelection {


    #levelRotationItemContainer = null;
    #templateLevelRotationItem = null;
    #database = null;
    #currentLevelPreviewSliderIndex = 0;
    #previewSliderId = -1;


    constructor() {
        this.#levelRotationItemContainer = document.getElementById('levelRotationItemContainer');
        this.#templateLevelRotationItem = document.getElementById('templateLevelRotationItem');
        this.#database = new IndexedDatabase();
    }


    async initialize() {
        try {
            await this.#database.openConnection();
            const levelRotationList = await this.#database.loadLevelRotationList();
            levelRotationList.forEach(levelRotation => this.addLevelRotationItemFor(levelRotation));
        } catch (err) {
            document.getElementById('indexedDBWarning').classList.remove('invisible');
        }
    }


    addLevelRotationItemFor(levelRotationJson) {
        const levelRotationItem = this.#buildLevelRotationItem(levelRotationJson.name);
        this.#addLevelRotationName(levelRotationItem, levelRotationJson.name);
        this.#addLevelPreview(levelRotationItem, levelRotationJson.rotation[0].previewImageUrl);
        this.#addPlayButtonEventListenerFor(levelRotationItem);
        this.#addEditButtonEventListenerFor(levelRotationItem);
        this.#addDeleteButtonEventListenerFor(levelRotationItem);
        this.#addLevelPreviewSliderStartEventListenerFor(levelRotationItem);
        this.#addLevelPreviewSliderEndEventListenerFor(levelRotationItem);
        this.#addLevelRotationItemClickEventListener(levelRotationItem);
        this.#addLevelRotationItemToSelection(levelRotationItem);
    }


    #buildLevelRotationItem(levelName) {
        const deepCopy = true;
        const newItem = this.#templateLevelRotationItem.cloneNode(deepCopy);
        newItem.setAttribute('id', levelName);
        newItem.classList.remove('invisible');
        return newItem;
    }


    #addLevelPreview(levelRotationItem, levelPreviewUrl) {
        levelRotationItem.children[0].src = levelPreviewUrl;
    }


    #addLevelRotationName(levelRotationItem, name) {
        const nameParagraph = levelRotationItem.children[1].children[0];
        nameParagraph.innerText = name;
    }


    #addPlayButtonEventListenerFor(levelRotationItem) {
        const playButton = levelRotationItem.children[1].children[1].children[0];

        playButton.addEventListener('click', async function (event) {
            const levelName = this.#getLevelRotationNameForButtonClickEvent(event);
            const levelRotation = await this.#database.loadLevelRotation(levelName);
            SessionStorage.setLevelRotation(levelRotation);
            Utility.loadPage(Configuration.fileNameCustomLevelSelection, Configuration.fileNameIndex);
        }.bind(this));
    }


    #addEditButtonEventListenerFor(levelRotationItem) {
        const editButton = levelRotationItem.children[1].children[1].children[1];

        editButton.addEventListener('click', async function (event) {
            const levelName = this.#getLevelRotationNameForButtonClickEvent(event);
            const levelRotation = await this.#database.loadLevelRotation(levelName);
            SessionStorage.setLevelRotation(levelRotation);
            Utility.loadPage(Configuration.fileNameCustomLevelSelection, Configuration.fileNameEditor);
        }.bind(this));
    }


    #addDeleteButtonEventListenerFor(levelRotationItem) {
        const deleteButton = levelRotationItem.children[1].children[1].children[2];

        deleteButton.addEventListener('click', async function (event) {
            const levelName = this.#getLevelRotationNameForButtonClickEvent(event);
            await this.#database.deleteLevelRotation(levelName);
        }.bind(this));
    }


    #addLevelRotationItemToSelection(levelRotationItem) {
        this.#levelRotationItemContainer.append(levelRotationItem);
    }


    #addLevelPreviewSliderStartEventListenerFor(levelRotationItem) {
        levelRotationItem.addEventListener('mouseenter', async function (event) {

            let currentElement = event.target;
            while (!currentElement.classList.contains('levelRotationItem')) {
                currentElement = currentElement.parentElement;
            }

            const levelName = currentElement.id;
            const levelRotation = await this.#database.loadLevelRotation(levelName);
            
            if (levelRotation.rotation.length > 1) {
                this.#startLevelPreviewSliderFor(currentElement, levelRotation);
                this.#previewSliderId = setInterval(this.#startLevelPreviewSliderFor.bind(this),
                                                    Configuration.previewSliderStageDurationInMilliseconds,
                                                    currentElement,
                                                    levelRotation);
            }

            event.stopPropagation();

        }.bind(this));
    }


    #addLevelPreviewSliderEndEventListenerFor(levelRotationItem) {
        levelRotationItem.addEventListener('mouseleave', async function (event) {
            clearInterval(this.#previewSliderId);
            const levelName = levelRotationItem.id;
            const levelRotation = await this.#database.loadLevelRotation(levelName);
            this.#addLevelPreview(levelRotationItem, levelRotation.rotation[0].previewImageUrl);
            levelRotationItem.children[1].classList.add('invisible');
        }.bind(this));
    }


    #addLevelRotationItemClickEventListener(levelRotationItem) {
        levelRotationItem.addEventListener('click', event => {
           clearInterval(this.#previewSliderId);
           const overlay = levelRotationItem.children[1];
           overlay.classList.remove('invisible');
        });
    }


    #startLevelPreviewSliderFor(levelRotationItem, levelRotationJson) {
        this.#currentLevelPreviewSliderIndex++;

        const isSliderAtEnd = this.#currentLevelPreviewSliderIndex === levelRotationJson.rotation.length;
        if (isSliderAtEnd) {
            this.#currentLevelPreviewSliderIndex = 0;
        }

        const currentLevel = levelRotationJson.rotation[this.#currentLevelPreviewSliderIndex];
        this.#addLevelPreview(levelRotationItem, currentLevel.previewImageUrl);
    }


    #getLevelRotationNameForButtonClickEvent(event) {
        return event.target.parentElement.parentElement.parentElement.id;
    }


}