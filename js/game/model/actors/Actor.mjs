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


   get currentPositionId() {
      return this.#currentPosition.id;
   }


   get nextPosition() {
      return this.#nextPosition;
   }


   get nextPositionId() {
      return this.#nextPosition.id;
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
      return this.#nextPosition.elementCharacter === character;
   }


   isCurrentPositionTeleporter() {
      const currentPositionElement = this.#currentPosition.elementCharacter;
      return Configuration.teleporterCharacterList.includes(currentPositionElement);
   }


   incrementScoreBy(value) {
      this.#level.incrementScoreBy(value);
   }


   sendLevelMovementRequest(ghostStateName) {
      const request = this.#createMovementRequest(ghostStateName);
      this.#level.processMovementRequest(request);
   }


   sendLevelBackgroundRequest(request) {
      this.#level.processBackgroundRequest(request);
   }


   loadCurrentPositionFromBoard() {
      this.#currentPosition = this.#level.getBoardPositionAt(this.#currentPosition.x, this.#currentPosition.y); 
   }


   loadNextPositionFromBoard() {
      this.#nextPosition = this.#level.getBoardPositionAt(this.#nextPosition.x, this.#nextPosition.y);
   }


   updateCurrentPosition() {
      this.#currentPosition = this.#nextPosition;
      this.#nextPosition = null;
   }


   calculateNextPositionByCurrentDirection() {
      try {
         const direction = this.getCurrentMovementDirection();
         const nextX = this.#currentPosition.x + direction.x;
         const nextY = this.#currentPosition.y + direction.y;
         return this.#level.getBoardPositionAt(nextX, nextY);
      } catch(e) {
         return this.#currentPosition;
      }
   }


   #createMovementRequest(ghostStateName) {
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


}
