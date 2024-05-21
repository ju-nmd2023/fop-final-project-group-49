import Point from "./point.js";
import { map, playerList, bombImg, shortFartSound } from "../main.js";
import Block from "./block.js";

export default class Bomb {
  constructor(x, y, size, powerBomb, playerId) {
    this.position = new Point(x, y, size);
    this.size = size;
    this.timeToExlode = 180;
    this.powerBomb = powerBomb;
    this.playerId = playerId;
  }

  draw() {
    push();
    image(
      bombImg,
      this.position.pixelX,
      this.position.pixelY,
      this.size,
      this.size,
    );
    pop();
    this.update();
  }

  update() {
    this.timeToExlode--;
    if (this.timeToExlode <= 0) {
      this.explode();
      shortFartSound.play();
    }
  }

  explode() {
    let gridPosition = this.position.getGridPosition(); //removes the powerup from the map

    let bombOffsets = [
      //This is changed if you have the bomb powerup
      [0, 0],
      [0, 1], // Up
      [0, -1], // Down
      [-1, 0], // Left
      [1, 0], // Right
    ];
    if (this.powerBomb === true) {
      bombOffsets = [
        [0, 0],
        [0, 2], // Up
        [0, -2], // Down
        [-2, 0], // Left
        [2, 0],
        [0, 1], // Up
        [0, -1], // Down
        [-1, 0], // Left // for powerbomb, explodes two squares of each side
        [1, 0],
      ];
    }

    map.grid[gridPosition.x][gridPosition.y] = null;

    for (const [offsetX, offsetY] of bombOffsets) {
      let newPosition = {
        x: gridPosition.x + offsetX,
        y: gridPosition.y + offsetY, //bomb exploding position and which grid squares should explode based on the bombs position
      };

      let middlePosition;

      if (offsetX > 1) {
        //defines the middlepositions in each direction
        middlePosition = {
          x: gridPosition.x + offsetX - 1,
          y: gridPosition.y + offsetY,
        };
      } else if (offsetY > 1) {
        middlePosition = {
          y: gridPosition.y + offsetY - 1,
          x: gridPosition.x + offsetX,
        };
      } else if (offsetX < -1) {
        middlePosition = {
          x: gridPosition.x + offsetX + 1,
          y: gridPosition.y + offsetY,
        };
      } else if (offsetY < -1) {
        middlePosition = {
          x: gridPosition.x + offsetX,
          y: gridPosition.y + offsetY + 1,
        };
      }

      playerList.forEach((player) => {
        if (
          player.position.getGridPosition().x == newPosition.x &&
          player.position.getGridPosition().y == newPosition.y
        ) {
          if (middlePosition) {
            if (!map.grid[middlePosition.x][middlePosition.y]?.indestructible) {
              player.die();
            }
          } else {
            player.die();
          }
        }
      });

      if (map.grid[newPosition.x]?.[newPosition.y] instanceof Block) {
        // Checks if the bomb explosion position is a block
        if (middlePosition) {
          if (map.grid[middlePosition.x][middlePosition.y]?.indestructible) {
          } else {
            map.grid[newPosition.x][newPosition.y].destroy(); // If its not indestructible, explode
          }
        } else {
          map.grid[newPosition.x][newPosition.y].destroy();
        }
      }
    }
  }
}
