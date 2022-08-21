import Configuration from "../../../../global/Configuration.mjs";
import GhostStateChase from "./GhostStateChase.mjs";
import GhostStateScared from "./GhostStateScared.mjs";


export default class GhostStateScaredEnd extends GhostStateScared {


    constructor(ghost) {
        super(ghost);
        super.name = Configuration.nameGhostStateScaredEnd;
        super.remainingTurns = Configuration.turnDurationGhostStateScaredEnd;
    }


    getSubsequentState() {
        return new GhostStateChase(super.getGhost());
    }


}