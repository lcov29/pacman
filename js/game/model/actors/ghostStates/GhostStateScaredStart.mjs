import Configuration from "../../../../global/Configuration.mjs";
import GhostStateScared from "./GhostStateScared.mjs";
import GhostStateScaredEnd from "./GhostStateScaredEnd.mjs";


export default class GhostStateScaredStart extends GhostStateScared {


    constructor(ghost) {
        super(ghost);
        super.setName(Configuration.nameGhostStateScared);       
        super.setDurationInTurns(Configuration.turnDurationGhostStateScared);
        ghost.reverseCurrentMovementDirection();
    }


    getSubsequentState() {
        return new GhostStateScaredEnd(super.getGhost());
    }

    
}