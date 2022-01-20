"use strict";

import Directions from "./Directions.mjs";
import UpdateRequest from "./UpdateRequest.mjs";
import Configuration from "./Configuration.mjs";
import StyleClassMapper from "./StyleClassMapper.mjs";


export default class Actor {


   constructor(level, position) {
      this.level = level;
      this.current_position = position;
      this.next_position = position;
      this.character = "";
      this.movement_direction_name = "";
      this.base_movement_style_class = "";
      this.has_teleported_in_previous_turn = false;
      this.update_flag_current_position = true;
      this.update_flag_next_position = true;
   }


   setNextPosition(position) {
      this.next_position = position;
   }


   setCharacter(character) {
      this.character = character;
   }


   setMovementDirectionName(direction_name) {
      this.movement_direction_name = direction_name;
   }


   setBaseMovementStyleClass(style_class_name) {
      this.base_movement_style_class = style_class_name;
   }


   setTeleportationStatus(status) {
      this.has_teleported_in_previous_turn = status;
   }


   setUpdateFlagCurrentPosition(status) {
      this.update_flag_current_position = status;
   }


   setUpdateFlagNextPosition(status) {
      this.update_flag_next_position = status;
   }


   resetUpdateFlags() {
      this.update_flag_current_position = true;
      this.update_flag_next_position = true;
   }


   getCurrentPosition() {
      return this.current_position;
   }


   getNextPosition() {
      return this.next_position;
   }


   getCurrentMovementDirectionName() {
      return this.movement_direction_name;
   }


   getCurrentMovementDirection() {
      return Directions.getDirectionByName(this.movement_direction_name);
   }


   getBaseMovementStyleClass() {
      return this.base_movement_style_class;
   }


   getTeleportDestinationForCurrentPosition() {
      return this.level.getTeleportDestination(this.current_position);
   }


   isCurrentPositionActorCharacter(character) {
      return this.current_position.getActorCharacter() === character;
   }


   isCurrentPositionElementCharacter(character) {
      return this.current_position.getElementCharacter() === character;
   }


   isNextPositionActorCharacter(character) {
      return this.next_position.getActorCharacter() === character;
   }


   isNextPositionElementCharacter(character) {
      return this.next_position.getElementCharacter() === character;
   }


   isCurrentPositionTeleporter() {
      let occupied_element_character = this.current_position.getElementCharacter();
      return this.level.isBoardElementTeleporter(occupied_element_character);
   }


   isMovementDirectionSet() {
      return this.movement_direction_name !== '';
   }


   incrementScoreBy(value) {
      this.level.incrementScoreBy(value);
   }


   updateBoard(styleclass_next_position, sprite_priority = Infinity) {
      this.sendLevelUpdateRequestForCurrentPosition();
      this.sendLevelUpdateRequestForNextPosition(styleclass_next_position, sprite_priority);
      this.level.updateBoard();
      this.resetUpdateFlags();
   }


   // TODO: CHECK IMPLEMENTATION
   // NOTE: FOR PACMAN MOVEMENT STYLECLASS CAN ALWAYS BE EMPTY_FOREGROUND_CSS_CLASS ?
   sendLevelUpdateRequestForCurrentPosition() {
      if (this.update_flag_current_position) {
         let actor = Configuration.empty_tile_character;
         let element = this.current_position.getElementCharacter();
         let styleclass = StyleClassMapper.getForegroundStyleClass(actor, element);
         this.current_position.setActorCharacter(actor);
         this.level.addUpdateRequest(new UpdateRequest(this.current_position, styleclass));

      }
   }


   sendLevelUpdateRequestForNextPosition(styleclass, sprite_priority) {
      if (this.update_flag_next_position) {
         this.next_position.setActorCharacter(this.character);
         this.level.addUpdateRequest(new UpdateRequest(this.next_position, styleclass, sprite_priority));
      }
   }


   loadCurrentPositionFromBoard() {
      this.current_position = this.level.getBoardPositionAt(this.current_position.getX(), 
                                                            this.current_position.getY());
   }


   // TODO: EXTRACT new method resetNextPosition()
   updateCurrentPosition() {
      this.current_position = this.next_position;
      this.next_position = null;
   }


   // TODO: THINK ABOUT RENAMING TO calculateNextPositionByCurrentDirection()
   // TODO: THINK ABOUT SETTING NEXT POSITION INSIDE OF THIS METHOD
   calculateNextPositionByDirection() {
      let direction = this.getCurrentMovementDirection();
      let next_xPosition = this.getCurrentPosition().getX() + direction.x;
      let next_yPosition = this.getCurrentPosition().getY() + direction.y;
      let next_position = null;
      try {
         next_position =  this.level.getBoardPositionAt(next_xPosition, next_yPosition);
      } catch(e) {
         // prevent actor from leaving the board
         next_position = this.getCurrentPosition();
      }
      return next_position;
   }


}
