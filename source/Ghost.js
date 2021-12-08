"use strict";

class Ghost extends Actor {
   
   
   constructor(level, position, routing) {
      super(level, position);
      this.routing = routing;
   }
   

   moveToPosition(position, ghost_character) {
      this.setNextPosition(position)
      this.handlePacManCollision();
      this.updateBoard(ghost_character);
      this.updateCurrentPosition();
   }


   selectClosestPacmanID() {
      var pacman_ids = this.level.getPacmanIDs();
      var min_cost_id = undefined;
      var min_path_cost = Infinity;
      
      for (var pacman_id of pacman_ids) {   
         var current_path_cost =  this.routing.getShortestDistanceBetween(this.current_position_id, pacman_id);
         if (current_path_cost < min_path_cost) {
            min_path_cost = current_path_cost;
            min_cost_id = pacman_id;
         }
      }
      return min_cost_id;
   }

    
   handlePacManCollision() {
      if (this.isNextBoardPositionEqual(Configuration.pacman_character)) {
         this.decrementLifeOfPacman();
      }
   }

   
   updateBoard(ghost_character) {
      this.level.addUpdateRequest(new UpdateRequest(this.current_position,
                                                    this.occupied_board_element));
      this.updateOccupiedBoardElement();
      this.level.addUpdateRequest(new UpdateRequest(this.next_position,
                                                    ghost_character,
                                                    Directions.calculateMovementDirection(this.current_position,
                                                                                          this.next_position)));
   }
    
       
   decrementLifeOfPacman() {
      for (let pacman of this.level.pacmans) {
         if (pacman.getCurrentPositionID() == this.next_position_id) {
            pacman.decrementLife();
         }
      }
   }
   
   
   //TODO: check for edge cases
   updateOccupiedBoardElement() {
      if (this.isNextBoardPositionEqual(Configuration.ghost_blinky_character) || 
          this.isNextBoardPositionEqual(Configuration.pacman_character)) {
         this.occupied_board_element = Configuration.empty_tile_character;
      } else {
         this.occupied_board_element = this.level.getBoardPositionElement(this.next_position);
      }
   }
   
}
