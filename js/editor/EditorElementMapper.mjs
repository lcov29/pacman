'use strict';

import Configuration from '../Configuration.mjs';


export default class EditorElementMapper {


    static tileTypeToInternalElementMap = null;
    static buttonIdToInputIdMap = null;
    static buttonIdToGhostCharacterMap = null;
    static internalElementToScatterSpawnControlIdMap = null;


    static initializeMaps() {

        EditorElementMapper.tileTypeToInternalElementMap = new Map();
        EditorElementMapper.tileTypeToInternalElementMap.set('wallTile', Configuration.wallCharacter);
        EditorElementMapper.tileTypeToInternalElementMap.set('emptyTile', Configuration.emptyTileCharacter);
        EditorElementMapper.tileTypeToInternalElementMap.set('pointTile', Configuration.pointCharacter);
        EditorElementMapper.tileTypeToInternalElementMap.set('powerupTile', Configuration.powerUpCharacter);
        EditorElementMapper.tileTypeToInternalElementMap.set('ghostDoorHorizontalTile', Configuration.ghostDoorHorizontalCharacter);
        EditorElementMapper.tileTypeToInternalElementMap.set('ghostDoorVerticalTile', Configuration.ghostDoorVerticalCharacter);
        EditorElementMapper.tileTypeToInternalElementMap.set('ghostDoorCrossingTile', Configuration.ghostDoorDiagonalCharacter);
        EditorElementMapper.tileTypeToInternalElementMap.set('teleporter1Tile', Configuration.teleporter1Character);
        EditorElementMapper.tileTypeToInternalElementMap.set('teleporter2Tile', Configuration.teleporter2Character);
        EditorElementMapper.tileTypeToInternalElementMap.set('teleporter3Tile', Configuration.teleporter3Character);
        EditorElementMapper.tileTypeToInternalElementMap.set('bonusSpawnTile', Configuration.emptyTileCharacter);
        EditorElementMapper.tileTypeToInternalElementMap.set('pacmanTile', Configuration.pacmanCharacter);
        EditorElementMapper.tileTypeToInternalElementMap.set('ghostBlinkyTile', Configuration.ghostBlinkyCharacter);
        EditorElementMapper.tileTypeToInternalElementMap.set('ghostPinkyTile', Configuration.ghostPinkyCharacter);
        EditorElementMapper.tileTypeToInternalElementMap.set('ghostInkyTile', Configuration.ghostInkyCharacter);
        EditorElementMapper.tileTypeToInternalElementMap.set('ghostClydeTile', Configuration.ghostClydeCharacter);


        EditorElementMapper.buttonIdToInputIdMap = new Map();
        EditorElementMapper.buttonIdToInputIdMap.set('select_scatter_position_ghost_blinky', 'scatter_position_ghost_blinky');
        EditorElementMapper.buttonIdToInputIdMap.set('select_scatter_position_ghost_pinky', 'scatter_position_ghost_pinky');
        EditorElementMapper.buttonIdToInputIdMap.set('select_scatter_position_ghost_inky', 'scatter_position_ghost_inky');
        EditorElementMapper.buttonIdToInputIdMap.set('select_scatter_position_ghost_clyde', 'scatter_position_ghost_clyde');
        EditorElementMapper.buttonIdToInputIdMap.set('select_spawn_position_ghost_blinky', 'spawn_position_ghost_blinky');
        EditorElementMapper.buttonIdToInputIdMap.set('select_spawn_position_ghost_pinky', 'spawn_position_ghost_pinky');
        EditorElementMapper.buttonIdToInputIdMap.set('select_spawn_position_ghost_inky', 'spawn_position_ghost_inky');
        EditorElementMapper.buttonIdToInputIdMap.set('select_spawn_position_ghost_clyde', 'spawn_position_ghost_clyde');


        EditorElementMapper.buttonIdToGhostCharacterMap = new Map();
        EditorElementMapper.buttonIdToGhostCharacterMap.set('select_scatter_position_ghost_blinky', Configuration.ghostBlinkyCharacter);
        EditorElementMapper.buttonIdToGhostCharacterMap.set('select_scatter_position_ghost_pinky', Configuration.ghostPinkyCharacter);
        EditorElementMapper.buttonIdToGhostCharacterMap.set('select_scatter_position_ghost_inky', Configuration.ghostInkyCharacter);
        EditorElementMapper.buttonIdToGhostCharacterMap.set('select_scatter_position_ghost_clyde', Configuration.ghostClydeCharacter);
        EditorElementMapper.buttonIdToGhostCharacterMap.set('select_spawn_position_ghost_blinky', Configuration.ghostBlinkyCharacter);
        EditorElementMapper.buttonIdToGhostCharacterMap.set('select_spawn_position_ghost_pinky', Configuration.ghostPinkyCharacter);
        EditorElementMapper.buttonIdToGhostCharacterMap.set('select_spawn_position_ghost_inky', Configuration.ghostInkyCharacter);
        EditorElementMapper.buttonIdToGhostCharacterMap.set('select_spawn_position_ghost_clyde', Configuration.ghostClydeCharacter);


        EditorElementMapper.internalElementToScatterSpawnControlIdMap = new Map();
        EditorElementMapper.internalElementToScatterSpawnControlIdMap.set(Configuration.ghostBlinkyCharacter, ['scatter_control_ghost_blinky', 'spawn_control_ghost_blinky']);
        EditorElementMapper.internalElementToScatterSpawnControlIdMap.set(Configuration.ghostPinkyCharacter, ['scatter_control_ghost_pinky', 'spawn_control_ghost_pinky']);
        EditorElementMapper.internalElementToScatterSpawnControlIdMap.set(Configuration.ghostClydeCharacter, ['scatter_control_ghost_clyde', 'spawn_control_ghost_clyde']);
        EditorElementMapper.internalElementToScatterSpawnControlIdMap.set(Configuration.ghostInkyCharacter, ['scatter_control_ghost_inky', 'spawn_control_ghost_inky']);

    }


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