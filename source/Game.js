"use strict";

class Game {

   
   constructor(field_input, field_container_id, score_id, life_id) {
      this.view = new View(field_container_id, score_id, life_id);
      this.level = new Level(field_input, this.view);
      this.view.initialize(this.level.field.getFieldCopy());
      this.animation_interval = undefined;
   }
   
   
   //TODO: implement level validation
   isLevelInputValid(level_text) {   }
   
   
   nextStep() {
      this.level.movePacmans();
      this.level.update();
      this.level.moveGhosts();
      this.level.update();
      this.level.deleteDeadPacmans();
      this.handleWin();
      this.handleDefeat();
   }
   
      
   start() {
      // prevent the start of an already started game
      if (this.animation_interval === undefined) {  
         this.animation_interval = setInterval(function(ref) {ref.nextStep();}, Configuration.interval_delay_in_milliseconds, this);   
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
      if (this.isGameWon()) {
         this.view.printMessage('Victory')
         this.end();
      }
   }
   
   
   handleDefeat() {
      if (this.isGameLost()) {
         this.view.printMessage('Game over');
         this.end();
      }
   }
   
   
   isGameWon() {
      return this.level.available_points == 0;
   }

   
   isGameLost() {
      return this.level.getNumberOfLifes() == 0;
   }
   
   
}