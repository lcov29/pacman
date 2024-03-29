import Utility from '../../../global/Utility.mjs';
import Configuration from '../../../global/Configuration.mjs';
import BackgroundRequest from '../../requests/BackgroundRequest.mjs'


export default class BonusElementSpawner {


    #level = null;
    #bonusSpawnPositionList = null;
    #bonusCharacter = '';
    #bonusScoreValue = 0;
    #isBonusElementSpawned = false;


    constructor(bonusSpawnPositionList, levelNumber, level) {
        this.#level = level;
        this.#bonusSpawnPositionList = bonusSpawnPositionList;
        this.#mapBonusCharacterAndScore(levelNumber);
    }


    get scoreValue() {
        return this.#bonusScoreValue;
    }


    handleSpawn(numberOfConsumedPoints) {
        const isConsumedPointLimitReached = Configuration.pointLimitForBonusSpawn.includes(numberOfConsumedPoints);
        const isSpawningNecessary = isConsumedPointLimitReached && !this.#isBonusElementSpawned;

        if (isSpawningNecessary) {
            const spawnPosition = this.#chooseRandomSpawnPositionFromList();
            const request = new BackgroundRequest(spawnPosition.x, spawnPosition.y, this.#bonusCharacter);
            this.#level.processBackgroundRequest(request);
            this.#isBonusElementSpawned = true;
        }
    }


    resetBonusSpawnStatus() {
        this.#isBonusElementSpawned = false;
    }


    #mapBonusCharacterAndScore(levelNumber) {
        switch (levelNumber) {
            case 1:
                this.#bonusCharacter = Configuration.bonusCherryCharacter;
                this.#bonusScoreValue = Configuration.scoreValuePerBonusCherry;
                break;
            case 2:
                this.#bonusCharacter = Configuration.bonusStrawberryCharacter
                this.#bonusScoreValue = Configuration.scoreValuePerBonusStrawberry;
                break;
            case 3:
            case 4:
                this.#bonusCharacter = Configuration.bonusPeachCharacter;
                this.#bonusScoreValue = Configuration.scoreValuePerBonusPeach;
                break;
            case 5:
            case 6:
                this.#bonusCharacter = Configuration.bonusAppleCharacter;
                this.#bonusScoreValue = Configuration.scoreValuePerBonusApple;
                break;
            case 7:
            case 8:
                this.#bonusCharacter = Configuration.bonusGrapeCharacter;
                this.#bonusScoreValue = Configuration.scoreValuePerBonusGrape;
                break;
            case 9:
            case 10:
                this.#bonusCharacter = Configuration.bonusGalaxianCharacter;
                this.#bonusScoreValue = Configuration.scoreValuePerBonusGalaxian;
                break;
            case 11:
            case 12:
                this.#bonusCharacter = Configuration.bonusBellCharacter;
                this.#bonusScoreValue = Configuration.scoreValuePerBonusBell;
                break;
            default:
                this.#bonusCharacter = Configuration.bonusKeyCharacter;
                this.#bonusScoreValue = Configuration.scoreValuePerBonusKey;
                break;
        }
    }
    

    #chooseRandomSpawnPositionFromList() {
        const maxId = this.#bonusSpawnPositionList.length - 1;
        const randomId = Utility.getRandomIntegerBetweenInclusive(0, maxId);
        return this.#bonusSpawnPositionList[randomId];
    }


}