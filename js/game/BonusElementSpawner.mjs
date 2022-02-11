"use strict";

import Configuration from "../Configuration.mjs";
import UpdateRequest from "./UpdateRequest.mjs";
import Utility from "../Utility.mjs";


export default class BonusElementSpawner {


    constructor() {
        this.bonusSpawnPositions = null;
        this.bonusStyleClass = "";
        this.scoreValue = 0;
        this.level = null;
        this.isBonusElementSpawned = false;
    }


    initialize(bonusSpawnPositions, levelNumber, level) {
        this.bonusSpawnPositions = bonusSpawnPositions;
        this.level = level;

        switch (levelNumber) {
            case 1:
                this.bonusStyleClass = Configuration.BONUS_ELEMENT_CHERRY_FOREGROUND_CSS_CLASS;
                this.scoreValue = Configuration.SCORE_VALUE_PER_BONUS_CHERRY;
                break;
            case 2:
                this.bonusStyleClass = Configuration.BONUS_ELEMENT_STRAWBERRY_FOREGROUND_CSS_CLASS;
                this.scoreValue = Configuration.SCORE_VALUE_PER_BONUS_STRAWBERRY;
                break;
            case 3:
            case 4:
                this.bonusStyleClass = Configuration.BONUS_ELEMENT_PEACH_FOREGROUND_CSS_CLASS;
                this.scoreValue = Configuration.SCORE_VALUE_PER_BONUS_PEACH;
                break;
            case 5:
            case 6:
                this.bonusStyleClass = Configuration.BONUS_ELEMENT_APPLE_FOREGROUND_CSS_CLASS;
                this.scoreValue = Configuration.SCORE_VALUE_PER_BONUS_APPLE;
                break;
            case 7:
            case 8:
                this.bonusStyleClass = Configuration.BONUS_ELEMENT_GRAPE_FOREGROUND_CSS_CLASS;
                this.scoreValue = Configuration.SCORE_VALUE_PER_BONUS_GRAPE;
                break;
            case 9:
            case 10:
                this.bonusStyleClass = Configuration.BONUS_ELEMENT_GALAXIAN_FOREGROUND_CSS_CLASS;
                this.scoreValue = Configuration.SCORE_VALUE_PER_BONUS_GALAXIAN;
                break;
            case 11:
            case 12:
                this.bonusStyleClass = Configuration.BONUS_ELEMENT_BELL_FOREGROUND_CSS_CLASS;
                this.scoreValue = Configuration.SCORE_VALUE_PER_BONUS_BELL;
                break;
            default:
                this.bonusStyleClass = Configuration.BONUS_ELEMENT_KEY_FOREGROUND_CSS_CLASS;
                this.scoreValue = Configuration.SCORE_VALUE_PER_BONUS_KEY;
                break;
        }
    }


    setBonusSpawnStatus(status) {
        this.isBonusElementSpawned = status;
    }


    getStyleClass() {
        return this.bonusStyleClass;
    }
    

    getScoreValue() {
        return this.scoreValue;
    }


    handleSpawn(numberOfConsumedPoints) {
        let isConsumedPointLimitReached = Configuration.POINT_LIMIT_FOR_BONUS_SPAWN.includes(numberOfConsumedPoints);
        if (isConsumedPointLimitReached && this.isBonusElementSpawned === false) {
            let spawnPosition = this.chooseRandomSpawnPositionFromList();
            let boardPosition = this.level.getBoardPositionAt(spawnPosition.x, spawnPosition.y);
            boardPosition.setElementCharacter(Configuration.BONUS_ELEMENT_CHARACTER);
            let updateRequest = new UpdateRequest(boardPosition, this.bonusStyleClass);
            this.level.addUpdateRequest(updateRequest);
            this.level.updateBoard();
            this.level.updateView();
            this.setBonusSpawnStatus(true);
        }
    }


    chooseRandomSpawnPositionFromList() {
        let maxId = this.bonusSpawnPositions.length - 1;
        let randomId = Utility.getRandomIntegerBetweenInclusive(0, maxId);
        return this.bonusSpawnPositions[randomId];
    }


}