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
    #actorLayerCharacter;
    #elementLayerCharacter;


    constructor(x, y, actorCharacter, elementCharacter) {
        this.#x = x;
        this.#y = y;
        this.#id = Configuration.idInaccessibleBoardTiles;
        this.#actorLayerCharacter = actorCharacter;
        this.#elementLayerCharacter = elementCharacter;
    }


    setID(id) {
        // prevent id of accessible elements to change after initialisation
        const isBoardTileInaccessible = this.#id === Configuration.idInaccessibleBoardTiles;
        this.#id = (isBoardTileInaccessible) ? id : this.#id;
    }


    setActorCharacter(character) {
        this.#actorLayerCharacter = character;
    }


    setElementCharacter(character) {
        this.#elementLayerCharacter = character;
    }


    getX() {
        return this.#x;
    }


    getY() {
        return this.#y;
    }


    getID() {
        return this.#id;
    }


    getActorLayerCharacter() {
        return this.#actorLayerCharacter;
    }


    getElementLayerCharacter() {
        return this.#elementLayerCharacter;
    }


    clone() {
        let clone = new BoardPosition(this.#x, 
                                      this.#y, 
                                      this.#actorLayerCharacter,
                                      this.#elementLayerCharacter);
        clone.setID(this.#id);
        return clone;
    }

    
}