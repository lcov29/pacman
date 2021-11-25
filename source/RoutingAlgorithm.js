"use strict";

class RoutingAlgorithm {
   
   
   constructor(board) {
      this.board = board;
   }
   
   
   calculateShortestPaths(routing_table) {
      var start_node_id = 0;
      while (start_node_id < routing_table.length) {
         this.calculateShortestPathsFrom(routing_table, start_node_id);
         start_node_id++;
      }
      return routing_table;
   }
    
   
   calculateShortestPathsFrom(routing_table, id_start_node) {
      
      //phase 1: initialize all neighboring nodes of start_node
      var unused_nodes = routing_table[id_start_node].slice();
      var current_node = routing_table[id_start_node][id_start_node];
      var routing_entry = undefined;
      this.removeNodeFrom(unused_nodes, current_node);
      
      var neighbors_ids = this.searchNeighborsIds(current_node);
      for (let neighbor_id of neighbors_ids) {
         routing_entry = routing_table[id_start_node][neighbor_id];
         routing_entry.setPathCost(1);
         routing_entry.setPredecessorId(current_node.id);
      }
      
      
      //phase 2: iterate through all unused nodes
      while (unused_nodes.length > 0) {
         current_node = this.searchLowestCostNode(unused_nodes);
         neighbors_ids = this.searchNeighborsIds(current_node);
         for (let neighbor_id of neighbors_ids) {
            routing_entry = routing_table[id_start_node][neighbor_id];           
            if (unused_nodes.indexOf(routing_entry) != -1) {
               if (routing_entry.getPathCost() > current_node.getPathCost() + 1) {
                  routing_entry.setPathCost(current_node.getPathCost() + 1);
                  routing_entry.setPredecessorId(current_node.id);
               }
            }
         }
         this.removeNodeFrom(unused_nodes, current_node);
      }
      
   }
   
   
   removeNodeFrom(nodes, node) {
      const NUMBER_OF_ELEMENTS_TO_DELETE = 1;
      nodes.splice(nodes.indexOf(node), NUMBER_OF_ELEMENTS_TO_DELETE);
   }
   
   
   searchNeighborsIds(field_node) {
      var neighbors_ids = [];
      var calculated_x = 0;
      var calculated_y = 0;
      var direction = undefined;
      var potential_neighbor_id = undefined;

      for (var i = Configuration.min_direction_id; i <= Configuration.max_direction_id; i++) {
         direction = Configuration.getDirectionByID(i);
         calculated_x = field_node.xPosition + direction.x;
         calculated_y = field_node.yPosition + direction.y;
         potential_neighbor_id = this.board.getIdAt(calculated_x, calculated_y);
         if (potential_neighbor_id != Configuration.id_unaccessible_board_element) {
            neighbors_ids.push(potential_neighbor_id);
         }
      }
      return neighbors_ids;
   }
   
   
   searchLowestCostNode(nodes) {
      var min_cost_node = nodes[0];
      for (var i = 1; i < nodes.length; i++) {
         if (nodes[i].getPathCost() < min_cost_node.getPathCost()) {
            min_cost_node = nodes[i];
         }
      }
      return min_cost_node;
   }
   
   
}