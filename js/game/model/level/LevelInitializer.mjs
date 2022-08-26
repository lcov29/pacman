import Configuration from '../../../global/Configuration.mjs';
import Teleporter from '../boardElements/Teleporter.mjs'
import Routing from '../routing/Routing.mjs';
import Pacman from '../actors/Pacman.mjs';
import GhostBlinky from '../actors/GhostBlinky.mjs';
import GhostPinky from '../actors/GhostPinky.mjs';
import GhostClyde from '../actors/GhostClyde.mjs';
import GhostInky from '../actors/GhostInky.mjs';


/*  
    =================================================================================================================
    Initialization methods for level elements Teleporter, Ghost and Pacman. Is used in Level.initialize().
    =================================================================================================================
*/


export default class LevelInitializer {


    static initializeTeleporters(teleporterPositionList) {
        const teleporterList = [new Teleporter(), new Teleporter(), new Teleporter()];

        for (let position of teleporterPositionList) {
            switch (position.elementCharacter) {
                case Configuration.teleporter1Character:
                    teleporterList[0].add(position);
                    break;
                case Configuration.teleporter2Character:
                    teleporterList[1].add(position);
                    break;
                case Configuration.teleporter3Character:
                    teleporterList[2].add(position);
                    break;
            }
        }

        const outputList = teleporterList.filter(teleporter => teleporter.isInitialized());
        return outputList
    }



    static initializePacmans(initialPacmanPositionList, levelReference) {
        const pacmanList = initialPacmanPositionList.map(position => new Pacman(levelReference, position));
        return pacmanList;
    }


    static initializeGhosts(argumentObject) {
        const {initialGhostPositionList, 
               ghostScatterPositionList, 
               ghostOptionalSpawnPositionList,
               teleporterList,
               accessibleBoardPositionList,
               accessibleNeighborIdList,
               levelReference} = argumentObject;

        const neighborIdList = LevelInitializer.buildAccessibleNeighborIdList(accessibleNeighborIdList, teleporterList);
        const routing = new Routing(accessibleBoardPositionList, neighborIdList);
        const ghostList = LevelInitializer.initializeGhostObjects(initialGhostPositionList, routing, levelReference);
        LevelInitializer.initializeGhostScatterPositions(ghostScatterPositionList, ghostList);
        LevelInitializer.initializeOptionalGhostSpawnPositions(ghostOptionalSpawnPositionList, ghostList);
        return ghostList;
    }


    static buildAccessibleNeighborIdList(accessibleNeighborIdList, teleporterList) {
        // mark connected teleporters as neighbors
        for (let teleporter of teleporterList) {
            accessibleNeighborIdList[teleporter.idPosition1].push(teleporter.idPosition2);
            accessibleNeighborIdList[teleporter.idPosition2].push(teleporter.idPosition1);
        }
        return accessibleNeighborIdList;
    }


    static initializeGhostObjects(initialGhostPositionList, routing, levelReference) {
        const ghostList = [];
        for (let position of initialGhostPositionList) {
            switch (position.elementCharacter) {
                case Configuration.ghostBlinkyCharacter:
                    ghostList.push(new GhostBlinky(levelReference, position, routing));
                    break;
                case Configuration.ghostPinkyCharacter:
                    ghostList.push(new GhostPinky(levelReference, position, routing));
                    break;
                case Configuration.ghostInkyCharacter:
                    ghostList.push(new GhostInky(levelReference, position, routing));
                    break;
                case Configuration.ghostClydeCharacter:
                    ghostList.push(new GhostClyde(levelReference, position, routing));
                    break;
            }
        }
        return ghostList;
    }


    static initializeGhostScatterPositions(ghostScatterPositionList, ghostList) {
        for (let scatterPosition of ghostScatterPositionList) {
            for (let ghost of ghostList) { 
                const isMatchingScatterPosition = ghost.character === scatterPosition.elementCharacter

                if (isMatchingScatterPosition) {
                    ghost.scatterID = scatterPosition.id;
                }
            }
        }
    }


    static initializeOptionalGhostSpawnPositions(ghostOptionalSpawnPositionList, ghostList) {
        for (let spawnPosition of ghostOptionalSpawnPositionList) {
            for (let ghost of ghostList) {
                const isMatchingSpawnPosition = ghost.character === spawnPosition.elementCharacter

                if (isMatchingSpawnPosition) {
                    ghost.spawnID = spawnPosition.id;
                }
            }
        }    
    }


}