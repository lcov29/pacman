"use strict";

class Routing {
   
   
   constructor(board) {
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
            current_id = board.getIdAtIndex(x, y);
            if (current_id != Configuration.id_unaccessible_board_element) {
               row.push(new RoutingNode(current_id, x, y))
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


   calculateNextPositionOnShortestPath(start_node_id, destination_node_id) {
      var start_node = this.getRoutingNodeForId(start_node_id, start_node_id);
      var end_node = this.getRoutingNodeForId(start_node_id, destination_node_id);
      var next_node = this.selectFirstNodeOfShortestPath(start_node, end_node);
      return new BoardPosition(next_node.xPosition, next_node.yPosition);
   }


   getRoutingNodeForId(row_id, column_id) {
      return this.routing_table[row_id][column_id];
   }


   getShortestDistanceBetween(start_node, end_node) {
      return this.routing_table[start_node][end_node].getPathCost();
   }
   
   
   selectFirstNodeOfShortestPath(start_node, end_node) {   
      var current_end_node = end_node;
      while (current_end_node.getPredecessorId() != start_node.id) {
         current_end_node = this.routing_table[start_node.id][current_end_node.getPredecessorId()];
      }
      return current_end_node;
   }
   

}