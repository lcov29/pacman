"use strict";

import GhostState from "./GhostState.mjs";
import Configuration from "./Configuration.mjs";
import GhostStateChase from "./GhostStateChase.mjs";


export default class GhostStateScatter extends GhostState {


    constructor(duration_in_turns, ghost) {
        super(Configuration.ghost_state_scatter_name,
              duration_in_turns,
              ghost,
              ghost.getBaseStyleClass());
    }


    executeStateMovementPattern() {
        let ghost = super.getGhost();
        let current_position_id = ghost.getCurrentPosition().getID();
        let next_position = this.calculateNextPosition(current_position_id);
        ghost.moveToPosition(next_position.getX(), next_position.getY());
    }


    // scatter state movement pattern
    calculateNextPosition(current_position_id) {
        let ghost = super.getGhost();
        let routing = ghost.getRouting();
        let scatter_position_id = ghost.getScatterID();
        return routing.calculateNextPositionOnShortestPath(current_position_id, scatter_position_id);
    }


    getSubsequentState() {
        return new GhostStateChase(20, super.getGhost());
    }


    handlePacmanCollisionOnCurrentPosition() {}


    handleTeleportation() {
        let ghost = super.getGhost();
        if (ghost.isOccupiedBoardElementTeleporter()) {

            // ghost has the option to move over teleporters without teleporting
            if (ghost.isNextPositionEqualToTeleportDestination()) {

                // after teleportation ghost sprite should already face in the direction of the next move
                let after_teleportation_position_id = ghost.getNextPosition().getID();
                let next__after_teleportation_position = this.calculateNextPosition(after_teleportation_position_id);
                ghost.updateMovementDirection(ghost.getNextPosition(), next__after_teleportation_position);
                ghost.setTeleportationStatus(true);
            } 

        } else {
            ghost.setTeleportationStatus(false);
        }
    }


    handleScatterPositionCollision() {
        let ghost = super.getGhost();
        if (ghost.getCurrentPosition().getID() === ghost.getScatterID()) {
            ghost.setNextPosition(ghost.getCurrentPosition());
        }
    }


    handlePacmanCollisionOnNextPosition() {
        let ghost = super.getGhost();
        if (ghost.isNextBoardPositionEqual(Configuration.pacman_character)) {
            ghost.killPacman(ghost.getNextPosition().getID());
        }
    }


    handleWallCollision() {}


    handleSpawnCollision() {}


}