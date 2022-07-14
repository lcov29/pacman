'use strict';

import Directions from './Directions.mjs';
import Configuration from '../Configuration.mjs';
import MovementRequest from '../MovementRequest.mjs';


export default class Actor {


   constructor(level, position) {
      this.level = level;
      this.currentPosition = position;
      this.nextPosition = position;
      this.character = '';
      this.movementDirectionName = '';
      this.hasTeleportedInPreviousTurn = false;
      this.updateFlagCurrentPosition = true;
      this.updateFlagNextPosition = true;
      this.spriteDisplayPriority = -1;
   }


   setSpriteDisplayPriority(priority) {
      this.spriteDisplayPriority = priority;
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


   getTeleportDestinationForCurrentPosition() {
      return this.level.getTeleportDestination(this.currentPosition);
   }


   isCurrentPositionActorCharacter(character) {
      return this.currentPosition.getActorLayerCharacter() === character;
   }


   isCurrentPositionElementCharacter(character) {
      return this.currentPosition.getElementLayerCharacter() === character;
   }


   isNextPositionActorCharacter(character) {
      return this.nextPosition.getActorLayerCharacter() === character;
   }


   isNextPositionElementCharacter(character) {
      return this.nextPosition.getElementLayerCharacter() === character;
   }


   isCurrentPositionTeleporter() {
      let currentPositionElement = this.currentPosition.getElementLayerCharacter();
      return Configuration.teleporterCharacterList.includes(currentPositionElement);
   }


   isMovementDirectionSet() {
      return this.movementDirectionName !== '';
   }


   incrementScoreBy(value) {
      this.level.incrementScoreBy(value);
   }


   sendLevelMovementRequest(ghostStateName) {
      const request = this.createMovementRequest(ghostStateName);
      this.level.processMovementRequest(request);
   }


   sendLevelBackgroundRequest(request) {
      this.level.processBackgroundRequest(request);
   }


   createMovementRequest(ghostStateName) {
      const request = new MovementRequest();
      request.xPositionStart = this.currentPosition.getX();
      request.yPositionStart = this.currentPosition.getY();
      request.xPositionDestination = this.nextPosition.getX();
      request.yPositionDestination = this.nextPosition.getY();

      const direction = this.getCurrentMovementDirection();
      request.xDirection = direction.x;
      request.yDirection = direction.y;

      request.directionName = this.movementDirectionName;
      request.actorCharacter = this.character;
      request.spriteDisplayPriority = this.spriteDisplayPriority;

      if (ghostStateName) {
         request.actorStateName = ghostStateName;
      }

      return request;
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
