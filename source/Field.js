//TODO: use dedicated function with callback-function as parameter for iterating through every fieldposition

"use strict";

class Field {
   
   
   constructor(view) {
      this.view = view;
      this.field = undefined;
      this.update_requests = [];
   }
   
   
   loadLevel(level_text) {
      this.field = this.parseLevel(level_text);
   }
   
   
   addUpdateRequest(request) {
      this.update_requests.push(request);
      this.view.addUpdateRequest(request);
   }
   
   
   update() {
      for (let request of this.update_requests) {
         this.setField(request.xPosition, request.yPosition, request.object);
      }
      this.update_requests = [];
   }
   
   
   setField(xPosition, yPosition, object) {
      this.field[yPosition][xPosition] = Dictionary.getSymbol(object);
   }
   
   
   getFieldObject(xPosition, yPosition) {
      return Dictionary.getObject(this.field[yPosition][xPosition]);
   }
   
      
   parseLevel(level_text) {
      const LINEFEED_CODE = 10;      //source: https://www.ascii-code.com/
      var output_field = [];
      var current_row = [];
      var current_character = '';
      var is_linefeed = false;
      var is_last_character = false;
      
      for (var i = 0; i < level_text.length; i++) {
         current_character = level_text.charAt(i);
         is_linefeed = (current_character.charCodeAt(0) == LINEFEED_CODE);
         is_last_character = (i == level_text.length - 1);
         
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
   
    
   countAvailablePoints() {
      var number_of_points = 0;
      for (var y = 0; y < this.field.length; y++) {
         for (var x = 0; x < this.field[y].length; x++) {
            if (this.getFieldObject(x, y) == 'point') {
               number_of_points++;
            }
         }
      }
      return number_of_points;
   }
   
   
   initializePacmans(game) {
      var pacmans = [];
      for (var y = 0; y < this.field.length; y++) {
         for (var x = 0; x < this.field[y].length; x++)  {
            if (this.getFieldObject(x, y) == 'pacman') {
               pacmans.push(new Pacman(game, x, y));
            }
         }
      }
      return pacmans;
   }
   
   
   initializeGhosts(game) {
      var ghosts = [];
      for (var y = 0; y < this.field.length; y++) {
         for (var x = 0; x < this.field[y].length; x++) {
            if (this.getFieldObject(x, y) == 'ghost') {
               ghosts.push(new Ghost(game, x, y));
            }
         }
      }
      return ghosts;
   }
   
   
   getArrayCopy() {
      return this.field.slice();
   }
   
   
   getFieldNodeMap() {
      var mapping = [];
      var current_row = [];
      var id = 0;
      var current_object = ''
      
      for (var y = 0; y < this.field.length; y++) {
         for (var x = 0; x < this.field[y].length; x++) {
            switch(Dictionary.getObject(this.field[y][x])) {
               case 'wall':
                  current_row.push(undefined);
                  break;
               default:
                  current_row.push(new FieldNode(id, x, y));
                  id++;
            }
         }
         mapping.push(current_row);
         current_row = [];
      }
      return mapping;
   }
   
   
}