"use strict";

class RoutingAlgorithm {
   
   
   constructor(field_node_map) {
      this.field_node_map = field_node_map;
      this.routing_table = [];
   }
   
   
   buildRoutingTable() {
      this.initializeRoutingTable();
      this.calculateShortestPaths();
      return this.routing_table;
   }
   
   
   initializeRoutingTable() {
      var row = this.initializeRoutingTableRow();
      for (var i = 0; i < row.length; i++) {
         this.routing_table.push(this.cloneRoutingTableRow(row));
      }
   }
   
   
   calculateShortestPaths() {
      var start_node_id = 0;
      while (start_node_id < this.routing_table.length) {
         this.calculateShortestPathsFrom(start_node_id);
         start_node_id++;
      }
   }
   
   
   initializeRoutingTableRow() {
      var row = [];
      var current_node = undefined;
      for (var y = 0; y < this.field_node_map.length; y++) {
         for (var x = 0; x < this.field_node_map[y].length; x++) {
            current_node = this.field_node_map[y][x];
            if (current_node != undefined) {
               row.push(current_node.getClone());
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
   
   
   calculateShortestPathsFrom(id_start_node) {
      
      //phase 1: initialize all neighboring nodes of start_node
      var unused_nodes = this.routing_table[id_start_node].slice();
      var current_node = this.routing_table[id_start_node][id_start_node];
      var routing_entry = undefined;
      this.removeNodeFrom(unused_nodes, current_node);
      
      var neighbors = this.searchNeighbors(current_node);
      for (let neighbor of neighbors) {
         routing_entry = this.getRoutingTableEntry(neighbor.id, id_start_node); 
         routing_entry.setPathCost(1);
         routing_entry.setPredecessorId(current_node.id);
      }
      
      
      //phase 2: iterate through all unused nodes
      while (unused_nodes.length > 0) {
         current_node = this.searchLowestCostNode(unused_nodes);
         neighbors = this.searchNeighbors(current_node);
         for (let neighbor of neighbors) {
            routing_entry = this.getRoutingTableEntry(neighbor.id, id_start_node);
            
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
   
   
   searchNeighbors(field_node) {
      var neighbors = [];
      var calculated_x = 0;
      var calculated_y = 0;
      var direction = undefined;
      var potential_neighbor = undefined;

      for (var i = Configuration.min_direction_id; i <= Configuration.max_direction_id; i++) {
         direction = Configuration.getDirectionByID(i);
         calculated_x = field_node.xPosition + direction.x;
         calculated_y = field_node.yPosition + direction.y;
         potential_neighbor = this.field_node_map[calculated_y][calculated_x];
         if (potential_neighbor != undefined) {
            neighbors.push(potential_neighbor);
         }
      }
      return neighbors;
   }
   
   
   getRoutingTableEntry(x, y) {
      return this.routing_table[y][x];
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