"use strict";

import Configuration from "./Configuration.mjs";


export default class Directions {


    static DIRECTION_UP = {x:0, y:-1};
    static DIRECTION_RIGHT = {x:1, y:0};
    static DIRECTION_DOWN = {x:0, y:1};
    static DIRECTION_LEFT = {x:-1, y:0};
    static MIN_DIRECTION_ID = 0;
    static MAX_DIRECTION_ID = 3;


    static direction_map_name_to_direction = {
        [Configuration.direction_name_up]:    this.DIRECTION_UP,
        [Configuration.direction_name_right]: this.DIRECTION_RIGHT,
        [Configuration.direction_name_down]:  this.DIRECTION_DOWN,
        [Configuration.direction_name_left]:  this.DIRECTION_LEFT
    };


    static direction_map_inverse = {
        [Configuration.direction_name_up]:      Configuration.direction_name_down,
        [Configuration.direction_name_right]:   Configuration.direction_name_left,
        [Configuration.direction_name_down]:    Configuration.direction_name_up,
        [Configuration.direction_name_left]:    Configuration.direction_name_right
    };


    static direction_map_direction_to_name = {
        '(0,-1)': Configuration.direction_name_up,
        '(1,0)':  Configuration.direction_name_right,
        '(0,1)':  Configuration.direction_name_down,
        '(-1,0)': Configuration.direction_name_left
    };


    static direction_map_id_to_name = {
        0:  Configuration.direction_name_up,
        1:  Configuration.direction_name_right,
        2:  Configuration.direction_name_down,
        3:  Configuration.direction_name_left
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
        let random_direction_id = this.getRandomDirectionID();
        return this.direction_map_id_to_name[random_direction_id];
    }


    static getRandomDirectionID() {
        return Math.floor(this.MIN_DIRECTION_ID + (this.MAX_DIRECTION_ID - this.MIN_DIRECTION_ID + 1) * Math.random());
    }

    
}