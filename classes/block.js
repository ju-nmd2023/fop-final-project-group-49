import Point from "./point.js";
import { map } from "../main.js";
import Powerup from "./powerup.js";

export default class Block {
  constructor(x, y, size, indestructible) {
    this.position = new Point(x, y, size);
    this.size = size;
    this.indestructible = indestructible; // Is the block indestructible?
    this.powerup = undefined; // The powerup that is inside the block
  }

  draw() {
    if (this.indestructible) {
      fill(255, 0, 0);
    } else {
      fill(255);
    }
    rect(this.position.pixelX, this.position.pixelY, this.size);
  }

  destroy() {
    if (!this.indestructible) {
      let gridPosition = this.position.getGridPosition();
      if (this.powerup != undefined) {
        map.grid[gridPosition.x][gridPosition.y] = new Powerup(
          this.position.x,
          this.position.y,
          this.size,
          this.powerup,
        );
      } else {
        map.grid[gridPosition.x][gridPosition.y] = undefined;
      }
    }
  }
}
