"use strict";

import GhostStateScatter from "./GhostStateScatter.mjs";
import GhostStateChase from "./GhostStateChase.mjs";
import GhostStateFlee from "./GhostStateFlee.mjs";
import GhostStateDead from "./GhostStateDead.mjs";
import Directions from "./Directions.mjs";
import Actor from "./Actor.mjs";


export default class Ghost extends Actor {


   constructor(level, position, routing) {
      super(level, position); 
      this.routing = routing;
      this.base_respawn_style_class = "";
      this.scatter_position_character = "";
      this.scatter_position_id = -1;
      this.spawn_position_character = "";
      this.spawn_position_id = position.getID();
      this.state = null;
   }


   setBaseRespawnStyleClass(style_class_name) {
      this.base_respawn_style_class = style_class_name;
   }


   setScatterCharacter(character) {
      this.scatter_position_character = character;
   }


   setScatterID(position_id) {
      this.scatter_position_id = position_id;
   }


   setSpawnCharacter(character) {
      this.spawn_position_character = character;
   }


   setSpawnID(position_id) {
      this.spawn_position_id = position_id;
   }


   setInitialState() {
      if (this.state === null) {
         this.state = new GhostStateScatter(7, this);
      }
   }


   setState(state) {
      this.state = state;
   }


   getRouting() {
      return this.routing;
   }


   getBaseRespawnStyleClass() {
      return this.base_respawn_style_class;
   }


   getStateName() {
      return this.state.getName();
   }


   getScatterCharacter(){
      return this.scatter_position_character;
   }


   getScatterID() {
      return this.scatter_position_id;
   }


   getSpawnCharacter() {
      return this.spawn_position_character;
   }


   getSpawnID() {
      return this.spawn_position_id;
   }


   getTeleportationStatus() {
      return this.has_teleported_in_previous_turn;
   }


   isNextPositionEqualToTeleportDestination() {
      return super.getNextPosition().getID() === super.getTeleportDestinationForCurrentPosition().getID();
   }


   move() {
      this.state.move();
   }


   scare() {
      this.setState(new GhostStateFlee(30, this));
   }


   kill() {
      this.setState(new GhostStateDead(this));
   }


   // TODO: RENAME TO reverseCurrentMovementDirection
   reverseMovementDirection() {
      let direction_name = super.getCurrentMovementDirectionName();
      let reverse_direction_name = Directions.getReversedDirectionName(direction_name);
      super.setMovementDirectionName(reverse_direction_name);
   }


   selectClosestPacmanID() {
      let pacman_ids = this.level.getPacmanIDs();
      let min_cost_id = null;
      let min_path_cost = Infinity;
      let current_id = -1;
      
      for (let pacman_id of pacman_ids) {   
         current_id = super.getCurrentPosition().getID();
         let current_path_cost =  this.routing.getShortestDistanceBetween(current_id, pacman_id);
         if (current_path_cost < min_path_cost) {
            min_path_cost = current_path_cost;
            min_cost_id = pacman_id;
         }
      }
      return min_cost_id;
   }


   moveToPosition(x, y) {
      super.loadCurrentPositionFromBoard();
      super.setNextPosition(this.level.getBoardPositionAt(x, y));
      this.state.handleTeleportation();
      this.state.handleScatterPositionCollision();
      this.state.handlePacmanCollisionOnCurrentPosition();
      this.state.handlePacmanCollisionOnNextPosition();
      this.state.handleWallCollision();
      this.state.handleSpawnCollision();
      if (this.has_teleported_in_previous_turn === false) {
         this.updateMovementDirection(super.getCurrentPosition(), super.getNextPosition());
      }
      super.updateBoard(this.state.getStyleClass(), this.state.getSpriteDisplayPriority());
      super.updateCurrentPosition();
   }


   updateMovementDirection(current_position, next_position) {
      if (current_position.getID() !== next_position.getID()) {
         let direction_x = next_position.getX() - current_position.getX();
         let direction_y = next_position.getY() - current_position.getY();
         let direction_name = Directions.getDirectionNameByIndex(direction_x, direction_y);
         super.setMovementDirectionName(direction_name);
      }
   }


   randomizeMovementDirection() {
      while (true) {
         let random_direction_name = Directions.getRandomDirectionName();
         if (random_direction_name !== super.getCurrentMovementDirectionName()) {
            super.setMovementDirectionName(random_direction_name);
            break;
         }
      }
   }


   killPacman(pacman_id) {
      this.level.killPacman(pacman_id);
   }


   countScaredGhosts() {
      return this.level.countScaredGhosts();
   }

   
}
