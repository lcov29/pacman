"use strict";

import BoardPosition from "./BoardPosition.mjs";
import Configuration from "./Configuration.mjs";


export default class BoardParser {


    constructor(board_reference) {
        this.board_ref = board_reference;
    }


    parse(level_json) {
        let parsed_level_json = JSON.parse(level_json);
        let board = this.buildBoardPositionArray(parsed_level_json.board);
        this.indexAccessiblePositions(board);
        this.initializeGhostScatterPositionList(board, parsed_level_json);
        this.initializeOptionalGhostSpawnPositionLists(board, parsed_level_json);
        this.initializeOtherPositionLists(board);
        this.board_ref.setBoard(board);
    }


    buildBoardPositionArray(board) {
        let output = [...board];
        let current_character = "";
        let current_actor_character = "";
        let current_element_character = "";

        for (let y = 0; y < output.length; y++) {
            for (let x = 0; x < output[y].length; x++) {
                current_character = output[y][x];
                if (this.isActor(current_character)) {
                    current_actor_character = current_character;
                    current_element_character = Configuration.empty_tile_character;
                } else {
                    current_actor_character = Configuration.empty_tile_character;
                    current_element_character = current_character;
                }
                output[y][x] = new BoardPosition(x, y, current_actor_character, current_element_character);
            }
        }
        return output;
    }


    indexAccessiblePositions(position_array) {
        let id = 0;
        let character = "";
        for (let y = 0; y < position_array.length; y++) {
            for (let x = 0; x < position_array[y].length; x++) {
                character = position_array[y][x].getElementCharacter();
                if (this.isAccessibleByActor(character)) {
                    position_array[y][x].setID(id);
                    id++;
                }
             }
        }
    }


    initializeGhostScatterPositionList(board, parsed_json) {
        let positions = [];
        for (let position of parsed_json.scatter_positions) {
            let board_position_clone = board[position.y][position.x].clone();
            board_position_clone.setActorCharacter(Configuration.empty_tile_character);
            board_position_clone.setElementCharacter(position.ghost);
            positions.push(board_position_clone);
        }
        this.board_ref.setGhostScatterPositions(positions);
    }


    initializeOptionalGhostSpawnPositionLists(board, parsed_json) {
        let positions = [];
        for (let position of parsed_json.optional_spawns) {
            let board_position_clone = board[position.y][position.x].clone();
            board_position_clone.setActorCharacter(Configuration.empty_tile_character);
            board_position_clone.setElementCharacter(position.ghost);
            positions.push(board_position_clone);
        }
        this.board_ref.setGhostOptionalSpawnPositions(positions);
    }


    initializeOtherPositionLists(board) {
        let initial_pacman_positions = [];
        let initial_ghost_positions = [];
        let teleporter_positions = [];
        let ghost_door_positions = [];

        for (let y = 0; y < board.length; y++) {
           for (let x = 0; x < board[y].length; x++) {
              let current_position = board[y][x];
              let current_actor_character = current_position.getActorCharacter();
              let current_element_character = current_position.getElementCharacter();
  
              if (current_actor_character === Configuration.pacman_character) {
                 initial_pacman_positions.push(current_position);
              }

              if (Configuration.GHOST_CHARACTERS.includes(current_actor_character)) {
                 initial_ghost_positions.push(current_position);
              }
  
              if (Configuration.TELEPORTER_CHARACTERS.includes(current_element_character)) {
                 teleporter_positions.push(current_position);
              }
  
              if (current_element_character === Configuration.ghost_door_character) {
                 ghost_door_positions.push(current_position);
              }   
           }
        }
        this.board_ref.setInitialPacmanPositions(initial_pacman_positions);
        this.board_ref.setInitialGhostPositions(initial_ghost_positions);
        this.board_ref.setTeleporterPositions(teleporter_positions);
        this.board_ref.setGhostDoorPositions(ghost_door_positions);
    }


    isActor(character) {
        return Configuration.ACTOR_CHARACTERS.includes(character);
    }


    isAccessibleByActor(character) {
        return character !== Configuration.wall_character;
    }

    
}