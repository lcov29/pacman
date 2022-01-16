"use strict"

/*  
    =================================================================================================================
    Initialization methods for level elements Teleporter, Ghost and Pacman. Is used in Level.initialize().
    =================================================================================================================
 */


class LevelInitializer {


    static initializeTeleporters(teleporter_positions) {
        let teleporters = [new Teleporter(), new Teleporter(), new Teleporter()];
        let output = [];
        for (let position of teleporter_positions) {
            switch (position.getElementCharacter()) {
                case Configuration.teleporter_1_tile_character:
                    teleporters[0].add(position);
                    break;
                case Configuration.teleporter_2_tile_character:
                    teleporters[1].add(position);
                    break;
                case Configuration.teleporter_3_tile_character:
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


    static initializePacmans(pacman_positions, level_reference) {
        let pacmans = [];
        for (let position of pacman_positions) {
            pacmans.push(new Pacman(level_reference, position));
        }
        return pacmans;
    }


    static initializeGhosts(ghost_positions, 
                            scatter_positions, 
                            spawn_positions,
                            accessible_position_list, 
                            neighbor_id_list,
                            level_reference) {

        let routing = new Routing(accessible_position_list, neighbor_id_list);
        let ghosts = this.initializeGhostObjects(ghost_positions, routing, level_reference);
        this.initializeGhostScatterPoints(scatter_positions, ghosts);
        this.initializeOptionalGhostSpawnPoints(spawn_positions, ghosts);
        return ghosts;
    }


    static initializeGhostObjects(ghost_positions, routing, level_reference) {
        let ghosts = [];
        for (let position of ghost_positions) {
            switch (position.getActorCharacter()) {
                case Configuration.ghost_blinky_character:             // add different ghost types
                    ghosts.push(new Blinky(level_reference, position, routing));
                    break;
            }
        }
        return ghosts;
    }


    static initializeGhostScatterPoints(scatter_positions, ghosts) {
        for (let scatter_position of scatter_positions) {
            for (let ghost of ghosts) {
                if (ghost.getScatterCharacter() === scatter_position.getElementCharacter()) {
                    ghost.setScatterID(scatter_position.getID());
                }
            }
        }
    }


    static initializeOptionalGhostSpawnPoints(spawn_positions, ghosts) {
        for (let spawn_position of spawn_positions) {
            for (let ghost of ghosts) {
                if (ghost.getSpawnCharacter() === spawn_position.getElementCharacter()) {
                    ghost.setSpawnID(spawn_position.getID());
                }
            }
        }    
    }


}