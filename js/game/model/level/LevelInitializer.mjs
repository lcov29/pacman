'use strict';

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
            switch (position.elementLayerCharacter) {
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


    static initializeGhosts(board, teleporterList, levelReference) {
        let accessiblePositionList = board.buildAccessibleBoardPositionList();
        let neighborIdList = LevelInitializer.buildAccessibleNeighborIdList(board, teleporterList);
        let routing = new Routing(accessiblePositionList, neighborIdList);
        let ghosts = LevelInitializer.initializeGhostObjects(board, routing, levelReference);
        LevelInitializer.initializeGhostScatterPositions(board, ghosts);
        LevelInitializer.initializeOptionalGhostSpawnPositions(board, ghosts);
        return ghosts;
    }


    static buildAccessibleNeighborIdList(board, teleporterList) {
        let neighborIdList = board.buildAccessibleNeighborIdList();
        // mark connected teleporters as neighbors
        for (let teleporter of teleporterList) {
            neighborIdList[teleporter.idPosition1].push(teleporter.idPosition2);
            neighborIdList[teleporter.idPosition2].push(teleporter.idPosition1);
        }
        return neighborIdList;
    }


    static initializeGhostObjects(board, routing, levelReference) {
        let ghosts = [];
        for (let position of board.initialGhostPositionList) {
            switch (position.actorLayerCharacter) {
                case Configuration.ghostBlinkyCharacter:
                    ghosts.push(new GhostBlinky(levelReference, position, routing));
                    break;
                case Configuration.ghostPinkyCharacter:
                    ghosts.push(new GhostPinky(levelReference, position, routing));
                    break;
                case Configuration.ghostInkyCharacter:
                    ghosts.push(new GhostInky(levelReference, position, routing));
                    break;
                case Configuration.ghostClydeCharacter:
                    ghosts.push(new GhostClyde(levelReference, position, routing));
                    break;
            }
        }
        return ghosts;
    }


    static initializeGhostScatterPositions(board, ghosts) {
        for (let scatterPosition of board.ghostScatterPositionList) {
            for (let ghost of ghosts) {
                if (ghost.character === scatterPosition.elementLayerCharacter) {
                    ghost.scatterID = scatterPosition.id;
                }
            }
        }
    }


    static initializeOptionalGhostSpawnPositions(board, ghosts) {
        for (let spawnPosition of board.ghostOptionalSpawnPositionList) {
            for (let ghost of ghosts) {
                if (ghost.character === spawnPosition.elementLayerCharacter) {
                    ghost.spawnID = spawnPosition.id;
                }
            }
        }    
    }


}