import { map } from "../main.js";

export default class Point {
  constructor(x, y, size, fixed) {
    this.x = x;
    this.y = y;
    this.pixelX = x + map.marginLeft;
    this.pixelY = y + map.marginTop;
    this.gridSize = size;
    this.fixed = fixed;
  }

  getGridPosition() {
    console.log(this.x, this.y);
    console.log(this.pixelX, this.pixelY);
    return {
      x: Math.floor(
        (this.pixelX - map.marginLeft + this.gridSize / 2) / this.gridSize,
      ),
      y: Math.floor(
        (this.pixelY - map.marginTop + this.gridSize / 2) / this.gridSize,
      ),
    };
  }
}
