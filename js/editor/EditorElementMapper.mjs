"use strict";

import Configuration from "../Configuration.mjs";


export default class EditorElementMapper {

        
    static mapTileTypeToInternalElement = {
        'wall_tile':                    Configuration.WALL_CHARACTER,
        'empty_tile':                   Configuration.EMPTY_TILE_CHARACTER,
        'point_tile':                   Configuration.POINT_CHARACTER,
        'powerup_tile':                 Configuration.POWERUP_CHARACTER,
        'ghost_door_horizontal_tile':   Configuration.GHOST_DOOR_HORIZONTAL_CHARACTER,
        'ghost_door_vertical_tile':     Configuration.GHOST_DOOR_VERTICAL_CHARACTER,
        'ghost_door_crossing_tile':     Configuration.GHOST_DOOR_CROSSING_CHARACTER,
        'teleporter_1_tile':            Configuration.TELEPORTER_1_CHARACTER,
        'teleporter_2_tile':            Configuration.TELEPORTER_2_CHARACTER,
        'teleporter_3_tile':            Configuration.TELEPORTER_3_CHARACTER,
        'pacman_tile':                  Configuration.PACMAN_CHARACTER,
        'ghost_blinky_tile':            Configuration.GHOST_BLINKY_CHARACTER,
        'ghost_pinky_tile':             Configuration.GHOST_PINKY_CHARACTER,
        'ghost_inky_tile':              Configuration.GHOST_INKY_CHARACTER,
        'ghost_clyde_tile':             Configuration.GHOST_CLYDE_CHARACTER
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


}