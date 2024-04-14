import Point from "./point.js";

export default class Block {
  constructor(x, y, size, indestructible) {
    this.position = new Point(x, y, size);
    this.size = size;
    this.indestructible = indestructible;
  }

  draw() {
    if (this.indestructible) {
      fill(255, 0, 0);
    } else {
      fill(255);
    }
    rect(this.position.pixelX, this.position.pixelY, this.size);
  }
}
