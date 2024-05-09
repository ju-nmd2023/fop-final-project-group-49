import Point from "./point.js";
import { map, images } from "../main.js";
import Powerup from "./powerup.js";

export default class Block {
  constructor(x, y, size, indestructible) {
    this.position = new Point(x, y, size);
    this.size = size;
    this.indestructible = indestructible; // Is the block indestructible?
    this.powerup = undefined; // The powerup that is inside the block
    this.imageIndex = Math.floor(
      Math.random() *
        (this.indestructible
          ? images.indestructible.length
          : images.destructible.length)
    );
  }

  draw() {
    if (this.indestructible) {
      image(
        images.indestructible[this.imageIndex],
        this.position.pixelX,
        this.position.pixelY,
        this.size,
        this.size
      );
    } else {
      image(
        images.destructible[this.imageIndex],
        this.position.pixelX,
        this.position.pixelY,
        this.size,
        this.size
      );
    }
  }

  destroy() {
    if (!this.indestructible) {
      let gridPosition = this.position.getGridPosition();
      if (this.powerup != undefined) {
        map.grid[gridPosition.x][gridPosition.y] = new Powerup(
          this.position.x,
          this.position.y,
          this.size,
          this.powerup
        );
      } else {
        map.grid[gridPosition.x][gridPosition.y] = undefined;
      }
    }
  }
}
