"use strict";

class Routing {
   
   constructor(accessible_position_list, neighbor_id_list) {
      this.routing_table = [];
      this.initializeRoutingTable(accessible_position_list);
      this.routing_table = new RoutingAlgorithm().calculateRoutingTable(this.routing_table, neighbor_id_list);
   }

   
   calculateNextPositionOnShortestPath(start_node_id, destination_node_id) {
      var start_node = this.getRoutingNodeForId(start_node_id, start_node_id);
      var end_node = this.getRoutingNodeForId(start_node_id, destination_node_id);
      var next_node = this.selectFirstNodeOfShortestPath(start_node, end_node);
      return new BoardPosition(next_node.xPosition, next_node.yPosition, next_node.getID());
   }


   getShortestDistanceBetween(start_node, end_node) {
      return this.routing_table[start_node][end_node].getPathCost();
   }


   initializeRoutingTable(accessible_position_list) {
      var routing_node_row = [];
      var routing_node = undefined;

      for (let position of accessible_position_list) {
         routing_node = new RoutingNode(position.getID(), position.getX(), position.getY());
         routing_node_row.push(routing_node);
      }

      for (let i = 0; i < accessible_position_list.length; i++) {
         let clone = this.cloneRoutingTableRow(routing_node_row);
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