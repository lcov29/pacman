"use strict";

class GhostStateFlee extends GhostState {


    constructor(duration_in_turns, ghost) {
        super(Configuration.ghost_state_flee_name,
              duration_in_turns,
              ghost,
              Configuration.ghost_scared_foreground_css_class);
        super.getGhost().reverseMovementDirection();
    }


    executeStateMovementPattern() {
        let ghost = super.getGhost();
        let next_position = ghost.calculateNextPositionByDirection();
        return ghost.moveToPosition(next_position.getX(), next_position.getY());
    }


    getSubsequentState() {
        return new GhostStateChase(20, this.getGhost());
    }


}