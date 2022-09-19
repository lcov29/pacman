import Configuration from "../global/Configuration.mjs";


export default class IndexedDatabase {


    #databaseReference = null;
    #recordList = [];


    get recordList() {
        return this.#recordList;
    }


    constructor(errorHandler) {
        this.#initializeConnection(errorHandler);
    }


    isSupportedByCurrentBrowser() {
        return window.indexedDB === undefined;
    }


    loadLevelRotation(name, successHandler) {
        const request = this.#getObjectStore('readonly').get(name);
        request.addEventListener('success', successHandler);
    }


    storeLevelRotation(levelRotation) {
        this.#getObjectStore('readwrite').put(levelRotation);
    }


    deleteLevelRotation(name) {
        this.#getObjectStore('readwrite').delete(name);
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
        const transaction = this.#databaseReference.transaction(Configuration.indexedDatabaseStoreName, mode);
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
            this.#databaseReference = event.target.result;
            const isObjectStoreInitialized = this.#databaseReference.objectStoreNames.contains(Configuration.indexedDatabaseStoreName);
            
            if (isObjectStoreInitialized) {
                this.#databaseReference.deleteObjectStore(Configuration.indexedDatabaseStoreName);
            }

            const optionObject = {autoIncrement: true, keyPath: 'name'};
            const objectStore = this.#databaseReference.createObjectStore(Configuration.indexedDatabaseStoreName, optionObject);
            objectStore.createIndex('levelRotationIndex', 'name', {unique: true});
        };
        databaseOpenRequest.addEventListener('upgradeneeded', upgradeHandler);
    }


    #initializeSuccessCallback(databaseOpenRequest) {
        const successHandler = event => {
            this.#databaseReference = event.target.result;
            this.displayData();
        };
        databaseOpenRequest.addEventListener('success', successHandler);
    }


}