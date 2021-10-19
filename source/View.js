"use strict";

class View {
   
   
   constructor(field_container_id, score_id, life_id) {
      this.field_container = document.getElementById(field_container_id);
      this.score_display = document.getElementById(score_id);
      this.life_display = document.getElementById(life_id);
      this.update_requests = [];
   }
   
   
   initialize(field) {
      this.setContainerDimension(field);
      this.addStaticElements(field);
      this.addDynamicElements(field);
   }
   
   
   addUpdateRequest(request) {
      this.update_requests.push(request);
   }
   
   
   update(score, number_of_lifes) {
      this.updateLevel();
      this.updateScore(score);
      this.updateLifeBar(number_of_lifes);
   }
   

   printMessage(message) {
      window.alert(message);
   }


   setContainerDimension(field) {
      this.field_container.style.height = field.length * Configuration.dimension_in_px_static_div + 'px';
      this.field_container.style.width = field[0].length * Configuration.dimension_in_px_static_div + 'px';
   }
   
   
   addStaticElements(field) {
      var outer_div = undefined;
      var id_div = '';
      var style_class = '';

      for (var y = 0; y < field.length; y++) {
         for (var x = 0; x < field[y].length; x++) {
            id_div = this.getDivID(x, y, Configuration.suffix_static_div);
            outer_div = this.createDiv(id_div);
            if (field[y][x] == Configuration.wall_character) {
               style_class = Configuration.wall_character;
            } else {
               style_class = Configuration.empty_character;
            }
            style_class = Configuration.getStyleClass(style_class);
            outer_div.setAttribute('class', style_class);
            this.field_container.appendChild(outer_div);
         }
      }
   }
   
   
   addDynamicElements(field) {
      var outer_div = undefined;
      var inner_div = undefined;
      var id_div = '';
      var style_class = '';
      
      for (var y = 0; y < field.length; y++) {
         for (var x = 0; x < field[y].length; x++) {
            id_div = this.getDivID(x, y, Configuration.suffix_static_div);
            outer_div = document.getElementById(id_div);
            id_div = this.getDivID(x, y, Configuration.suffix_dynamic_div);
            inner_div = this.createDiv(id_div);
            style_class = (field[y][x] == Configuration.wall_character) ? '' : field[y][x];
            style_class = Configuration.getStyleClass(style_class);
            inner_div.setAttribute('class', style_class);
            outer_div.appendChild(inner_div);
         }
      }
   }
   
   
   updateLevel() {
      for (let request of this.update_requests) {
         let id_div = this.getDivID(request.xPosition, request.yPosition, Configuration.suffix_dynamic_div);
         let style_class = Configuration.getStyleClass(request.object);
         document.getElementById(id_div).setAttribute('class', style_class);
      }
      this.update_requests = []    
   }

   
   updateScore(score) {
      this.score_display.innerHTML = 'score: ' + score;
   }
   
   
   updateLifeBar(number_of_lifes) {
      this.life_display.innerHTML = 'lifes: ' + number_of_lifes;
   }
   
   
   createDiv(id) {
      var element = document.createElement('div');
      element.setAttribute('id', id);
      return element;
   }
   
   
   getDivID(x, y, suffix) {
      return x.toString() + '_' + y.toString() + '_' + suffix;
   }
   
   
}