"use strict";

class BoardPosition {


    constructor(x, y, actor_character, element_character) {
        this.x = x;
        this.y = y;
        this.id = Configuration.id_unaccessible_board_element;
        this.actor_layer_character = actor_character;
        this.element_layer_character = element_character;
    }


    setID(id) {
        // prevent id of accessible elements to change after initialisation
        this.id = (this.id === Configuration.id_unaccessible_board_element) ? id : this.id;
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