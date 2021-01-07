"use strict";

//TODO: use dedicated function with callback-function as parameter for iterating through every fieldposition

class View {
   
   
   constructor(field_id, score_id, life_id) {
      this.field_container = document.getElementById(field_id);
      this.score_display = document.getElementById(score_id);
      this.life_display = document.getElementById(life_id);
      this.update_requests = [];
   }
   
   
   initializeField(field) {
      this.setContainerDimension(field);
      this.addStaticElements(field);
      this.addDynamicElements(field);
      this.styleStaticElements(field);
      this.styleDynamicElements(field);
   }
   
   
   addUpdateRequest(request) {
      this.update_requests.push(request);
   }
   
   
   update(score, number_of_lifes) {
      this.updateField();
      this.updateScore(score);
      this.updateLifeBar(number_of_lifes);
   }
   
   
   setContainerDimension(field) {
      const DIMENSION_STATIC_OBJECT = 30; //stylesheet -> .wall and .empty
      this.field_container.style.height = field.length * DIMENSION_STATIC_OBJECT + 'px';
      this.field_container.style.width = field[0].length * DIMENSION_STATIC_OBJECT + 'px';
   }
   
   
   addStaticElements(field) {
      var outer_div = undefined;
      
      for (var y = 0; y < field.length; y++) {
         for (var x = 0; x < field[y].length; x++) {
            outer_div = this.createDiv(x, y, 'outer');
            this.field_container.appendChild(outer_div);
         }
      }
   }
   
   
   addDynamicElements(field) {
      var inner_div = undefined;
      var outer_div = undefined;
      var id_div = '';
      
      for (var y = 0; y < field.length; y++) {
         for (var x = 0; x < field[y].length; x++) {
            id_div = this.getDivID(x, y, 'outer');
            outer_div = document.getElementById(id_div);
            inner_div = this.createDiv(x, y, 'inner');
            outer_div.appendChild(inner_div);
         }
      }
   }
   
   
   styleStaticElements(field) {
      var current_element = undefined;
      var current_object = '';
      var style_class = '';
      var id_div = '';
      
      for (var y = 0; y < field.length; y++) {
         for (var x = 0; x < field[y].length; x++) {
            current_object = Dictionary.getObject(field[y][x]);
            style_class = (current_object == 'wall') ? 'wall' : 'empty';
            id_div = this.getDivID(x, y, 'outer');
            current_element = document.getElementById(id_div);
            current_element.setAttribute('class', style_class);
         }
      }
   }
   

   styleDynamicElements(field) {
      var current_element = undefined;
      var current_object = '';
      var style_class = '';
      var id_div = '';
      
      for (var y = 0; y < field.length; y++) {
         for (var x = 0; x < field[y].length; x++) {
            current_object = Dictionary.getObject(field[y][x]);
            style_class = (current_object == 'wall') ? '' : current_object;
            id_div = this.getDivID(x, y, 'inner');
            current_element = document.getElementById(id_div);
            current_element.setAttribute('class', style_class);
         }
      }
   }
   
   
   updateField() {
      var request = undefined;
      var element = undefined;
      var id_div = '';
      
      while (this.update_requests.length > 0) {
         request = this.update_requests.shift();
         id_div = this.getDivID(request.xPosition, request.yPosition, 'inner');
         element = document.getElementById(id_div);
         element.setAttribute('class', request.object);
      }
         
   }
   
   
   updateScore(score) {
      this.score_display.innerHTML = 'score: ' + score;
   }
   
   
   updateLifeBar(number_of_lifes) {
      this.life_display.innerHTML = 'lifes: ' + number_of_lifes;
   }
   
   
   createDiv(x, y, suffix) {
      var element = document.createElement('div');
      var id_div = this.getDivID(x, y, suffix);
      element.setAttribute('id', id_div);
      return element;
   }
   
   
   getDivID(x, y, suffix) {
      return x.toString() + '_' + y.toString() + '_' + suffix;
   }
   
    
    //TODO: replace functions below with printMessage(message)
   printVictoryMessage() {
      window.alert('Congratulations, you win the game.');
   }
   
   
   printDefeatMessage() {
      window.alert('Game over.');
   }

}