'use strict';

import GhostState from './GhostState.mjs';
import Configuration from '../Configuration.mjs';
import GhostStateScared from './GhostStateScared.mjs';
import GhostStateScatter from './GhostStateScatter.mjs';



export default class GhostStateChase extends GhostState {


    constructor(durationInTurns, ghost) {
        super(durationInTurns, ghost);
        super.setSpriteDisplayPriority(Configuration.ghostStateChaseSpriteDisplayPriority);
    }


    getSubsequentState() {
        return new GhostStateScatter(7, super.getGhost());
    }


    isHostileTowardsPacman() {
        return true;
    }


    isKillable() {
        return false;
    }


    executeMovementPattern() {
        let ghost = super.getGhost();
        let currentPositionId = ghost.getCurrentPosition().getID();
        let nextPosition = ghost.calculateNextChasePosition(currentPositionId);
        ghost.setNextPosition(nextPosition);
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
                let afterTeleportationPositionId = ghost.getNextPosition().getID();
                let nextAfterTeleportationPosition = ghost.calculateNextChasePosition(afterTeleportationPositionId);
                ghost.updateMovementDirection(ghost.getNextPosition(), nextAfterTeleportationPosition);
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
        if (ghost.isNextPositionActorCharacter(Configuration.pacmanCharacter)) {
            ghost.killPacman(ghost.getNextPosition().getID());
        }
    }


    handleInaccessibleTileCollision() {
        // collision is not possible, because state movement pattern is based on the routing table 
        // for all ACCESSIBLE positions       
    }


    handleSpawnCollision() {
        // ignore spawn position
    }

    
}