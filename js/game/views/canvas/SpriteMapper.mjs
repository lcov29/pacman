import Configuration from "../../../Configuration.mjs";
import Utility from "../../../Utility.mjs";


export default class SpriteMapper {


    #actorMainSpriteMap = null;
    #actorAlternateSpriteMap = null;
    #backgroundSpriteMap = null;


    constructor() {
        this.#initializeActorMainSpriteMap();
        this.#initializeActorAlternateSpriteMap();
        this.#initializeBackgroundSpriteMap();
    }


    mapActorToMainSprite(argumentObject) {
        const {actorCharacter, actorStateName, directionName} = argumentObject;
        const spriteName = Utility.getSpriteName(actorCharacter, actorStateName, directionName);
        return this.#actorMainSpriteMap.get(spriteName);        
    }


    mapActorToAlternateSprite(argumentObject) {
        const {actorCharacter, actorStateName, directionName} = argumentObject;
        const spriteName = Utility.getSpriteName(actorCharacter, actorStateName, directionName);
        return this.#actorAlternateSpriteMap.get(spriteName);
    }


    mapBackgroundToSprite(backgroundCharacter) {
        return this.#backgroundSpriteMap.get(backgroundCharacter);
    }


    #initializeActorMainSpriteMap() {
        this.#actorMainSpriteMap = new Map();


        // Pacman
        let spriteName = Utility.getSpriteName(Configuration.pacmanCharacter, '', Configuration.directionNameUp);
        let sprite = document.getElementById('pacmanUp');
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.pacmanCharacter, '', Configuration.directionNameRight);
        sprite = document.getElementById('pacmanRight');
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.pacmanCharacter, '', Configuration.directionNameDown);
        sprite = document.getElementById('pacmanDown');
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.pacmanCharacter, '', Configuration.directionNameLeft);
        sprite = document.getElementById('pacmanLeft');
        this.#actorMainSpriteMap.set(spriteName, sprite);


        // Ghost Blinky (Chase & Scatter)
        sprite = document.getElementById('blinkyUp');

        spriteName = Utility.getSpriteName(Configuration.ghostBlinkyCharacter, Configuration.nameGhostStateChase, Configuration.directionNameUp);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostBlinkyCharacter, Configuration.nameGhostStateScatter, Configuration.directionNameUp);
        this.#actorMainSpriteMap.set(spriteName, sprite);


        sprite = document.getElementById('blinkyRight');

        spriteName = Utility.getSpriteName(Configuration.ghostBlinkyCharacter, Configuration.nameGhostStateChase, Configuration.directionNameRight);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostBlinkyCharacter, Configuration.nameGhostStateScatter, Configuration.directionNameRight);
        this.#actorMainSpriteMap.set(spriteName, sprite);


        sprite = document.getElementById('blinkyDown');

        spriteName = Utility.getSpriteName(Configuration.ghostBlinkyCharacter, Configuration.nameGhostStateChase, Configuration.directionNameDown);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostBlinkyCharacter, Configuration.nameGhostStateScatter, Configuration.directionNameDown);
        this.#actorMainSpriteMap.set(spriteName, sprite);


        sprite = document.getElementById('blinkyLeft');

        spriteName = Utility.getSpriteName(Configuration.ghostBlinkyCharacter, Configuration.nameGhostStateChase, Configuration.directionNameLeft);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostBlinkyCharacter, Configuration.nameGhostStateScatter, Configuration.directionNameLeft);
        this.#actorMainSpriteMap.set(spriteName, sprite);


        // Ghost Inky (Chase & Scatter)
        sprite = document.getElementById('inkyUp');

        spriteName = Utility.getSpriteName(Configuration.ghostInkyCharacter, Configuration.nameGhostStateChase, Configuration.directionNameUp);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostInkyCharacter, Configuration.nameGhostStateScatter, Configuration.directionNameUp);
        this.#actorMainSpriteMap.set(spriteName, sprite);


        sprite = document.getElementById('inkyRight');

        spriteName = Utility.getSpriteName(Configuration.ghostInkyCharacter, Configuration.nameGhostStateChase, Configuration.directionNameRight);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostInkyCharacter, Configuration.nameGhostStateScatter, Configuration.directionNameRight);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        sprite = document.getElementById('inkyDown');

        spriteName = Utility.getSpriteName(Configuration.ghostInkyCharacter, Configuration.nameGhostStateChase, Configuration.directionNameDown);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostInkyCharacter, Configuration.nameGhostStateScatter, Configuration.directionNameDown);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        sprite = document.getElementById('inkyLeft');

        spriteName = Utility.getSpriteName(Configuration.ghostInkyCharacter, Configuration.nameGhostStateChase, Configuration.directionNameLeft);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostInkyCharacter, Configuration.nameGhostStateScatter, Configuration.directionNameLeft);
        this.#actorMainSpriteMap.set(spriteName, sprite);


        // Ghost Pinky (Chase & Scatter)
        sprite = document.getElementById('pinkyUp');

        spriteName = Utility.getSpriteName(Configuration.ghostPinkyCharacter, Configuration.nameGhostStateChase, Configuration.directionNameUp);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostPinkyCharacter, Configuration.nameGhostStateScatter, Configuration.directionNameUp);
        this.#actorMainSpriteMap.set(spriteName, sprite);


        sprite = document.getElementById('pinkyRight');

        spriteName = Utility.getSpriteName(Configuration.ghostPinkyCharacter, Configuration.nameGhostStateChase, Configuration.directionNameRight);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostPinkyCharacter, Configuration.nameGhostStateScatter, Configuration.directionNameRight);
        this.#actorMainSpriteMap.set(spriteName, sprite);


        sprite = document.getElementById('pinkyDown');

        spriteName = Utility.getSpriteName(Configuration.ghostPinkyCharacter, Configuration.nameGhostStateChase, Configuration.directionNameDown);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostPinkyCharacter, Configuration.nameGhostStateScatter, Configuration.directionNameDown);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        
        sprite = document.getElementById('pinkyLeft');

        spriteName = Utility.getSpriteName(Configuration.ghostPinkyCharacter, Configuration.nameGhostStateChase, Configuration.directionNameLeft);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostPinkyCharacter, Configuration.nameGhostStateScatter, Configuration.directionNameLeft);
        this.#actorMainSpriteMap.set(spriteName, sprite);


        // Ghost Clyde (Chase & Scatter)
        sprite = document.getElementById('clydeUp');

        spriteName = Utility.getSpriteName(Configuration.ghostClydeCharacter, Configuration.nameGhostStateChase, Configuration.directionNameUp);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostClydeCharacter, Configuration.nameGhostStateScatter, Configuration.directionNameUp);
        this.#actorMainSpriteMap.set(spriteName, sprite);


        sprite = document.getElementById('clydeRight');

        spriteName = Utility.getSpriteName(Configuration.ghostClydeCharacter, Configuration.nameGhostStateChase, Configuration.directionNameRight);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostClydeCharacter, Configuration.nameGhostStateScatter, Configuration.directionNameRight);
        this.#actorMainSpriteMap.set(spriteName, sprite);


        sprite = document.getElementById('clydeDown');

        spriteName = Utility.getSpriteName(Configuration.ghostClydeCharacter, Configuration.nameGhostStateChase, Configuration.directionNameDown);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostClydeCharacter, Configuration.nameGhostStateScatter, Configuration.directionNameDown);
        this.#actorMainSpriteMap.set(spriteName, sprite);


        sprite = document.getElementById('clydeLeft');

        spriteName = Utility.getSpriteName(Configuration.ghostClydeCharacter, Configuration.nameGhostStateChase, Configuration.directionNameLeft);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostClydeCharacter, Configuration.nameGhostStateScatter, Configuration.directionNameLeft);
        this.#actorMainSpriteMap.set(spriteName, sprite);


        // Scared (Ghosts Blinky, Inky, Pinky And Clyde)
        sprite = document.getElementById('scaredUp');

        spriteName = Utility.getSpriteName(Configuration.ghostBlinkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameUp);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostInkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameUp);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostPinkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameUp);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostClydeCharacter, Configuration.nameGhostStateScared, Configuration.directionNameUp);
        this.#actorMainSpriteMap.set(spriteName, sprite);


        sprite = document.getElementById('scaredRight');

        spriteName = Utility.getSpriteName(Configuration.ghostBlinkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameRight);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostInkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameRight);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostPinkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameRight);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostClydeCharacter, Configuration.nameGhostStateScared, Configuration.directionNameRight);
        this.#actorMainSpriteMap.set(spriteName, sprite);


        sprite = document.getElementById('scaredDown');

        spriteName = Utility.getSpriteName(Configuration.ghostBlinkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameDown);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostInkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameDown);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostPinkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameDown);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostClydeCharacter, Configuration.nameGhostStateScared, Configuration.directionNameDown);
        this.#actorMainSpriteMap.set(spriteName, sprite);


        sprite = document.getElementById('scaredLeft');

        spriteName = Utility.getSpriteName(Configuration.ghostBlinkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameLeft);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostInkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameLeft);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostPinkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameLeft);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostClydeCharacter, Configuration.nameGhostStateScared, Configuration.directionNameLeft);
        this.#actorMainSpriteMap.set(spriteName, sprite);


        // Dead (Ghosts Blinky, Inky, Pinky And Clyde)
        sprite = document.getElementById('deadUp');

        spriteName = Utility.getSpriteName(Configuration.ghostBlinkyCharacter, Configuration.nameGhostStateDead, Configuration.directionNameUp);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostInkyCharacter, Configuration.nameGhostStateDead, Configuration.directionNameUp);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostPinkyCharacter, Configuration.nameGhostStateDead, Configuration.directionNameUp);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostClydeCharacter, Configuration.nameGhostStateDead, Configuration.directionNameUp);
        this.#actorMainSpriteMap.set(spriteName, sprite);


        sprite = document.getElementById('deadRight');

        spriteName = Utility.getSpriteName(Configuration.ghostBlinkyCharacter, Configuration.nameGhostStateDead, Configuration.directionNameRight);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostInkyCharacter, Configuration.nameGhostStateDead, Configuration.directionNameRight);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostPinkyCharacter, Configuration.nameGhostStateDead, Configuration.directionNameRight);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostClydeCharacter, Configuration.nameGhostStateDead, Configuration.directionNameRight);
        this.#actorMainSpriteMap.set(spriteName, sprite);


        sprite = document.getElementById('deadDown');

        spriteName = Utility.getSpriteName(Configuration.ghostBlinkyCharacter, Configuration.nameGhostStateDead, Configuration.directionNameDown);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostInkyCharacter, Configuration.nameGhostStateDead, Configuration.directionNameDown);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostPinkyCharacter, Configuration.nameGhostStateDead, Configuration.directionNameDown);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostClydeCharacter, Configuration.nameGhostStateDead, Configuration.directionNameDown);
        this.#actorMainSpriteMap.set(spriteName, sprite);


        sprite = document.getElementById('deadLeft');

        spriteName = Utility.getSpriteName(Configuration.ghostBlinkyCharacter, Configuration.nameGhostStateDead, Configuration.directionNameLeft);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostInkyCharacter, Configuration.nameGhostStateDead, Configuration.directionNameLeft);
        this.#actorMainSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostPinkyCharacter, Configuration.nameGhostStateDead, Configuration.directionNameLeft);
        this.#actorMainSpriteMap.set(spriteName, sprite);
        
        spriteName = Utility.getSpriteName(Configuration.ghostClydeCharacter, Configuration.nameGhostStateDead, Configuration.directionNameLeft);
        this.#actorMainSpriteMap.set(spriteName, sprite);
    }


    #initializeActorAlternateSpriteMap() {
        this.#actorAlternateSpriteMap = new Map();

        // Alternate Pacman
        let sprite = document.getElementById('pacmanMouthClosed');

        let spriteName = Utility.getSpriteName(Configuration.pacmanCharacter, '', Configuration.directionNameUp);
        this.#actorAlternateSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.pacmanCharacter, '', Configuration.directionNameRight);
        this.#actorAlternateSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.pacmanCharacter, '', Configuration.directionNameDown);
        this.#actorAlternateSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.pacmanCharacter, '', Configuration.directionNameLeft);
        this.#actorAlternateSpriteMap.set(spriteName, sprite);


        // Scared Ghost Transition To Normal
        sprite = document.getElementById('transitionUp');

        spriteName = Utility.getSpriteName(Configuration.ghostBlinkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameUp);
        this.#actorAlternateSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostInkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameUp);
        this.#actorAlternateSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostPinkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameUp);
        this.#actorAlternateSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostClydeCharacter, Configuration.nameGhostStateScared, Configuration.directionNameUp);
        this.#actorAlternateSpriteMap.set(spriteName, sprite);


        sprite = document.getElementById('transitionRight');

        spriteName = Utility.getSpriteName(Configuration.ghostBlinkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameRight);
        this.#actorAlternateSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostInkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameRight);
        this.#actorAlternateSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostPinkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameRight);
        this.#actorAlternateSpriteMap.set(spriteName, sprite);
        
        spriteName = Utility.getSpriteName(Configuration.ghostClydeCharacter, Configuration.nameGhostStateScared, Configuration.directionNameRight);
        this.#actorAlternateSpriteMap.set(spriteName, sprite);


        sprite = document.getElementById('transitionDown');

        spriteName = Utility.getSpriteName(Configuration.ghostBlinkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameDown);
        this.#actorAlternateSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostInkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameDown);
        this.#actorAlternateSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostPinkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameDown);
        this.#actorAlternateSpriteMap.set(spriteName, sprite);
        
        spriteName = Utility.getSpriteName(Configuration.ghostClydeCharacter, Configuration.nameGhostStateScared, Configuration.directionNameDown);
        this.#actorAlternateSpriteMap.set(spriteName, sprite);


        sprite = document.getElementById('transitionLeft');

        spriteName = Utility.getSpriteName(Configuration.ghostBlinkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameLeft);
        this.#actorAlternateSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostInkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameLeft);
        this.#actorAlternateSpriteMap.set(spriteName, sprite);

        spriteName = Utility.getSpriteName(Configuration.ghostPinkyCharacter, Configuration.nameGhostStateScared, Configuration.directionNameLeft);
        this.#actorAlternateSpriteMap.set(spriteName, sprite);
        
        spriteName = Utility.getSpriteName(Configuration.ghostClydeCharacter, Configuration.nameGhostStateScared, Configuration.directionNameLeft);
        this.#actorAlternateSpriteMap.set(spriteName, sprite);
    }


    #initializeBackgroundSpriteMap() {
        this.#backgroundSpriteMap = new Map();

        this.#backgroundSpriteMap.set(Configuration.wallCharacter, document.getElementById('wall'));
        this.#backgroundSpriteMap.set(Configuration.emptyTileCharacter, document.getElementById('emptySpace'));

        this.#backgroundSpriteMap.set(Configuration.ghostDoorHorizontalCharacter, document.getElementById('ghostDoorHorizontal'));
        this.#backgroundSpriteMap.set(Configuration.ghostDoorVerticalCharacter, document.getElementById('ghostDoorVertical'));
        this.#backgroundSpriteMap.set(Configuration.ghostDoorDiagonalCharacter, document.getElementById('ghostDoorDiagonal'));

        this.#backgroundSpriteMap.set(Configuration.teleporter1Character, document.getElementById('teleporter1'));
        this.#backgroundSpriteMap.set(Configuration.teleporter2Character, document.getElementById('teleporter2'));
        this.#backgroundSpriteMap.set(Configuration.teleporter3Character, document.getElementById('teleporter3'));

        this.#backgroundSpriteMap.set(Configuration.pointCharacter, document.getElementById('point'));
        this.#backgroundSpriteMap.set(Configuration.powerUpCharacter, document.getElementById('powerUp'));

        /*
            this.#backgroundSpriteMap.set(Configuration.bonusCherryCharacter, document.getElementById('bonusCherry'));
            this.#backgroundSpriteMap.set(Configuration.bonusStrawberryCharacter, document.getElementById('bonusStrawberry'));
            this.#backgroundSpriteMap.set(Configuration.bonusPeachCharacter, document.getElementById('bonusPeach'));
            this.#backgroundSpriteMap.set(Configuration.bonusAppleCharacter, document.getElementById('bonusApple'));
            this.#backgroundSpriteMap.set(Configuration.bonusGrapeCharacter, document.getElementById('bonusGrape'));
            this.#backgroundSpriteMap.set(Configuration.bonusGalaxianCharacter, document.getElementById('bonusGalaxian'));
            this.#backgroundSpriteMap.set(Configuration.bonusBellCharacter, document.getElementById('bonusBell'));
            this.#backgroundSpriteMap.set(Configuration.bonusKeyCharacter, document.getElementById('bonusKey'));
        */
    }

}