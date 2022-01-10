"use strict";

class GhostStateFlee extends GhostState {


    constructor(duration_in_turns, ghost) {
        super(Configuration.ghost_state_flee_name,
              duration_in_turns,
              ghost,
              Configuration.ghost_scared_foreground_css_class);
        super.getGhost().reverseMovementDirection();
    }


    move() {
        let result = false;
        if (super.getRemainingTurns() > 0) {
            result = this.flee();
            super.decrementRemainingTurns();
        } else {
            let subsequent_state = new GhostStateChase(20, super.getGhost());
            super.getGhost().setState(subsequent_state);
        }
        return result;
    }


    flee() {
        let ghost = super.getGhost();
        let next_position = ghost.calculateNextPositionByDirection();
        return ghost.moveToPosition(next_position.getX(), next_position.getY());
    }


}