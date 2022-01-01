"use strict";

class RoutingNode {
   
   
   constructor(id, xPosition, yPosition) {
      this.id = id;
      this.xPosition = xPosition;
      this.yPosition = yPosition;
      this.predecessor_node_id = -1;
      this.path_cost = Infinity;
   }
   

   getID() {
      return this.id;
   }


   getX() {
      return this.xPosition;
   }


   getY() {
      return this.yPosition;
   }


   getPredecessorId() {
      return this.predecessor_node_id;
   }


   setPredecessorId(id) {
      this.predecessor_node_id = id;
   }
   

   getPathCost() {
      return this.path_cost;
   }

   
   setPathCost(cost) {
      this.path_cost = cost;
   }


   clone() {
      let clone = new RoutingNode(this.id, this.xPosition, this.yPosition);
      clone.predecessor_node_id = this.predecessor_node_id;
      clone.path_cost = this.path_cost;
      return clone;
   }
   
   
}