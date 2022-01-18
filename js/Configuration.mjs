"use strict";

export default class Configuration {
   
   
   // Game settings
   static initial_score = 0;
   static score_value_per_point = 10;
   static score_value_per_powerup = 50;
   static score_value_per_eaten_ghost = 200;
   static initial_pacman_lifes = 1;
   static initial_pacman_direction = "right";
   static initial_ghosts_direction = "down";
   static interval_delay_in_milliseconds = 500;
   static default_level = '###########################\n'+
                          '#8ooooooooooo#ooooooooooo9#\n' +
                          '#o####o#####o#o#####o####o#\n' +
                          '#O####o#####o#o#####o####O#\n' +
                          '#ooooooooooooooooooooooooo#\n' +
                          '#o####o#o#########o#o####o#\n' +
                          '#oooooo#ooooo#ooooo#oooooo#\n' +
                          '######o#####o#o#####o######\n' +
                          '######o#xxxxxbxxxxx#o######\n' +
                          '######o#x####d####x#o######\n' +
                          '1xxxxxoxx#Bxxxxxx#xxoxxxxx1\n' +
                          '######o#x#########x#o######\n' +
                          '######o#xxxxxxxxxxx#o######\n' +
                          '######o#x#########x#o######\n' +
                          '#oooooooooooo#oooooooooooo#\n' +
                          '#o####o#####o#o#####o####o#\n' +
                          '#Oooo#ooooooopooooooo#oooO#\n' +
                          '####o#o#o#########o#o#o####\n' +
                          '#oooooo#ooooo#ooooo#oooooo#\n' +
                          '#o##########o#o##########o#\n' +
                          '#7ooooooooooooooooooooooo6#\n' +
                          '###########################\n';
   

                        
   // Internal and css representation of different game elements
   static id_unaccessible_board_element = -1;   // must be < 0

   static wall_character = "#";
   static empty_tile_character = "x";
   static ghost_door_character = "d";
   static teleporter_1_tile_character = "1";
   static teleporter_2_tile_character = "2";
   static teleporter_3_tile_character = "3";
   static pacman_character = "p";
   static ghost_blinky_character = "b";
   static ghost_blinky_spawn_character = "B";
   static point_character = "o";
   static powerup_character = "O";
   static scatter_point_character_blinky = "9";
   static scatter_point_character_pinky = "8";
   static scatter_point_character_inky = "7";
   static scatter_point_character_clyde = "6";

   static ghost_state_dead_name = "dead";
   static ghost_state_flee_name = "flee";
   static ghost_state_chase_name = "chase";
   static ghost_state_scatter_name = "scatter";
   
   static wall_background_css_class = "wall_tile";
   static empty_background_css_class = "empty_tile";
   static ghost_door_background_css_class = "ghost_door";
   static teleporter_1_background_css_class = "teleporter_1_tile";
   static teleporter_2_background_css_class = "teleporter_2_tile";
   static teleporter_3_background_css_class = "teleporter_3_tile";

   static pacman_foreground_css_class = "pacman";
   static ghost_blinky_foreground_css_class = "ghost_blinky";
   static ghost_scared_foreground_css_class = "ghost_scared";
   static ghost_dead_foreground_css_class = "ghost_dead";
   static point_foreground_css_class = "point";
   static powerup_foreground_css_class = "powerup";
   static empty_foreground_css_class = "empty_foreground";

   static ghost_door_direction_suffix_diagonal = "crossing";
   static ghost_door_direction_suffix_horizontal = "horizontal";
   static ghost_door_direction_suffix_vertical = "vertical";

   static background_class_map = {
      [this.wall_character]:                 this.wall_background_css_class,
      [this.empty_tile_character]:           this.empty_background_css_class,
      [this.ghost_door_character]:           this.ghost_door_background_css_class,
      [this.teleporter_1_tile_character]:    this.teleporter_1_background_css_class,
      [this.teleporter_2_tile_character]:    this.teleporter_2_background_css_class,
      [this.teleporter_3_tile_character]:    this.teleporter_3_background_css_class,
      [this.pacman_character]:               this.empty_background_css_class,
      [this.ghost_blinky_character]:         this.empty_background_css_class,
      [this.point_character]:                this.empty_background_css_class,
      [this.powerup_character]:              this.empty_background_css_class,
      [this.scatter_point_character_blinky]: this.empty_background_css_class,   
      [this.scatter_point_character_pinky]:  this.empty_background_css_class,
      [this.scatter_point_character_inky]:   this.empty_background_css_class,
      [this.scatter_point_character_clyde]:  this.empty_background_css_class    
   };

   static foreground_class_map = {
      [this.wall_character]:                 this.empty_foreground_css_class,
      [this.empty_tile_character]:           this.empty_foreground_css_class,
      [this.ghost_door_character]:           this.empty_foreground_css_class,
      [this.teleporter_1_tile_character]:    this.empty_foreground_css_class,
      [this.teleporter_2_tile_character]:    this.empty_foreground_css_class,
      [this.teleporter_3_tile_character]:    this.empty_foreground_css_class,
      [this.pacman_character]:               `${this.pacman_foreground_css_class}_${this.initial_pacman_direction}`,
      [this.ghost_blinky_character]:         `${this.ghost_blinky_foreground_css_class}_${this.initial_ghosts_direction}`,
      [this.point_character]:                this.point_foreground_css_class,
      [this.powerup_character]:              this.powerup_foreground_css_class,
      [this.scatter_point_character_blinky]: this.point_foreground_css_class,  
      [this.scatter_point_character_pinky]:  this.point_foreground_css_class,
      [this.scatter_point_character_inky]:   this.point_foreground_css_class,
      [this.scatter_point_character_clyde]:  this.point_foreground_css_class        
   };


   static getBackgroundStyleClass(character, position_id, ghost_door_direction_map) {
      let direction_suffix = "";
      if (character === this.ghost_door_character) {
         for (let entry of ghost_door_direction_map) {
            if (entry.id === position_id) {
               direction_suffix = entry.direction_suffix;
               break;
            }
         }
      }
      return this.getStyleClass(this.background_class_map, character, direction_suffix);
   }


   static getForegroundStyleClass(actor_character, element_character) {
      let character = (actor_character !== Configuration.empty_tile_character) ? actor_character : element_character;
      return this.getStyleClass(this.foreground_class_map, character);
   }


   static getStyleClass(map, character, direction_suffix="") {
      let style_class = map[character];
      if (direction_suffix !== "") {
         style_class += `_${direction_suffix}`;
      }
      return style_class;
   }


   // Direction names
   static direction_name_up = "up";
   static direction_name_right = "right";
   static direction_name_down = "down";
   static direction_name_left = "left";


   // Settings for view.js
   static suffix_foreground_div = "fg";
   static suffix_background_div = "bg";
   static dimension_background_div_in_px = 30;


   // Key Codes for pacman movement
   // Source http://www.javascriptkeycode.com 
   static key_code_left_arrow = 37;
   static key_code_up_arrow = 38;
   static key_code_right_arrow = 39;
   static key_code_down_arrow = 40;
   static key_code_a = 65;
   static key_code_d = 68;
   static key_code_s = 83;
   static key_code_w = 87;

   
   // Code for board parsing
   // Source: https://www.ascii-code.com/
   static linefeed_code = 10;


}