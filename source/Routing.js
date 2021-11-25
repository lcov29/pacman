"use strict";

class Routing {
   
   
   constructor(level, board) {
      this.level = level;
      this.routing_table = this.initializeRoutingTable(board);
      this.routing_table = new RoutingAlgorithm(board).calculateShortestPaths(this.routing_table);
   }


   initializeRoutingTable(board) {
      var routing_table = [];
      var row = this.initializeRoutingTableRow(board);
      for (var i = 0; i < row.length; i++) {
         routing_table.push(this.cloneRoutingTableRow(row));
      }
      return routing_table;
   }


   initializeRoutingTableRow(board) {
      var row = [];
      var current_id = 0;
      for (var y = 0; y < board.getRowCount(); y++) {
         for (var x = 0; x < board.getColumnCountFor(y); x++) {
            current_id = board.getIdAt(x, y);
            if (current_id != Configuration.id_unaccessible_board_element) {
               row.push(new FieldNode(current_id, x, y))
            }
         }
      }
      return row;
   }


   cloneRoutingTableRow(row) {
      var clone = [];
      for (var i = 0; i < row.length; i++) {
         clone.push(row[i].getClone());
      }
      return clone;
   }

   
   calculateNextPosition(ghost_xPosition, ghost_yPosition) {
      var start_node = this.getRoutingNodeForGhost(ghost_xPosition, ghost_yPosition);
      var end_node = this.selectClosestPacmanNode(start_node);
      var next_position = this.selectFirstNodeOfShortestPath(start_node, end_node);
      return {xPosition: next_position.xPosition, yPosition: next_position.yPosition};
   }
   
   
   getRoutingNodeForGhost(x, y) {
      var ghost_id = this.level.board.getIdAt(x, y);
      return this.routing_table[ghost_id][ghost_id];
   }
   
   
   selectClosestPacmanNode(start_node) {
      var min_cost_end_node = undefined;
      var current_end_node = undefined;
      
      for (var pacman of this.level.pacmans) {
         current_end_node = this.getRoutingNodeForPacman(start_node.id, pacman.xPosition, pacman.yPosition);
      
         if (min_cost_end_node == undefined || 
               current_end_node.getPathCost() < min_cost_end_node.getPathCost() ||
               current_end_node.getPathCost() == Infinity) {
               min_cost_end_node = current_end_node;
         }
      }
      
      return min_cost_end_node;
   }
   
   
   selectFirstNodeOfShortestPath(start_node, end_node) {   
      var current_end_node = end_node;
      while (current_end_node.getPredecessorId() != start_node.id) {
         current_end_node = this.routing_table[start_node.id][current_end_node.getPredecessorId()];
      }
      return current_end_node;
   }
   
   
   getRoutingNodeForPacman(ghost_id, x, y) {
      var pacman_id = this.level.board.getIdAt(x, y);
      return this.routing_table[ghost_id][pacman_id];
   }
 
   
}