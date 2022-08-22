'use strict';

import RoutingAlgorithm from './RoutingAlgorithm.mjs';
import BoardPosition from '../board/BoardPosition.mjs';
import RoutingNode from './RoutingNode.mjs';


export default class Routing {
   
   
   constructor(accessiblePositionList, neighborIdList) {
      this.routingTable = [];
      this.initializeRoutingTable(accessiblePositionList);
      this.routingTable = new RoutingAlgorithm().calculateRoutingTable(this.routingTable, neighborIdList);
   }


   calculateNextPositionOnShortestPath(startNodeId, destinationNodeId) {
      let output = null;
      let startNode = this.getRoutingNodeForId(startNodeId, startNodeId);
      let endNode = this.getRoutingNodeForId(startNodeId, destinationNodeId);
      if (startNodeId === destinationNodeId) {
         output = new BoardPosition(startNode.xPosition, startNode.yPosition, startNodeId);
      } else {
         let nextNode = this.selectFirstNodeOfShortestPath(startNode, endNode);
         output = new BoardPosition(nextNode.xPosition, nextNode.yPosition, nextNode.id);
      }
      return output;
   }


   getShortestDistanceBetween(startNodeId, endNodeId) {
      let result = 0;
      if (startNodeId !== endNodeId) {
         result = this.routingTable[startNodeId][endNodeId].pathCost;
      }
      return result;
   }


   getRoutingNodeForId(rowId, columnId) {
      return this.routingTable[rowId][columnId];
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
         this.routingTable.push(clone);
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
      while (currentEndNode.redecessorId != startNode.id) {
         currentEndNode = this.routingTable[startNode.id][currentEndNode.redecessorId];
      }
      return currentEndNode;
   }
   

}