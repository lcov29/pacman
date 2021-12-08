"use strict";

class Pacman extends Actor {
   
   
   constructor(level, position) {
      super(level, position);
      this.next_direction = '';
      this.lifes = Configuration.initial_pacman_lifes;
   }
   
   
   move() {
      if (this.next_direction != '') {
         let direction = Directions.getDirectionByName(this.next_direction);
         super.calculateNextPosition(direction);
         this.handleWallCollision();
         this.handleTeleportation();
         this.handlePointCollision();
         this.handleGhostCollision();
         this.updateLevel();
         super.updateCurrentPosition();
      }
   }
   
   
   handleWallCollision() {
      if (super.isNextBoardPositionEqual(Configuration.wall_character)) {
         super.setNextPosition(this.current_position);
      }
   }


   handleTeleportation() {
      if (super.isOccupiedBoardElementEqual(Configuration.teleporter_1_tile_character) ||
          super.isOccupiedBoardElementEqual(Configuration.teleporter_2_tile_character) ||
          super.isOccupiedBoardElementEqual(Configuration.teleporter_3_tile_character)) {
         if (this.has_teleported) {
            this.has_teleported = false;
         } else {
            var destination = this.level.getTeleportDestination(this.current_position);
            super.setNextPosition(destination);
            this.has_teleported = true;
         }
      }
   }
   
   
   handlePointCollision() {
      if (super.isNextBoardPositionEqual(Configuration.point_character)) {
         this.level.incrementScoreBy(Configuration.score_value_per_point);
         this.level.decrementPoint();
      }
   }
   
   
   handleGhostCollision() {
      if (super.isNextBoardPositionEqual(Configuration.ghost_character)) {
         this.decrementLife();
      }
   }
   
   
   updateLevel() {
      var request = new UpdateRequest(this.current_position, this.occupied_board_element);
      this.level.addUpdateRequest(request);
      this.updateOccupiedBoardElement();
      if (this.lifes > 0) {
         request = new UpdateRequest(this.next_position,
                                     Configuration.pacman_character,
                                     this.next_direction);
         this.level.addUpdateRequest(request);
      }
   }
   

   updateOccupiedBoardElement() {
      if (super.isNextBoardPositionEqual(Configuration.point_character)) {
         this.occupied_board_element = Configuration.empty_tile_character;
      } else {
         if (!super.isNextBoardPositionEqual(Configuration.pacman_character)) {
            this.occupied_board_element = this.level.getBoardPositionElement(this.next_position);
         }
      }
   }


   decrementLife() {
      if (this.lifes > 0) {
         this.lifes--;
      }
   }
   
   
   setNextDirection(direction_name) {
      this.next_direction = direction_name;
   }
   
   
   setNumberOfLifes(lifes) {
      this.lifes = lifes;
   }

   
   getNumberOfLifes() {
      return this.lifes;
   }
   
   
   isDead() {
      return this.lifes == 0;
   }
   
   
}
