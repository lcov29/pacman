"use strict";

import Configuration from "./Configuration.mjs";
import Teleporter from "./Teleporter.mjs"
import Routing from "./Routing.mjs";
import Pacman from "./Pacman.mjs";
import GhostBlinky from "./GhostBlinky.mjs";
import GhostPinky from "./GhostPinky.mjs";
import GhostClyde from "./GhostClyde.mjs";
import GhostInky from "./GhostInky.mjs";
import Level from "./Level.mjs";

/*  
    =================================================================================================================
    Initialization methods for level elements Teleporter, Ghost and Pacman. Is used in Level.initialize().
    =================================================================================================================
*/


export default class LevelInitializer {


    static initializeTeleporters(board) {
        let teleporters = [new Teleporter(), new Teleporter(), new Teleporter()];
        let output = [];
        for (let position of board.getTeleporterPositions()) {
            switch (position.getElementCharacter()) {
                case Configuration.TELEPORTER_1_CHARACTER:
                    teleporters[0].add(position);
                    break;
                case Configuration.TELEPORTER_2_CHARACTER:
                    teleporters[1].add(position);
                    break;
                case Configuration.TELEPORTER_3_CHARACTER:
                    teleporters[2].add(position);
                    break;
            }
        }
        for (let teleporter of teleporters) {
            if (teleporter.isInitialized()) {
                output.push(teleporter);
            }
        }
        return output;
    }



    static initializePacmans(board, level_reference) {
        let pacmans = [];
        for (let position of board.getInitialPacmanPositions()) {
            pacmans.push(new Pacman(level_reference, position));
        }
        return pacmans;
    }


    static initializeGhosts(board, teleporter_list, level_reference) {
        let accessible_position_list = board.buildAccessibleBoardPositionList();
        let neighbor_id_list = LevelInitializer.buildAccessibleNeighborIdList(board, teleporter_list);
        let routing = new Routing(accessible_position_list, neighbor_id_list);
        let ghosts = LevelInitializer.initializeGhostObjects(board, routing, level_reference);
        LevelInitializer.initializeGhostScatterPoints(board, ghosts);
        LevelInitializer.initializeOptionalGhostSpawnPoints(board, ghosts);
        return ghosts;
    }


    static buildAccessibleNeighborIdList(board, teleporter_list) {
        let neighbor_id_list = board.buildAccessibleNeighborIdList();
        // mark connected teleporters as neighbors
        for (let teleporter of teleporter_list) {
            neighbor_id_list[teleporter.getIDPosition1()].push(teleporter.getIDPosition2());
            neighbor_id_list[teleporter.getIDPosition2()].push(teleporter.getIDPosition1());
        }
        return neighbor_id_list;
    }


    static initializeGhostObjects(board, routing, level_reference) {
        let ghosts = [];
        for (let position of board.getInitialGhostPositions()) {
            switch (position.getActorCharacter()) {
                case Configuration.GHOST_BLINKY_CHARACTER:
                    ghosts.push(new GhostBlinky(level_reference, position, routing));
                    break;
                case Configuration.GHOST_PINKY_CHARACTER:
                    ghosts.push(new GhostPinky(level_reference, position, routing));
                    break;
                case Configuration.GHOST_INKY_CHARACTER:
                    ghosts.push(new GhostInky(level_reference, position, routing));
                    break;
                case Configuration.GHOST_CLYDE_CHARACTER:
                    ghosts.push(new GhostClyde(level_reference, position, routing));
                    break;
            }
        }
        return ghosts;
    }


    static initializeGhostScatterPoints(board, ghosts) {
        for (let scatter_position of board.getGhostScatterPositions()) {
            for (let ghost of ghosts) {
                if (ghost.getCharacter() === scatter_position.getElementCharacter()) {
                    ghost.setScatterID(scatter_position.getID());
                }
            }
        }
    }


    static initializeOptionalGhostSpawnPoints(board, ghosts) {
        for (let spawn_position of board.getOptionalGhostSpawnPositions()) {
            for (let ghost of ghosts) {
                if (ghost.getCharacter() === spawn_position.getElementCharacter()) {
                    ghost.setSpawnID(spawn_position.getID());
                }
            }
        }    
    }


}