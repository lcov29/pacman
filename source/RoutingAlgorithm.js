"use strict";

class RoutingAlgorithm {
     
   
   calculateRoutingTable(routing_table, neighbor_id_list) {
      var start_node_id = 0;
      while (start_node_id < routing_table.length) {
         this.calculateShortestPathsFrom(routing_table, neighbor_id_list, start_node_id);
         start_node_id++;
      }
      return routing_table;
   }
   
   
   calculateShortestPathsFrom(routing_table, neighbor_id_list, id_start_node) {
      
      //phase 1: initialize all neighboring nodes of start_node
      var unused_nodes = routing_table[id_start_node].slice();
      var current_node = routing_table[id_start_node][id_start_node];
      var routing_node = undefined;
      this.removeNodeFrom(unused_nodes, current_node);
      
      for (let neighbor_id of this.getNeighborsFor(current_node, neighbor_id_list)) {
         routing_node = routing_table[id_start_node][neighbor_id];
         routing_node.setPathCost(1);
         routing_node.setPredecessorId(current_node.getID());
      }
      
      //phase 2: iterate through all unused nodes
      while (unused_nodes.length > 0) {
         current_node = this.searchLowestCostNode(unused_nodes);
         for (let neighbor_id of this.getNeighborsFor(current_node, neighbor_id_list)) {
            routing_node = routing_table[id_start_node][neighbor_id];           
            if (unused_nodes.indexOf(routing_node) != -1) {
               if (routing_node.getPathCost() > current_node.getPathCost() + 1) {
                  routing_node.setPathCost(current_node.getPathCost() + 1);
                  routing_node.setPredecessorId(current_node.getID());
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
   
   
   searchLowestCostNode(nodes) {
      var min_cost_node = nodes[0];
      for (var i = 1; i < nodes.length; i++) {
         if (nodes[i].getPathCost() < min_cost_node.getPathCost()) {
            min_cost_node = nodes[i];
         }
      }
      return min_cost_node;
   }


   getNeighborsFor(node, neighbor_id_list) {
      return neighbor_id_list[node.getID()];
   }
   
   
}