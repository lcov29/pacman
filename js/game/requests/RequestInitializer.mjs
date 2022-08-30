import BackgroundRequest from "./BackgroundRequest.mjs";
import MovementRequest from "./MovementRequest.mjs";
import Configuration from "../../global/Configuration.mjs";


export default class RequestInitializer {


    static buildInitialBackgroundRequestList(boardPositionArray) {
        const requestList = [];

        for (let row of boardPositionArray) {
            for (let element of row) {
                const request = new BackgroundRequest(element.x, element.y, element.elementCharacter);
                requestList.push(request);
            }
        }

        return requestList;
    }


    static buildInitialActorMovementRequestList(initialActorPositionList) {
        const requestList = [];

        for (let position of initialActorPositionList) {
            const request = new MovementRequest();

            request.xPositionStart = position.x;
            request.yPositionStart = position.y;
            request.xPositionDestination = position.x;
            request.yPositionDestination = position.y;

            const actorCharacter = position.elementCharacter;
            request.actorCharacter =  actorCharacter;

            const isGhostCharacter = Configuration.ghostCharacterList.includes(actorCharacter);
            if (isGhostCharacter) {
                request.directionName = Configuration.initialGhostSpriteDirection;
                request.actorStateName = Configuration.initialGhostStateName;
            } else {
                request.directionName = Configuration.initialPacmanSpriteDirection;
            }
            
            requestList.push(request);
        }

        return requestList;
    }


}