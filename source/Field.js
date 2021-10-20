//TODO: use dedicated function with callback-function as parameter for iterating through every fieldposition

"use strict";

class Field {

   
   constructor(field_text) {
      this.field = this.parseField(field_text);
   }

    
   parseField(field_text) {
      
      var output_field = [];
      var current_row = [];
      var current_character = '';
      var current_object = undefined;
      var is_linefeed = false;
      var is_last_character = false;
      
      for (var i = 0; i < field_text.length; i++) {
         current_character = field_text.charAt(i);
         is_linefeed = (current_character.charCodeAt(0) == Configuration.linefeed_code);
         is_last_character = (i == field_text.length - 1);
         
         if (!is_linefeed) {
            current_object = this.getElementObject(Configuration.initial_element_id, current_character);
            current_row.push(current_object);
         }
         if (is_linefeed || is_last_character) {
            output_field.push(current_row);
            current_row = [];
         }
         
      }
      return output_field;
   }


   setFieldObject(xPosition, yPosition, object) {
      this.field[yPosition][xPosition].element = object;
   }
   
   
   getFieldObject(xPosition, yPosition) {
      return this.field[yPosition][xPosition].element;
   }


   getFieldId(xPosition, yPosition) {
      return this.field[yPosition][xPosition].id;
   }
   

   getElementObject(id, element) {
      return {id: id, element: element};
   }


   getRowCount() {
      return this.field.length;
   }


   getColumnCountFor(index) {
      return this.field[index].length;
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
   

   clone() {
      var output = undefined;
      var field_clone = [];
      var row = [];
      var object_clone = '';
      for (var y = 0; y < this.field.length; y++) {
         for (var x = 0; x < this.field[y].length; x++) {
            object_clone = this.getElementObject(this.getFieldId(x, y), this.getFieldObject(x, y));
            row.push(object_clone);
         }
         field_clone.push(row);
         row = [];
      }
      output = new Field("");
      output.field = field_clone;
      return output;
   }
   
   
}