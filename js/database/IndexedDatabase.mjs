import Configuration from "../global/Configuration.mjs";
import { defaultLevel } from "../customLevelSelection/PredefinedCustomLevels.mjs";


export default class IndexedDatabase {


    #database = null;


    isSupportedByCurrentBrowser() {
        return window.indexedDB !== undefined && window.indexedDB !== null;
    }


    openConnection() {
        return new Promise((resolve, reject) => {
            const databaseOpenRequest = window.indexedDB.open(Configuration.indexedDatabaseName, Configuration.indexedDatabaseVersion);


            databaseOpenRequest.addEventListener('upgradeneeded', event => {
                this.#database = event.target.result;
                const isObjectStoreInitialized = this.#database.objectStoreNames.contains(Configuration.indexedDatabaseStoreName);

                if (isObjectStoreInitialized) {
                    this.#database.deleteObjectStore(Configuration.indexedDatabaseStoreName);
                }

                const optionObject = { autoIncrement: true, keyPath: 'name' };
                const objectStore = this.#database.createObjectStore(Configuration.indexedDatabaseStoreName, optionObject);
                objectStore.createIndex('levelRotationIndex', 'name', { unique: true });
            });


            databaseOpenRequest.addEventListener('success', event => {
                this.#database = event.target.result;
                resolve();
            });


            databaseOpenRequest.addEventListener('error', event => {
                reject();
            });

        });
    }


    addPredefinedLevelRotations() {
        return new Promise(async (resolve, reject) => {
            const levelRotationList = await this.loadLevelRotationList();
            const isDefaultLevelLoaded = levelRotationList.filter(rotation => rotation.name === defaultLevel.name).length > 0;
            if (!isDefaultLevelLoaded) {
                await this.storeLevelRotation(defaultLevel);
            }
            resolve();
        });
    }


    storeLevelRotation(levelRotation) {
        return new Promise((resolve, reject) => {
            const request = this.#getObjectStore('readwrite').put(levelRotation);
            request.addEventListener('success', resolve);
            request.addEventListener('error', reject);
        });
    }


    deleteLevelRotation(name) {
        return new Promise((resolve, reject) => {
            const request = this.#getObjectStore('readwrite').delete(name);
            request.addEventListener('success', resolve);
            request.addEventListener('error', reject);
        });
    }


    loadLevelRotation(name) {
        return new Promise((resolve, reject) => {
            const request = this.#getObjectStore('readonly').get(name);

            request.addEventListener('success', event => {
                const levelRotation = event.target.result;
                resolve(levelRotation);
            });

            request.addEventListener('error', reject);
        });
    }


    loadLevelRotationList() {
        return new Promise((resolve, reject) => {
            const levelRotationList = [];
            const request = this.#getObjectStore('readonly').openCursor();

            request.addEventListener('success', event => {
                const cursor = event.target.result;
                if (cursor) {
                    levelRotationList.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(levelRotationList);
                }
            });

            request.addEventListener('error', reject);

        });
    }


    #getObjectStore(mode) {
        const transaction = this.#database.transaction(Configuration.indexedDatabaseStoreName, mode);
        return transaction.objectStore(Configuration.indexedDatabaseStoreName);
    }


}