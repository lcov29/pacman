"use strict";

import Level from "./Level.js";
import View from "./View.js";
import Configuration from "./Configuration.js";


export default class Game {


   constructor(board_container_id, score_id, life_id) {
      this.animation_interval = null;
      this.level = null;
      this.view = new View(board_container_id, score_id, life_id);
      this.is_in_progress = false;
   }


   loadLevel(level_text) {
      this.level = new Level(this, level_text);
      this.level.initialize();
      this.view.initialize(this.level.getBoardPositionArray(), this.level.buildGhostDoorDirectionMap());
   }
   

   start() {
      if (this.is_in_progress === false) {  
         this.animation_interval = setInterval(function(ref) {ref.nextTurn();}, Configuration.interval_delay_in_milliseconds, this);
         this.is_in_progress = true; 
      }
   }


   nextTurn() {
      this.level.executeTurn();
      this.handleWin();
      this.handleDefeat();
   }


   handleWin() {
      if (this.level.isWon()) {
         this.view.printMessage('Victory')
         this.end();
      }
   }
   
   
   handleDefeat() {
      if (this.level.isLost()) {
         this.view.printMessage('Game over');
         this.end();
      }
   }


   end() {
      clearInterval(this.animation_interval);
      this.is_in_progress = false;
   }


   setPacmanDirection(direction_name) {
      this.level.setNextPacmanDirection(direction_name);
   }


   isInProgress() {
      return this.is_in_progress;
   }


   updateView(board_positions, style_class, score, number_of_lifes) {
      this.view.update(board_positions, style_class, score, number_of_lifes);
   }
   
   
}