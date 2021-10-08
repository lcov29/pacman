//TODO: use dedicated function with callback-function as parameter for iterating through every fieldposition

"use strict";

class Field {

   
   constructor(field_text) {
      this.field = this.parseField(field_text);
   }

    
   parseField(field_text) {
      const LINEFEED_CODE = 10;      //source: https://www.ascii-code.com/
      var output_field = [];
      var current_row = [];
      var current_character = '';
      var is_linefeed = false;
      var is_last_character = false;
      
      for (var i = 0; i < field_text.length; i++) {
         current_character = field_text.charAt(i);
         is_linefeed = (current_character.charCodeAt(0) == LINEFEED_CODE);
         is_last_character = (i == field_text.length - 1);
         
         if (!is_linefeed) {
            current_row.push(current_character);
         }
         if (is_linefeed || is_last_character) {
            output_field.push(current_row);
            current_row = [];
         }
         
      }
      return output_field;
   }


   setFieldObject(xPosition, yPosition, object) {
      this.field[yPosition][xPosition] = object;
   }
   
   
   getFieldObject(xPosition, yPosition) {
      return this.field[yPosition][xPosition];
   }
   

   getPoints() {
      var number_of_points = 0;
      for (var y = 0; y < this.field.length; y++) {
         for (var x = 0; x < this.field[y].length; x++) {
            if (this.getFieldObject(x, y) == Configuration.point_character) {
               number_of_points++;
            }
         }
      }
      return number_of_points;
   }
   

   getPacmans(ref_level) {
      var pacmans = [];
      for (var y = 0; y < this.field.length; y++) {
         for (var x = 0; x < this.field[y].length; x++)  {
            if (this.getFieldObject(x, y) == Configuration.pacman_character) {
               pacmans.push(new Pacman(ref_level, x, y));
            }
         }
      }
      return pacmans;
   }
   
 
   getGhosts(ref_level) {
      var ghosts = [];
      for (var y = 0; y < this.field.length; y++) {
         for (var x = 0; x < this.field[y].length; x++) {
            if (this.getFieldObject(x, y) == Configuration.ghost_character) {
               ghosts.push(new Ghost(ref_level, x, y));
            }
         }
      }
      return ghosts;
   }
   
   
   getFieldCopy() {
      return this.field.slice();
   }
   
   
}