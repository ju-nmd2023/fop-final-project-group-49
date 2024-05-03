import Point from "./point.js";
import { map } from "../main.js";
import Block from "./block.js";

export default class Bomb {
  constructor(x, y, size, timeToExplode) {
    this.position = new Point(x, y, size);
    this.size = size;
    this.timeToExlode = timeToExplode;
  }

  draw() {
    push();
    fill(0, 0, 0);
    translate(this.size / 2, this.size / 2);
    circle(this.position.pixelX, this.position.pixelY, this.size);
    pop();
  }

  explode() {
    let gridPosition = this.position.getGridPosition(); //removes the powerup from the map

    const bombOffsets = [
      [0, 1], // Up
      [0, -1], // Down
      [-1, 0], // Left
      [1, 0], // Right
    ];

    map.grid[gridPosition.x][gridPosition.y] = undefined;

    for (const [offsetX, offsetY] of bombOffsets) {
      let newPosition = {
        x: gridPosition.x + offsetX,
        y: gridPosition.y + offsetY,
      };

      if (map.grid[newPosition.x][newPosition.y] instanceof Block) {
        map.grid[newPosition.x][newPosition.y].destroy();
      }
    }
  }
}
