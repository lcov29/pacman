'use strict';

import Utility from '../../../global/Utility.mjs';


export default class RoutingAlgorithm {


   #routingTable;
   
   
   calculateRoutingTable(routingTable, neighborIdList) {
      this.#routingTable = routingTable;

      let startNodeId = 0;
      while (startNodeId < routingTable.length) {
         this.#calculateShortestPathsFrom(neighborIdList, startNodeId);
         startNodeId++;
      }
      return routingTable;
   }
   
   
   #calculateShortestPathsFrom(neighborIdList, idStartNode) {
      
      //phase 1: initialize all neighboring nodes of start node
      const unusedNodeList = this.#routingTable[idStartNode].slice();
      let currentNode = this.#getRoutingNode(idStartNode, idStartNode);
      Utility.removeElementFrom(unusedNodeList, currentNode);
      
      for (let neighborId of this.#getNeighborIdListFor(currentNode, neighborIdList)) {
         const routingNode = this.#getRoutingNode(idStartNode, neighborId);
         routingNode.pathCost = 1;
         routingNode.predecessorId = currentNode.id;
      }
      
      //phase 2: iterate through all unused nodes
      while (unusedNodeList.length > 0) {
         currentNode = this.#searchLowestCostNode(unusedNodeList);
         for (let neighborId of this.#getNeighborIdListFor(currentNode, neighborIdList)) {
            const routingNode = this.#getRoutingNode(idStartNode, neighborId);          
            if (unusedNodeList.indexOf(routingNode) !== -1) {
               if (routingNode.pathCost > currentNode.pathCost + 1) {
                  routingNode.pathCost = currentNode.pathCost + 1;
                  routingNode.predecessorId = currentNode.id;
               }
            }
         }
         Utility.removeElementFrom(unusedNodeList, currentNode);
      }
      
   }
   
   
   #searchLowestCostNode(nodeList) {
      let minCostNode = nodeList[0];

      for (let i = 1; i < nodeList.length; i++) {

         const currentNode = nodeList[i];
         const isCurrentNodeCostLower = currentNode.pathCost < minCostNode.pathCost;

         if (isCurrentNodeCostLower) {
            minCostNode = currentNode;
         }
      }
      return minCostNode;
   }


   #getNeighborIdListFor(node, neighborIdList) {
      return neighborIdList[node.id];
   }


   #getRoutingNode(idStartNode, idEndNode) {
      return this.#routingTable[idStartNode][idEndNode];
   }
   
   
}