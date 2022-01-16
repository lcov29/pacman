"use strict";


class GhostStateChase extends GhostState {


    constructor(duration_in_turns, ghost) {
        super(Configuration.ghost_state_chase_name,
              duration_in_turns,
              ghost,
              ghost.getBaseStyleClass());
    }


    executeStateMovementPattern() {
        super.getGhost().chase();
    }


    getSubsequentState() {
        return new GhostStateScatter(7, super.getGhost());
    }


    handlePacmanCollisionOnCurrentPosition() {}


    handlePacmanCollisionOnNextPosition() {
        let ghost = super.getGhost();
        if (ghost.isNextBoardPositionEqual(Configuration.pacman_character)) {
            ghost.killPacman(ghost.getNextPosition().getID());
        }
    }


}