"use strict";

class Ghost extends Actor {
   
   
   constructor(level, position, routing) {
      super(level, position);
      this.routing = routing;
   }
   

   getRouting() {
      return this.routing;
   }


   moveToPosition(position) {
      super.setNextPosition(position)
      super.calculateMovementDirectionName();
      this.handleTeleportation();
      this.handlePacManCollision();
      super.sendLevelUpdateRequests(true);
      this.updateOccupiedBoardElement();
      super.updateCurrentPosition();
   }


   selectClosestPacmanID() {
      //var pacman_ids = super.getLevel().getPacmanIDs();
      var pacman_ids = super.getPacmanIDs();
      var min_cost_id = undefined;
      var min_path_cost = Infinity;
      var current_id = -1;
      
      for (var pacman_id of pacman_ids) {   
         current_id = super.getCurrentPosition().getID();
         var current_path_cost =  this.routing.getShortestDistanceBetween(current_id, pacman_id);
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
         var next_position_after_teleportation = this.calculateNextPositionFrom(super.getNextPosition());
         super.calculateMovementDirectionName(super.getNextPosition(), next_position_after_teleportation);
      }
   }


   handlePacManCollision() {
      if (super.isNextBoardPositionEqual(Configuration.pacman_character)) {
         let pacman_id = super.getNextPositionID();
         super.decrementLifeOfPacman(pacman_id);
      }
   }


   //TODO: check for edge cases
   updateOccupiedBoardElement() {
      if (super.isNextBoardPositionEqual(Configuration.ghost_blinky_character) || 
          super.isNextBoardPositionEqual(Configuration.pacman_character)) {
         super.setOccupiedBoardElement(Configuration.empty_tile_character);
      } else {
         super.updateNextOccupiedBoardElement();
      }
   }


   isNextPositionEqualToTeleportDestination() {
      return super.getNextPositionID() == super.getTeleportDestinationForCurrentPosition().getID();
   }

   
}
