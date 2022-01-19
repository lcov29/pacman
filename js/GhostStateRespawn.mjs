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
        this.respawn_stage = 0;
    }


    executeStateMovementPattern() {
        let ghost = super.getGhost();
        let current_position = ghost.getCurrentPosition();
        ghost.moveToPosition(current_position.getX(), current_position.getY());
    }


    getSubsequentState() {
        return new GhostStateScatter(7, super.getGhost());
    }


    getStyleClass() {
        return `${super.getBaseStyleClass()}_stage_${this.respawn_stage}`;
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

            if (this.respawn_stage < Configuration.max_respawn_stage) {
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