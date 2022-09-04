export default class Configuration {
 

   // Game settings
      static initialPacmanLifes = 1;
      static namePacmanLifeCounterSprite = 'pacmanSpriteLeft';

      static scoreValuePerPoint = 10;
      static scoreValuePerPowerUp = 50;
      static scoreValuePerEatenGhost = 200;
      static scoreValuePerBonusCherry = 100;
      static scoreValuePerBonusStrawberry = 300;
      static scoreValuePerBonusPeach = 500;
      static scoreValuePerBonusApple = 700;
      static scoreValuePerBonusGrape = 1_000;
      static scoreValuePerBonusGalaxian = 2_000;
      static scoreValuePerBonusBell = 3_000;
      static scoreValuePerBonusKey = 5_000;

      static numberOfConsumedPointsForSpawningFirstBonusElement = 70;
      static numberOfConsumedPointsForSpawningSecondBonusElement = 170;

      static initialPacmanSpriteDirection = 'Right';
      static initialGhostSpriteDirection = 'Down';

      static jsonDefaultLevel = '{"rotation": [' + 

                                    '{"board":[["#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"],' + 
                                              '["#","o","o","o","o","o","o","o","o","o","o","o","o","#","o","o","o","o","o","o","o","o","o","o","o","o","#"],' +
                                              '["#","o","#","#","#","#","o","#","#","#","#","#","o","#","o","#","#","#","#","#","o","#","#","#","#","o","#"],' +
                                              '["#","O","#","#","#","#","o","#","#","#","#","#","o","#","o","#","#","#","#","#","o","#","#","#","#","O","#"],' +
                                              '["#","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","#"],' +  
                                              '["#","o","#","#","#","#","o","#","o","#","#","#","#","#","#","#","#","#","o","#","o","#","#","#","#","o","#"],' +
                                              '["#","o","o","o","o","o","o","#","o","o","o","o","o","#","o","o","o","o","o","#","o","o","o","o","o","o","#"],' +
                                              '["#","#","#","#","#","#","o","#","#","#","#","#","o","#","o","#","#","#","#","#","o","#","#","#","#","#","#"],' + 
                                              '["#","#","#","#","#","#","o","#","x","x","x","x","x","b","x","x","x","x","x","#","o","#","#","#","#","#","#"],' +
                                              '["#","#","#","#","#","#","o","#","x","#","#","#","#","-","#","#","#","#","x","#","o","#","#","#","#","#","#"],' +
                                              '["1","x","x","x","x","x","o","x","x","#","i","x","x","x","x","y","c","#","x","x","o","x","x","x","x","x","1"],' +  
                                              '["#","#","#","#","#","#","o","#","x","#","#","#","#","#","#","#","#","#","x","#","o","#","#","#","#","#","#"],' +
                                              '["#","#","#","#","#","#","o","#","x","x","x","x","x","x","x","x","x","x","x","#","o","#","#","#","#","#","#"],' +
                                              '["#","#","#","#","#","#","o","#","x","#","#","#","#","#","#","#","#","#","x","#","o","#","#","#","#","#","#"],' +  
                                              '["#","o","o","o","o","o","o","o","o","o","o","o","o","#","o","o","o","o","o","o","o","o","o","o","o","o","#"],' +
                                              '["#","o","#","#","#","#","o","#","#","#","#","#","o","#","o","#","#","#","#","#","o","#","#","#","#","o","#"],' +
                                              '["#","O","o","o","o","#","o","o","o","o","o","o","o","p","o","o","o","o","o","o","o","#","o","o","o","O","#"],' +   
                                              '["#","#","#","#","o","#","o","#","o","#","#","#","#","#","#","#","#","#","o","#","o","#","o","#","#","#","#"],' +
                                              '["#","o","o","o","o","o","o","#","o","o","o","o","o","#","o","o","o","o","o","#","o","o","o","o","o","o","#"],' +  
                                              '["#","o","#","#","#","#","#","#","#","#","#","#","o","#","o","#","#","#","#","#","#","#","#","#","#","o","#"],' +
                                              '["#","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","#"],' +
                                              '["#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"]],'+
                                          
                                     '"scatterPositionList":[{"ghost":"b","x":25,"y":1},' +
                                                            '{"ghost":"y","x":1,"y":1},' +
                                                            '{"ghost":"i","x":1,"y":20},' +
                                                            '{"ghost":"c","x":25,"y":20}],' +
                                                                  
                                     '"optionalGhostSpawnList":[{"ghost":"b","x":10,"y":10},' +
                                                               '{"ghost":"y","x":11,"y":10},' +
                                                               '{"ghost":"i","x":15,"y":10},' +
                                                               '{"ghost":"c","x":16,"y":10}],' +

                                     '"bonusSpawnPositionList":[{"x":13,"y":12}],' + 
                                 
                                     '"numberOfIterations":"Infinity"}],' +
                                     
                                  '"initialPacmanLifes":3}';



   // Ghost state settings

      static nameGhostStateDead = 'dead';
      static nameGhostStateChase = 'chase';
      static nameGhostStateScared = 'scared';
      static nameGhostStateScaredEnd = 'scaredEnd';
      static nameGhostStateScatter = 'scatter';
      static nameGhostStateRespawn = 'respawn';

      static initialGhostStateName = Configuration.nameGhostStateScatter;

      static turnDurationGhostStateChase = 20;
      static turnDurationGhostStateScared = 25;
      static turnDurationGhostStateScaredEnd = 5;
      static turnDurationGhostStateScatter = 7;

      static ghostMaxRespawnStage = 4;
      
      static ghostClydeMinTileDistanceToPacman = 8;
      static ghostPinkyMaxTileOffsetToPacmanDirectionPosition = 4;
      static ghostInkyMaxTileOffsetToPacmanDirectionPosition = 2;



   // Definition of level characters

      // Actor characters
      static pacmanCharacter = 'p';
      static ghostInkyCharacter = 'i';
      static ghostPinkyCharacter = 'y';
      static ghostClydeCharacter = 'c';
      static ghostBlinkyCharacter = 'b';


      // Element characters
      static wallCharacter = '#';
      static emptyTileCharacter = 'x';
      static undefinedTileCharacter = '.';

      static teleporter1Character = '1';
      static teleporter2Character = '2';
      static teleporter3Character = '3';

      static ghostDoorHorizontalCharacter = '-';
      static ghostDoorVerticalCharacter = '|';
      static ghostDoorDiagonalCharacter = '+';

      static pointCharacter = 'o';
      static powerUpCharacter = 'O';
      static bonusCherryCharacter = 'C';
      static bonusStrawberryCharacter = 'S';
      static bonusPeachCharacter = 'P';
      static bonusAppleCharacter = 'A';
      static bonusGrapeCharacter = 'g';
      static bonusGalaxianCharacter = 'G';
      static bonusBellCharacter = 'B';
      static bonusKeyCharacter = 'K';



   // Definition of directions

      // Direction names
      static directionNameUp = 'Up';
      static directionNameLeft = 'Left';
      static directionNameDown = 'Down';
      static directionNameRight = 'Right';
   
   
 
   // Display priority for overlapping sprites
      static pacmanSpriteDisplayPriority = 6;
      static ghostStateChaseSpriteDisplayPriority = 5;
      static ghostStateScatterSpriteDisplayPriority = 4;
      static ghostStateScaredSpriteDisplayPriority = 3;
      static ghostStateRespawnSpriteDisplayPriority = 2;
      static ghostStateDeadSpriteDisplayPriority = 1;



   // Editor Settings
      static fileNameIndex = 'index.html';
      static fileNameEditor = 'editor.html';

      static editorLevelDeletionPromptMessage = 'Delete this level?';

      static editorBoardMinHeight = 4;
      static editorBoardMaxHeight = 30;
      static editorBoardDefaultHeight = 20;

      static editorBoardMinWidth = 4;
      static editorBoardMaxWidth = 30;
      static editorBoardDefaultWidth = 20;

      static editorMinLife = 1;
      static editorMaxLife = 10;
      static editorDefaultLife = 3;

      static editorMinIterationNumber = 1;
      static editorDefaultIterationNumber = 1;
      


   // Definition of element lists 

      static actorCharacterList = [Configuration.pacmanCharacter,
                                   Configuration.ghostBlinkyCharacter,
                                   Configuration.ghostPinkyCharacter,
                                   Configuration.ghostClydeCharacter,
                                   Configuration.ghostInkyCharacter];

      static ghostCharacterList = [Configuration.ghostBlinkyCharacter,
                                   Configuration.ghostPinkyCharacter,
                                   Configuration.ghostClydeCharacter,
                                   Configuration.ghostInkyCharacter];

      static pointCharacterList = [Configuration.pointCharacter, 
                                   Configuration.powerUpCharacter];

      static bonusCharacterList = [Configuration.bonusCherryCharacter,
                                   Configuration.bonusStrawberryCharacter,
                                   Configuration.bonusPeachCharacter,
                                   Configuration.bonusAppleCharacter,
                                   Configuration.bonusGrapeCharacter,
                                   Configuration.bonusGalaxianCharacter,
                                   Configuration.bonusBellCharacter,
                                   Configuration.bonusKeyCharacter];

      static teleporterCharacterList = [Configuration.teleporter1Character,
                                        Configuration.teleporter2Character,
                                        Configuration.teleporter3Character];

      static pacmanInaccessibleTileCharacterList = [Configuration.wallCharacter,
                                                    Configuration.undefinedTileCharacter,
                                                    Configuration.ghostDoorDiagonalCharacter,
                                                    Configuration.ghostDoorVerticalCharacter,
                                                    Configuration.ghostDoorHorizontalCharacter];

      // Tiles that are inaccessible for both ghosts and pacmans
      static actorsInaccessibleTileCharacterList = [Configuration.wallCharacter, 
                                                    Configuration.undefinedTileCharacter];

      static pointLimitForBonusSpawn = [Configuration.numberOfConsumedPointsForSpawningFirstBonusElement,
                                        Configuration.numberOfConsumedPointsForSpawningSecondBonusElement];

      static chasePatternGhostInkyGhostPriorityList = [Configuration.ghostBlinkyCharacter,
                                                       Configuration.ghostPinkyCharacter,
                                                       Configuration.ghostClydeCharacter];

      static ghostStateNameList = [Configuration.nameGhostStateChase,
                                   Configuration.nameGhostStateDead,
                                   Configuration.nameGhostStateRespawn,
                                   Configuration.nameGhostStateScared,
                                   Configuration.nameGhostStateScaredEnd,
                                   Configuration.nameGhostStateScatter];



   // Settings for canvas view
      static spriteAlternationIntervalLength = 5;
      static actorMovementSpeedInPixel = 1;



   // Others
      static idInaccessibleBoardTiles = -1;   // must be < 0
      static customLevelRotationSessionStorageName = 'voss29PacmanCustomLevelRotation';


}