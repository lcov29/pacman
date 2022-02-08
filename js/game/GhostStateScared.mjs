"use strict";

import GhostState from "./GhostState.mjs";
import Configuration from "../Configuration.mjs";
import GhostStateDead from "./GhostStateDead.mjs";
import GhostStateChase from "./GhostStateChase.mjs";

/*  
   =================================================================================================================
   Implements the movement of scared ghosts and the interaction with pacman and other elements

   Note 1:      Starts when pacman consumes a powerup. 
                Ends after the defined duration or when ghost collides with a pacman

   Note 2:      See documentation: [ADD LINK TO UML-STATE-DIAGRAM]

   Note 3:      Movement pattern:
                1.) reverse current movement direction upon entering this state
                2.) move in current direction
                3.) when colliding with a wall, select a DIFFERENT random movement direction and 
                    resume with step 2
   =================================================================================================================
 */


export default class GhostStateScared extends GhostState {


    constructor(durationInTurns, ghost) {
        super(durationInTurns, ghost);
        super.setBaseStyleClass(Configuration.GHOST_SCARED_FOREGROUND_CSS_CLASS);
        super.setSpriteDisplayPriority(Configuration.GHOST_STATE_SCARED_SPRITE_DISPLAY_PRIORITY);
        super.getGhost().reverseCurrentMovementDirection();
    }


    getSubsequentState() {
        return new GhostStateChase(20, super.getGhost());
    }


    getStyleClass() {
        let baseStyleClass = super.getBaseStyleClass();
        let directionName = super.getGhost().getCurrentMovementDirectionName();
        return `${baseStyleClass}_${directionName}`;
    }


    isHostileTowardsPacman() {
        return false;
    }


    isKillable() {
        return true;
    }


    executeMovementPattern() {
        let nextPosition = this.calculateNextPosition();
        super.getGhost().setNextPosition(nextPosition);
    }


    scare() {
        let ghost = super.getGhost();
        ghost.setState(new GhostStateScared(30, ghost));
    }


    kill() {
        let ghost = super.getGhost();
        ghost.setState(new GhostStateDead(ghost));
    }


    calculateNextPosition() {
        return super.getGhost().calculateNextPositionByCurrentDirection();
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
        if (ghost.isNextPositionActorCharacter(Configuration.PACMAN_CHARACTER)) {            
            ghost.kill();
            ghost.setUpdateFlagNextPosition(false);
            ghost.incrementScoreBy(Configuration.SCORE_VALUE_PER_EATEN_GHOST);
        }
    }


    handleWallCollision() {
        let ghost = super.getGhost();
        if (ghost.isNextPositionElementCharacter(Configuration.WALL_CHARACTER)) {
            ghost.setNextPosition(ghost.getCurrentPosition());
            ghost.randomizeMovementDirection();
        }
    }


    handleSpawnCollision() {
        // ignore spawn position
    }


}