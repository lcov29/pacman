"use strict";

import Configuration from "../Configuration.mjs";
import StyleClassMapper from "./StyleClassMapper.mjs";


export default class View {
   
   
   constructor(board_container_id, score_id, life_id) {
      this.board_container = document.getElementById(board_container_id);
      this.score_display = document.getElementById(score_id);
      this.life_display = document.getElementById(life_id);
   }


   initialize(board_position_array) {
      this.clearBoard();
      this.initializeContainerDimension(board_position_array);
      this.initializeBackgroundElements(board_position_array);
      this.initializeForegroundElements(board_position_array);
   }


   update(board_position, style_class, score, number_of_lifes) {
      this.updateBoard(board_position, style_class);
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
   initializeContainerDimension(board) {
      this.board_container.style.height = `${board.length * Configuration.DIMENSION_BACKGROUND_DIV_IN_PX}px`;
      this.board_container.style.width = `${board[0].length * Configuration.DIMENSION_BACKGROUND_DIV_IN_PX}px`;
   }


   initializeBackgroundElements(board) {
      let outer_div = null;
      let id_div = '';
      let style_class = '';
      let current_position = null;

      for (let y = 0; y < board.length; y++) {
         for (let x = 0; x < board[y].length; x++) {
            current_position = board[y][x];
            id_div = this.getDivID(current_position, Configuration.SUFFIX_BACKGROUND_DIV);
            outer_div = this.createDiv(id_div);
            style_class = StyleClassMapper.getBackgroundStyleClass(current_position.getElementCharacter(),
                                                                   current_position.getID());
            outer_div.setAttribute('class', style_class);
            this.board_container.appendChild(outer_div);
         }
      }
   }


   initializeForegroundElements(board) {
      let outer_div = null;
      let inner_div = null;
      let id_div = '';
      let style_class = '';
      let current_position = null;
      
      for (let y = 0; y < board.length; y++) {
         for (let x = 0; x < board[y].length; x++) {
            current_position = board[y][x];
            id_div = this.getDivID(current_position, Configuration.SUFFIX_BACKGROUND_DIV);
            outer_div = document.getElementById(id_div);
            id_div = this.getDivID(current_position, Configuration.SUFFIX_FOREGROUND_DIV);
            inner_div = this.createDiv(id_div);
            style_class = StyleClassMapper.getForegroundStyleClass(current_position.getActorCharacter(),
                                                                   current_position.getElementCharacter());
            inner_div.setAttribute('class', style_class);
            outer_div.appendChild(inner_div);
         }
      }
   }


   updateBoard(position, style_class) {
         let id_div = this.getDivID(position, Configuration.SUFFIX_FOREGROUND_DIV);
         document.getElementById(id_div).setAttribute('class', style_class);
   }

   
   updateScore(score) {
      this.score_display.innerHTML = `score: ${score}`;
   }
   
   
   updateLifeBar(number_of_lifes) {
      this.life_display.innerHTML = `lifes: ${number_of_lifes}`;
   }
   
   
   createDiv(id) {
      let element = document.createElement('div');
      element.setAttribute('id', id);
      return element;
   }
   
   
   getDivID(position, suffix) {
      return `${position.getX().toString()}_${position.getY().toString()}_${suffix}`;
   }
   
   
}