'use strict';

import Configuration from '../../../global/Configuration.mjs';


/*  
    =================================================================================================================
    Representation of a tile on the board.

    Note 1:     Positions accessible by actors (pacman and ghosts)are indexed by the BoardParser (zero based)

    Note 2:     All board positions hold only non-actor characters and no teleporter elements (e.g. wall, point, powerup, ...).
                Position and state of actors (pacman and ghosts) are tracked via actor objects managed by level.mjs.

                This separation prevents actors from overwriting level elements or position information of other actors.
    =================================================================================================================
 */


export default class BoardPosition {


    #x;
    #y;
    #id;
    #elementCharacter;


    constructor(x, y, elementCharacter) {
        this.#x = x;
        this.#y = y;
        this.#id = Configuration.idInaccessibleBoardTiles;
        this.#elementCharacter = elementCharacter;
    }


    set id(id) {
        // prevent change of accessible element ids after initialization
        const isBoardTileInaccessible = this.#id === Configuration.idInaccessibleBoardTiles;
        this.#id = (isBoardTileInaccessible) ? id : this.#id;
    }


    set elementCharacter(character) {
        this.#elementCharacter = character;
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


    get elementCharacter() {
        return this.#elementCharacter;
    }


    clone() {
        const clone = new BoardPosition(this.#x, this.#y, this.#elementCharacter);
        clone.id = this.#id;
        return clone;
    }

    
}