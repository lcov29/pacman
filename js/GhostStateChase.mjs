"use strict";

import Configuration from "./Configuration.mjs";
import GhostState from "./GhostState.mjs";
import GhostStateScatter from "./GhostStateScatter.mjs";


export default class GhostStateChase extends GhostState {


    constructor(duration_in_turns, ghost) {
        super(Configuration.ghost_state_chase_name,
              duration_in_turns,
              ghost,
              ghost.getBaseStyleClass());
    }


    executeStateMovementPattern() {
        let ghost = super.getGhost();
        let current_position_id = ghost.getCurrentPosition().getID();
        let next_position = ghost.calculateNextChasePosition(current_position_id);
        ghost.moveToPosition(next_position.getX(), next_position.getY());
    }


    getSubsequentState() {
        return new GhostStateScatter(7, super.getGhost());
    }


    getStyleClass() {
        return `${super.getBaseStyleClass()}_${super.getGhost().getMovementDirectionName()}`;
    }


    handleTeleportation() {
        let ghost = super.getGhost();
        if (ghost.isOccupiedBoardElementTeleporter()) {

            // ghost has the option to move over teleporters without teleporting
            if (ghost.isNextPositionEqualToTeleportDestination()) {

                // after teleportation ghost sprite should already face in the direction of the next move
                let after_teleportation_position_id = ghost.getNextPosition().getID();
                let next__after_teleportation_position = ghost.calculateNextChasePosition(after_teleportation_position_id);
                ghost.updateMovementDirection(ghost.getNextPosition(), next__after_teleportation_position);
                ghost.setTeleportationStatus(true);
            } 

        } else {
            ghost.setTeleportationStatus(false);
        }
    }


    handleScatterPositionCollision() {
        // ignore scatter position
    }


    handlePacmanCollisionOnCurrentPosition() {
        // since pacmans move first, this collision (pacman moving to a position occupied by a ghost)
        // is handled by the method Pacman.handleGhostCollision()
    }


    handlePacmanCollisionOnNextPosition() {
        let ghost = super.getGhost();
        if (ghost.isNextBoardPositionEqual(Configuration.pacman_character)) {
            ghost.killPacman(ghost.getNextPosition().getID());
        }
    }


    handleWallCollision() {
        // wall collision is not possible, because state movement pattern is based on the routing table 
        // for all ACCESSIBLE positions
    }


    handleSpawnCollision() {
        // ignore spawn position
    }

    
}