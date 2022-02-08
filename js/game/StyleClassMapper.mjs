"use strict";

import Configuration from "../Configuration.mjs";


export default class StyleClassMapper {


    static backgroundClassMap = {
        [Configuration.WALL_CHARACTER]:                     Configuration.WALL_BACKGROUND_CSS_CLASS,
        [Configuration.EMPTY_TILE_CHARACTER]:               Configuration.EMPTY_TILE_BACKGROUND_CSS_CLASS,
        [Configuration.GHOST_DOOR_CROSSING_CHARACTER]:      Configuration.GHOST_DOOR_CROSSING_BACKGROUND_CSS_CLASS,
        [Configuration.GHOST_DOOR_VERTICAL_CHARACTER]:      Configuration.GHOST_DOOR_VERTICAL_BACKGROUND_CSS_CLASS,
        [Configuration.GHOST_DOOR_HORIZONTAL_CHARACTER]:    Configuration.GHOST_DOOR_HORIZONTAL_BACKGROUND_CSS_CLASS,
        [Configuration.TELEPORTER_1_CHARACTER]:             Configuration.TELEPORTER_1_BACKGROUND_CSS_CLASS,
        [Configuration.TELEPORTER_2_CHARACTER]:             Configuration.TELEPORTER_2_BACKGROUND_CSS_CLASS,
        [Configuration.TELEPORTER_3_CHARACTER]:             Configuration.TELEPORTER_3_BACKGROUND_CSS_CLASS,
        [Configuration.PACMAN_CHARACTER]:                   Configuration.EMPTY_TILE_BACKGROUND_CSS_CLASS,
        [Configuration.GHOST_BLINKY_CHARACTER]:             Configuration.EMPTY_TILE_BACKGROUND_CSS_CLASS,
        [Configuration.GHOST_PINKY_CHARACTER]:              Configuration.EMPTY_TILE_BACKGROUND_CSS_CLASS,
        [Configuration.GHOST_INKY_CHARACTER]:               Configuration.EMPTY_TILE_BACKGROUND_CSS_CLASS,
        [Configuration.GHOST_CLYDE_CHARACTER]:              Configuration.EMPTY_TILE_BACKGROUND_CSS_CLASS,
        [Configuration.POINT_CHARACTER]:                    Configuration.EMPTY_TILE_BACKGROUND_CSS_CLASS,
        [Configuration.POWERUP_CHARACTER]:                  Configuration.EMPTY_TILE_BACKGROUND_CSS_CLASS,
        [Configuration.UNDEFINED_TILE_CHARACTER]:           Configuration.UNDEFINED_TILE_BACKGROUND_CSS_CLASS
    };
  
  
    static foregroundClassMap = {
        [Configuration.WALL_CHARACTER]:                     Configuration.EMPTY_FOREGROUND_CSS_CLASS,
        [Configuration.EMPTY_TILE_CHARACTER]:               Configuration.EMPTY_FOREGROUND_CSS_CLASS,
        [Configuration.GHOST_DOOR_CROSSING_CHARACTER]:      Configuration.EMPTY_FOREGROUND_CSS_CLASS,
        [Configuration.GHOST_DOOR_VERTICAL_CHARACTER]:      Configuration.EMPTY_FOREGROUND_CSS_CLASS,
        [Configuration.GHOST_DOOR_HORIZONTAL_CHARACTER]:    Configuration.EMPTY_FOREGROUND_CSS_CLASS,
        [Configuration.TELEPORTER_1_CHARACTER]:             Configuration.EMPTY_FOREGROUND_CSS_CLASS,
        [Configuration.TELEPORTER_2_CHARACTER]:             Configuration.EMPTY_FOREGROUND_CSS_CLASS,
        [Configuration.TELEPORTER_3_CHARACTER]:             Configuration.EMPTY_FOREGROUND_CSS_CLASS,
        [Configuration.PACMAN_CHARACTER]:                   `${Configuration.PACMAN_FOREGROUND_CSS_CLASS}_${Configuration.INITIAL_PACMAN_SPRITE_DIRECTION}`,
        [Configuration.GHOST_BLINKY_CHARACTER]:             `${Configuration.GHOST_BLINKY_MOVEMENT_FOREGROUND_CSS_CLASS}_${Configuration.INITIAL_GHOST_SPRITES_DIRECTION}`,
        [Configuration.GHOST_PINKY_CHARACTER]:              `${Configuration.GHOST_PINKY_MOVEMENT_FOREGROUND_CSS_CLASS}_${Configuration.INITIAL_GHOST_SPRITES_DIRECTION}`,
        [Configuration.GHOST_INKY_CHARACTER]:               `${Configuration.GHOST_INKY_MOVEMENT_FOREGROUND_CSS_CLASS}_${Configuration.INITIAL_GHOST_SPRITES_DIRECTION}`,
        [Configuration.GHOST_CLYDE_CHARACTER]:              `${Configuration.GHOST_CLYDE_MOVEMENT_FOREGROUND_CSS_CLASS}_${Configuration.INITIAL_GHOST_SPRITES_DIRECTION}`,
        [Configuration.POINT_CHARACTER]:                    Configuration.POINT_FOREGROUND_CSS_CLASS,
        [Configuration.POWERUP_CHARACTER]:                  Configuration.POWERUP_FOREGROUND_CSS_CLASS,
        [Configuration.UNDEFINED_TILE_CHARACTER]:           Configuration.EMPTY_FOREGROUND_CSS_CLASS
    };


    static getBackgroundStyleClass(character) {
        return StyleClassMapper.backgroundClassMap[character];
    }


    static getForegroundStyleClass(actorCharacter, elementCharacter) {
        let character = StyleClassMapper.chooseBoardPositionLayerElementForForegroundMapping(actorCharacter, elementCharacter);
        return StyleClassMapper.foregroundClassMap[character];
    }


    static chooseBoardPositionLayerElementForForegroundMapping(actorCharacter, elementCharacter) {
        return (actorCharacter === Configuration.EMPTY_TILE_CHARACTER) ? elementCharacter : actorCharacter;
    }

  
}