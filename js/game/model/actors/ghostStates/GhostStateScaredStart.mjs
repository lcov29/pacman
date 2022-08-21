import Configuration from "../../../../global/Configuration.mjs";
import GhostStateScared from "./GhostStateScared.mjs";
import GhostStateScaredEnd from "./GhostStateScaredEnd.mjs";


export default class GhostStateScaredStart extends GhostStateScared {


    constructor(ghost) {
        super(ghost);
        super.name = Configuration.nameGhostStateScared;       
        super.remainingTurns = Configuration.turnDurationGhostStateScared;
        ghost.reverseCurrentMovementDirection();
    }


    getSubsequentState() {
        return new GhostStateScaredEnd(super.ghost);
    }

    
}