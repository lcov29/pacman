"use strict";

export default class RoutingNode {
   
   
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


   setPathCost(cost) {
      this.path_cost = cost;
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


   getPathCost() {
      return this.path_cost;
   }

   
   clone() {
      let clone = new RoutingNode(this.id, this.xPosition, this.yPosition);
      clone.predecessor_node_id = this.predecessor_node_id;
      clone.path_cost = this.path_cost;
      return clone;
   }
   
   
}