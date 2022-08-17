'use strict';

import GhostState from './GhostState.mjs';
import Configuration from '../../../../global/Configuration.mjs';
import GhostStateRespawn from './GhostStateRespawn.mjs';


export default class GhostStateDead extends GhostState {


    constructor(ghost) {
        super(ghost);
        super.setName(Configuration.nameGhostStateDead);
        super.setSpriteDisplayPriority(Configuration.ghostStateDeadSpriteDisplayPriority);
        super.setDurationInTurns(Infinity); // state ends when spawn is reached
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

    
    handleTeleporterCollision() {
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
        // scatter position can not be equal to spawn position
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