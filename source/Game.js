"use strict";

class Game {

   
   constructor(field_input, field_container_id, score_id, life_id) {
      this.view = new View(field_container_id, score_id, life_id);
      this.level = new Level(field_input, this.view);
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
      this.initializeView();
      this.animation_interval = setInterval(function(ref) {ref.nextStep();}, 500, this);   
      document.addEventListener('keydown', this.callBackEventListener, true);
   }
   

   initializeView() {
      var field = this.level.field.getFieldCopy();
      this.view.initialize(field);
   }

   
   callBackEventListener(event) {
         //SOURCE http://www.javascriptkeycode.com   
         const KEY_CODE_LEFT_ARROW = 37;
         const KEY_CODE_UP_ARROW = 38;
         const KEY_CODE_RIGHT_ARROW = 39;
         const KEY_CODE_DOWN_ARROW = 40;
         const KEY_CODE_A = 65;
         const KEY_CODE_D = 68;
         const KEY_CODE_S = 83;
         const KEY_CODE_W = 87;

         switch(event.keyCode) {
            
            case KEY_CODE_UP_ARROW:
            case KEY_CODE_W:
               game.level.setNextPacmanDirection('up');
               break;
            
            case KEY_CODE_LEFT_ARROW:
            case KEY_CODE_A:
               game.level.setNextPacmanDirection('left');
               break;
            
            case KEY_CODE_DOWN_ARROW:
            case KEY_CODE_S:
               game.level.setNextPacmanDirection('down');
               break;
               
            case KEY_CODE_RIGHT_ARROW:
            case KEY_CODE_D:
               game.level.setNextPacmanDirection('right');
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