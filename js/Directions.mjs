"use strict";

import Configuration from "./Configuration.mjs";
import Utility from "./Utility.mjs";


export default class Directions {


    static DIRECTION_UP = {x:0, y:-1};
    static DIRECTION_RIGHT = {x:1, y:0};
    static DIRECTION_DOWN = {x:0, y:1};
    static DIRECTION_LEFT = {x:-1, y:0};
    static MIN_DIRECTION_ID = 0;
    static MAX_DIRECTION_ID = 3;


    static direction_map_name_to_direction = {
        [Configuration.DIRECTION_NAME_UP]:    this.DIRECTION_UP,
        [Configuration.DIRECTION_NAME_RIGHT]: this.DIRECTION_RIGHT,
        [Configuration.DIRECTION_NAME_DOWN]:  this.DIRECTION_DOWN,
        [Configuration.DIRECTION_NAME_LEFT]:  this.DIRECTION_LEFT
    };


    static direction_map_inverse = {
        [Configuration.DIRECTION_NAME_UP]:      Configuration.DIRECTION_NAME_DOWN,
        [Configuration.DIRECTION_NAME_RIGHT]:   Configuration.DIRECTION_NAME_LEFT,
        [Configuration.DIRECTION_NAME_DOWN]:    Configuration.DIRECTION_NAME_UP,
        [Configuration.DIRECTION_NAME_LEFT]:    Configuration.DIRECTION_NAME_RIGHT
    };


    static direction_map_direction_to_name = {
        '(0,-1)': Configuration.DIRECTION_NAME_UP,
        '(1,0)':  Configuration.DIRECTION_NAME_RIGHT,
        '(0,1)':  Configuration.DIRECTION_NAME_DOWN,
        '(-1,0)': Configuration.DIRECTION_NAME_LEFT
    };


    static direction_map_id_to_name = {
        0:  Configuration.DIRECTION_NAME_UP,
        1:  Configuration.DIRECTION_NAME_RIGHT,
        2:  Configuration.DIRECTION_NAME_DOWN,
        3:  Configuration.DIRECTION_NAME_LEFT
    }


    static direction_map_id_to_direction = {
        0: this.DIRECTION_UP,
        1: this.DIRECTION_RIGHT,
        2: this.DIRECTION_DOWN,
        3: this.DIRECTION_LEFT
    };
    

    static getMinDirectionID() {
        return this.MIN_DIRECTION_ID;
    }


    static getMaxDirectionID() {
        return this.MAX_DIRECTION_ID;
    }


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


    static getRandomDirectionName() {
        let direction_id = Utility.getRandomIntegerBetweenInclusive(this.MIN_DIRECTION_ID, this.MAX_DIRECTION_ID);
        return this.direction_map_id_to_name[direction_id];
    }

    
}