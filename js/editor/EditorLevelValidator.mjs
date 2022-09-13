import Configuration from "../global/Configuration.mjs";

export default class EditorLevelValidator {


    #board = [[]];
    #validationErrorMessageList = [];
    #pacmanNumber = 0;
    #pointPowerupNumber = 0;
    #teleporter1Number = 0;
    #teleporter2Number = 0;
    #teleporter3Number = 0;


    constructor(board) {
        this.#board = board;
    }


    get errorMessageList() {
        return this.#validationErrorMessageList;
    }


    validate() {
        this.#countLevelElements();
        this.#validatePacmanNumber();
        this.#validatePointPowerupNumber();
        this.#validateTeleporter1Number();
        this.#validateTeleporter2Number();
        this.#validateTeleporter3Number();
        return this.#isValid();
    }


    #isValid() {
        return this.#validationErrorMessageList.length === 0;
    }


    #validatePacmanNumber() {
        const isPacmanNumberValid = this.#pacmanNumber > 0;
        const validationErrorMessage = 'Level requires at least one pacman';
        this.#validateCondition(isPacmanNumberValid, validationErrorMessage);
    }


    #validatePointPowerupNumber() {
        const isPointOrPowerupNumberValid = this.#pointPowerupNumber > 0;
        const validationErrorMessage = 'Level requires at least one point or powerup';
        this.#validateCondition(isPointOrPowerupNumberValid, validationErrorMessage);
    }


    #validateTeleporter1Number() {
        const isTeleporter1NumberValid = (this.#teleporter1Number === 0) || (this.#teleporter1Number === 2);
        const validationErrorMessage = 'Level requires either zero or two tiles of teleporter1 (red)';
        this.#validateCondition(isTeleporter1NumberValid, validationErrorMessage);
    }


    #validateTeleporter2Number() {
        const isTeleporter2NumberValid = (this.#teleporter2Number === 0) || (this.#teleporter2Number === 2);
        const validationErrorMessage = 'Level requires either zero or two tiles of teleporter1 (red)';
        this.#validateCondition(isTeleporter2NumberValid, validationErrorMessage);
    }


    #validateTeleporter3Number() {
        const isTeleporter3NumberValid = (this.#teleporter3Number === 0) || (this.#teleporter3Number === 2);
        const validationErrorMessage = 'Level requires either zero or two tiles of teleporter1 (red)';
        this.#validateCondition(isTeleporter3NumberValid, validationErrorMessage);
    }


    #validateCondition(isValid, validationErrorMessage) {
        if (!isValid) {
            this.#validationErrorMessageList.push(validationErrorMessage);
        }
    }


    #countLevelElements() {
        for (let y = 0; y < this.#board.length; y++) {
            for (let x = 0; x < this.#board[y].length; x++) {
                const currentCharacter = this.#board[y][x];

                const isPacmanCharacter = currentCharacter === Configuration.pacmanCharacter;
                if (isPacmanCharacter) {
                    this.#pacmanNumber++;
                    continue;
                }

                const isPointPowerupCharacter = Configuration.pointCharacterList.includes(currentCharacter);
                if (isPointPowerupCharacter) {
                    this.#pointPowerupNumber++;
                    continue;
                }

                const isTeleporter1Character = currentCharacter === Configuration.teleporter1Character;
                if (isTeleporter1Character) {
                    this.#teleporter1Number++;
                    continue;
                }

                const isTeleporter2Character = currentCharacter === Configuration.teleporter2Character;
                if (isTeleporter2Character) {
                    this.#teleporter2Number++;
                    continue;
                }

                const isTeleporter3Character = currentCharacter === Configuration.teleporter3Character;
                if (isTeleporter3Character) {
                    this.#teleporter3Number++;
                    continue;
                }
            }
        }
    }


}