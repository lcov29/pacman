"use strict";

import Ghost from "./Ghost.mjs";
import Configuration from "../Configuration.mjs";


export default class GhostPinky extends Ghost {


    constructor(level, position, routing) {
        super(level, position, routing);
        super.setCharacter(Configuration.GHOST_PINKY_CHARACTER);
        super.setBaseMovementStyleClass(Configuration.GHOST_PINKY_MOVEMENT_FOREGROUND_CSS_CLASS);
        super.setBaseRespawnStyleClass(Configuration.GHOST_PINKY_RESPAWN_FOREGROUNG_CSS_CLASS);
        super.setInitialState();
    }


    // chase movement pattern implementation; is used by GhostStateChase
    calculateNextChasePosition(positionId) {
        let targetTileId = this.calculateChaseTargetTileId();
        return super.getRouting().calculateNextPositionOnShortestPath(positionId, targetTileId);
    }


    calculateChaseTargetTileId() {
        let pacmanPositionId = super.selectClosestPacmanID();
        let pacmanPosition = this.level.getPacmanPositionFor(pacmanPositionId);
        let pacmanMovementDirection = this.level.getPacmanMovementDirectionFor(pacmanPositionId);
        let currentTargetTileId = pacmanPositionId;
        let x = pacmanPosition.getX();
        let y =  pacmanPosition.getY();

        for (let i = 0; i < Configuration.GHOST_PINKY_MAX_TILE_OFFSET_TO_PACMAN_DIRECTION_POSITION; i++) {
            x += pacmanMovementDirection.x;
            y += pacmanMovementDirection.y;
            let calculatedPosition = this.level.getBoardPositionAt(x, y);
            if (calculatedPosition === null) {
                break;  // calculated position is outside of the board
            } else {
                if (this.isPositionAccessible(calculatedPosition)) {
                    currentTargetTileId = calculatedPosition.getID();
                }
            }
        }

        return currentTargetTileId;
    }


    isPositionAccessible(position) {
        return (Configuration.ACTORS_INACCESSIBLE_TILES.includes(position.getElementCharacter()) === false);
    }

    
}