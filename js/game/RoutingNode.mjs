'use strict';

export default class RoutingNode {
   
   
   constructor(id, xPosition, yPosition) {
      this.id = id;
      this.xPosition = xPosition;
      this.yPosition = yPosition;
      this.predecessorNodeId = -1;
      this.pathCost = Infinity;
   }
  
   
   setPredecessorId(id) {
      this.predecessorNodeId = id;
   }


   setPathCost(cost) {
      this.pathCost = cost;
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
      return this.predecessorNodeId;
   }


   getPathCost() {
      return this.pathCost;
   }

   
   clone() {
      let clone = new RoutingNode(this.id, this.xPosition, this.yPosition);
      clone.predecessorNodeId = this.predecessorNodeId;
      clone.pathCost = this.pathCost;
      return clone;
   }
   
   
}