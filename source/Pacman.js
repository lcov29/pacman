"use strict";

class Pacman extends MovableObject {
   
   
   constructor(level, xPosition, yPosition) {
      super(level, xPosition, yPosition);
      this.next_direction = '';
      this.lifes = Configuration.initial_pacman_lifes;
   }
   
   
   move() {
      if (this.next_direction != '') {
         let direction = Configuration.getDirectionByName(this.next_direction);
         this.calculateNextPosition(direction);
         this.handleWallCollision();
         this.handleTeleportation();
         this.handlePointCollision();
         this.handleGhostCollision();
         this.updateLevel();
         this.updateCurrentPosition();
      }
   }
   
   
   handleWallCollision() {
      if (this.isNextBoardPositionEqual(Configuration.wall_character)) {
         this.setNextPosition(this.xPosition, this.yPosition);
      }
   }


   handleTeleportation() {
      if (this.isOccupiedBoardElementEqual(Configuration.teleporter_1_tile_character) ||
          this.isOccupiedBoardElementEqual(Configuration.teleporter_2_tile_character) ||
          this.isOccupiedBoardElementEqual(Configuration.teleporter_3_tile_character)) {
         if (this.has_teleported) {
            this.has_teleported = false;
         } else {
            var destination = this.level.getTeleportDestination(this.xPosition, this.yPosition);
            this.setNextPosition(destination.xPosition, destination.yPosition);
            this.has_teleported = true;
         }
      }
   }
   
   
   handlePointCollision() {
      if (this.isNextBoardPositionEqual(Configuration.point_character)) {
         this.level.incrementScoreBy(Configuration.score_value_per_point);
         this.level.decrementPoint();
      }
   }
   
   
   handleGhostCollision() {
      if (this.isNextBoardPositionEqual(Configuration.ghost_character)) {
         this.decrementLife();
      }
   }
   
   
   updateLevel() {
      var request = new UpdateRequest(this.xPosition, this.yPosition, this.occupied_board_element);
      this.level.addUpdateRequest(request);
      this.updateOccupiedBoardElement();
      if (this.lifes > 0) {
         request = new UpdateRequest(this.next_xPosition, 
                                     this.next_yPosition, 
                                     Configuration.pacman_character,
                                     this.next_direction);
         this.level.addUpdateRequest(request);
      }
   }
   

   updateOccupiedBoardElement() {
      if (this.isNextBoardPositionEqual(Configuration.point_character)) {
         this.occupied_board_element = Configuration.empty_tile_character;
      } else {
         if (!this.isNextBoardPositionEqual(Configuration.pacman_character)) {
            this.occupied_board_element = this.level.board.getElementAt(this.next_xPosition, this.next_yPosition);
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
