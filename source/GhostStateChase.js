"use strict";


class GhostStateChase extends GhostState {


    constructor(duration_in_turns, ghost_reference,) {
        super("Chase", duration_in_turns, ghost_reference, "");
    }


    move() {
        let result = false;
        if (super.getRemainingTurns() > 0) {
            result = super.getGhost().chase();
            super.decrementRemainingTurns();
        } else {
            let subsequent_state = new GhostStateScatter(7, super.getGhost());
            super.getGhost().setState(subsequent_state);
        }
        return result;
    }


}