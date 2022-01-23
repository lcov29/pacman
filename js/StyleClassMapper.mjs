"use strict";

import Configuration from "./Configuration.mjs";


export default class StyleClassMapper {


    static background_class_map = {
        [Configuration.WALL_CHARACTER]:             Configuration.WALL_BACKGROUND_CSS_CLASS,
        [Configuration.EMPTY_TILE_CHARACTER]:       Configuration.EMPTY_TILE_BACKGROUND_CSS_CLASS,
        [Configuration.GHOST_DOOR_CHARACTER]:       Configuration.GHOST_DOOR_BACKGROUND_CSS_CLASS,
        [Configuration.TELEPORTER_1_CHARACTER]:     Configuration.TELEPORTER_1_BACKGROUND_CSS_CLASS,
        [Configuration.TELEPORTER_2_CHARACTER]:     Configuration.TELEPORTER_2_BACKGROUND_CSS_CLASS,
        [Configuration.TELEPORTER_3_CHARACTER]:     Configuration.TELEPORTER_3_BACKGROUND_CSS_CLASS,
        [Configuration.PACMAN_CHARACTER]:           Configuration.EMPTY_TILE_BACKGROUND_CSS_CLASS,
        [Configuration.GHOST_BLINKY_CHARACTER]:     Configuration.EMPTY_TILE_BACKGROUND_CSS_CLASS,
        [Configuration.GHOST_PINKY_CHARACTER]:      Configuration.EMPTY_TILE_BACKGROUND_CSS_CLASS,
        [Configuration.GHOST_INKY_CHARACTER]:       Configuration.EMPTY_TILE_BACKGROUND_CSS_CLASS,
        [Configuration.GHOST_CLYDE_CHARACTER]:      Configuration.EMPTY_TILE_BACKGROUND_CSS_CLASS,
        [Configuration.POINT_CHARACTER]:            Configuration.EMPTY_TILE_BACKGROUND_CSS_CLASS,
        [Configuration.POWERUP_CHARACTER]:          Configuration.EMPTY_TILE_BACKGROUND_CSS_CLASS,
        [Configuration.UNDEFINED_TILE_CHARACTER]:   Configuration.UNDEFINED_TILE_BACKGROUND_CSS_CLASS
    };
  
  
    static foreground_class_map = {
        [Configuration.WALL_CHARACTER]:             Configuration.EMPTY_FOREGROUND_CSS_CLASS,
        [Configuration.EMPTY_TILE_CHARACTER]:       Configuration.EMPTY_FOREGROUND_CSS_CLASS,
        [Configuration.GHOST_DOOR_CHARACTER]:       Configuration.EMPTY_FOREGROUND_CSS_CLASS,
        [Configuration.TELEPORTER_1_CHARACTER]:     Configuration.EMPTY_FOREGROUND_CSS_CLASS,
        [Configuration.TELEPORTER_2_CHARACTER]:     Configuration.EMPTY_FOREGROUND_CSS_CLASS,
        [Configuration.TELEPORTER_3_CHARACTER]:     Configuration.EMPTY_FOREGROUND_CSS_CLASS,
        [Configuration.PACMAN_CHARACTER]:           `${Configuration.PACMAN_FOREGROUND_CSS_CLASS}_${Configuration.INITIAL_PACMAN_SPRITE_DIRECTION}`,
        [Configuration.GHOST_BLINKY_CHARACTER]:     `${Configuration.GHOST_BLINKY_MOVEMENT_FOREGROUND_CSS_CLASS}_${Configuration.INITIAL_GHOST_SPRITES_DIRECTION}`,
        [Configuration.GHOST_PINKY_CHARACTER]:      `${Configuration.GHOST_PINKY_MOVEMENT_FOREGROUND_CSS_CLASS}_${Configuration.INITIAL_GHOST_SPRITES_DIRECTION}`,
        [Configuration.GHOST_INKY_CHARACTER]:       `${Configuration.GHOST_INKY_MOVEMENT_FOREGROUND_CSS_CLASS}_${Configuration.INITIAL_GHOST_SPRITES_DIRECTION}`,
        [Configuration.GHOST_CLYDE_CHARACTER]:      `${Configuration.GHOST_CLYDE_MOVEMENT_FOREGROUND_CSS_CLASS}_${Configuration.INITIAL_GHOST_SPRITES_DIRECTION}`,
        [Configuration.POINT_CHARACTER]:            Configuration.POINT_FOREGROUND_CSS_CLASS,
        [Configuration.POWERUP_CHARACTER]:          Configuration.POWERUP_FOREGROUND_CSS_CLASS,
        [Configuration.UNDEFINED_TILE_CHARACTER]:   Configuration.EMPTY_FOREGROUND_CSS_CLASS
    };
  
  
    static getBackgroundStyleClass(character, position_id, ghost_door_direction_map) {
        let direction_suffix = StyleClassMapper.getBackgroundDirectionSuffix(character, position_id, ghost_door_direction_map);
        return StyleClassMapper.getStyleClass(StyleClassMapper.background_class_map, character, direction_suffix);
    }


    static getForegroundStyleClass(actor_character, element_character) {
        let character = StyleClassMapper.chooseBoardPositionLayerElementForForegroundMapping(actor_character, element_character);
        return StyleClassMapper.getStyleClass(StyleClassMapper.foreground_class_map, character);
    }


    static getBackgroundDirectionSuffix(character, position_id, ghost_door_direction_map) {
        let direction_suffix = "";
        if (character === Configuration.GHOST_DOOR_CHARACTER) {
            for (let entry of ghost_door_direction_map) {
                if (entry.id === position_id) {
                    direction_suffix = entry.direction_suffix;
                    break;
                }
            }
        }
        return direction_suffix;
    }


    static chooseBoardPositionLayerElementForForegroundMapping(actor_character, element_character) {
        return (actor_character === Configuration.EMPTY_TILE_CHARACTER) ? element_character : actor_character;
    }


    static getStyleClass(map, character, direction_suffix="") {
        let style_class = map[character];
        if (direction_suffix !== "") {
            style_class += `_${direction_suffix}`;
        }
        return style_class;
    }

  
}