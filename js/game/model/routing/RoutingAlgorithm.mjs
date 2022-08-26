import Utility from '../../../global/Utility.mjs';


export default class RoutingAlgorithm {


   #routingTable;
   #neighborIdList;
   
   
   calculateRoutingTable(routingTable, neighborIdList) {
      this.#routingTable = routingTable;
      this.#neighborIdList = neighborIdList;

      let startNodeId = 0;
      while (startNodeId < routingTable.length) {
         this.#calculateShortestPathsFrom(startNodeId);
         startNodeId++;
      }
      return routingTable;
   }
   
   
   #calculateShortestPathsFrom(idStartNode) {
      
      //phase 1: initialize all neighboring nodes of start node
      const unusedNodeList = this.#routingTable[idStartNode].slice();
      let currentNode = this.#getRoutingNode(idStartNode, idStartNode);
      Utility.removeElementFrom(unusedNodeList, currentNode);
      
      for (let neighborId of this.#getNeighborIdListFor(currentNode)) {
         const routingNode = this.#getRoutingNode(idStartNode, neighborId);
         routingNode.pathCost = 1;
         routingNode.predecessorId = currentNode.id;
      }
      
      //phase 2: iterate through all unused nodes
      while (unusedNodeList.length > 0) {
         currentNode = this.#searchLowestCostNode(unusedNodeList);
         const currentNodeNeighborIdList = this.#getNeighborIdListFor(currentNode);

         for (let neighborId of currentNodeNeighborIdList) {
            const routingNode = this.#getRoutingNode(idStartNode, neighborId);
            const updatedPathCost = currentNode.pathCost + 1;
            const isRoutingNodeUnused = unusedNodeList.indexOf(routingNode) !== -1;
            const hasFoundLowerCostPath = routingNode.pathCost > updatedPathCost;

            if (isRoutingNodeUnused && hasFoundLowerCostPath) {
               routingNode.pathCost = updatedPathCost;
               routingNode.predecessorId = currentNode.id;
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


   #getNeighborIdListFor(node) {
      return this.#neighborIdList[node.id];
   }


   #getRoutingNode(idStartNode, idEndNode) {
      return this.#routingTable[idStartNode][idEndNode];
   }
   
   
}