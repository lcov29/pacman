'use strict';

import GhostState from './GhostState.mjs';
import Configuration from '../Configuration.mjs';
import GhostStateRespawn from './GhostStateRespawn.mjs';


export default class GhostStateDead extends GhostState {


    constructor(ghost) {
        // set duration to infinite; state ends when spawn is reached
        super(Infinity, ghost);
        super.setName(Configuration.nameGhostStateDead);
        super.setSpriteDisplayPriority(Configuration.ghostStateDeadSpriteDisplayPriority);
    }


    getSubsequentState() {
        return new GhostStateRespawn(super.getGhost());
    }


    isHostileTowardsPacman() {
        return false;
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
        // dead ghosts can not be scared
    }


    kill() {
        // dead ghosts can not be killed
    }


    // dead state movement pattern
    calculateNextPosition(currentPositionId) {
        let ghost = super.getGhost();
        let routing = ghost.getRouting();
        let spawnPositionId = ghost.getSpawnID();
        return routing.calculateNextPositionOnShortestPath(currentPositionId, spawnPositionId);
    }


    handleTeleportation() {
        let ghost = super.getGhost();
        if (ghost.isCurrentPositionTeleporter()) {

            // ghost has the option to move over teleporters without teleporting
            if (ghost.isNextPositionEqualToTeleportDestination()) {

                // after teleportation ghost sprite should display the direction of the next move
                let afterTeleportationPositionId = ghost.getNextPosition().getID();
                let nextAfterTeleportationPosition = this.calculateNextPosition(afterTeleportationPositionId);
                ghost.updateMovementDirection(ghost.getNextPosition(), nextAfterTeleportationPosition);
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
        // dead ghost can neither kill pacman nor get killed by pacman
    }


    handlePacmanCollisionOnNextPosition() {
        // dead ghost can neither kill pacman nor get killed by pacman
    }


    handleInaccessibleTileCollision() {
        // collision is not possible, because state movement pattern is based on the routing table 
        // for all ACCESSIBLE positions       
    }


    handleSpawnCollision() {
        let ghost = super.getGhost();
        if (ghost.getCurrentPosition().getID() === ghost.getSpawnID()) {
            super.end();
        }
    }


}