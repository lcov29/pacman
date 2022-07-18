'use strict';

import GhostState from './GhostState.mjs';
import Configuration from '../Configuration.mjs';
import GhostStateScared from './GhostStateScared.mjs';
import GhostStateScatter from './GhostStateScatter.mjs';



export default class GhostStateChase extends GhostState {


    constructor(ghost) {
        super(ghost);
        super.setName(Configuration.nameGhostStateChase);
        super.setSpriteDisplayPriority(Configuration.ghostStateChaseSpriteDisplayPriority);
        super.setDurationInTurns(Configuration.turnDurationGhostStateChase);
    }


    getSubsequentState() {
        return new GhostStateScatter(super.getGhost());
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
        ghost.setState(new GhostStateScared(ghost));
    }


    kill() {
        // ghosts can only be killed when scared
    }


    handleTeleportation() {
        const ghost = super.getGhost();
        if (ghost.isCurrentPositionTeleporter()) {

            // ghost has the option to move over teleporters without teleporting
            if (ghost.isNextPositionEqualToTeleportDestination()) {
                ghost.setTeleportationStatus(true);
            } else {
                ghost.setTeleportationStatus(false);
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