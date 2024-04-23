import Point from "./point.js";

export default class Powerup {
  constructor(x, y, size, type) {
    this.position = new Point(x, y, size);
    this.size = size;
    this.type = type; // What type of powerup is it?
  }

  draw() {
    push();
    fill(0, 255, 0);
    translate(this.size / 2, this.size / 2);
    circle(this.position.pixelX, this.position.pixelY, this.size);
    pop();
  }

  pickup() {
    // TODO: Implement pickup logic
  }
}
