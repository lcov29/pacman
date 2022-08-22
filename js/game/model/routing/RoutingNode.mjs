'use strict';

export default class RoutingNode {
   

   #id = -1;
   #xPosition = -1;
   #yPosition = -1;
   #predecessorNodeId = -1;
   #pathCost = Infinity;

   
   constructor(id, xPosition, yPosition) {
      this.#id = id;
      this.#xPosition = xPosition;
      this.#yPosition = yPosition;
   }
  
   
   set predecessorId(id) {
      this.#predecessorNodeId = id;
   }


   set pathCost(cost) {
      this.#pathCost = cost;
   }


   get id() {
      return this.#id;
   }


   get xPosition() {
      return this.#xPosition;
   }


   get yPosition() {
      return this.#yPosition;
   }


   get predecessorId() {
      return this.#predecessorNodeId;
   }


   get pathCost() {
      return this.#pathCost;
   }

   
   clone() {
      let clone = new RoutingNode(this.#id, this.#xPosition, this.#yPosition);
      clone.predecessorNodeId = this.#predecessorNodeId;
      clone.pathCost = this.#pathCost;
      return clone;
   }
   
   
}