import Configuration from "../global/Configuration.mjs";


export default class SessionStorage {


    static setLevelRotation(levelRotationJson) {
        const itemName = Configuration.customLevelRotationSessionStorageName;
        const levelRotationString = JSON.stringify(levelRotationJson);
        window.sessionStorage.setItem(itemName, levelRotationString);
    }


    static getLevelRotation() {
        const itemName = Configuration.customLevelRotationSessionStorageName;
        const levelRotationString = window.sessionStorage.getItem(itemName);
        window.sessionStorage.removeItem(itemName);
        return JSON.parse(levelRotationString);
    }


}