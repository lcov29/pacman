"use strict";

import Configuration from "./Configuration.mjs";

/*  
    =================================================================================================================
    Representation of a tile on the board.

    Note 1:     Positions that can be accessed by actors get indexed by the BoardParser (zero based)

    Note 2:     Each tile is divided into two layers:
                - actor layer (contains characters of pacman and ghosts, else character representing an empty tile)
                - element layer (contains characters of non-actors like points, walls, powerups ...)

                This separation facilitates the implementation of actor movement at the cost of a higher complexity
                of parsing the user defined level. Actors accessing a tile do not overwrite its element and therefore
                do not need to save and restore the element upon leaving the tile (e.g a ghost entering a tile does 
                not consume the occupying point character)
    =================================================================================================================
 */


export default class BoardPosition {


    constructor(x, y, actor_character, element_character) {
        this.x = x;
        this.y = y;
        this.id = Configuration.ID_UNACCESSIBLE_BOARD_TILES;
        this.actor_layer_character = actor_character;
        this.element_layer_character = element_character;
    }


    setID(id) {
        // prevent id of accessible elements to change after initialisation
        this.id = (this.id === Configuration.ID_UNACCESSIBLE_BOARD_TILES) ? id : this.id;
    }


    setActorCharacter(character) {
        this.actor_layer_character = character;
    }


    setElementCharacter(character) {
        this.element_layer_character = character;
    }


    getX() {
        return this.x;
    }


    getY() {
        return this.y;
    }


    getID() {
        return this.id;
    }


    getActorCharacter() {
        return this.actor_layer_character;
    }


    getElementCharacter() {
        return this.element_layer_character;
    }


    clone() {
        let clone = new BoardPosition(this.x, 
                                      this.y, 
                                      this.actor_layer_character,
                                      this.element_layer_character);
        clone.setID(this.id);
        return clone;
    }

    
}