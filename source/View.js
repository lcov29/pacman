"use strict";

class View {
   
   
   constructor(field_container_id, score_id, life_id) {
      this.field_container = document.getElementById(field_container_id);
      this.score_display = document.getElementById(score_id);
      this.life_display = document.getElementById(life_id);
      this.suffix_dynamic_element = 'dynamic';
      this.suffix_static_element = 'static';
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
      const DIMENSION_STATIC_OBJECT = 30; //stylesheet -> .wall and .empty
      this.field_container.style.height = field.length * DIMENSION_STATIC_OBJECT + 'px';
      this.field_container.style.width = field[0].length * DIMENSION_STATIC_OBJECT + 'px';
   }
   
   
   addStaticElements(field) {
      var outer_div = undefined;
      var id_div = '';
      var style_class = '';

      for (var y = 0; y < field.length; y++) {
         for (var x = 0; x < field[y].length; x++) {
            id_div = this.getDivID(x, y, this.suffix_static_element);
            outer_div = this.createDiv(id_div);
            style_class = (Dictionary.getObject(field[y][x]) == 'wall') ? 'wall' : 'empty';
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
            id_div = this.getDivID(x, y, this.suffix_static_element);
            outer_div = document.getElementById(id_div);
            id_div = this.getDivID(x, y, this.suffix_dynamic_element);
            inner_div = this.createDiv(id_div);
            style_class = Dictionary.getObject(field[y][x]);
            style_class = (style_class == 'wall') ? '' : style_class;
            inner_div.setAttribute('class', style_class);
            outer_div.appendChild(inner_div);
         }
      }
   }
   
   
   updateLevel() {
      for (let request of this.update_requests) {
         let id_div = this.getDivID(request.xPosition, request.yPosition, this.suffix_dynamic_element);
         document.getElementById(id_div).setAttribute('class', request.object);
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