"use strict";

import GhostState from "./GhostState.mjs";
import Configuration from "./Configuration.mjs";
import GhostStateScatter from "./GhostStateScatter.mjs";


export default class GhostStateDead extends GhostState {

    
    constructor(ghost) {
        super(Configuration.ghost_state_dead_name,
              Infinity,
              ghost,
              Configuration.ghost_dead_foreground_css_class);
    }


    executeStateMovementPattern() {
        let ghost = super.getGhost();
        let current_position_id = ghost.getCurrentPosition().getID();
        let next_position = this.calculateNextPosition(current_position_id);
        ghost.moveToPosition(next_position.getX(), next_position.getY());
    }


    // dead state movement pattern
    calculateNextPosition(current_position_id) {
        let ghost = super.getGhost();
        let routing = ghost.getRouting();
        let spawn_position_id = ghost.getSpawnID();
        return routing.calculateNextPositionOnShortestPath(current_position_id, spawn_position_id);
    }


    getSubsequentState() {
        return new GhostStateScatter(7, super.getGhost());
    }


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


    handleScatterPositionCollision() {}


    handlePacmanCollisionOnCurrentPosition() {
        let ghost = super.getGhost();
        if (ghost.isCurrentBoardPositionEqual(Configuration.pacman_character)) {
            ghost.setUpdateFlagCurrentPosition(false);
        } 
    }


    handlePacmanCollisionOnNextPosition() {
        let ghost = super.getGhost();
        if (ghost.isNextBoardPositionEqual(Configuration.pacman_character)) {
            ghost.setUpdateFlagNextPosition(false);
        }
    }


    handleWallCollision() {}


}