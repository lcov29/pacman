"use strict";

class BoardInternalElement {

    constructor(element, id = Configuration.id_unaccessible_board_element) {
        this.id = id;
        this.element = element;
    }


    getID() {
        return this.id;
    }


    getElement() {
        return this.element;
    }


    setID(id) {
        this.id = id;
    }


    setElement(element) {
        this.element = element;
    }


    clone() {
        return new BoardInternalElement(this.element, this.id);
    }

}