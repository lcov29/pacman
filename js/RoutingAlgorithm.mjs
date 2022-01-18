"use strict";

import Utility from "./Utility.mjs";


export default class RoutingAlgorithm {
     
   
   calculateRoutingTable(routing_table, neighbor_id_list) {
      let start_node_id = 0;
      while (start_node_id < routing_table.length) {
         this.calculateShortestPathsFrom(routing_table, neighbor_id_list, start_node_id);
         start_node_id++;
      }
      return routing_table;
   }
   
   
   calculateShortestPathsFrom(routing_table, neighbor_id_list, id_start_node) {
      
      //phase 1: initialize all neighboring nodes of start_node
      let unused_nodes = routing_table[id_start_node].slice();
      let current_node = routing_table[id_start_node][id_start_node];
      let routing_node = null;
      Utility.removeElementFrom(unused_nodes, current_node);
      
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
            if (unused_nodes.indexOf(routing_node) !== -1) {
               if (routing_node.getPathCost() > current_node.getPathCost() + 1) {
                  routing_node.setPathCost(current_node.getPathCost() + 1);
                  routing_node.setPredecessorId(current_node.getID());
               }
            }
         }
         Utility.removeElementFrom(unused_nodes, current_node);
      }
      
   }
   
   
   searchLowestCostNode(nodes) {
      let min_cost_node = nodes[0];
      for (let i = 1; i < nodes.length; i++) {
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