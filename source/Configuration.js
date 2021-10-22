"use strict";

class Configuration {
   
   // general game settings
   static initial_score = 0;
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
                        '######o#xxxxxgxxxxx#o######\n' +
                        '######o#x#########x#o######\n' +
                        '#xxxxxoxx#########xxoxxxxx#\n' +
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
   static id_unaccessible_board_element = -1;

   static wall_character = "#";
   static empty_tile_character = "x";
   static pacman_character = "p";
   static ghost_character = "g";
   static point_character = "o";
   
   static wall_background_css_class = "wall_tile";
   static empty_background_css_class = "empty_tile";
   static pacman_foreground_css_class = "pacman";
   static ghost_foreground_css_class = "ghost_blinky"; // replace with ghost types blinky, inky, pinky, clyde, dead and scared
   static point_foreground_css_class = "point";
   static empty_foreground_css_class = "empty_foreground";

   static background_class_map = {
      [this.wall_character]:   this.wall_background_css_class,
      [this.empty_tile_character]:  this.empty_background_css_class,
      [this.pacman_character]:      this.empty_background_css_class,
      [this.ghost_character]:       this.empty_background_css_class,
      [this.point_character]:       this.empty_background_css_class       
   };

   static foreground_class_map = {
      [this.wall_character]:   this.empty_foreground_css_class,
      [this.empty_tile_character]:  this.empty_foreground_css_class,
      [this.pacman_character]:      this.pacman_foreground_css_class,
      [this.ghost_character]:       this.ghost_foreground_css_class,
      [this.point_character]:       this.point_foreground_css_class       
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


   // internal direction definition
   static direction_up = {x:0, y:-1};
   static direction_right = {x:1, y:0};
   static direction_down = {x:0, y:1};
   static direction_left = {x:-1, y:0};

   static min_direction_id = 0;
   static max_direction_id = 3;

   static direction_map_name_to_index = {
      'up':    this.direction_up,
      'right': this.direction_right,
      'down':  this.direction_down,
      'left':  this.direction_left
   };
   
   static direction_map_index_to_name = {
      '(0,-1)': 'up',
      '(1,0)':  'right',
      '(0,1)':  'down',
      '(-1,0)': 'left'
   };  

   static direction_map_id_to_index = {
      0: this.direction_up,
      1: this.direction_right,
      2: this.direction_down,
      3: this.direction_left
   };
   
   static getDirectionByName(name) {
      return this.direction_map_name_to_index[name];
   }

   static getDirectionNameByIndex(x, y) {
      var index = "(" + x + "," + y + ")";
      return this.direction_map_index_to_name[index];
   }

   static getDirectionByID(direction_id) {
      return this.direction_map_id_to_index[direction_id];
   }


   // settings for view.js
   static suffix_foreground_div = "fg";
   static suffix_background_div = "bg";
   static dimension_background_div_in_px = 30;


   // Key Codes for pacman movemen
   // Source http://www.javascriptkeycode.com 
   static key_code_left_arrow = 37;
   static key_code_up_arrow = 38;
   static key_code_right_arrow = 39;
   static key_code_down_arrow = 40;
   static key_code_a = 65;
   static key_code_d = 68;
   static key_code_s = 83;
   static key_code_w = 87;

   // Code for field parsing
   // Source: https://www.ascii-code.com/
   static linefeed_code = 10;
}