'use strict';

import GhostState from './GhostState.mjs';
import Configuration from '../../../../global/Configuration.mjs';
import GhostStateScatter from './GhostStateScatter.mjs';


export default class GhostStateRespawn extends GhostState {


    #respawnStage = 0;


    constructor(ghost) {
        super(ghost);
        super.name = Configuration.nameGhostStateRespawn;
        super.spriteDisplayPriority = Configuration.ghostStateRespawnSpriteDisplayPriority;
        super.remainingTurns = Configuration.turnDurationGhostStateRespawn;
    }


    get subsequentState() {
        return new GhostStateScatter(super.ghost);
    }


    isHostileTowardsPacman() {
        return false;
    }


    isKillable() {
        return false;
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
        const hasReachedSpawnPosition = super.ghost.currentPosition.id === super.ghost.spawnID

        if (hasReachedSpawnPosition) {
            const isRespawnComplete = this.#respawnStage === Configuration.ghostMaxRespawnStage;

            if (isRespawnComplete) {
                const isNoScaredGhostsOnBoard = super.ghost.countScaredGhosts() === 0;

                if (isNoScaredGhostsOnBoard) {
                    super.end();
                }

            } else {
                this.#respawnStage++;
            }
        }
    }


}