import Configuration from "../global/Configuration.mjs";


export default class IndexedDatabase {


    #database = null;
    #recordList = [];


    get recordList() {
        return this.#recordList;
    }


    constructor(errorHandler) {
        this.#initializeConnection(errorHandler);
    }


    isSupportedByCurrentBrowser() {
        return window.indexedDB !== undefined && window.indexedDB !== null;
    }


    storeLevelRotation(levelRotation) {
        this.#getObjectStore('readwrite').put(levelRotation);
    }


    deleteLevelRotation(name) {
        this.#getObjectStore('readwrite').delete(name);
    }


    loadLevelRotation(name, successHandler) {
        const request = this.#getObjectStore('readonly').get(name);
        request.addEventListener('success', successHandler);
    }


    displayData() {
        this.#recordList = [];
        const request = this.#getObjectStore('readonly').openCursor();

        request.addEventListener('success', event => {
            const cursor = event.target.result;
            if (cursor) {
                this.#recordList.push(cursor.value);
                cursor.continue();
            }
        });
    }


    #getObjectStore(mode) {
        const transaction = this.#database.transaction(Configuration.indexedDatabaseStoreName, mode);
        return transaction.objectStore(Configuration.indexedDatabaseStoreName);
    }


    #initializeConnection(errorHandler) {
        const databaseOpenRequest = window.indexedDB.open(Configuration.indexedDatabaseName, Configuration.indexedDatabaseVersion);

        this.#initializeUpgradeCallback(databaseOpenRequest);
        this.#initializeSuccessCallback(databaseOpenRequest);
        databaseOpenRequest.addEventListener('error', errorHandler);
    }


    #initializeUpgradeCallback(databaseOpenRequest) {
        const upgradeHandler = event => {
            this.#database = event.target.result;
            const isObjectStoreInitialized = this.#database.objectStoreNames.contains(Configuration.indexedDatabaseStoreName);
            
            if (isObjectStoreInitialized) {
                this.#database.deleteObjectStore(Configuration.indexedDatabaseStoreName);
            }

            const optionObject = {autoIncrement: true, keyPath: 'name'};
            const objectStore = this.#database.createObjectStore(Configuration.indexedDatabaseStoreName, optionObject);
            objectStore.createIndex('levelRotationIndex', 'name', {unique: true});
        };
        databaseOpenRequest.addEventListener('upgradeneeded', upgradeHandler);
    }


    #initializeSuccessCallback(databaseOpenRequest) {
        const successHandler = event => {
            this.#database = event.target.result;
        };
        databaseOpenRequest.addEventListener('success', successHandler);
    }


}