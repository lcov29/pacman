"use strict";

class GhostStateScatter extends GhostState {


    constructor(duration_in_turns, ghost) {
        super(Configuration.ghost_state_scatter_name,
              duration_in_turns,
              ghost,
              ghost.getBaseStyleClass());
    }


     executeStateMovementPattern() {
        let ghost = super.getGhost();
        let current_position_id = ghost.getCurrentPosition().getID();
        let scatter_position_id = ghost.getScatterID();
        let next_position = ghost.calculateNextRoutingPosition(current_position_id, scatter_position_id);
        return ghost.moveToPosition(next_position.getX(), next_position.getY());
     }


     getSubsequentState() {
         return new GhostStateChase(20, this.getGhost());
     }


}