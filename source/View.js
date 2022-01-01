"use strict";

class View {
   
   
   constructor(board_container_id, score_id, life_id) {
      this.board_container = document.getElementById(board_container_id);
      this.score_display = document.getElementById(score_id);
      this.life_display = document.getElementById(life_id);
   }
   
   
   initialize(board_position_array) {
      this.clearBoard();
      this.setContainerDimension(board_position_array);
      this.addBackgroundElements(board_position_array);
      this.addForegroundElements(board_position_array);
   }


   update(board_positions, score, number_of_lifes) {
      this.updateBoard(board_positions);
      this.updateScore(score);
      this.updateLifeBar(number_of_lifes);
   }
   

   printMessage(message) {
      window.alert(message);
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
      this.board_container.style.height = `${board.length * Configuration.dimension_background_div_in_px}px`;
      this.board_container.style.width = `${board[0].length * Configuration.dimension_background_div_in_px}px`;
   }

   
   addBackgroundElements(board) {
      var outer_div = undefined;
      var id_div = '';
      var style_class = '';
      var current_position = undefined;

      for (var y = 0; y < board.length; y++) {
         for (var x = 0; x < board[y].length; x++) {
            current_position = board[y][x];
            id_div = this.getDivID(current_position, Configuration.suffix_background_div);
            outer_div = this.createDiv(id_div);
            style_class = Configuration.getBackgroundStyleClass(current_position.getCharacter(), 
                                                                current_position.getMovementDirection());
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
      var current_position = undefined;
      
      for (var y = 0; y < board.length; y++) {
         for (var x = 0; x < board[y].length; x++) {
            current_position = board[y][x];
            id_div = this.getDivID(current_position, Configuration.suffix_background_div);
            outer_div = document.getElementById(id_div);
            id_div = this.getDivID(current_position, Configuration.suffix_foreground_div);
            inner_div = this.createDiv(id_div);
            style_class = Configuration.getForegroundStyleClass(current_position.getCharacter(), 
                                                                current_position.getMovementDirection());
            inner_div.setAttribute('class', style_class);
            outer_div.appendChild(inner_div);
         }
      }
   }
   
   
   updateBoard(board_positions) {
      for (let position of board_positions) {
         let id_div = this.getDivID(position, Configuration.suffix_foreground_div);
         let style_class = Configuration.getForegroundStyleClass(position.getCharacter(), position.getMovementDirection());
         document.getElementById(id_div).setAttribute('class', style_class);
      }
   }

   
   updateScore(score) {
      this.score_display.innerHTML = `score: ${score}`;
   }
   
   
   updateLifeBar(number_of_lifes) {
      this.life_display.innerHTML = `lifes: ${number_of_lifes}`;
   }
   
   
   createDiv(id) {
      var element = document.createElement('div');
      element.setAttribute('id', id);
      return element;
   }
   
   
   getDivID(position, suffix) {
      return `${position.getX().toString()}_${position.getY().toString()}_${suffix}`;
   }
   
   
}