export default class Powerup {
  constructor(x, y, size, type) {
    this.position = new Point(x, y, size);
    this.type = type; // What type of powerup is it?
  }

  draw() {
    fill(0, 255, 0);
    rect(this.position.pixelX, this.position.pixelY, this.size);
  }

  pickup() {
    // TODO: Implement pickup logic
  }
}
