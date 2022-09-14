import Configuration from "../global/Configuration.mjs";

export default class EditorLevelValidator {


    #board = [[]];
    #scatterPositionList = [];
    #validationErrorMessageList = [];
    #pacmanNumber = 0;
    #ghostBlinkyNumber = 0;
    #ghostPinkyNumber = 0;
    #ghostInkyNumber = 0;
    #ghostClydeNumber = 0;
    #pointPowerupNumber = 0;
    #teleporter1Number = 0;
    #teleporter2Number = 0;
    #teleporter3Number = 0;


    constructor(board, scatterPositionList) {
        this.#board = board;
        this.#scatterPositionList = scatterPositionList;
    }


    validate() {
        this.#countLevelElements();
        this.#validatePacmanNumber();
        this.#validateGhostBlinkyScatterPositionList();
        this.#validateGhostPinkyScatterPositionList();
        this.#validateGhostInkyScatterPositionList();
        this.#validateGhostClydeScatterPositionList();
        this.#validatePointPowerupNumber();
        this.#validateTeleporter1Number();
        this.#validateTeleporter2Number();
        this.#validateTeleporter3Number();
    }


    getErrorMessageString() {
        const messageString = this.#validationErrorMessageList.join('\n');
        return messageString;
    }


    isValid() {
        return this.#validationErrorMessageList.length === 0;
    }


    #validatePacmanNumber() {
        const isPacmanNumberValid = this.#pacmanNumber > 0;
        const validationErrorMessage = '- Level requires at least one pacman';
        this.#validateCondition(isPacmanNumberValid, validationErrorMessage);
    }


    #validateGhostBlinkyScatterPositionList() {
        const isGhostBlinkyOnBoard = this.#ghostBlinkyNumber > 0;
        const hasScatterPosition = this.#scatterPositionList.filter(element => element.ghost === Configuration.ghostBlinkyCharacter).length > 0;
        const isGhostBlinkyScatterPositionValid = !isGhostBlinkyOnBoard || (isGhostBlinkyOnBoard && hasScatterPosition);
        const validationErrorMessage = '- Scatter position for ghost Blinky required';
        this.#validateCondition(isGhostBlinkyScatterPositionValid, validationErrorMessage);
    }


    #validateGhostPinkyScatterPositionList() {
        const isGhostPinkyOnBoard = this.#ghostPinkyNumber > 0;
        const hasScatterPosition = this.#scatterPositionList.filter(element => element.ghost === Configuration.ghostPinkyCharacter).length > 0;
        const isGhostPinkyScatterPositionValid = !isGhostPinkyOnBoard || (isGhostPinkyOnBoard && hasScatterPosition);
        const validationErrorMessage = '- Scatter position for ghost Pinky required';
        this.#validateCondition(isGhostPinkyScatterPositionValid, validationErrorMessage);
    }


    #validateGhostInkyScatterPositionList() {
        const isGhostInkyOnBoard = this.#ghostInkyNumber > 0;
        const hasScatterPosition = this.#scatterPositionList.filter(element => element.ghost === Configuration.ghostInkyCharacter).length > 0;
        const isGhostInkyScatterPositionValid = !isGhostInkyOnBoard || (isGhostInkyOnBoard && hasScatterPosition);
        const validationErrorMessage = '- Scatter position for ghost Inky required';
        this.#validateCondition(isGhostInkyScatterPositionValid, validationErrorMessage);
    }


    #validateGhostClydeScatterPositionList() {
        const isGhostClydeOnBoard = this.#ghostClydeNumber > 0;
        const hasScatterPosition = this.#scatterPositionList.filter(element => element.ghost === Configuration.ghostClydeCharacter).length > 0;
        const isGhostClydeScatterPositionValid = !isGhostClydeOnBoard || (isGhostClydeOnBoard && hasScatterPosition);
        const validationErrorMessage = '- Scatter position for ghost Clyde required';
        this.#validateCondition(isGhostClydeScatterPositionValid, validationErrorMessage);
    }


    #validatePointPowerupNumber() {
        const isPointOrPowerupNumberValid = this.#pointPowerupNumber > 0;
        const validationErrorMessage = '- Level requires at least one point or powerup';
        this.#validateCondition(isPointOrPowerupNumberValid, validationErrorMessage);
    }


    #validateTeleporter1Number() {
        const isTeleporter1NumberValid = (this.#teleporter1Number === 0) || (this.#teleporter1Number === 2);
        const validationErrorMessage = '- Level requires either zero or two tiles of teleporter1 (red)';
        this.#validateCondition(isTeleporter1NumberValid, validationErrorMessage);
    }


    #validateTeleporter2Number() {
        const isTeleporter2NumberValid = (this.#teleporter2Number === 0) || (this.#teleporter2Number === 2);
        const validationErrorMessage = '- Level requires either zero or two tiles of teleporter1 (green)';
        this.#validateCondition(isTeleporter2NumberValid, validationErrorMessage);
    }


    #validateTeleporter3Number() {
        const isTeleporter3NumberValid = (this.#teleporter3Number === 0) || (this.#teleporter3Number === 2);
        const validationErrorMessage = '- Level requires either zero or two tiles of teleporter1 (blue)';
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

                const isGhostBlinkyCharacter = currentCharacter === Configuration.ghostBlinkyCharacter;
                if (isGhostBlinkyCharacter) {
                    this.#ghostBlinkyNumber++;
                    continue;
                }

                const isGhostPinkyCharacter = currentCharacter === Configuration.ghostPinkyCharacter;
                if (isGhostPinkyCharacter) {
                    this.#ghostPinkyNumber++;
                    continue;
                }

                const isGhostInkyCharacter = currentCharacter === Configuration.ghostInkyCharacter;
                if (isGhostInkyCharacter) {
                    this.#ghostInkyNumber++;
                    continue;
                }

                const isGhostClydeCharacter = currentCharacter === Configuration.ghostClydeCharacter;
                if (isGhostClydeCharacter) {
                    this.#ghostClydeNumber++;
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