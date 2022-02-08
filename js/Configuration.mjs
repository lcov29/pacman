"use strict";

export default class Configuration {
 
   
   // Game settings
      static INITIAL_PACMAN_LIFES = 1;
      static SCORE_VALUE_PER_POINT = 10;
      static SCORE_VALUE_PER_POWERUP = 50;
      static GHOST_MAX_RESPAWN_STAGE = 4;
      static SCORE_VALUE_PER_EATEN_GHOST = 200;
      static INTERVAL_DELAY_IN_MILLISECONDS = 500;
      static INITIAL_PACMAN_SPRITE_DIRECTION = "right";
      static INITIAL_GHOST_SPRITES_DIRECTION = "down";

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
                                          '["1","x","x","x","x","x","o","x","x","#","x","x","x","x","x","x","x","#","x","x","o","x","x","x","x","x","1"],' +  
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
                                                   '{"ghost":"c","x":"16","y":"10"}]}';



   // Definition of level characters

      // Actor characters
      static PACMAN_CHARACTER = "p";
      static GHOST_INKY_CHARACTER = "i";
      static GHOST_PINKY_CHARACTER = "y";
      static GHOST_CLYDE_CHARACTER = "c";
      static GHOST_BLINKY_CHARACTER = "b";

      // Element characters
      static WALL_CHARACTER = "#";
      static POINT_CHARACTER = "o";
      static POWERUP_CHARACTER = "O";
      static EMPTY_TILE_CHARACTER = "x";
      static TELEPORTER_1_CHARACTER= "1";
      static TELEPORTER_2_CHARACTER = "2";
      static TELEPORTER_3_CHARACTER = "3";
      static UNDEFINED_TILE_CHARACTER = ".";
      static GHOST_DOOR_CROSSING_CHARACTER = "+";
      static GHOST_DOOR_VERTICAL_CHARACTER = "|";
      static GHOST_DOOR_HORIZONTAL_CHARACTER = "-";


   // Definition of directions

      // Direction names
      static DIRECTION_NAME_UP = "up";
      static DIRECTION_NAME_DOWN = "down";
      static DIRECTION_NAME_LEFT = "left";
      static DIRECTION_NAME_RIGHT = "right";
   
   
   // Definition of css class names

      // Background
      static WALL_BACKGROUND_CSS_CLASS = "wall_tile";
      static EMPTY_TILE_BACKGROUND_CSS_CLASS = "empty_tile";
      static TELEPORTER_1_BACKGROUND_CSS_CLASS = "teleporter_1_tile";
      static TELEPORTER_2_BACKGROUND_CSS_CLASS = "teleporter_2_tile";
      static TELEPORTER_3_BACKGROUND_CSS_CLASS = "teleporter_3_tile";
      static UNDEFINED_TILE_BACKGROUND_CSS_CLASS = "undefined_tile";
      static GHOST_DOOR_CROSSING_BACKGROUND_CSS_CLASS = "ghost_door_crossing";
      static GHOST_DOOR_VERTICAL_BACKGROUND_CSS_CLASS = "ghost_door_vertical";
      static GHOST_DOOR_HORIZONTAL_BACKGROUND_CSS_CLASS = "ghost_door_horizontal";

      // Foreground
      static EMPTY_FOREGROUND_CSS_CLASS = "empty_foreground";
      static POINT_FOREGROUND_CSS_CLASS = "point";
      static PACMAN_FOREGROUND_CSS_CLASS = "pacman";
      static POWERUP_FOREGROUND_CSS_CLASS = "powerup";
   
      static GHOST_INKY_RESPAWN_FOREGROUNG_CSS_CLASS = "ghost_inky_respawn";
      static GHOST_PINKY_RESPAWN_FOREGROUNG_CSS_CLASS = "ghost_pinky_respawn";
      static GHOST_CLYDE_RESPAWN_FOREGROUNG_CSS_CLASS = "ghost_clyde_respawn";
      static GHOST_BLINKY_RESPAWN_FOREGROUND_CSS_CLASS = "ghost_blinky_respawn";      

      static GHOST_INKY_MOVEMENT_FOREGROUND_CSS_CLASS = "ghost_inky_movement";
      static GHOST_PINKY_MOVEMENT_FOREGROUND_CSS_CLASS = "ghost_pinky_movement";
      static GHOST_CLYDE_MOVEMENT_FOREGROUND_CSS_CLASS = "ghost_clyde_movement";
      static GHOST_BLINKY_MOVEMENT_FOREGROUND_CSS_CLASS = "ghost_blinky_movement";

      static GHOST_DEAD_FOREGROUND_CSS_CLASS = "ghost_dead";
      static GHOST_SCARED_FOREGROUND_CSS_CLASS = "ghost_scared";
 
   

   // Definition of ghost sprite display priority for handling collisions between ghosts
      static GHOST_STATE_CHASE_SPRITE_DISPLAY_PRIORITY = 5;
      static GHOST_STATE_SCATTER_SPRITE_DISPLAY_PRIORITY = 4;
      static GHOST_STATE_SCARED_SPRITE_DISPLAY_PRIORITY = 3;
      static GHOST_STATE_RESPAWN_SPRITE_DISPLAY_PRIORITY = 2;
      static GHOST_STATE_DEAD_SPRITE_DISPLAY_PRIORITY = 1;


   // Editor Settings
      static FILE_NAME_INDEX = "index.html";
      static FILE_NAME_EDITOR = "editor.html";

      static EDITOR_BOARD_MIN_HEIGHT = 4;
      static EDITOR_BOARD_MAX_HEIGHT = 30;
      static EDITOR_BOARD_DEFAULT_HEIGHT = 20;

      static EDITOR_BOARD_MIN_WIDTH = 4;
      static EDITOR_BOARD_MAX_WIDTH = 30;
      static EDITOR_BOARD_DEFAULT_WIDTH = 20;

      static EDITOR_GHOST_BLINKY_HIGHLIGHT_COLOR_HEX = "#dd1717";
      static EDITOR_GHOST_PINKY_HIGHLIGHT_COLOR_HEX = "#ee45bc";
      static EDITOR_GHOST_CLYDE_HIGHLIGHT_COLOR_HEX = "#ee810d";
      static EDITOR_GHOST_INKY_HIGHLIGHT_COLOR_HEX = "#08e6db";
      
      static EDITOR_SCATTER_SPAWN_SELECTION_POINTER_HIGHTLIGHT_COLOR_HEX = "#289D10";
      static EDITOR_TILE_SELECTION_HIGHLIGHT_COLOR_HEX = "#fdfdfd";


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

   

   // Key Codes for user commands (Source: https://keycode.info/)
      static KEY_CODE_LEFT_ARROW = 37;
      static KEY_CODE_UP_ARROW = 38;
      static KEY_CODE_RIGHT_ARROW = 39;
      static KEY_CODE_DOWN_ARROW = 40;
      static KEY_CODE_A = 65;
      static KEY_CODE_D = 68;
      static KEY_CODE_S = 83;
      static KEY_CODE_W = 87;



   // Settings for view.js
      static SUFFIX_FOREGROUND_DIV = "fg";
      static SUFFIX_BACKGROUND_DIV = "bg";
      static DIMENSION_BACKGROUND_DIV_IN_PX = 30;



   // Others
      static ID_UNACCESSIBLE_BOARD_TILES = -1;   // must be < 0


}