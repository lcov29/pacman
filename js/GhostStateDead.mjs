"use strict";

import GhostState from "./GhostState.mjs";
import Configuration from "./Configuration.mjs";
import GhostStateRespawn from "./GhostStateRespawn.mjs";


export default class GhostStateDead extends GhostState {


    constructor(ghost) {
        // set duration to infinite; state ends when spawn is reached
        super(Infinity, ghost);   
        super.setName(Configuration.ghost_state_dead_name);
        super.setBaseStyleClass(Configuration.ghost_dead_foreground_css_class);
        super.setSpriteDisplayPriority(Configuration.GHOST_STATE_DEAD_SPRITE_DISPLAY_PRIORITY);
    }


    getSubsequentState() {
        return new GhostStateRespawn(super.getGhost());
    }


    getStyleClass() {
        let base_style_class = super.getBaseStyleClass();
        let direction_name = super.getGhost().getCurrentMovementDirectionName();
        return `${base_style_class}_${direction_name}`;
    }


    isHostileTowardsPacman() {
        return false;
    }


    isKillable() {
        return false;
    }


    executeStateMovementPattern() {
        let ghost = super.getGhost();
        let current_position_id = ghost.getCurrentPosition().getID();
        let next_position = this.calculateNextPosition(current_position_id);
        ghost.setNextPosition(next_position);
    }


    scare() {
        // dead ghosts can not be scared
    }


    kill() {
        // dead ghosts can not be killed
    }


    // dead state movement pattern
    calculateNextPosition(current_position_id) {
        let ghost = super.getGhost();
        let routing = ghost.getRouting();
        let spawn_position_id = ghost.getSpawnID();
        return routing.calculateNextPositionOnShortestPath(current_position_id, spawn_position_id);
    }


    handleTeleportation() {
        let ghost = super.getGhost();
        if (ghost.isCurrentPositionTeleporter()) {

            // ghost has the option to move over teleporters without teleporting
            if (ghost.isNextPositionEqualToTeleportDestination()) {

                // after teleportation ghost sprite should display the direction of the next move
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
        // scatter position can not be equal to spawn position
    }


    handlePacmanCollisionOnCurrentPosition() {
        let ghost = super.getGhost();
        if (ghost.isCurrentPositionActorCharacter(Configuration.pacman_character)) {
            ghost.setUpdateFlagCurrentPosition(false);
        } 
    }


    handlePacmanCollisionOnNextPosition() {
        let ghost = super.getGhost();
        if (ghost.isNextPositionActorCharacter(Configuration.pacman_character)) {
            ghost.setUpdateFlagNextPosition(false);
        }
    }


    handleWallCollision() {
        // wall collision is not possible, because state movement pattern is based on the routing table 
        // for all ACCESSIBLE positions
    }


    handleSpawnCollision() {
        let ghost = super.getGhost();
        if (ghost.getCurrentPosition().getID() === ghost.getSpawnID()) {
            super.end();
        }
    }


}