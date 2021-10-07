"use strict";

class Configuration {
   

   // general game settings
   static pacman_initial_lifes = 1;
   static interval_delay_in_milliseconds = 500;


   // internal and css representation of different game elements
   static wall_character = "#";
   static empty_character = "x";
   static pacman_character = "p";
   static ghost_character = "g";
   static point_character = "o";
   
   static wall_css_class = "wall";
   static empty_css_class = "empty";
   static pacman_css_class = "pacman";
   static ghost_css_class = "ghost";
   static point_css_class = "point";

   static class_map = {
      [this.wall_character]:   this.wall_css_class,
      [this.empty_character]:  this.empty_css_class,
      [this.pacman_character]: this.pacman_css_class,
      [this.ghost_character]:  this.ghost_css_class,
      [this.point_character]:  this.point_css_class       
   };

   static getClass(symbol) {
      return this.class_map[symbol];
   }


   // internal direction definition
   static direction_up = {x:0, y:-1};
   static direction_right = {x:1, y:0};
   static direction_down = {x:0, y:1};
   static direction_left = {x:-1, y:0};

   static min_direction_id = 0;
   static max_direction_id = 3;

   static direction_name_map = {
      'up':    this.direction_up,
      'right': this.direction_right,
      'down':  this.direction_down,
      'left':  this.direction_left
   };  
   
   static getDirectionByName(name) {
      return this.direction_name_map[name];
   }

   static direction_id_map = {
      0: this.direction_up,
      1: this.direction_right,
      2: this.direction_up,
      3: this.direction_left
   };

   static getDirectionByID(direction_id) {
      return this.direction_id_map[direction_id];
   }


   // configuration for view.js
   static suffix_dynamic_div = "dynamic";
   static suffix_static_div = "static";
   static dimension_in_px_static_div = 30;

}