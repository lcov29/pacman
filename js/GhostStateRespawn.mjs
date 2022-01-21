"use strict";

import GhostState from "./GhostState.mjs";
import Configuration from "./Configuration.mjs";
import GhostStateScatter from "./GhostStateScatter.mjs";


export default class GhostStateRespawn extends GhostState {


    constructor(ghost) {
        // set duration to infinite; state ends when all respawn stages are completed
        super(Infinity, ghost);
        super.setName(Configuration.ghost_state_respawn_name);
        super.setBaseStyleClass(ghost.getBaseRespawnStyleClass());
        super.setSpriteDisplayPriority(Configuration.GHOST_STATE_RESPAWN_SPRITE_DISPLAY_PRIORITY);
        this.respawn_stage = 0;
    }


    getSubsequentState() {
        return new GhostStateScatter(7, super.getGhost());
    }


    getStyleClass() {
        return `${super.getBaseStyleClass()}_stage_${this.respawn_stage}`;
    }


    isHostileTowardsPacman() {
        return false;
    }


    isKillable() {
        return false;
    }


    executeStateMovementPattern() {
        let ghost = super.getGhost();
        let current_position = ghost.getCurrentPosition();
        ghost.moveToPosition(current_position.getX(), current_position.getY());
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
            if (this.respawn_stage < Configuration.GHOST_MAX_RESPAWN_STAGE) {
                this.respawn_stage++;
            } else {
                // prevent ghost from leaving the spawn while pacman still has scared ghost to chase
                if (ghost.countScaredGhosts() === 0) {
                    super.end();
                }
            }
        }
    }


}