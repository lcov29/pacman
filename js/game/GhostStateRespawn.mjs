"use strict";

import GhostState from "./GhostState.mjs";
import Configuration from "../Configuration.mjs";
import GhostStateScatter from "./GhostStateScatter.mjs";


export default class GhostStateRespawn extends GhostState {


    constructor(ghost) {
        // set duration to infinite; state ends when all respawn stages are completed
        super(Infinity, ghost);
        super.setBaseStyleClass(ghost.getBaseRespawnStyleClass());
        super.setSpriteDisplayPriority(Configuration.GHOST_STATE_RESPAWN_SPRITE_DISPLAY_PRIORITY);
        this.respawnStage = 0;
    }


    getSubsequentState() {
        return new GhostStateScatter(7, super.getGhost());
    }


    getStyleClass() {
        return `${super.getBaseStyleClass()}_stage_${this.respawnStage}`;
    }


    isHostileTowardsPacman() {
        return false;
    }


    isKillable() {
        return false;
    }


    executeMovementPattern() {
        let ghost = super.getGhost();
        ghost.setNextPosition(ghost.getCurrentPosition());
    }


    scare() {
        // respawning ghosts can not be scared
    }


    kill() {
        // respawning ghosts can not be killed
    }


    handlePacmanCollisionOnCurrentPosition() {
        // since pacmans move first, this collision (pacman moving to a position occupied by a ghost)
        // is handled by the method Pacman.handleGhostCollision()
    }


    handleTeleportation() {
        // teleporter position can not be equal to spawn position
    }


    handleScatterPositionCollision() {
        // scatter position can not be equal to spawn position
    }


    handlePacmanCollisionOnNextPosition() {
        // ghost is not leaving the spawn position
    }


    handleWallCollision() {
        // wall collision is not possible, because state is triggered by GhostStateDead upon reaching
        // the spawn position (can not be a wall) and the state movement pattern just stays on the 
        // spawn position
    }


    handleSpawnCollision() {
        let ghost = super.getGhost();
        if (ghost.getCurrentPosition().getID() === ghost.getSpawnID()) {
            if (this.respawnStage < Configuration.GHOST_MAX_RESPAWN_STAGE) {
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