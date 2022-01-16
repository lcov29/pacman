"use strict";

export default class Ghost extends Actor {
   
   
   constructor(level, position, character, base_style_class, routing, scatter_character, spawn_character) {
      super(level, 
            position, 
            character,
            Configuration.initial_ghosts_direction,
            base_style_class);
      this.routing = routing;
      this.scatter_position_character = scatter_character;
      this.scatter_position_id = -1;
      this.spawn_position_character = spawn_character;
      this.spawn_position_id = position.getID();
      this.has_teleported_in_previous_turn === false;
      this.state = new GhostStateScatter(7, this);
   }


   setState(state) {
      this.state = state;
   }


   setScatterID(position_id) {
      this.scatter_position_id = position_id;
   }


   setSpawnID(position_id) {
      this.spawn_position_id = position_id;
   }


   setTeleportationStatus(status) {
      this.has_teleported_in_previous_turn = status;
   }


   getStateName() {
      return this.state.getName();
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


   getSpawnCharacter() {
      return this.spawn_position_character;
   }


   getSpawnID() {
      return this.spawn_position_id;
   }


   getStyleClass() {
      return `${this.state.getBaseStyleClass()}_${super.getMovementDirectionName()}`;
   }


   isNextPositionEqualToTeleportDestination() {
      return super.getNextPosition().getID() === super.getTeleportDestinationForCurrentPosition().getID();
   }


   isStateEqual(state_name) {
      return this.state.getName() === state_name;
   }


   move() {
      this.state.move();
      return true;
   }


   scare() {
      this.setState(new GhostStateFlee(30, this));
   }


   kill() {
      this.setState(new GhostStateDead(this));
   }


   calculateNextPositionOnShortestPath(start_id, destination_id) {
      return this.routing.calculateNextPositionOnShortestPath(start_id, destination_id);
   }


   reverseMovementDirection() {
      let reverse_direction = Directions.getReversedDirectionName(super.getMovementDirectionName());
      super.setMovementDirectionName(reverse_direction);
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
      this.handleTeleportation();
      this.handleScatterPositionCollision();
      this.handlePacmanCollision();
      this.handleWallCollision();
      this.handleSpawnCollision();
      if (this.has_teleported_in_previous_turn === false) {
         this.updateMovementDirection(super.getCurrentPosition(), super.getNextPosition());
      }
      super.updateLevel(this.getStyleClass());
      super.updateCurrentPosition();
   }


   handleTeleportation() {
      // ghosts have the option to move over teleporters without teleporting if their current state 
      // uses a movement pattern based on the routing table 

      if (super.isOccupiedBoardElementTeleporter()) {

         if (this.state.getName() === Configuration.ghost_state_flee_name && 
             this.has_teleported_in_previous_turn === false) {
            let destination = super.getTeleportDestinationForCurrentPosition();
            super.setNextPosition(destination);
            this.setTeleportationStatus(true);
         }

         if (this.state.getName() !== Configuration.ghost_state_flee_name && 
             this.isNextPositionEqualToTeleportDestination()) {
            let next_position_after_teleportation = this.calculateNextPositionFrom(super.getNextPosition().getID());
            this.updateMovementDirection(super.getNextPosition(), next_position_after_teleportation);
            this.setTeleportationStatus(true);
         }

      } else {
         this.setTeleportationStatus(false);
      }
   }


   handleScatterPositionCollision() {
      if (this.state.getName() === Configuration.ghost_state_scatter_name &&
          super.getCurrentPosition().getID() === this.getScatterID()) {
         super.setNextPosition(super.getCurrentPosition());
      }
   }


   handlePacmanCollision() {
      this.state.handlePacmanCollisionOnCurrentPosition();
      this.state.handlePacmanCollisionOnNextPosition();
   }


   handleWallCollision() {
      // wall collisions will only occur in GhostStateFlee because its movement pattern 
      // does not use the routing table to calculate the next position

      if (super.isNextBoardPositionEqual(Configuration.wall_character)) {
         super.setNextPosition(super.getCurrentPosition());
         this.randomizeMovementDirection();
      }
   }


   handleSpawnCollision() {
      // prevent ghost from leaving the spawn while pacman has still scared ghost to chase
      if (this.state.getName() === Configuration.ghost_state_dead_name &&
          this.getCurrentPosition().getID() === this.getSpawnID() &&
          this.level.countScaredGhosts() === 0) {
            this.state.end();
      }
   }


   updateMovementDirection(current_position, next_position) {
      if (current_position.getID() !== next_position.getID()) {
         let direction_name = Directions.calculateMovementDirectionName(current_position, next_position);
         super.setMovementDirectionName(direction_name);
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


   killPacman(pacman_id) {
      this.level.killPacman(pacman_id);
   }

   
}
