"use strict";

import GhostState from "./GhostState.mjs";
import Configuration from "./Configuration.mjs";
import GhostStateChase from "./GhostStateChase.mjs";


export default class GhostStateFlee extends GhostState {


    constructor(duration_in_turns, ghost) {
        super(duration_in_turns, ghost);
        super.setName(Configuration.ghost_state_flee_name);
        super.setBaseStyleClass(Configuration.ghost_scared_foreground_css_class);
        super.getGhost().reverseMovementDirection();
        super.setSpriteDisplayPriority(Configuration.GHOST_STATE_FLEE_SPRITE_DISPLAY_PRIORITY);
    }


    executeStateMovementPattern() {
        let next_position = this.calculateNextPosition();
        super.getGhost().moveToPosition(next_position.getX(), next_position.getY());
    }


    // flee state movement pattern: 
    // 1.) reverse current movement direction upon entering this state
    // 2.) move in this direction
    // 3.) when colliding with a wall, select another random movement direction and resume with step 2
    calculateNextPosition() {
        return super.getGhost().calculateNextPositionByDirection();
    }


    getSubsequentState() {
        return new GhostStateChase(20, super.getGhost());
    }


    getStyleClass() {
        let base_style_class = super.getBaseStyleClass();
        let direction_name = super.getGhost().getCurrentMovementDirectionName();
        return `${base_style_class}_${direction_name}`;
    }


    handleTeleportation() {
        let ghost = super.getGhost();
        if (ghost.isCurrentPositionTeleporter() && ghost.getTeleportationStatus() === false) {
            let destination = ghost.getTeleportDestinationForCurrentPosition();
            ghost.setNextPosition(destination);
            ghost.setTeleportationStatus(true);
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
            ghost.kill();
            ghost.setUpdateFlagNextPosition(false);
            ghost.incrementScoreBy(Configuration.score_value_per_eaten_ghost);
        }
    }


    handleWallCollision() {
        let ghost = super.getGhost();
        if (ghost.isNextBoardPositionEqual(Configuration.wall_character)) {
            ghost.setNextPosition(ghost.getCurrentPosition());
            ghost.randomizeMovementDirection();
        }
    }


    handleSpawnCollision() {
        // ignore spawn position
    }


}