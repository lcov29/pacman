"use strict";

import Directions from "./Directions.mjs";
import UpdateRequest from "./UpdateRequest.mjs";
import Configuration from "../Configuration.mjs";


export default class Actor {


   constructor(level, position) {
      this.level = level;
      this.currentPosition = position;
      this.nextPosition = position;
      this.character = "";
      this.movementDirectionName = "";
      this.baseMovementStyleClass = "";
      this.hasTeleportedInPreviousTurn = false;
      this.updateFlagCurrentPosition = true;
      this.updateFlagNextPosition = true;
   }


   setNextPosition(position) {
      this.nextPosition = position;
   }


   setCharacter(character) {
      this.character = character;
   }


   setMovementDirectionName(directionName) {
      this.movementDirectionName = directionName;
   }


   setBaseMovementStyleClass(styleClassName) {
      this.baseMovementStyleClass = styleClassName;
   }


   setTeleportationStatus(status) {
      this.hasTeleportedInPreviousTurn = status;
   }


   setUpdateFlagCurrentPosition(status) {
      this.updateFlagCurrentPosition = status;
   }


   setUpdateFlagNextPosition(status) {
      this.updateFlagNextPosition = status;
   }


   resetUpdateFlags() {
      this.updateFlagCurrentPosition = true;
      this.updateFlagNextPosition = true;
   }


   getCurrentPosition() {
      return this.currentPosition;
   }


   getNextPosition() {
      return this.nextPosition;
   }


   getCharacter() {
      return this.character;
   }


   getCurrentMovementDirectionName() {
      return this.movementDirectionName;
   }


   getCurrentMovementDirection() {
      return Directions.getDirectionByName(this.movementDirectionName);
   }


   getBaseMovementStyleClass() {
      return this.baseMovementStyleClass;
   }


   getTeleportDestinationForCurrentPosition() {
      return this.level.getTeleportDestination(this.currentPosition);
   }


   isCurrentPositionActorCharacter(character) {
      return this.currentPosition.getActorCharacter() === character;
   }


   isCurrentPositionElementCharacter(character) {
      return this.currentPosition.getElementCharacter() === character;
   }


   isNextPositionActorCharacter(character) {
      return this.nextPosition.getActorCharacter() === character;
   }


   isNextPositionElementCharacter(character) {
      return this.nextPosition.getElementCharacter() === character;
   }


   isCurrentPositionTeleporter() {
      let currentPositionElement = this.currentPosition.getElementCharacter();
      return Configuration.TELEPORTER_CHARACTERS.includes(currentPositionElement);
   }


   isMovementDirectionSet() {
      return this.movementDirectionName !== '';
   }


   incrementScoreBy(value) {
      this.level.incrementScoreBy(value);
   }


   updateBoard(styleclassCurrentPosition, styleclassNextPosition, spritePriority = Infinity) {
      this.sendLevelUpdateRequestForCurrentPosition(styleclassCurrentPosition);
      this.sendLevelUpdateRequestForNextPosition(styleclassNextPosition, spritePriority);
      this.level.updateBoard();
      this.resetUpdateFlags();
   }


   sendLevelUpdateRequestForCurrentPosition(styleclass) {
      if (this.updateFlagCurrentPosition) {
         this.currentPosition.setActorCharacter(Configuration.EMPTY_TILE_CHARACTER);
         this.level.addUpdateRequest(new UpdateRequest(this.currentPosition, styleclass));

      }
   }


   sendLevelUpdateRequestForNextPosition(styleclass, spritePriority) {
      if (this.updateFlagNextPosition) {
         this.nextPosition.setActorCharacter(this.character);
         this.level.addUpdateRequest(new UpdateRequest(this.nextPosition, styleclass, spritePriority));
      }
   }


   loadCurrentPositionFromBoard() {
      let currentX = this.currentPosition.getX();
      let currentY = this.currentPosition.getY();
      this.currentPosition = this.level.getBoardPositionAt(currentX, currentY); 
   }


   loadNextPositionFromBoard() {
      let nextX = this.nextPosition.getX();
      let nextY = this.nextPosition.getY();
      this.nextPosition = this.level.getBoardPositionAt(nextX, nextY);
   }


   updateCurrentPosition() {
      this.currentPosition = this.nextPosition;
      this.nextPosition = null;
   }


   calculateNextPositionByCurrentDirection() {
      let direction = this.getCurrentMovementDirection();
      let nextX = this.getCurrentPosition().getX() + direction.x;
      let nextY = this.getCurrentPosition().getY() + direction.y;
      let nextPosition = null;
      try {
         nextPosition =  this.level.getBoardPositionAt(nextX, nextY);
      } catch(e) {
         // prevent actor from leaving the board
         nextPosition = this.getCurrentPosition();
      }
      return nextPosition;
   }


}
