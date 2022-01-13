"use strict";

class Ghost extends Actor {
   
   
   constructor(level, position, character, base_style_class, routing, scatter_character) {
      super(level, 
            position, 
            character,
            Configuration.initial_ghosts_direction,
            base_style_class);
      this.routing = routing;
      //this.state = new GhostStateChase(20, this);
      this.state = new GhostStateScatter(7, this);
      //this.state = new GhostStateFlee(Infinity, this);
      //this.state = new GhostStateFlee(30, this);
      this.scatter_position_character = scatter_character;
      this.scatter_position_id = -1;
      this.spawn_position_id = position.getID();
      this.has_teleported_in_previous_turn === false;
   }


   setState(state) {
      this.state = state;
   }


   setScatterID(position_id) {
      this.scatter_position_id = position_id;
   }


   setTeleportationStatus(status) {
      this.has_teleported_in_previous_turn = status;
   }


   getRouting() {
      return this.routing;
   }


   getSpawnID() {
      return this.spawn_position_id;
   }


   getScatterCharacter(){
      return this.scatter_position_character;
   }


   getScatterID() {
      return this.scatter_position_id;
   }


   getStyleClass() {
      return `${this.state.getBaseStyleClass()}_${super.getMovementDirectionName()}`;
   }


   isNextPositionEqualToTeleportDestination() {
      return super.getNextPosition().getID() === super.getTeleportDestinationForCurrentPosition().getID();
   }


   move() {
      return this.state.move();
   }


   scare() {
      this.setState(new GhostStateFlee(30, this));
   }


   kill() {
      this.setState(new GhostStateDead(this));
   }


   calculateNextRoutingPosition(start_id, destination_id) {
      return this.routing.calculateNextPositionOnShortestPath(start_id, destination_id);
   }


   moveToPosition(x, y) {
      super.setNextPosition(super.getBoardPositionAt(x, y))
      let teleportation_status = this.handleTeleportation();
      this.handleScatterPositionCollision();
      this.handlePacmanCollision();
      this.handleWallCollision();

      if (super.handleCollisionWithSameActorType()) {

         this.handleSpawnCollision();      // NEW
         super.setTurnMovementStatus(true);
         this.setTeleportationStatus(teleportation_status);

         if (teleportation_status === false) {
            this.updateMovementDirection(super.getCurrentPosition(), super.getNextPosition());
         }

         this.updateNextPositionOccupiedCharacter();
         super.updateLevel(this.getStyleClass());

         if (!this.isNextPositionEqualToCurrentPosition()) {
            super.updateCurrentOccupiedBoardCharacter();
            super.updateCurrentPosition();
         }

         super.setTurnMovementStatus(true);

      } else {

         // CHECK FOR DEADLOCKS BETWEEN DIFFERENT GHOST TYPES !!

         // prevent deadlock of colliding ghosts while in state flee
         if (this.state.getName() === Configuration.ghost_state_flee_name) {
            this.randomizeMovementDirection();
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
      // ghosts have the option to move over teleporters without teleporting if their current state 
      // uses a movement pattern based on the routing table 

      let executed = false;
      if (super.isOccupiedBoardElementTeleporter()) {

         if (this.state.getName() === Configuration.ghost_state_flee_name && 
             this.has_teleported_in_previous_turn === false) {
            let destination = super.getTeleportDestinationForCurrentPosition();
            super.setNextPosition(destination);
            executed = true;
         }

         if (this.state.getName() !== Configuration.ghost_state_flee_name && 
             this.isNextPositionEqualToTeleportDestination()) {
            let next_position_after_teleportation = this.calculateNextPositionFrom(super.getNextPosition().getID());
            this.updateMovementDirection(super.getNextPosition(), next_position_after_teleportation);
            executed = true;
         }

      }
      return executed;
   }


   handleWallCollision() {
      // wall collisions will only occur in GhostStateFlee because its movement pattern 
      // does not use the routing table to calculate the next position

      if (super.isNextBoardPositionEqual(Configuration.wall_character)) {
         super.setNextPosition(super.getCurrentPosition());
         this.randomizeMovementDirection();
      }
   }


   randomizeMovementDirection() {
      while (true) {
         let random_direction_name = Directions.getRandomDirectionName();
         if (random_direction_name !== super.getMovementDirectionName()) {
            super.setMovementDirectionName(random_direction_name);
            break;
         }
      }
   }


   handleScatterPositionCollision() {
      if (this.state.getName() === Configuration.ghost_state_scatter_name &&
          super.getCurrentPosition().getID() === this.getScatterID()) {
         super.setNextPosition(super.getCurrentPosition());
      }
   }


   // ADD HANDLING FOR COLLISION WHILE SCARED
   handlePacmanCollision() {
      if (super.isNextBoardPositionEqual(Configuration.pacman_character)) {

         if (this.state.getName() === Configuration.ghost_state_flee_name) {
            this.kill();
            super.incrementScoreBy(Configuration.score_value_per_eaten_ghost);
         } else {
            let pacman_id = super.getNextPosition().getID();
            super.decrementLifeOfPacman(pacman_id);
         }

      }
   }


   handleSpawnCollision() {
      if (this.state.getName() === Configuration.ghost_state_flee_name &&
          this.getCurrentPosition().getID() === this.getSpawnID()) {
            this.state = new GhostStateChase(20, this);
      }
   }


   updateMovementDirection(current_position, next_position) {
      if (current_position.getID() !== next_position.getID()) {
         let direction_name = Directions.calculateMovementDirectionName(current_position, next_position);
         super.setMovementDirectionName(direction_name);
      }
   }


   updateNextPositionOccupiedCharacter() {
      if (super.getNextPosition().getID() !== super.getCurrentPosition().getID()) {

         if (super.isNextBoardPositionEqual(Configuration.ghost_blinky_character) || 
             super.isNextBoardPositionEqual(Configuration.pacman_character)) {
            super.updateNextOccupiedBoardCharacter(Configuration.empty_tile_character);
         } else {
            super.updateNextOccupiedBoardCharacter();
         }

      }
   }


   reverseMovementDirection() {
      let reverse_direction = Directions.getReversedDirectionName(super.getMovementDirectionName());
      super.setMovementDirectionName(reverse_direction);
   }


   isNextPositionEqualToCurrentPosition() {
      return super.getNextPosition().getID() === super.getCurrentPosition().getID();
   }

   
}
