import CustomLevelSelection from "./CustomLevelSelection.mjs"


async function initialize() {
    const customLevelSelection = new CustomLevelSelection();
    await customLevelSelection.initialize();
};


initialize();