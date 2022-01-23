"use strict";

import Configuration from "./Configuration.mjs";


export default class StyleClassMapper {


    static background_class_map = {
        [Configuration.wall_character]:                 Configuration.wall_background_css_class,
        [Configuration.empty_tile_character]:           Configuration.empty_background_css_class,
        [Configuration.ghost_door_character]:           Configuration.ghost_door_background_css_class,
        [Configuration.teleporter_1_tile_character]:    Configuration.teleporter_1_background_css_class,
        [Configuration.teleporter_2_tile_character]:    Configuration.teleporter_2_background_css_class,
        [Configuration.teleporter_3_tile_character]:    Configuration.teleporter_3_background_css_class,
        [Configuration.pacman_character]:               Configuration.empty_background_css_class,
        [Configuration.ghost_blinky_character]:         Configuration.empty_background_css_class,

        [Configuration.GHOST_PINKY_CHARACTER]:          Configuration.empty_background_css_class,
        [Configuration.GHOST_INKY_CHARACTER]:           Configuration.empty_background_css_class,
        [Configuration.GHOST_CLYDE_CHARACTER]:          Configuration.empty_background_css_class,

        [Configuration.point_character]:                Configuration.empty_background_css_class,
        [Configuration.powerup_character]:              Configuration.empty_background_css_class
    };
  
  
    static foreground_class_map = {
        [Configuration.wall_character]:                 Configuration.empty_foreground_css_class,
        [Configuration.empty_tile_character]:           Configuration.empty_foreground_css_class,
        [Configuration.ghost_door_character]:           Configuration.empty_foreground_css_class,
        [Configuration.teleporter_1_tile_character]:    Configuration.empty_foreground_css_class,
        [Configuration.teleporter_2_tile_character]:    Configuration.empty_foreground_css_class,
        [Configuration.teleporter_3_tile_character]:    Configuration.empty_foreground_css_class,
        [Configuration.pacman_character]:               `${Configuration.pacman_foreground_css_class}_${Configuration.initial_pacman_direction}`,
        [Configuration.ghost_blinky_character]:         `${Configuration.ghost_blinky_movement_foreground_css_class}_${Configuration.initial_ghosts_direction}`,

        [Configuration.GHOST_PINKY_CHARACTER]:          `${Configuration.GHOST_PINKY_MOVEMENT_FOREGROUND_CSS_CLASS}_${Configuration.initial_ghosts_direction}`,
        [Configuration.GHOST_INKY_CHARACTER]:           `${Configuration.GHOST_INKY_MOVEMENT_FOREGROUND_CSS_CLASS}_${Configuration.initial_ghosts_direction}`,
        [Configuration.GHOST_CLYDE_CHARACTER]:          `${Configuration.GHOST_CLYDE_MOVEMENT_FOREGROUND_CSS_CLASS}_${Configuration.initial_ghosts_direction}`,

        [Configuration.point_character]:                Configuration.point_foreground_css_class,
        [Configuration.powerup_character]:              Configuration.powerup_foreground_css_class
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
        if (character === Configuration.ghost_door_character) {
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
        return (actor_character === Configuration.empty_tile_character) ? element_character : actor_character;
    }


    static getStyleClass(map, character, direction_suffix="") {
        let style_class = map[character];
        if (direction_suffix !== "") {
            style_class += `_${direction_suffix}`;
        }
        return style_class;
    }

  
}