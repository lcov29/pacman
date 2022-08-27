import GhostState from './GhostState.mjs';
import Configuration from '../../../../global/Configuration.mjs';
import GhostStateScatter from './GhostStateScatter.mjs';


export default class GhostStateRespawn extends GhostState {


    #respawnStage = 0;
    #isWaitingForScaredGhosts = false;
    #isMaxRespawnStageReached = false;


    constructor(ghost) {
        super(ghost);
        super.name = Configuration.nameGhostStateRespawn;
        super.spriteDisplayPriority = Configuration.ghostStateRespawnSpriteDisplayPriority;
        super.remainingTurns = Infinity; // state ends when final respawnStage is reached and no ghost is scared
    }


    get subsequentState() {
        return new GhostStateScatter(super.ghost);
    }


    get respawnStage() {
        return this.#respawnStage;
    }


    isHostileTowardsPacman() {
        return false;
    }


    isKillable() {
        return false;
    }


    isRespawnRequestNecessary() {
        return !this.#isMaxRespawnStageReached && !this.#isWaitingForScaredGhosts;
    }


    executeMovementPattern() {
        super.ghost.nextPosition = super.ghost.currentPosition;
    }


    scare() {
        // respawning ghosts can not be scared
    }


    kill() {
        // respawning ghosts can not be killed
    }


    handleTeleporterCollision() {
        // teleporter position can not be equal to spawn position
    }


    handleScatterPositionCollision() {
        // scatter position can not be equal to spawn position
    }


    handlePacmanCollisionOnNextPosition() {
        // ghost is not leaving the spawn position
    }


    handleInaccessibleTileCollision() {
        // collision is not possible, because state is triggered by GhostStateDead upon reaching
        // the spawn position (can not be a wall or undefined) and the state movement pattern just
        // stays on the spawn position
    }


    handleSpawnCollision() {
        this.#isMaxRespawnStageReached = this.#respawnStage === Configuration.ghostMaxRespawnStage;

        if (!this.#isMaxRespawnStageReached) {
            this.#respawnStage++;
        }

        const isAnyGhostScared = super.ghost.isAnyGhostScared();

        if (this.#isMaxRespawnStageReached && isAnyGhostScared) {
            this.#isWaitingForScaredGhosts = true;
        }

        if (this.#isMaxRespawnStageReached && !isAnyGhostScared) {
            super.end();
        }
    }


}