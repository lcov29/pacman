"use strict";

class GhostStateScatter extends GhostState {


    constructor(duration_in_turns, ghost_reference,) {
        super("Scatter", duration_in_turns, ghost_reference, "");
    }


    move() {
        let result = false;
        if (super.getRemainingTurns() > 0) {
            result = this.scatter();
            super.decrementRemainingTurns();
        } else {
            let subsequent_state = new GhostStateChase(20, super.getGhost());
            super.getGhost().setState(subsequent_state);
        }
        return result;
    }


    scatter() {
        let ghost = super.getGhost();
        let current_position_id = ghost.getCurrentPosition().getID();
        let scatter_position_id = ghost.getScatterID();
        let next_position = ghost.calculateNextRoutingPosition(current_position_id, scatter_position_id);
        return ghost.moveToPosition(next_position.getX(), next_position.getY());
     }


}