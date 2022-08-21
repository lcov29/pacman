'use strict';

import GhostState from './GhostState.mjs';
import Configuration from '../../../../global/Configuration.mjs';
import GhostStateRespawn from './GhostStateRespawn.mjs';


export default class GhostStateDead extends GhostState {


    constructor(ghost) {
        super(ghost);
        super.name = Configuration.nameGhostStateDead;
        super.spriteDisplayPriority = Configuration.ghostStateDeadSpriteDisplayPriority;
        super.remainingTurns = Infinity; // state ends when spawn is reached
    }


    get subsequentState() {
        return new GhostStateRespawn(super.ghost);
    }


    isHostileTowardsPacman() {
        return false;
    }


    isKillable() {
        return false;
    }


    executeMovementPattern() {
        const currentPositionId = super.ghost.currentPosition.id;
        super.ghost.nextPosition = this.#calculateNextPosition(currentPositionId);
    }


    scare() {
        // dead ghosts can not be scared
    }


    kill() {
        // dead ghosts can not be killed
    }


    handleTeleporterCollision() {
        if (super.ghost.isCurrentPositionTeleporter()) {

            const hasTeleported = super.ghost.isNextPositionEqualToTeleportDestination();

            if (hasTeleported) {
                super.ghost.hasTeleportedInPreviousTurn = true;
            } else {
                // ghost has the option to move over teleporters without teleporting
                super.ghost.hasTeleportedInPreviousTurn = false;
            }
            
        } else {
            super.ghost.hasTeleportedInPreviousTurn = false;
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
        const hasReachedSpawnPosition = super.ghost.currentPosition.id === super.ghost.spawnID

        if (hasReachedSpawnPosition) {
            super.end();
        }
    }


    // dead state movement pattern
    #calculateNextPosition(currentPositionId) {
        const routing = super.ghost.routing;
        const spawnPositionId = super.ghost.spawnID;
        return routing.calculateNextPositionOnShortestPath(currentPositionId, spawnPositionId);
    }


}