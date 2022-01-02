"use strict";

class Ghost extends Actor {
   
   
   constructor(level, character, position, routing) {
      super(level, character, position, Configuration.initial_ghosts_direction);
      this.routing = routing;
   }


   getRouting() {
      return this.routing;
   }


   isNextPositionEqualToTeleportDestination() {
      return super.getNextPosition().getID() === super.getTeleportDestinationForCurrentPosition().getID();
   }


   moveToPosition(x, y) {
      super.setNextPosition(super.getBoardPositionAt(x, y))
      this.updateMovementDirection(super.getCurrentPosition(), super.getNextPosition());
      this.handleTeleportation();
      this.handlePacManCollision();
      this.updateNextPositionOccupiedCharacter();
      super.updateLevel();
      super.updateCurrentOccupiedBoardCharacter();
      super.updateCurrentPosition();
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


   handlePacManCollision() {
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
