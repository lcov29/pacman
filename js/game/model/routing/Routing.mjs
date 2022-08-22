'use strict';

import RoutingAlgorithm from './RoutingAlgorithm.mjs';
import BoardPosition from '../board/BoardPosition.mjs';
import RoutingNode from './RoutingNode.mjs';


export default class Routing {
   

   #routingTable = [];
   

   constructor(accessiblePositionList, neighborIdList) {
      this.initializeRoutingTable(accessiblePositionList);
      this.#routingTable = new RoutingAlgorithm().calculateRoutingTable(this.#routingTable, neighborIdList);
   }


   calculateNextPositionOnShortestPath(startNodeId, destinationNodeId) {
      const startNode = this.getRoutingNodeForId(startNodeId, startNodeId);
      const endNode = this.getRoutingNodeForId(startNodeId, destinationNodeId);
      const isDestinationNode = startNodeId === destinationNodeId;

      if (isDestinationNode) {
         return new BoardPosition(startNode.xPosition, startNode.yPosition, startNodeId);
      } else {
         const nextNode = this.selectFirstNodeOfShortestPath(startNode, endNode);
         return new BoardPosition(nextNode.xPosition, nextNode.yPosition, nextNode.id);
      }
   }


   getShortestDistanceBetween(startNodeId, endNodeId) {
      const isSamePosition = startNodeId === endNodeId;

      if (isSamePosition) {
         return 0;
      } else {
         const routingNode = this.#routingTable[startNodeId][endNodeId];
         return routingNode.pathCost;
      }
   }


   getRoutingNodeForId(rowId, columnId) {
      return this.#routingTable[rowId][columnId];
   }


   initializeRoutingTable(accessiblePositionList) {
      let routingNodeRow = [];
      let routingNode = null;

      for (let position of accessiblePositionList) {
         routingNode = new RoutingNode(position.id, position.x, position.y);
         routingNodeRow.push(routingNode);
      }

      for (let i = 0; i < accessiblePositionList.length; i++) {
         let clone = this.cloneRoutingTableRow(routingNodeRow);
         this.#routingTable.push(clone);
      }
   }


   cloneRoutingTableRow(row) {
      let clone = [];
      for (let i = 0; i < row.length; i++) {
         clone.push(row[i].clone());
      }
      return clone;
   }

   
   selectFirstNodeOfShortestPath(startNode, endNode) {   
      let currentEndNode = endNode;
      while (currentEndNode.predecessorId != startNode.id) {
         currentEndNode = this.#routingTable[startNode.id][currentEndNode.predecessorId];
      }
      return currentEndNode;
   }
   

}