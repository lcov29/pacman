"use strict";

import Level from "./Level.mjs";
import View from "./View.mjs";
import Configuration from "./Configuration.mjs";


export default class Game {


   constructor(board_container_id, score_id, life_id) {
      this.animation_interval = null;
      this.level = null;
      this.view = new View(board_container_id, score_id, life_id);
      this.is_in_progress = false;
   }


   loadLevel() {
      this.level = new Level(this);
      this.level.initialize(this.readLevelJson());
      this.view.initialize(this.level.getBoardPositionArray(), this.level.buildGhostDoorDirectionMap());
   }


   readLevelJson() {
      let level = sessionStorage.getItem("customLevel");
      sessionStorage.removeItem("customLevel");
      if (level === null) {
         level = Configuration.DEFAULT_LEVEL_JSON;
      }
      return level;
   }
   

   start() {
      if (this.is_in_progress === false) {  
         this.animation_interval = setInterval(function(ref) {ref.nextTurn();}, Configuration.INTERVAL_DELAY_IN_MILLISECONDS, this);
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


   updateView(board_positions, style_class, score, number_of_lifes) {
      this.view.update(board_positions, style_class, score, number_of_lifes);
   }


   isInProgress() {
      return this.is_in_progress;
   }


   processUserCommand(keycode) {
      if (this.isInProgress()) {
         switch(keycode) {
         
            case Configuration.KEY_CODE_UP_ARROW:
            case Configuration.KEY_CODE_W:
               this.level.setNextPacmanDirection(Configuration.DIRECTION_NAME_UP);
               break;
            
            case Configuration.KEY_CODE_RIGHT_ARROW:
            case Configuration.KEY_CODE_D:
               this.level.setNextPacmanDirection(Configuration.DIRECTION_NAME_RIGHT);
               break;
            
            case Configuration.KEY_CODE_DOWN_ARROW:
            case Configuration.KEY_CODE_S:
               this.level.setNextPacmanDirection(Configuration.DIRECTION_NAME_DOWN);
               break;
      
            case Configuration.KEY_CODE_LEFT_ARROW:
            case Configuration.KEY_CODE_A:
               this.level.setNextPacmanDirection(Configuration.DIRECTION_NAME_LEFT);
               break;
         }         
      }
   }
   
   
}