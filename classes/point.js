import { map } from "../main.js";

export default class Point {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.pixelX = x + map.marginLeft; // The x position where the point is drawn (relative to the map)
    this.pixelY = y + map.marginTop; // The y position where the point is drawn (relative to the map)
    this.gridSize = size; // The size of the grid
  }

  getGridPosition() {
    return {
      x: Math.floor((this.x + this.gridSize / 2) / this.gridSize),
      y: Math.floor((this.y + this.gridSize / 2) / this.gridSize),
    };
  }
}
