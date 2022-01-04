"use strict";

class Directions {

    static direction_up = {x:0, y:-1};
    static direction_right = {x:1, y:0};
    static direction_down = {x:0, y:1};
    static direction_left = {x:-1, y:0};
    static min_direction_id = 0;
    static max_direction_id = 3;


    static direction_map_name_to_direction = {
        'up':    this.direction_up,
        'right': this.direction_right,
        'down':  this.direction_down,
        'left':  this.direction_left
    };
    

    static direction_map_direction_to_name = {
        '(0,-1)': 'up',
        '(1,0)':  'right',
        '(0,1)':  'down',
        '(-1,0)': 'left'
    };  


    static direction_map_inverse = {
        'up':       'down',
        'right':    'left',
        'down':     'up',
        'left':     'right'
    };


    static direction_map_id_to_direction = {
        0: this.direction_up,
        1: this.direction_right,
        2: this.direction_down,
        3: this.direction_left
    };
    

    static getDirectionByName(name) {
        return this.direction_map_name_to_direction[name];
    }


    static getDirectionNameByIndex(x, y) {
        let index = `(${x},${y})`;
        return this.direction_map_direction_to_name[index];
    }


    static getReversedDirectionName(name) {
        return this.direction_map_inverse[name];
    }


    static getDirectionByID(direction_id) {
        return this.direction_map_id_to_direction[direction_id];
    }


    static calculateMovementDirectionName(start_position, destination_position) {
        let direction_x = destination_position.getX() - start_position.getX();
        let direction_y = destination_position.getY() - start_position.getY();
        return Directions.getDirectionNameByIndex(direction_x, direction_y);
    }


    static calculateGhostDoorNeighborDirectionName(start_position, end_position) {
        let direction = "";
        if (start_position.getX() - end_position.getX() === 0) {
            direction = Configuration.ghost_door_direction_suffix_horizontal;
        } else {
            if (start_position.getY() - end_position.getY() === 0) {
                direction = Configuration.ghost_door_direction_suffix_vertical;
            } else {
                direction = Configuration.ghost_door_direction_suffix_diagonal;
            }
        }
        return direction;
    }

    
}