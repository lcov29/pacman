'use strict';

import Directions from '../Directions.mjs';
import Configuration from '../../../global/Configuration.mjs';
import MovementRequest from '../../requests/MovementRequest.mjs';


export default class Actor {


   #level = null;
   #currentPosition = null;
   #nextPosition = null;
   #character = '';
   #movementDirectionName = '';
   #hasTeleportedInPreviousTurn = false;
   #spriteDisplayPriority = -1;


   constructor(level, position) {
      this.#level = level;
      this.#currentPosition = position;
      this.#nextPosition = position;
   }


   set nextPosition(position) {
      this.#nextPosition = position;
   }


   set character(character) {
      this.#character = character;
   }


   set movementDirectionName(directionName) {
      this.#movementDirectionName = directionName;
   }


   set hasTeleportedInPreviousTurn(status) {
      this.#hasTeleportedInPreviousTurn = status;
   }


   set spriteDisplayPriority(priority) {
      this.#spriteDisplayPriority = priority;
   }


   get level() {
      return this.#level;
   }


   // TODO: Add a method like isCurrentPositionId(id)
   get currentPosition() {
      return this.#currentPosition;
   }


   get nextPosition() {
      return this.#nextPosition;
   }


   get character() {
      return this.#character;
   }


   get movementDirectionName() {
      return this.#movementDirectionName;
   }


   get hasTeleportedInPreviousTurn() {
      return this.#hasTeleportedInPreviousTurn;
   }


   getCurrentMovementDirection() {
      return Directions.getDirectionByName(this.#movementDirectionName);
   }


   getTeleportDestinationForCurrentPosition() {
      return this.#level.getTeleportDestination(this.#currentPosition);
   }


   isNextPositionActorCharacter(character) {
      return this.#nextPosition.actorLayerCharacter === character;
   }


   isNextPositionElementCharacter(character) {
      return this.#nextPosition.elementLayerCharacter === character;
   }


   isCurrentPositionTeleporter() {
      let currentPositionElement = this.#currentPosition.elementLayerCharacter;
      return Configuration.teleporterCharacterList.includes(currentPositionElement);
   }


   // TODO: remove method and its use in Pacman.move()
   isMovementDirectionSet() {
      return this.#movementDirectionName !== '';
   }


   incrementScoreBy(value) {
      this.#level.incrementScoreBy(value);
   }


   sendLevelMovementRequest(ghostStateName) {
      const request = this.createMovementRequest(ghostStateName);
      this.#level.processMovementRequest(request);
   }


   sendLevelBackgroundRequest(request) {
      this.#level.processBackgroundRequest(request);
   }


   createMovementRequest(ghostStateName) {
      const request = new MovementRequest();
      request.xPositionStart = this.#currentPosition.x;
      request.yPositionStart = this.#currentPosition.y;
      request.xPositionDestination = this.#nextPosition.x;
      request.yPositionDestination = this.#nextPosition.y;

      const direction = this.getCurrentMovementDirection();
      request.xDirection = direction.x;
      request.yDirection = direction.y;

      request.directionName = this.#movementDirectionName;
      request.actorCharacter = this.#character;
      request.isTeleportation = this.#hasTeleportedInPreviousTurn;
      request.spriteDisplayPriority = this.#spriteDisplayPriority;

      if (ghostStateName) {
         request.actorStateName = ghostStateName;
      }

      return request;
   }


   loadCurrentPositionFromBoard() {
      let currentX = this.#currentPosition.x;
      let currentY = this.#currentPosition.y;
      this.#currentPosition = this.#level.getBoardPositionAt(currentX, currentY); 
   }


   loadNextPositionFromBoard() {
      let nextX = this.#nextPosition.x;
      let nextY = this.#nextPosition.y;
      this.#nextPosition = this.#level.getBoardPositionAt(nextX, nextY);
   }


   updateCurrentPosition() {
      this.#currentPosition = this.#nextPosition;
      this.#nextPosition = null;
   }


   calculateNextPositionByCurrentDirection() {
      let direction = this.getCurrentMovementDirection();
      let nextX = this.#currentPosition.x + direction.x;
      let nextY = this.#currentPosition.y + direction.y;
      let nextPosition = null;
      try {
         nextPosition =  this.#level.getBoardPositionAt(nextX, nextY);
      } catch(e) {
         // prevent actor from leaving the board
         nextPosition = this.#currentPosition;
      }
      return nextPosition;
   }


}
