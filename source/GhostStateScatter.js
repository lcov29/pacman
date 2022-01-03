"use strict";

class GhostStateScatter extends GhostState {


    constructor(duration_in_turns, ghost_reference,) {
        super("Scatter", duration_in_turns, ghost_reference, "");
    }


    move() {
        let result = false;
        if (super.getRemainingTurns() > 0) {
            result = super.getGhost().scatter();
            super.decrementRemainingTurns();
        } else {
            let subsequent_state = new GhostStateChase(20, super.getGhost());
            super.getGhost().setState(subsequent_state);
        }
        return result;
    }


}