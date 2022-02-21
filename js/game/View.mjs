'use strict';

import Configuration from '../Configuration.mjs';
import StyleClassMapper from './StyleClassMapper.mjs';


export default class View {
   
   
   constructor(boardContainerId, scoreId, lifeId) {
      this.boardContainer = document.getElementById(boardContainerId);
      this.scoreDisplay = document.getElementById(scoreId);
      this.lifeDisplay = document.getElementById(lifeId);
   }


   initialize(boardPositionArray) {
      this.clearBoard();
      this.initializeContainerDimension(boardPositionArray);
      this.initializeBackgroundElements(boardPositionArray);
      this.initializeForegroundElements(boardPositionArray);
   }


   update(boardPosition, styleClass, score, numberOfLifes) {
      this.updateBoard(boardPosition, styleClass);
      this.updateScore(score);
      this.updateLifeBar(numberOfLifes);
   }
   

   printMessage(message) {
      window.alert(message);
   }


   clearBoard() {
      this.scoreDisplay.innerHTML = '';
      this.lifeDisplay.innerHTML = '';
      while (this.boardContainer.firstChild) {
         this.boardContainer.removeChild(this.boardContainer.firstChild);
      }
   }


   // requires the same column count for all rows!
   initializeContainerDimension(board) {
      this.boardContainer.style.height = `${board.length * Configuration.DIMENSION_BACKGROUND_DIV_IN_PX}px`;
      this.boardContainer.style.width = `${board[0].length * Configuration.DIMENSION_BACKGROUND_DIV_IN_PX}px`;
   }


   initializeBackgroundElements(board) {
      let outerDiv = null;
      let idDiv = '';
      let styleClass = '';
      let currentPosition = null;

      for (let y = 0; y < board.length; y++) {
         for (let x = 0; x < board[y].length; x++) {
            currentPosition = board[y][x];
            idDiv = this.getDivID(currentPosition, Configuration.SUFFIX_BACKGROUND_DIV);
            outerDiv = this.createDiv(idDiv);
            styleClass = StyleClassMapper.getBackgroundStyleClass(currentPosition.getElementCharacter(),
                                                                   currentPosition.getID());
            outerDiv.setAttribute('class', styleClass);
            this.boardContainer.appendChild(outerDiv);
         }
      }
   }


   initializeForegroundElements(board) {
      let outerDiv = null;
      let innerDiv = null;
      let idDiv = '';
      let styleClass = '';
      let currentPosition = null;
      
      for (let y = 0; y < board.length; y++) {
         for (let x = 0; x < board[y].length; x++) {
            currentPosition = board[y][x];
            idDiv = this.getDivID(currentPosition, Configuration.SUFFIX_BACKGROUND_DIV);
            outerDiv = document.getElementById(idDiv);
            idDiv = this.getDivID(currentPosition, Configuration.SUFFIX_FOREGROUND_DIV);
            innerDiv = this.createDiv(idDiv);
            styleClass = StyleClassMapper.getForegroundStyleClass(currentPosition.getActorCharacter(),
                                                                   currentPosition.getElementCharacter());
            innerDiv.setAttribute('class', styleClass);
            outerDiv.appendChild(innerDiv);
         }
      }
   }


   updateBoard(position, styleClass) {
         let idDiv = this.getDivID(position, Configuration.SUFFIX_FOREGROUND_DIV);
         document.getElementById(idDiv).setAttribute('class', styleClass);
   }

   
   updateScore(score) {
      this.scoreDisplay.innerHTML = `Score: ${score}`;
   }
   
   
   updateLifeBar(numberOfLifes) {
      this.lifeDisplay.innerHTML = `Lifes: ${numberOfLifes}`;
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