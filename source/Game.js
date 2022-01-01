"use strict";

class Game {

   
   constructor(level_text, board_container_id, score_id, life_id) {
      this.animation_interval = undefined;
      this.level = new Level(this, level_text);
      this.view = new View(board_container_id, score_id, life_id);
      this.level.initialize();
      this.view.initialize(this.level.getBoardPositionArray());
   }
   

   updateView(board_positions, score, number_of_lifes) {
      this.view.update(board_positions, score, number_of_lifes);
   }


   isInProgress() {
      return (this.level.isWon() === false && 
              this.level.isLost() === false);
   }


   //TODO: implement level validation
   isLevelInputValid(level_text) {   }
   
   
   nextTurn() {
      this.level.executeTurn();
      this.handleWin();
      this.handleDefeat();
   }
   
      
   start() {
      // prevent the start of an already started game
      if (this.animation_interval === undefined) {  
         this.animation_interval = setInterval(function(ref) {ref.nextTurn();}, Configuration.interval_delay_in_milliseconds, this);   
         document.addEventListener('keydown', this.callBackEventListener, true);
      }
   }

   
   callBackEventListener(event) {
         switch(event.keyCode) {
            
            case Configuration.key_code_up_arrow:
            case Configuration.key_code_w:
               game.level.setNextPacmanDirection('up');
               break;
            
            case Configuration.key_code_right_arrow:
            case Configuration.key_code_d:
               game.level.setNextPacmanDirection('right');
               break;
            
            case Configuration.key_code_down_arrow:
            case Configuration.key_code_s:
               game.level.setNextPacmanDirection('down');
               break;

            case Configuration.key_code_left_arrow:
            case Configuration.key_code_a:
               game.level.setNextPacmanDirection('left');
               break;
         }         
         event.preventDefault();
   }
   
   
   end() {
      clearInterval(this.animation_interval);
      document.removeEventListener('keydown', this.callBackEventListener);
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
   
   
}