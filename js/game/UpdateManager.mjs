"use strict";

import Utility from "../Utility.mjs";


export default class UpdateManager {


    constructor(level, board) {
        this.level = level;
        this.board = board;
        this.boardUpdateRequests = [];
        this.viewUpdateRequests = [];
    }


    addRequest(request) {
        this.addBoardRequest(request);
        this.addViewRequest(request);
    }


    addBoardRequest(request) {
        this.boardUpdateRequests.push(request);
    }


    addViewRequest(request) {
        let positionId = request.getPosition().getID();
        if (this.getPriorityOfExistingViewRequestFor(positionId) < request.getPriority()) {
            this.removeExistingViewRequestFor(positionId);
            this.viewUpdateRequests.push(request);
        }
    }


    updateBoard() {
        for (let request of this.boardUpdateRequests) {
            this.board.setPosition(request.getPosition());
        }
        this.boardUpdateRequests = [];
    }


    updateView() {
        for (let request of this.viewUpdateRequests) {
            this.level.sendViewUpdate(request.getPosition(), request.getStyleClass());
        }
        this.viewUpdateRequests = [];
    }


    getPriorityOfExistingViewRequestFor(positionId) {
        let result = -1;
        for (let request of this.viewUpdateRequests) {
            if (request.getPosition().getID() === positionId) {
                result = request.getPriority();
                break;
            }
        }
        return result;
    }


    removeExistingViewRequestFor(positionId) {
        for (let request of this.viewUpdateRequests) {
            if (request.getPosition().getID() === positionId) {
                Utility.removeElementFrom(this.viewUpdateRequests, request);
                break;
            }
        }
    }

}