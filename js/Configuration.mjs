'use strict';

export default class Configuration {
 

   // Game settings
      static INITIAL_PACMAN_LIFES = 1;
      static SCORE_VALUE_PER_POINT = 10;
      static SCORE_VALUE_PER_POWERUP = 50;
      static SCORE_VALUE_PER_BONUS_CHERRY = 100;
      static SCORE_VALUE_PER_BONUS_STRAWBERRY = 300;
      static SCORE_VALUE_PER_BONUS_PEACH = 500;
      static SCORE_VALUE_PER_BONUS_APPLE = 700;
      static SCORE_VALUE_PER_BONUS_GRAPE = 1000;
      static SCORE_VALUE_PER_BONUS_GALAXIAN = 2000;
      static SCORE_VALUE_PER_BONUS_BELL = 3000;
      static SCORE_VALUE_PER_BONUS_KEY = 5000;
      static NUMBER_OF_CONSUMED_POINTS_FOR_SPAWNING_FIRST_BONUS_ELEMENT = 70;
      static NUMBER_OF_CONSUMED_POINTS_FOR_SPAWNING_SECOND_BONUS_ELEMENT = 170;
      static GHOST_MAX_RESPAWN_STAGE = 4;
      static GHOST_CLYDE_MIN_TILE_DISTANCE_TO_PACMAN = 8;
      static GHOST_PINKY_MAX_TILE_OFFSET_TO_PACMAN_DIRECTION_POSITION = 4;
      static GHOST_INKY_MAX_TILE_OFFSET_TO_PACMAN_DIRECTION_POSITION = 2;
      static SCORE_VALUE_PER_EATEN_GHOST = 200;
      static INTERVAL_DELAY_IN_MILLISECONDS = 500;
      static INITIAL_PACMAN_SPRITE_DIRECTION = 'Right';
      static INITIAL_GHOST_SPRITES_DIRECTION = 'Down';

      static DEFAULT_LEVEL_JSON = '{"board":[["#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"],' + 
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
                                          
                                 '"scatterPositions":[{"ghost":"b","x":"25","y":"1"},' +
                                                     '{"ghost":"y","x":"1","y":"1"},' +
                                                     '{"ghost":"i","x":"1","y":"20"},' +
                                                     '{"ghost":"c","x":"25","y":"20"}],' +
                                                                  
                                 '"optionalSpawns":[{"ghost":"b","x":"10","y":"10"},' +
                                                   '{"ghost":"y","x":"11","y":"10"},' +
                                                   '{"ghost":"i","x":"15","y":"10"},' +
                                                   '{"ghost":"c","x":"16","y":"10"}],' +

                                 '"bonusSpawnPositions":[{"x":"13","y":"12"}]}';



   // Definition of level characters

      // Actor characters
      static PACMAN_CHARACTER = 'p';
      static GHOST_INKY_CHARACTER = 'i';
      static GHOST_PINKY_CHARACTER = 'y';
      static GHOST_CLYDE_CHARACTER = 'c';
      static GHOST_BLINKY_CHARACTER = 'b';

      // Element characters
      static WALL_CHARACTER = '#';
      static POINT_CHARACTER = 'o';
      static POWERUP_CHARACTER = 'O';
      static EMPTY_TILE_CHARACTER = 'x';
      static TELEPORTER_1_CHARACTER = '1';
      static TELEPORTER_2_CHARACTER = '2';
      static TELEPORTER_3_CHARACTER = '3';
      static BONUS_ELEMENT_CHARACTER = '*';
      static UNDEFINED_TILE_CHARACTER = '.';
      static GHOST_DOOR_CROSSING_CHARACTER = '+';
      static GHOST_DOOR_VERTICAL_CHARACTER = '|';
      static GHOST_DOOR_HORIZONTAL_CHARACTER = '-';



   // Definition of directions

      // Direction names
      static DIRECTION_NAME_UP = 'Up';
      static DIRECTION_NAME_LEFT = 'Left';
      static DIRECTION_NAME_DOWN = 'Down';
      static DIRECTION_NAME_RIGHT = 'Right';
   
   
   // Definition of css class names

      static BOARD_TILE_BASE_CSS_CLASS = 'boardTile';

      // Background
      static WALL_BACKGROUND_CSS_CLASS = 'wallTile';
      static EMPTY_TILE_BACKGROUND_CSS_CLASS = 'emptyTile';
      static TELEPORTER_1_BACKGROUND_CSS_CLASS = 'teleporter1Tile';
      static TELEPORTER_2_BACKGROUND_CSS_CLASS = 'teleporter2Tile';
      static TELEPORTER_3_BACKGROUND_CSS_CLASS = 'teleporter3Tile';
      static UNDEFINED_TILE_BACKGROUND_CSS_CLASS = 'undefinedTile';
      static GHOST_DOOR_CROSSING_BACKGROUND_CSS_CLASS = 'ghostDoorCrossingTile';
      static GHOST_DOOR_VERTICAL_BACKGROUND_CSS_CLASS = 'ghostDoorVerticalTile';
      static GHOST_DOOR_HORIZONTAL_BACKGROUND_CSS_CLASS = 'ghostDoorHorizontalTile';

      // Foreground
      static EMPTY_FOREGROUND_CSS_CLASS = 'emptyForegroundTile';
      static POINT_FOREGROUND_CSS_CLASS = 'pointTile';
      static PACMAN_FOREGROUND_CSS_CLASS = 'pacmanTile';
      static POWERUP_FOREGROUND_CSS_CLASS = 'powerupTile';

      static BONUS_ELEMENT_CHERRY_FOREGROUND_CSS_CLASS = 'bonusSpawnCherryTile';
      static BONUS_ELEMENT_STRAWBERRY_FOREGROUND_CSS_CLASS = 'bonusSpawnStrawberryTile';
      static BONUS_ELEMENT_PEACH_FOREGROUND_CSS_CLASS = 'bonusSpawnPeachTile';
      static BONUS_ELEMENT_APPLE_FOREGROUND_CSS_CLASS = 'bonusSpawnAppleTile';
      static BONUS_ELEMENT_GRAPE_FOREGROUND_CSS_CLASS = 'bonusSpawnGrapeTile';
      static BONUS_ELEMENT_GALAXIAN_FOREGROUND_CSS_CLASS = 'bonusSpawnGalaxianTile';
      static BONUS_ELEMENT_BELL_FOREGROUND_CSS_CLASS = 'bonusSpawnBellTile';
      static BONUS_ELEMENT_KEY_FOREGROUND_CSS_CLASS = 'bonusSpawnKeyTile';   
   
      static GHOST_INKY_RESPAWN_FOREGROUNG_CSS_CLASS = 'ghostInkyRespawnTile';
      static GHOST_PINKY_RESPAWN_FOREGROUNG_CSS_CLASS = 'ghostPinkyRespawnTile';
      static GHOST_CLYDE_RESPAWN_FOREGROUNG_CSS_CLASS = 'ghostClydeRespawnTile';
      static GHOST_BLINKY_RESPAWN_FOREGROUND_CSS_CLASS = 'ghostBlinkyRespawnTile';      

      static GHOST_INKY_MOVEMENT_FOREGROUND_CSS_CLASS = 'ghostInkyMovementTile';
      static GHOST_PINKY_MOVEMENT_FOREGROUND_CSS_CLASS = 'ghostPinkyMovementTile';
      static GHOST_CLYDE_MOVEMENT_FOREGROUND_CSS_CLASS = 'ghostClydeMovementTile';
      static GHOST_BLINKY_MOVEMENT_FOREGROUND_CSS_CLASS = 'ghostBlinkyMovementTile';

      static GHOST_DEAD_FOREGROUND_CSS_CLASS = 'ghostDeadTile';
      static GHOST_SCARED_FOREGROUND_CSS_CLASS = 'ghostScaredTile';
 
   

   // Definition of ghost sprite display priority for handling collisions between ghosts
      static GHOST_STATE_CHASE_SPRITE_DISPLAY_PRIORITY = 5;
      static GHOST_STATE_SCATTER_SPRITE_DISPLAY_PRIORITY = 4;
      static GHOST_STATE_SCARED_SPRITE_DISPLAY_PRIORITY = 3;
      static GHOST_STATE_RESPAWN_SPRITE_DISPLAY_PRIORITY = 2;
      static GHOST_STATE_DEAD_SPRITE_DISPLAY_PRIORITY = 1;



   // Editor Settings
      static FILE_NAME_INDEX = 'index.html';
      static FILE_NAME_EDITOR = 'editor.html';

      static EDITOR_BOARD_MIN_HEIGHT = 4;
      static EDITOR_BOARD_MAX_HEIGHT = 30;
      static EDITOR_BOARD_DEFAULT_HEIGHT = 20;

      static EDITOR_BOARD_MIN_WIDTH = 4;
      static EDITOR_BOARD_MAX_WIDTH = 30;
      static EDITOR_BOARD_DEFAULT_WIDTH = 20;

      static EDITOR_GHOST_BLINKY_HIGHLIGHT_COLOR_HEX = '#dd1717';
      static EDITOR_GHOST_PINKY_HIGHLIGHT_COLOR_HEX = '#ee45bc';
      static EDITOR_GHOST_CLYDE_HIGHLIGHT_COLOR_HEX = '#ee810d';
      static EDITOR_GHOST_INKY_HIGHLIGHT_COLOR_HEX = '#08e6db';
      
      static EDITOR_SCATTER_SPAWN_SELECTION_POINTER_HIGHTLIGHT_COLOR_HEX = '#289D10';
      static EDITOR_TILE_SELECTION_HIGHLIGHT_COLOR_HEX = '#fdfdfd';



   // Definition of element lists 
      static POINT_CHARACTERS = [Configuration.POINT_CHARACTER, 
                                 Configuration.POWERUP_CHARACTER];

      static ACTOR_CHARACTERS = [Configuration.PACMAN_CHARACTER,
                                 Configuration.GHOST_BLINKY_CHARACTER,
                                 Configuration.GHOST_PINKY_CHARACTER,
                                 Configuration.GHOST_CLYDE_CHARACTER,
                                 Configuration.GHOST_INKY_CHARACTER];

      static GHOST_CHARACTERS = [Configuration.GHOST_BLINKY_CHARACTER,
                                 Configuration.GHOST_PINKY_CHARACTER,
                                 Configuration.GHOST_CLYDE_CHARACTER,
                                 Configuration.GHOST_INKY_CHARACTER];

      static TELEPORTER_CHARACTERS = [Configuration.TELEPORTER_1_CHARACTER,
                                      Configuration.TELEPORTER_2_CHARACTER,
                                      Configuration.TELEPORTER_3_CHARACTER];

      static PACMAN_INACCESSIBLE_TILES = [Configuration.WALL_CHARACTER, 
                                          Configuration.UNDEFINED_TILE_CHARACTER,
                                          Configuration.GHOST_DOOR_CROSSING_CHARACTER,
                                          Configuration.GHOST_DOOR_VERTICAL_CHARACTER,
                                          Configuration.GHOST_DOOR_HORIZONTAL_CHARACTER];

      // Tiles that are inaccessible for both ghosts and pacmans
      static ACTORS_INACCESSIBLE_TILES = [Configuration.WALL_CHARACTER, 
                                          Configuration.UNDEFINED_TILE_CHARACTER];

      static POINT_LIMIT_FOR_BONUS_SPAWN = [Configuration.NUMBER_OF_CONSUMED_POINTS_FOR_SPAWNING_FIRST_BONUS_ELEMENT,
                                            Configuration.NUMBER_OF_CONSUMED_POINTS_FOR_SPAWNING_SECOND_BONUS_ELEMENT];

      static GHOST_REFERENCE_PRIORITY_LIST_FOR_CHASE_PATTERN_OF_GHOST_INKY = [Configuration.GHOST_BLINKY_CHARACTER,
                                                                              Configuration.GHOST_PINKY_CHARACTER,
                                                                              Configuration.GHOST_CLYDE_CHARACTER];

   

   // Key Codes for user commands (Source: https://keycode.info/)
      static KEY_CODE_RIGHT_ARROW = 39;
      static KEY_CODE_DOWN_ARROW = 40;
      static KEY_CODE_LEFT_ARROW = 37;
      static KEY_CODE_UP_ARROW = 38;
      static KEY_CODE_ENTER = 13;
      static KEY_CODE_SPACE = 32;
      static KEY_CODE_W = 87;
      static KEY_CODE_A = 65;
      static KEY_CODE_S = 83;
      static KEY_CODE_D = 68;



   // Settings for view.js
      static SUFFIX_FOREGROUND_DIV = 'fg';
      static SUFFIX_BACKGROUND_DIV = 'bg';
      static DIMENSION_BACKGROUND_DIV_IN_PX = 30;



   // Others
      static ID_UNACCESSIBLE_BOARD_TILES = -1;   // must be < 0


}