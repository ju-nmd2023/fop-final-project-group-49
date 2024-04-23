import Point from "./point.js";
import Skin from "./skin.js";

export default class Player {
  constructor(x, y, size) {
    this.position = new Point(x, y, size);
    this.size = size;
    this.direction = 0;
    this.skin = new Skin(); // Line from gemini 18-04-2024
  }
  chooseSkin(skinIndex) {
    this.skin.setActiveSkin(skinIndex);
  } // Also from gemini
  draw() {
    fill(255);
    rect(this.position.pixelX, this.position.pixelY, this.size);
  }

  moveUp() {
    this.position.pixelY -= 1;
    this.position.y -= 1;
  }
  moveDown() {
    this.position.pixelY += 1;
    this.position.y += 1;
  }
  moveLeft() {
    this.position.pixelX -= 1;
    this.position.x -= 1;
  }
  moveRight() {
    this.position.pixelX += 1;
    this.position.x += 1;
  }
}
