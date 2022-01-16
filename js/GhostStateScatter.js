"use strict";

export default class GhostStateScatter extends GhostState {


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
        let next_position = ghost.calculateNextPositionOnShortestPath(current_position_id, scatter_position_id);
        ghost.moveToPosition(next_position.getX(), next_position.getY());
    }


    getSubsequentState() {
        return new GhostStateChase(20, super.getGhost());
    }


    handlePacmanCollisionOnCurrentPosition() {}


    handlePacmanCollisionOnNextPosition() {
        let ghost = super.getGhost();
        if (ghost.isNextBoardPositionEqual(Configuration.pacman_character)) {
            ghost.killPacman(ghost.getNextPosition().getID());
        }
    }


}