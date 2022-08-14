'use strict';

import Configuration from '../Configuration.mjs';


export default class EditorElementMapper {

        
    static mapTileTypeToInternalElement = {
        'wallTile':                     Configuration.wallCharacter,
        'emptyTile':                    Configuration.emptyTileCharacter,
        'pointTile':                    Configuration.pointCharacter,
        'powerupTile':                  Configuration.powerUpCharacter,
        'ghostDoorHorizontalTile':      Configuration.ghostDoorHorizontalCharacter,
        'ghostDoorVerticalTile':        Configuration.ghostDoorVerticalCharacter,
        'ghostDoorCrossingTile':        Configuration.ghostDoorDiagonalCharacter,
        'teleporter1Tile':              Configuration.teleporter1Character,
        'teleporter2Tile':              Configuration.teleporter2Character,
        'teleporter3Tile':              Configuration.teleporter3Character,
        'bonusSpawnTile':               Configuration.emptyTileCharacter,
        'pacmanTile':                   Configuration.pacmanCharacter,
        'ghostBlinkyTile':              Configuration.ghostBlinkyCharacter,
        'ghostPinkyTile':               Configuration.ghostPinkyCharacter,
        'ghostInkyTile':                Configuration.ghostInkyCharacter,
        'ghostClydeTile':               Configuration.ghostClydeCharacter
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


    static buttonIdToGhostCharacterMap = null;


    static initializeMaps() {
        this.buttonIdToGhostCharacterMap = new Map();
        this.buttonIdToGhostCharacterMap.set('select_scatter_position_ghost_blinky', Configuration.ghostBlinkyCharacter);
        this.buttonIdToGhostCharacterMap.set('select_scatter_position_ghost_pinky', Configuration.ghostPinkyCharacter);
        this.buttonIdToGhostCharacterMap.set('select_scatter_position_ghost_inky', Configuration.ghostInkyCharacter);
        this.buttonIdToGhostCharacterMap.set('select_scatter_position_ghost_clyde', Configuration.ghostClydeCharacter);
        this.buttonIdToGhostCharacterMap.set('select_spawn_position_ghost_blinky', Configuration.ghostBlinkyCharacter);
        this.buttonIdToGhostCharacterMap.set('select_spawn_position_ghost_pinky', Configuration.ghostPinkyCharacter);
        this.buttonIdToGhostCharacterMap.set('select_spawn_position_ghost_inky', Configuration.ghostInkyCharacter);
        this.buttonIdToGhostCharacterMap.set('select_spawn_position_ghost_clyde', Configuration.ghostClydeCharacter);
    }


    static mapInternalElementToScatterSpawnControlIds = {
        [Configuration.ghostBlinkyCharacter]: ['scatter_control_ghost_blinky', 'spawn_control_ghost_blinky'],
        [Configuration.ghostPinkyCharacter]:  ['scatter_control_ghost_pinky', 'spawn_control_ghost_pinky'],
        [Configuration.ghostClydeCharacter]:  ['scatter_control_ghost_clyde', 'spawn_control_ghost_clyde'],
        [Configuration.ghostInkyCharacter]:   ['scatter_control_ghost_inky', 'spawn_control_ghost_inky']
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
        [Configuration.ghostBlinkyCharacter]:     Configuration.editorGhostBlinkyHighlightColorHex,
        [Configuration.ghostPinkyCharacter]:      Configuration.editorGhostPinkyHighlightColorHex,
        [Configuration.ghostClydeCharacter]:      Configuration.editorGhostClydeHighlightColorHex,
        [Configuration.ghostInkyCharacter]:       Configuration.editorGhostInkyHighlightColorHex
    }


}