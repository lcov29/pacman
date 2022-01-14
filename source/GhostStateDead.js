"use strict";


class GhostStateDead extends GhostState {

    
    constructor(ghost) {
        super(Configuration.ghost_state_dead_name,
              Infinity,
              ghost,
              Configuration.ghost_dead_foreground_css_class);
    }


    executeStateMovementPattern() {
        let ghost = super.getGhost();
        let current_position_id = ghost.getCurrentPosition().getID();
        let spawn_position_id = ghost.getSpawnID();
        let next_position = ghost.calculateNextRoutingPosition(current_position_id, spawn_position_id);
        return ghost.moveToPosition(next_position.getX(), next_position.getY());
    }


    getSubsequentState() {
        return new GhostStateScatter(7, this.getGhost());
    }


}