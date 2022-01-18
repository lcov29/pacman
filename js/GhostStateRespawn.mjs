"use strict";

import GhostState from "./GhostState.mjs";
import Configuration from "./Configuration.mjs";
import GhostStateScatter from "./GhostStateScatter.mjs";


export default class GhostStateRespawn extends GhostState {


    constructor(ghost) {
        super(Configuration.ghost_state_respawn_name,
              Infinity,
              ghost,
              ghost.getBaseRespawnStyleClass()); // IMPLEMENT THIS METHOD IN GHOST
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


    handlePacmanCollisionOnCurrentPosition() {}


    handleTeleportation() {}


    handleScatterPositionCollision() {}


    handlePacmanCollisionOnNextPosition() {}


    handleWallCollision() {}


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