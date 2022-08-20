'use strict';

import GhostState from './GhostState.mjs';
import Configuration from '../../../../global/Configuration.mjs';
import GhostStateScaredStart from './GhostStateScaredStart.mjs';
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
        let currentPositionId = ghost.getCurrentPosition().id;
        let nextPosition = ghost.calculateNextChasePosition(currentPositionId);
        ghost.setNextPosition(nextPosition);
    }


    scare() {
        let ghost = super.getGhost();
        ghost.setState(new GhostStateScaredStart(ghost));
    }


    kill() {
        // ghosts can only be killed when scared
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
        // ignore scatter position
    }


    handlePacmanCollisionOnNextPosition() {
        let ghost = super.getGhost();
        if (ghost.isNextPositionActorCharacter(Configuration.pacmanCharacter)) {
            ghost.killPacman(ghost.getNextPosition().id);
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