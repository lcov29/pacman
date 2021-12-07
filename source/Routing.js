"use strict";

class Routing {
   
   
   constructor(routing_node_list, neighbor_id_list) {
      this.routing_table = [];
      this.initializeRoutingTable(routing_node_list);
      this.routing_table = new RoutingAlgorithm().calculateRoutingTable(this.routing_table, neighbor_id_list);
   }


   calculateNextPositionOnShortestPath(start_node_id, destination_node_id) {
      var start_node = this.getRoutingNodeForId(start_node_id, start_node_id);
      var end_node = this.getRoutingNodeForId(start_node_id, destination_node_id);
      var next_node = this.selectFirstNodeOfShortestPath(start_node, end_node);
      return new BoardPosition(next_node.xPosition, next_node.yPosition);
   }


   getShortestDistanceBetween(start_node, end_node) {
      return this.routing_table[start_node][end_node].getPathCost();
   }


   initializeRoutingTable(routing_node_list) {
      for (let i = 0; i < routing_node_list.length; i++) {
         let clone = this.cloneRoutingTableRow(routing_node_list);
         this.routing_table.push(clone);
      }
   }


   cloneRoutingTableRow(row) {
      var clone = [];
      for (var i = 0; i < row.length; i++) {
         clone.push(row[i].clone());
      }
      return clone;
   }


   getRoutingNodeForId(row_id, column_id) {
      return this.routing_table[row_id][column_id];
   }

   
   selectFirstNodeOfShortestPath(start_node, end_node) {   
      var current_end_node = end_node;
      while (current_end_node.getPredecessorId() != start_node.id) {
         current_end_node = this.routing_table[start_node.id][current_end_node.getPredecessorId()];
      }
      return current_end_node;
   }
   

}