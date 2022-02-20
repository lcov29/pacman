"use strict";

import Configuration from "../Configuration.mjs";


export default class EditorElementMapper {

        
    static mapTileTypeToInternalElement = {
        'wallTile':                     Configuration.WALL_CHARACTER,
        'emptyTile':                    Configuration.EMPTY_TILE_CHARACTER,
        'pointTile':                    Configuration.POINT_CHARACTER,
        'powerupTile':                  Configuration.POWERUP_CHARACTER,
        'ghostDoorHorizontalTile':      Configuration.GHOST_DOOR_HORIZONTAL_CHARACTER,
        'ghostDoorVerticalTile':        Configuration.GHOST_DOOR_VERTICAL_CHARACTER,
        'ghostDoorCrossingTile':        Configuration.GHOST_DOOR_CROSSING_CHARACTER,
        'teleporter1Tile':              Configuration.TELEPORTER_1_CHARACTER,
        'teleporter2Tile':              Configuration.TELEPORTER_2_CHARACTER,
        'teleporter3Tile':              Configuration.TELEPORTER_3_CHARACTER,
        'bonusSpawnTile':               Configuration.EMPTY_TILE_CHARACTER,
        'pacmanTileRight':              Configuration.PACMAN_CHARACTER,
        'ghostBlinkyMovementTileDown':  Configuration.GHOST_BLINKY_CHARACTER,
        'ghostPinkyMovementTileDown':   Configuration.GHOST_PINKY_CHARACTER,
        'ghostInkyMovementTileDown':    Configuration.GHOST_INKY_CHARACTER,
        'ghostClydeMovementTileDown':   Configuration.GHOST_CLYDE_CHARACTER
    };


    static mapButtonIdToInputId = {
        'select_scatter_position_ghost_blinky':     'scatter_position_ghost_blinky',
        'select_scatter_position_ghost_pinky':      'scatter_position_ghost_pinky',
        'select_scatter_position_ghost_inky':       'scatter_position_ghost_inky',
        'select_scatter_position_ghost_clyde':      'scatter_position_ghost_clyde',
        'select_spawn_position_ghost_blinky':       'spawn_position_ghost_blinky',
        'select_spawn_position_ghost_pinky':        'spawn_position_ghost_pinky',
        'select_spawn_position_ghost_inky':         'spawn_position_ghost_inky',
        'select_spawn_position_ghost_clyde':        'spawn_position_ghost_clyde'
    };


    static mapButtonIdToGhostCharacter = {
        'select_scatter_position_ghost_blinky':     Configuration.GHOST_BLINKY_CHARACTER,
        'select_scatter_position_ghost_pinky':      Configuration.GHOST_PINKY_CHARACTER,
        'select_scatter_position_ghost_inky':       Configuration.GHOST_INKY_CHARACTER,
        'select_scatter_position_ghost_clyde':      Configuration.GHOST_CLYDE_CHARACTER,
        'select_spawn_position_ghost_blinky':       Configuration.GHOST_BLINKY_CHARACTER,
        'select_spawn_position_ghost_pinky':        Configuration.GHOST_PINKY_CHARACTER,
        'select_spawn_position_ghost_inky':         Configuration.GHOST_INKY_CHARACTER,
        'select_spawn_position_ghost_clyde':        Configuration.GHOST_CLYDE_CHARACTER
    }


    static mapInternalElementToScatterSpawnControlIds = {
        [Configuration.GHOST_BLINKY_CHARACTER]: ["scatter_control_ghost_blinky", "spawn_control_ghost_blinky"],
        [Configuration.GHOST_PINKY_CHARACTER]:  ["scatter_control_ghost_pinky", "spawn_control_ghost_pinky"],
        [Configuration.GHOST_CLYDE_CHARACTER]:  ["scatter_control_ghost_clyde", "spawn_control_ghost_clyde"],
        [Configuration.GHOST_INKY_CHARACTER]:   ["scatter_control_ghost_inky", "spawn_control_ghost_inky"]
    };


    static mapScatterSpawnControlIdsToInputIds = {
        'scatter_control_ghost_blinky':     'scatter_position_ghost_blinky',
        'scatter_control_ghost_pinky':      'scatter_position_ghost_pinky',
        'scatter_control_ghost_clyde':      'scatter_position_ghost_clyde',
        'scatter_control_ghost_inky':       'scatter_position_ghost_inky',
        'spawn_control_ghost_blinky':       'spawn_position_ghost_blinky',
        'spawn_control_ghost_pinky':        'spawn_position_ghost_pinky',
        'spawn_control_ghost_clyde':        'spawn_position_ghost_clyde',
        'spawn_control_ghost_inky':         'spawn_position_ghost_inky'
    }


    static mapGhostCharacterToHighlightColor = {
        [Configuration.GHOST_BLINKY_CHARACTER]:     Configuration.EDITOR_GHOST_BLINKY_HIGHLIGHT_COLOR_HEX,
        [Configuration.GHOST_PINKY_CHARACTER]:      Configuration.EDITOR_GHOST_PINKY_HIGHLIGHT_COLOR_HEX,
        [Configuration.GHOST_CLYDE_CHARACTER]:      Configuration.EDITOR_GHOST_CLYDE_HIGHLIGHT_COLOR_HEX,
        [Configuration.GHOST_INKY_CHARACTER]:       Configuration.EDITOR_GHOST_INKY_HIGHLIGHT_COLOR_HEX
    }


}