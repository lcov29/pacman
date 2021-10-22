"use strict";

class View {
   
   
   constructor(field_container_id, score_id, life_id) {
      this.field_container = document.getElementById(field_container_id);
      this.score_display = document.getElementById(score_id);
      this.life_display = document.getElementById(life_id);
      this.update_requests = [];
   }
   
   
   initialize(field) {
      this.clearField();
      this.resetUpdateRequests();
      this.setContainerDimension(field);
      this.addBackgroundElements(field);
      this.addForegroundElements(field);
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


   resetUpdateRequests() {
      this.update_requests = [];
   }


   clearField() {
      this.score_display.innerHTML = "";
      this.life_display.innerHTML = "";
      while (this.field_container.firstChild) {
         this.field_container.removeChild(this.field_container.firstChild);
      }
      
   }


   // requires the same column count for all rows!
   setContainerDimension(field) {
      this.field_container.style.height = field.getRowCount() * Configuration.dimension_background_div_in_px + 'px';
      this.field_container.style.width = field.getColumnCountFor(0) * Configuration.dimension_background_div_in_px + 'px';
   }
   
   
   addBackgroundElements(field) {
      var outer_div = undefined;
      var id_div = '';
      var style_class = '';

      for (var y = 0; y < field.getRowCount(); y++) {
         for (var x = 0; x < field.getColumnCountFor(y); x++) {
            id_div = this.getDivID(x, y, Configuration.suffix_background_div);
            outer_div = this.createDiv(id_div);
            style_class = Configuration.getBackgroundStyleClass(field.getElementAt(x, y));
            outer_div.setAttribute('class', style_class);
            this.field_container.appendChild(outer_div);
         }
      }
   }
   
   
   addForegroundElements(field) {
      var outer_div = undefined;
      var inner_div = undefined;
      var id_div = '';
      var style_class = '';
      var element = '';
      
      for (var y = 0; y < field.getRowCount(); y++) {
         for (var x = 0; x < field.getColumnCountFor(y); x++) {
            id_div = this.getDivID(x, y, Configuration.suffix_background_div);
            outer_div = document.getElementById(id_div);
            id_div = this.getDivID(x, y, Configuration.suffix_foreground_div);
            inner_div = this.createDiv(id_div);
            element = field.getElementAt(x, y);
            style_class = this.getInitialStyleClassForForegroundElement(element);
            inner_div.setAttribute('class', style_class);
            outer_div.appendChild(inner_div);
         }
      }
   }


   getInitialStyleClassForForegroundElement(element) {
      var style_class = "";
      switch (element) {
         case Configuration.pacman_character:
            style_class = Configuration.getForegroundStyleClass(element, Configuration.initial_pacman_direction);
            break;
         case Configuration.ghost_character:
            style_class = Configuration.getForegroundStyleClass(element, Configuration.initial_ghosts_direction);
            break;
         default:
            style_class =  Configuration.getForegroundStyleClass(element);
            break;
      }
      return style_class;
   }
   
   
   updateLevel() {
      for (let request of this.update_requests) {
         let id_div = this.getDivID(request.xPosition, request.yPosition, Configuration.suffix_foreground_div);
         let style_class = Configuration.getForegroundStyleClass(request.object, request.direction);
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