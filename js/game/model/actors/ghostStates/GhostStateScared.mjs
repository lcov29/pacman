'use strict';

import Utility from '../../../../global/Utility.mjs';
import GhostState from './GhostState.mjs';
import Configuration from '../../../../global/Configuration.mjs';
import GhostStateDead from './GhostStateDead.mjs';
import GhostStateScaredStart from './GhostStateScaredStart.mjs';

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


    constructor(ghost) {
        super(ghost);
        super.spriteDisplayPriority = Configuration.ghostStateScaredSpriteDisplayPriority;
    }


    isHostileTowardsPacman() {
        return false;
    }


    isKillable() {
        return true;
    }


    executeMovementPattern() {
        const nextPosition = this.#calculateNextPosition();
        super.ghost.nextPosition = nextPosition;
        this.#handleLevelBorderCollision(nextPosition);
    }


    scare() {
        super.ghost.state = new GhostStateScaredStart(super.ghost);
    }


    kill() {
        super.ghost.state = new GhostStateDead(super.ghost);
    }


    handleTeleporterCollision() {
        const ghost = super.ghost;
        const isTeleportationNeeded = ghost.isCurrentPositionTeleporter() && !ghost.hasTeleportedInPreviousTurn;

        if (isTeleportationNeeded) {
            const destination = ghost.getTeleportDestinationForCurrentPosition();
            ghost.nextPosition = destination;
            ghost.hasTeleportedInPreviousTurn = true;
        } else if (ghost.hasTeleportedInPreviousTurn) {
            this.#chooseRandomAccessibleNextBoardPosition();
            ghost.hasTeleportedInPreviousTurn = false;
        }
    }


    handleScatterPositionCollision() {
        // ignore scatter position
    }


    handlePacmanCollisionOnNextPosition() {
        const isNextPositionPacman = super.ghost.isNextPositionActorCharacter(Configuration.pacmanCharacter);

        if (isNextPositionPacman) {            
            super.ghost.kill();
            super.ghost.incrementScoreBy(Configuration.scoreValuePerEatenGhost);
        }
    }


    handleInaccessibleTileCollision() {
        const nextPositionElementCharacter = super.ghost.nextPosition.elementLayerCharacter;
        const isNextPositionInaccessible = Configuration.actorsInaccessibleTileCharacterList.includes(nextPositionElementCharacter);

        if (isNextPositionInaccessible) {
            super.ghost.nextPosition = super.ghost.currentPosition;
            super.ghost.randomizeMovementDirection();
        }
    }


    handleSpawnCollision() {
        // ignore spawn position
    }


    #handleLevelBorderCollision(nextPosition) {     
        const hasNotMoved = nextPosition.id === super.ghost.currentPosition.id;
        // (when an actor moves out of the level its position is reset to current position)

        if (hasNotMoved) {
            super.ghost.randomizeMovementDirection();
        }
    }
 
 
    #chooseRandomAccessibleNextBoardPosition() {
        const currentPosition = super.ghost.currentPosition;
        const possibleNextPositonList = super.ghost.getAccessibleNeighborList(currentPosition.x, currentPosition.y);
        const isPossibleNextPositionListEmpty = possibleNextPositonList.length === 0;

        if (isPossibleNextPositionListEmpty) {
            super.ghost.nextPosition = super.ghost.currentPosition;
        } else {
            const chosenNextPositionIndex = Utility.getRandomIntegerBetweenInclusive(0, possibleNextPositonList.length - 1);
            const chosenNextPosition = possibleNextPositonList[chosenNextPositionIndex];
            super.ghost.nextPosition = chosenNextPosition;
        }
    }


    #calculateNextPosition() {
        return super.ghost.calculateNextPositionByCurrentDirection();
    }


}