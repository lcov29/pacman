"use strict";

class Ghost extends Actor {
   
   
   constructor(level, character, position, routing, scatter_character) {
      super(level, character, position, Configuration.initial_ghosts_direction);
      this.routing = routing;
      //this.state = new GhostStateChase(20, this);
      this.state = new GhostStateScatter(7, this);
      this.scatter_position_character = scatter_character;
      this.scatter_position_id = -1;
   }


   setState(state) {
      this.state = state;
   }


   setScatterID(position_id) {
      this.scatter_position_id = position_id;
   }


   getRouting() {
      return this.routing;
   }


   getScatterCharacter(){
      return this.scatter_position_character;
   }


   getScatterID() {
      return this.scatter_position_id;
   }


   isNextPositionEqualToTeleportDestination() {
      return super.getNextPosition().getID() === super.getTeleportDestinationForCurrentPosition().getID();
   }


   move() {
      return this.state.move();
   }


   calculateNextRoutingPosition(start_id, destination_id) {
      return this.routing.calculateNextPositionOnShortestPath(start_id, destination_id);
   }


   moveToPosition(x, y) {
      super.setNextPosition(super.getBoardPositionAt(x, y))
      if (super.getCurrentPosition().getID() === super.getNextPosition().getID()) {
         super.setTurnMovementStatus(true);
      } else {
         if (super.handleCollisionWithSameActorType()) {
            this.updateMovementDirection(super.getCurrentPosition(), super.getNextPosition());
            this.handleTeleportation();
            this.handlePacmanCollision();
            this.updateNextPositionOccupiedCharacter();
            super.updateLevel();
            super.updateCurrentOccupiedBoardCharacter();
            super.updateCurrentPosition();
            super.setTurnMovementStatus(true);
         }
      }
      return super.getTurnMovementStatus();
   }


   selectClosestPacmanID() {
      let pacman_ids = super.getPacmanIDs();
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


   handleTeleportation() {
      // prevent handling when ghost is not on teleporter or simply moving over without teleporting
      if (super.isOccupiedBoardElementTeleporter() && this.isNextPositionEqualToTeleportDestination()) {
         let next_position_after_teleportation = this.calculateNextPositionFrom(super.getNextPosition().getID());
         this.updateMovementDirection(super.getNextPosition(), next_position_after_teleportation);
      }
   }


   handlePacmanCollision() {
      if (super.isNextBoardPositionEqual(Configuration.pacman_character)) {
         let pacman_id = super.getNextPosition().getID();
         super.decrementLifeOfPacman(pacman_id);
      }
   }


   updateMovementDirection(current_position, next_position) {
      if (current_position.getID() !== next_position.getID()) {
         let direction_name = Directions.calculateMovementDirectionName(current_position, next_position);
         super.setMovementDirectionName(direction_name);
      }
   }


   updateNextPositionOccupiedCharacter() {
      if (super.isNextBoardPositionEqual(Configuration.ghost_blinky_character) || 
         super.isNextBoardPositionEqual(Configuration.pacman_character)) {
         super.updateNextOccupiedBoardCharacter(Configuration.empty_tile_character);
      } else {
         super.updateNextOccupiedBoardCharacter();
      }
   }

   
}
