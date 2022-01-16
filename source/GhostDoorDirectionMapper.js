"use strict";

/*  
    =================================================================================================================
    Methods for building a map containing the directions in which each ghost door should be displayed by the view.
    Is used in Level.buildGhostDoorDirectionMap().
    =================================================================================================================
*/


class GhostDoorDirectionMapper {


    static buildMap(ghost_door_positions, level) {
        let output = [];
        for(let position of ghost_door_positions) {
            let accessible_neighbors = level.buildAccessibleNeighborList(position.getX(), position.getY());
            let ghost_door_direction = this.calculateGhostDoorDirection(accessible_neighbors);
            output.push({id: position.getID(), direction_suffix: ghost_door_direction});
        }
        return output;
    }


    static calculateGhostDoorDirection(accessible_neighbors) {
        let output = "";
        switch (accessible_neighbors.length) {
            case 0:
            case 1:
            case 3:
            case 4:
                output = Configuration.ghost_door_direction_suffix_diagonal;
                break;

            case 2:
                let start_position = null;
                let end_position = null;
                for(let x = 0; x < accessible_neighbors.length; x++) {
                    start_position = accessible_neighbors[x];
                    for(let y = x + 1; y < accessible_neighbors.length; y++) {
                        end_position = accessible_neighbors[y];
                        if (start_position.getX() - end_position.getX() === 0) {
                            output= Configuration.ghost_door_direction_suffix_horizontal;
                        } else {
                            if (start_position.getY() - end_position.getY() === 0) {
                                output = Configuration.ghost_door_direction_suffix_vertical;
                            } else {
                                output = Configuration.ghost_door_direction_suffix_diagonal;
                            }
                        }
                        if(output !== "") { break; }
                    }
                    if (output !== "") { break; }
                }
                break;
        }
        return output;
    }


}