'use strict';

import GhostState from './GhostState.mjs';
import Configuration from '../../../../global/Configuration.mjs';
import GhostStateScaredStart from './GhostStateScaredStart.mjs';
import GhostStateChase from './GhostStateChase.mjs';


export default class GhostStateScatter extends GhostState {


    constructor(ghost) {
        super(ghost);
        super.name = Configuration.nameGhostStateScatter;
        super.spriteDisplayPriority = Configuration.ghostStateScaredSpriteDisplayPriority;
        super.remainingTurns = Configuration.turnDurationGhostStateScatter;
    }


    get subsequentState() {
        return new GhostStateChase(super.ghost);
    }


    isHostileTowardsPacman() {
        return true;
    }


    isKillable() {
        return false;
    }


    executeMovementPattern() {
        const currentPositionId = super.ghost.currentPositionId;
        super.ghost.nextPosition = this.#calculateNextPosition(currentPositionId);;
    }


    scare() {
        super.ghost.state = new GhostStateScaredStart(super.ghost);
    }


    kill() {
        // ghosts can only be killed when scared
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
        const hasReachedScatterPosition = super.ghost.currentPositionId === super.ghost.scatterID;

        if (hasReachedScatterPosition) {
            super.ghost.nextPosition = super.ghost.currentPosition;
            super.ghost.movementDirectionName = Configuration.directionNameDown;
        }
    }


    handlePacmanCollisionOnNextPosition() {
        const isNextPositionPacman = super.ghost.isNextPositionActorCharacter(Configuration.pacmanCharacter);

        if (isNextPositionPacman) {
            super.ghost.killPacman(super.ghost.nextPosition.id);
        }
    }


    handleInaccessibleTileCollision() {
        // collision is not possible, because state movement pattern is based on the routing table 
        // for all ACCESSIBLE positions        
    }


    handleSpawnCollision() {
        // spawn position can not be equal to scatter position
    }


    // scatter state movement pattern
    #calculateNextPosition(currentPositionId) {
        const routing = super.ghost.routing;
        const scatterPositionId = super.ghost.scatterID;
        return routing.calculateNextPositionOnShortestPath(currentPositionId, scatterPositionId);
    }


}