'use strict';

import GhostState from './GhostState.mjs';
import Configuration from '../../../../global/Configuration.mjs';
import GhostStateScaredStart from './GhostStateScaredStart.mjs';
import GhostStateScatter from './GhostStateScatter.mjs';


export default class GhostStateChase extends GhostState {


    constructor(ghost) {
        super(ghost);
        super.name = Configuration.nameGhostStateChase;
        super.spriteDisplayPriority = Configuration.ghostStateChaseSpriteDisplayPriority;
        super.remainingTurns = Configuration.turnDurationGhostStateChase;
    }


    get subsequentState() {
        return new GhostStateScatter(super.ghost);
    }


    isHostileTowardsPacman() {
        return true;
    }


    isKillable() {
        return false;
    }


    executeMovementPattern() {
        const currentPositionId = super.ghost.currentPosition.id;
        super.ghost.nextPosition = super.ghost.calculateNextChasePosition(currentPositionId);;
    }


    scare() {
        super.ghost.state = new GhostStateScaredStart(super.ghost);
    }


    kill() {
        // ghosts can only be killed when scared
    }


    handleTeleporterCollision() {
        const ghost = super.ghost;
        if (ghost.isCurrentPositionTeleporter()) {

            // ghost has the option to move over teleporters without teleporting
            if (ghost.isNextPositionEqualToTeleportDestination()) {
                ghost.hasTeleportedInPreviousTurn = true;
            } else {
                ghost.hasTeleportedInPreviousTurn = false;
            }
            
        } else {
            ghost.hasTeleportedInPreviousTurn = false;
        }
    }


    handleScatterPositionCollision() {
        // ignore scatter position
    }


    handlePacmanCollisionOnNextPosition() {
        let ghost = super.ghost;
        if (ghost.isNextPositionActorCharacter(Configuration.pacmanCharacter)) {
            ghost.killPacman(ghost.nextPosition.id);
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