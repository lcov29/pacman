'use strict';

import GhostState from './GhostState.mjs';
import Configuration from '../Configuration.mjs';
import GhostStateScared from './GhostStateScared.mjs';
import GhostStateChase from './GhostStateChase.mjs';


export default class GhostStateScatter extends GhostState {


    constructor(durationInTurns, ghost) {
        super(durationInTurns, ghost);
        super.setName(Configuration.nameGhostStateScatter);
        super.setSpriteDisplayPriority(Configuration.ghostStateScaredSpriteDisplayPriority);
    }


    getSubsequentState() {
        return new GhostStateChase(20, super.getGhost());
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
        let nextPosition = this.calculateNextPosition(currentPositionId);
        ghost.setNextPosition(nextPosition);
    }


    scare() {
        let ghost = super.getGhost();
        ghost.setState(new GhostStateScared(30, ghost));
    }


    kill() {
        // ghosts can only be killed when scared
    }


    // scatter state movement pattern
    calculateNextPosition(currentPositionId) {
        let ghost = super.getGhost();
        let routing = ghost.getRouting();
        let scatterPositionId = ghost.getScatterID();
        return routing.calculateNextPositionOnShortestPath(currentPositionId, scatterPositionId);
    }


    handlePacmanCollisionOnCurrentPosition() {
        // since pacmans move first, this collision (pacman moving to a position occupied by a ghost)
        // is handled by the method Pacman.handleGhostCollision()
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
        let ghost = super.getGhost();
        if (ghost.getCurrentPosition().getID() === ghost.getScatterID()) {
            ghost.setNextPosition(ghost.getCurrentPosition());
            ghost.setMovementDirectionName(Configuration.directionNameDown);
        }
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
        // spawn position can not be equal to scatter position
    }


}