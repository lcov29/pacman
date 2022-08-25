'use strict';

import Configuration from '../../../global/Configuration.mjs';

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


    #x;
    #y;
    #id;
    #elementLayerCharacter;


    constructor(x, y, elementCharacter) {
        this.#x = x;
        this.#y = y;
        this.#id = Configuration.idInaccessibleBoardTiles;
        this.#elementLayerCharacter = elementCharacter;
    }


    set id(id) {
        // prevent id of accessible elements to change after initialisation
        const isBoardTileInaccessible = this.#id === Configuration.idInaccessibleBoardTiles;
        this.#id = (isBoardTileInaccessible) ? id : this.#id;
    }


    set elementCharacter(character) {
        this.#elementLayerCharacter = character;
    }


    get x() {
        return this.#x;
    }


    get y() {
        return this.#y;
    }


    get id() {
        return this.#id;
    }


    get elementLayerCharacter() {
        return this.#elementLayerCharacter;
    }


    clone() {
        const clone = new BoardPosition(this.#x, this.#y, this.#elementLayerCharacter);
        clone.id = this.#id;
        return clone;
    }

    
}