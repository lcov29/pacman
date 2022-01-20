"use strict";

import Utility from "./Utility.mjs";


export default class UpdateManager {


    constructor(level, board) {
        this.level = level;
        this.board = board;
        this.board_update_requests = [];
        this.view_update_requests = [];
    }


    addRequest(request) {
        this.addBoardRequest(request);
        this.addViewRequest(request);
    }


    addBoardRequest(request) {
        this.board_update_requests.push(request);
    }


    addViewRequest(request) {
        let position_id = request.getPosition().getID();
        if (this.getPriorityOfExistingViewRequestFor(position_id) < request.getPriority()) {
            this.removeExistingViewRequestFor(position_id);
            this.view_update_requests.push(request);
        }
    }


    updateBoard() {
        for (let request of this.board_update_requests) {
            this.board.setPosition(request.getPosition());
        }
        this.board_update_requests = [];
    }


    updateView() {
        for (let request of this.view_update_requests) {
            this.level.sendViewUpdate(request.getPosition(), request.getStyleClass());
        }
        this.view_update_requests = [];
    }


    getPriorityOfExistingViewRequestFor(position_id) {
        let result = -1;
        for (let request of this.view_update_requests) {
            if (request.getPosition().getID() === position_id) {
                result = request.getPriority();
                break;
            }
        }
        return result;
    }


    removeExistingViewRequestFor(position_id) {
        for (let request of this.view_update_requests) {
            if (request.getPosition().getID() === position_id) {
                Utility.removeElementFrom(this.view_update_requests, request);
                break;
            }
        }
    }

}