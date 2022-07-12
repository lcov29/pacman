'use strict';

import GhostState from './GhostState.mjs';
import Configuration from '../Configuration.mjs';
import GhostStateDead from './GhostStateDead.mjs';
import GhostStateChase from './GhostStateChase.mjs';

/*  
   =================================================================================================================
   Implements the movement of scared ghosts and the interaction with pacman and other elements

   Note 1:      Starts when pacman consumes a powerup. 
                Ends after the defined duration or when ghost collides with a pacman

   Note 2:      See documentation: [ADD LINK TO UML-STATE-DIAGRAM]

   Note 3:      Movement pattern:
                1.) reverse current movement direction upon entering this state
                2.) move in current direction
                3.) when colliding with an inaccessible tile or with level border, select a DIFFERENT 
                    random movement direction and resume with step 2
   =================================================================================================================
 */


export default class GhostStateScared extends GhostState {


    constructor(durationInTurns, ghost) {
        super(durationInTurns, ghost);
        super.setName(Configuration.nameGhostStateScared);
        super.setSpriteDisplayPriority(Configuration.ghostStateScaredSpriteDisplayPriority);
        super.getGhost().reverseCurrentMovementDirection();
    }


    getSubsequentState() {
        return new GhostStateChase(20, super.getGhost());
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
        this.handleLevelBorderCollision(nextPosition);
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
        } else if (ghost.isCurrentPositionTeleporter() === false) {
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
        if (ghost.isNextPositionActorCharacter(Configuration.pacmanCharacter)) {            
            ghost.kill();
            ghost.setUpdateFlagNextPosition(false);
            ghost.incrementScoreBy(Configuration.scoreValuePerEatenGhost);
        }
    }


    handleInaccessibleTileCollision() {
        let ghost = super.getGhost();
        let nextPositionCharacter = ghost.getNextPosition().getElementLayerCharacter();
        if (Configuration.actorsInaccessibleTileCharacterList.includes(nextPositionCharacter)) {
            ghost.setNextPosition(ghost.getCurrentPosition());
            ghost.randomizeMovementDirection();
        }
    }


    handleSpawnCollision() {
        // ignore spawn position
    }


    // internal method
    handleLevelBorderCollision(nextPosition) {
        let ghost = super.getGhost();
        // when an actor moves out of the level its position is reset to current position 
        if (nextPosition.getID() === ghost.getCurrentPosition().getID()) {
            ghost.randomizeMovementDirection();
        }
    }


}