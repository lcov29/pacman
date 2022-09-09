import Configuration from '../global/Configuration.mjs';


export default class EditorElementMapper {


    static tileTypeToInternalElementMap = null;
    static internalElementToTileTypeMap = null;
    static buttonIdToInputIdMap = null;
    static buttonIdToGhostCharacterMap = null;
    static internalElementToScatterSpawnControlIdMap = null;
    static internalElementToScatterInputIdMap = null;
    static internalElementToSpawnInputIdMap = null;
    static scatterSpawnControlIdToInputIdMap = null;
    static ghostCharacterToCSSHighlightClassMap = null;


    static initialize() {
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


        EditorElementMapper.internalElementToTileTypeMap = new Map();
        EditorElementMapper.internalElementToTileTypeMap.set(Configuration.wallCharacter, 'wallTile');
        EditorElementMapper.internalElementToTileTypeMap.set(Configuration.emptyTileCharacter, 'emptyTile');
        EditorElementMapper.internalElementToTileTypeMap.set(Configuration.pointCharacter, 'pointTile');
        EditorElementMapper.internalElementToTileTypeMap.set(Configuration.powerUpCharacter, 'powerupTile');
        EditorElementMapper.internalElementToTileTypeMap.set(Configuration.ghostDoorHorizontalCharacter, 'ghostDoorHorizontalTile');
        EditorElementMapper.internalElementToTileTypeMap.set(Configuration.ghostDoorVerticalCharacter, 'ghostDoorVerticalTile');
        EditorElementMapper.internalElementToTileTypeMap.set(Configuration.ghostDoorDiagonalCharacter, 'ghostDoorCrossingTile');
        EditorElementMapper.internalElementToTileTypeMap.set(Configuration.teleporter1Character, 'teleporter1Tile');
        EditorElementMapper.internalElementToTileTypeMap.set(Configuration.teleporter2Character, 'teleporter2Tile');
        EditorElementMapper.internalElementToTileTypeMap.set(Configuration.teleporter3Character, 'teleporter3Tile');
        EditorElementMapper.internalElementToTileTypeMap.set(Configuration.bonusStrawberryCharacter, 'bonusSpawnTile');
        EditorElementMapper.internalElementToTileTypeMap.set(Configuration.pacmanCharacter, 'pacmanTile');
        EditorElementMapper.internalElementToTileTypeMap.set(Configuration.ghostBlinkyCharacter, 'ghostBlinkyTile');
        EditorElementMapper.internalElementToTileTypeMap.set(Configuration.ghostPinkyCharacter, 'ghostPinkyTile');
        EditorElementMapper.internalElementToTileTypeMap.set(Configuration.ghostInkyCharacter, 'ghostInkyTile');
        EditorElementMapper.internalElementToTileTypeMap.set(Configuration.ghostClydeCharacter, 'ghostClydeTile');


        EditorElementMapper.buttonIdToInputIdMap = new Map();
        EditorElementMapper.buttonIdToInputIdMap.set('selectScatterPositionGhostBlinky', 'scatterPositionGhostBlinky');
        EditorElementMapper.buttonIdToInputIdMap.set('selectScatterPositionGhostPinky', 'scatterPositionGhostPinky');
        EditorElementMapper.buttonIdToInputIdMap.set('selectScatterPositionGhostInky', 'scatterPositionGhostInky');
        EditorElementMapper.buttonIdToInputIdMap.set('selectScatterPositionGhostClyde', 'scatterPositionGhostClyde');
        EditorElementMapper.buttonIdToInputIdMap.set('selectSpawnPositionGhostBlinky', 'spawnPositionGhostBlinky');
        EditorElementMapper.buttonIdToInputIdMap.set('selectSpawnPositionGhostPinky', 'spawnPositionGhostPinky');
        EditorElementMapper.buttonIdToInputIdMap.set('selectSpawnPositionGhostInky', 'spawnPositionGhostInky');
        EditorElementMapper.buttonIdToInputIdMap.set('selectSpawnPositionGhostClyde', 'spawnPositionGhostClyde');


        EditorElementMapper.buttonIdToGhostCharacterMap = new Map();
        EditorElementMapper.buttonIdToGhostCharacterMap.set('selectScatterPositionGhostBlinky', Configuration.ghostBlinkyCharacter);
        EditorElementMapper.buttonIdToGhostCharacterMap.set('selectScatterPositionGhostPinky', Configuration.ghostPinkyCharacter);
        EditorElementMapper.buttonIdToGhostCharacterMap.set('selectScatterPositionGhostInky', Configuration.ghostInkyCharacter);
        EditorElementMapper.buttonIdToGhostCharacterMap.set('selectScatterPositionGhostClyde', Configuration.ghostClydeCharacter);
        EditorElementMapper.buttonIdToGhostCharacterMap.set('selectSpawnPositionGhostBlinky', Configuration.ghostBlinkyCharacter);
        EditorElementMapper.buttonIdToGhostCharacterMap.set('selectSpawnPositionGhostPinky', Configuration.ghostPinkyCharacter);
        EditorElementMapper.buttonIdToGhostCharacterMap.set('selectSpawnPositionGhostInky', Configuration.ghostInkyCharacter);
        EditorElementMapper.buttonIdToGhostCharacterMap.set('selectSpawnPositionGhostClyde', Configuration.ghostClydeCharacter);


        EditorElementMapper.internalElementToScatterSpawnControlIdMap = new Map();
        EditorElementMapper.internalElementToScatterSpawnControlIdMap.set(Configuration.ghostBlinkyCharacter, ['scatterControlGhostBlinky', 'spawnControlGhostBlinky']);
        EditorElementMapper.internalElementToScatterSpawnControlIdMap.set(Configuration.ghostPinkyCharacter, ['scatterControlGhostPinky', 'spawnControlGhostPinky']);
        EditorElementMapper.internalElementToScatterSpawnControlIdMap.set(Configuration.ghostClydeCharacter, ['scatterControlGhostClyde', 'spawnControlGhostClyde']);
        EditorElementMapper.internalElementToScatterSpawnControlIdMap.set(Configuration.ghostInkyCharacter, ['scatterControlGhostInky', 'spawnControlGhostInky']);


        EditorElementMapper.internalElementToScatterInputIdMap = new Map();
        EditorElementMapper.internalElementToScatterInputIdMap.set(Configuration.ghostBlinkyCharacter, 'scatterPositionGhostBlinky');
        EditorElementMapper.internalElementToScatterInputIdMap.set(Configuration.ghostPinkyCharacter, 'scatterPositionGhostPinky');
        EditorElementMapper.internalElementToScatterInputIdMap.set(Configuration.ghostInkyCharacter, 'scatterPositionGhostInky');
        EditorElementMapper.internalElementToScatterInputIdMap.set(Configuration.ghostClydeCharacter, 'scatterPositionGhostClyde');


        EditorElementMapper.internalElementToSpawnInputIdMap = new Map();
        EditorElementMapper.internalElementToSpawnInputIdMap.set(Configuration.ghostBlinkyCharacter, 'spawnPositionGhostBlinky');
        EditorElementMapper.internalElementToSpawnInputIdMap.set(Configuration.ghostPinkyCharacter, 'spawnPositionGhostPinky');
        EditorElementMapper.internalElementToSpawnInputIdMap.set(Configuration.ghostInkyCharacter, 'spawnPositionGhostInky');
        EditorElementMapper.internalElementToSpawnInputIdMap.set(Configuration.ghostClydeCharacter, 'spawnPositionGhostClyde');


        EditorElementMapper.scatterSpawnControlIdToInputIdMap = new Map();
        EditorElementMapper.scatterSpawnControlIdToInputIdMap.set('scatterControlGhostBlinky', 'scatterPositionGhostBlinky');
        EditorElementMapper.scatterSpawnControlIdToInputIdMap.set('scatterControlGhostPinky', 'scatterPositionGhostPinky');
        EditorElementMapper.scatterSpawnControlIdToInputIdMap.set('scatterControlGhostClyde', 'scatterPositionGhostClyde');
        EditorElementMapper.scatterSpawnControlIdToInputIdMap.set('scatterControlGhostInky', 'scatterPositionGhostInky');
        EditorElementMapper.scatterSpawnControlIdToInputIdMap.set('spawnControlGhostBlinky', 'spawnPositionGhostBlinky');
        EditorElementMapper.scatterSpawnControlIdToInputIdMap.set('spawnControlGhostPinky', 'spawnPositionGhostPinky');
        EditorElementMapper.scatterSpawnControlIdToInputIdMap.set('spawnControlGhostClyde', 'spawnPositionGhostClyde');
        EditorElementMapper.scatterSpawnControlIdToInputIdMap.set('spawnControlGhostInky', 'spawnPositionGhostInky');


        EditorElementMapper.ghostCharacterToCSSHighlightClassMap = new Map();
        EditorElementMapper.ghostCharacterToCSSHighlightClassMap.set(Configuration.ghostBlinkyCharacter, 'ghostBlinkyHighlight');
        EditorElementMapper.ghostCharacterToCSSHighlightClassMap.set(Configuration.ghostPinkyCharacter, 'ghostPinkyHighlight');
        EditorElementMapper.ghostCharacterToCSSHighlightClassMap.set(Configuration.ghostInkyCharacter, 'ghostInkyHighlight');
        EditorElementMapper.ghostCharacterToCSSHighlightClassMap.set(Configuration.ghostClydeCharacter, 'ghostClydeHighlight');
    }


}