"use strict";

class Configuration {
   
   // general game settings
   static initial_score = 0;
   static score_value_per_point = 10;
   static initial_pacman_lifes = 1;
   static initial_pacman_direction = "right";
   static initial_ghosts_direction = "down";
   static interval_delay_in_milliseconds = 500;
   static default_map = '###########################\n'+
                        '#oooooooooooo#oooooooooooo#\n' +
                        '#o####o#####o#o#####o####o#\n' +
                        '#o####o#####o#o#####o####o#\n' +
                        '#ooooooooooooooooooooooooo#\n' +
                        '#o####o#o#########o#o####o#\n' +
                        '#oooooo#ooooo#ooooo#oooooo#\n' +
                        '######o#####o#o#####o######\n' +
                        '######o#xxxxxbxxxxx#o######\n' +
                        '######o#x####d####x#o######\n' +
                        '#1xxxxoxx#xxxxxxx#xxoxxxx1#\n' +
                        '######o#x#########x#o######\n' +
                        '######o#xxxxxxxxxxx#o######\n' +
                        '######o#x#########x#o######\n' +
                        '#oooooooooooo#oooooooooooo#\n' +
                        '#o####o#####o#o#####o####o#\n' +
                        '#oooo#ooooooopooooooo#oooo#\n' +
                        '####o#o#o#########o#o#o####\n' +
                        '#oooooo#ooooo#ooooo#oooooo#\n' +
                        '#o##########o#o##########o#\n' +
                        '#ooooooooooooooooooooooooo#\n' +
                        '###########################\n';

                        
   // internal and css representation of different game elements
   static id_unaccessible_board_element = -1;   // must be < 0

   static wall_character = "#";
   static empty_tile_character = "x";
   static ghost_door_character = "d";
   static teleporter_1_tile_character = "1";
   static teleporter_2_tile_character = "2";
   static teleporter_3_tile_character = "3";
   static pacman_character = "p";
   static ghost_blinky_character = "b";
   static point_character = "o";
   
   static wall_background_css_class = "wall_tile";
   static empty_background_css_class = "empty_tile";
   static ghost_door_background_css_class = "ghost_door_horizontal";
   static teleporter_1_background_css_class = "teleporter_1_tile";
   static teleporter_2_background_css_class = "teleporter_2_tile";
   static teleporter_3_background_css_class = "teleporter_3_tile";

   static pacman_foreground_css_class = "pacman";
   static ghost_blinky_foreground_css_class = "ghost_blinky";
   static point_foreground_css_class = "point";
   static empty_foreground_css_class = "empty_foreground";

   static background_class_map = {
      [this.wall_character]:              this.wall_background_css_class,
      [this.empty_tile_character]:        this.empty_background_css_class,
      [this.ghost_door_character]:        this.ghost_door_background_css_class,
      [this.teleporter_1_tile_character]: this.teleporter_1_background_css_class,
      [this.teleporter_2_tile_character]: this.teleporter_2_background_css_class,
      [this.teleporter_3_tile_character]: this.teleporter_3_background_css_class,
      [this.pacman_character]:            this.empty_background_css_class,
      [this.ghost_blinky_character]:      this.empty_background_css_class,
      [this.point_character]:             this.empty_background_css_class       
   };

   static foreground_class_map = {
      [this.wall_character]:              this.empty_foreground_css_class,
      [this.empty_tile_character]:        this.empty_foreground_css_class,
      [this.ghost_door_character]:        this.empty_foreground_css_class,
      [this.teleporter_1_tile_character]: this.empty_foreground_css_class,
      [this.teleporter_2_tile_character]: this.empty_foreground_css_class,
      [this.teleporter_3_tile_character]: this.empty_foreground_css_class,
      [this.pacman_character]:            this.pacman_foreground_css_class,
      [this.ghost_blinky_character]:      this.ghost_blinky_foreground_css_class,
      [this.point_character]:             this.point_foreground_css_class       
   };

   static getBackgroundStyleClass(character) {
      return this.background_class_map[character];
   }

   static getForegroundStyleClass(character, direction_suffix = "") {
      var style_class = this.foreground_class_map[character];
      if (direction_suffix != "") {
         style_class += "_" + direction_suffix;
      }
      return style_class;
   }


   // settings for view.js
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