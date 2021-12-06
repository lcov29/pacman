"use strict";

class View {
   
   
   constructor(board_container_id, score_id, life_id) {
      this.board_container = document.getElementById(board_container_id);
      this.score_display = document.getElementById(score_id);
      this.life_display = document.getElementById(life_id);
      this.update_requests = [];
   }
   
   
   initialize(board) {
      this.clearBoard();
      this.resetUpdateRequests();
      this.setContainerDimension(board);
      this.addBackgroundElements(board);
      this.addForegroundElements(board);
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


   clearBoard() {
      this.score_display.innerHTML = "";
      this.life_display.innerHTML = "";
      while (this.board_container.firstChild) {
         this.board_container.removeChild(this.board_container.firstChild);
      }
      
   }


   // requires the same column count for all rows!
   setContainerDimension(board) {
      this.board_container.style.height = board.getRowCount() * Configuration.dimension_background_div_in_px + 'px';
      this.board_container.style.width = board.getColumnCountFor(0) * Configuration.dimension_background_div_in_px + 'px';
   }
   
   
   addBackgroundElements(board) {
      var outer_div = undefined;
      var id_div = '';
      var style_class = '';
      var current_position = undefined;

      for (var y = 0; y < board.getRowCount(); y++) {
         for (var x = 0; x < board.getColumnCountFor(y); x++) {
            current_position = new BoardPosition(x, y);
            id_div = this.getDivID(current_position, Configuration.suffix_background_div);
            outer_div = this.createDiv(id_div);
            style_class = Configuration.getBackgroundStyleClass(board.getElementAt(current_position));
            outer_div.setAttribute('class', style_class);
            this.board_container.appendChild(outer_div);
         }
      }
   }
   
   
   addForegroundElements(board) {
      var outer_div = undefined;
      var inner_div = undefined;
      var id_div = '';
      var style_class = '';
      var element = '';
      var current_position = undefined;
      
      for (var y = 0; y < board.getRowCount(); y++) {
         for (var x = 0; x < board.getColumnCountFor(y); x++) {
            current_position= new BoardPosition(x, y);
            id_div = this.getDivID(current_position, Configuration.suffix_background_div);
            outer_div = document.getElementById(id_div);
            id_div = this.getDivID(current_position, Configuration.suffix_foreground_div);
            inner_div = this.createDiv(id_div);
            element = board.getElementAt(current_position);
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
         let id_div = this.getDivID(request.getPosition(), Configuration.suffix_foreground_div);
         let style_class = Configuration.getForegroundStyleClass(request.getObject(), request.getDirection());
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
   
   
   getDivID(position, suffix) {
      return position.getX().toString() + '_' + position.getY().toString() + '_' + suffix;
   }
   
   
}