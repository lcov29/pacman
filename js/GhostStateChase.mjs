"use strict";

import GhostState from "./GhostState.mjs";
import Configuration from "./Configuration.mjs";
import GhostStateScared from "./GhostStateScared.mjs";
import GhostStateScatter from "./GhostStateScatter.mjs";



export default class GhostStateChase extends GhostState {


    constructor(duration_in_turns, ghost) {
        super(duration_in_turns, ghost);
        super.setBaseStyleClass(ghost.getBaseMovementStyleClass());
        super.setSpriteDisplayPriority(Configuration.GHOST_STATE_CHASE_SPRITE_DISPLAY_PRIORITY);
    }


    getSubsequentState() {
        return new GhostStateScatter(7, super.getGhost());
    }


    getStyleClass() {
        let base_style_class = super.getBaseStyleClass();
        let direction_name = super.getGhost().getCurrentMovementDirectionName();
        return `${base_style_class}_${direction_name}`;
    }


    isHostileTowardsPacman() {
        return true;
    }


    isKillable() {
        return false;
    }


    // TODO: THINK ABOUT RENAMING THIS METHOD LIKE executeMovementPattern() ?
    executeStateMovementPattern() {
        let ghost = super.getGhost();
        let current_position_id = ghost.getCurrentPosition().getID();
        let next_position = ghost.calculateNextChasePosition(current_position_id);
        ghost.setNextPosition(next_position);
    }


    scare() {
        let ghost = super.getGhost();
        ghost.setState(new GhostStateScared(30, ghost));
    }


    kill() {
        // ghosts can only be killed when scared
    }


    handleTeleportation() {
        let ghost = super.getGhost();
        if (ghost.isCurrentPositionTeleporter()) {

            // ghost has the option to move over teleporters without teleporting
            if (ghost.isNextPositionEqualToTeleportDestination()) {

                // after teleportation ghost sprite should display the direction of the next move
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
        if (ghost.isNextPositionActorCharacter(Configuration.pacman_character)) {
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