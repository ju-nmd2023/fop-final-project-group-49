import Point from "./point.js";

export default class Block {
  constructor(x, y, size) {
    this.position = new Point(x, y, size);
    this.size = size;
  }

  draw() {
    fill(255);
    rect(this.position.pixelX, this.position.pixelY, this.size);
  }
}
