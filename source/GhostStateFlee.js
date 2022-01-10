"use strict";

class GhostStateFlee extends GhostState {


    constructor(duration_in_turns, ghost_reference,) {
        super("Flee", duration_in_turns, ghost_reference, "");
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