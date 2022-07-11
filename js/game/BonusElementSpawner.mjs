'use strict';

import Utility from '../Utility.mjs';
import Configuration from '../Configuration.mjs';
import BackgroundRequest from '../BackgroundRequest.mjs'


export default class BonusElementSpawner {


    constructor(bonusSpawnPositionList, levelNumber, level) {
        this.level = level;
        this.bonusSpawnPositionList = bonusSpawnPositionList;
        this.bonusCharacter = '';
        this.bonusScoreValue = 0;
        this.isBonusElementSpawned = false;
        this.mapBonusCharacterAndScore(levelNumber);
    }


    mapBonusCharacterAndScore(levelNumber) {
        switch (levelNumber) {
            case 1:
                this.bonusCharacter = Configuration.bonusCherryCharacter;
                this.bonusScoreValue = Configuration.scoreValuePerBonusCherry;
                break;
            case 2:
                this.bonusCharacter = Configuration.bonusStrawberryCharacter
                this.bonusScoreValue = Configuration.scoreValuePerBonusStrawberry;
                break;
            case 3:
            case 4:
                this.bonusCharacter = Configuration.bonusPeachCharacter;
                this.bonusScoreValue = Configuration.scoreValuePerBonusPeach;
                break;
            case 5:
            case 6:
                this.bonusCharacter = Configuration.bonusAppleCharacter;
                this.bonusScoreValue = Configuration.scoreValuePerBonusApple;
                break;
            case 7:
            case 8:
                this.bonusCharacter = Configuration.bonusGrapeCharacter;
                this.bonusScoreValue = Configuration.scoreValuePerBonusGrape;
                break;
            case 9:
            case 10:
                this.bonusCharacter = Configuration.bonusGalaxianCharacter;
                this.bonusScoreValue = Configuration.scoreValuePerBonusGalaxian;
                break;
            case 11:
            case 12:
                this.bonusCharacter = Configuration.bonusBellCharacter;
                this.bonusScoreValue = Configuration.scoreValuePerBonusBell;
                break;
            default:
                this.bonusCharacter = Configuration.bonusKeyCharacter;
                this.bonusScoreValue = Configuration.scoreValuePerBonusKey;
                break;
        }
    }


    setBonusSpawnStatus(status) {
        this.isBonusElementSpawned = status;
    }
    

    getScoreValue() {
        return this.bonusScoreValue;
    }


    handleSpawn(numberOfConsumedPoints) {
        const isConsumedPointLimitReached = Configuration.POINT_LIMIT_FOR_BONUS_SPAWN.includes(numberOfConsumedPoints);

        if (!this.isBonusElementSpawned && isConsumedPointLimitReached) {
            const spawnPosition = this.chooseRandomSpawnPositionFromList();
            const request = new BackgroundRequest(spawnPosition.getX(), spawnPosition.getY(), this.bonusCharacter);
            this.level.processBackgroundRequest(request);
            this.isBonusElementSpawned = true;
        }
    }


    chooseRandomSpawnPositionFromList() {
        const maxId = this.bonusSpawnPositionList.length - 1;
        const randomId = Utility.getRandomIntegerBetweenInclusive(0, maxId);
        return this.bonusSpawnPositionList[randomId];
    }


}