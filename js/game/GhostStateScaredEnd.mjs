import Configuration from "../Configuration.mjs";
import GhostStateChase from "./GhostStateChase.mjs";
import GhostStateScared from "./GhostStateScared.mjs";


export default class GhostStateScaredEnd extends GhostStateScared {


    constructor(ghost) {
        super(ghost);
        super.setName(Configuration.nameGhostStateScaredEnd);
        super.setDurationInTurns(Configuration.turnDurationGhostStateScaredEnd);
    }


    getSubsequentState() {
        return new GhostStateChase(super.getGhost());
    }


}