'use strict';

import GhostState from './GhostState.mjs';
import Configuration from '../../../../global/Configuration.mjs';
import GhostStateScatter from './GhostStateScatter.mjs';


export default class GhostStateRespawn extends GhostState {


    constructor(ghost) {
        super(ghost);
        super.setName(Configuration.nameGhostStateRespawn);
        super.setSpriteDisplayPriority(Configuration.ghostStateRespawnSpriteDisplayPriority);
        super.setDurationInTurns(Configuration.turnDurationGhostStateRespawn);
        this.respawnStage = 0;
    }


    getSubsequentState() {
        return new GhostStateScatter(super.getGhost());
    }


    isHostileTowardsPacman() {
        return false;
    }


    isKillable() {
        return false;
    }


    executeMovementPattern() {
        let ghost = super.getGhost();
        ghost.nextPosition = ghost.currentPosition;
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
        let ghost = super.getGhost();
        if (ghost.currentPosition.id === ghost.getSpawnID()) {
            if (this.respawnStage < Configuration.ghostMaxRespawnStage) {
                this.respawnStage++;
            } else {
                // prevent ghost from leaving the spawn while pacman still has scared ghost to chase
                if (ghost.countScaredGhosts() === 0) {
                    super.end();
                }
            }
        }
    }


}