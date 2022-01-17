"use strict";

import Configuration from "./Configuration.js";
import GhostState from "./GhostState.js";
import GhostStateScatter from "./GhostStateScatter.js";


export default class GhostStateChase extends GhostState {


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