"use strict";

class RoutingNode {
   
   constructor(id, xPosition, yPosition) {
      this.id = id;
      this.xPosition = xPosition;
      this.yPosition = yPosition;
      this.predecessor_node_id = -1;
      this.path_cost = Infinity;
   }
   

   setPredecessorId(id) {
      this.predecessor_node_id = id;
   }
   

   getPredecessorId() {
      return this.predecessor_node_id;
   }
   

   getClone() {
      var clone = new RoutingNode(this.id, this.xPosition, this.yPosition);
      clone.predecessor_node_id = this.predecessor_node_id;
      clone.path_cost = this.path_cost;
      return clone;
   }
   

   setPathCost(cost) {
      this.path_cost = cost;
   }
   

   getPathCost() {
      return this.path_cost;
   }
   
   
   incrementPathCostBy(value) {
      this.path_cost += value;
   }
   
   
}