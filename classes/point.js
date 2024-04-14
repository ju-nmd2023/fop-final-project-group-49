import { map } from "../main.js";

export default class Point {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.pixelX = x + map.marginLeft;
    this.pixelY = y + map.marginTop;
    this.gridSize = size;
  }

  getGridPosition() {
    return {
      x: Math.floor(
        (this.x + this.gridSize / 2) / this.gridSize,
      ),
      y: Math.floor(
        (this.y + this.gridSize / 2) / this.gridSize,
      ),
    };
  }
}
