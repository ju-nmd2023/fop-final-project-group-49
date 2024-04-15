import Point from "./point.js";
import { map } from "../main.js";

export default class Player {
  constructor(x, y, size) {
    this.position = new Point(x, y, size);
    this.size = size;
    this.direction = 0; // The direction the player is facing, to animate the player
    this.powerups = []; // The active powerups
    this.lives = 1; // The amount of lives the player has default always one, can be increased
    this.skin = 0; // The skin of the player
  }

  draw() {
    fill(255);
    rect(this.position.pixelX, this.position.pixelY, this.size);
  }

  moveUp() {
    // this.checkCollision();
    this.position.pixelY -= 1;
    this.position.y -= 1;
  }
  moveDown() {
    // this.checkCollision();
    this.position.pixelY += 1;
    this.position.y += 1;
  }
  moveLeft() {
    // this.checkCollision();
    this.position.pixelX -= 1;
    this.position.x -= 1;
  }
  moveRight() {
    // this.checkCollision();
    this.position.pixelX += 1;
    this.position.x += 1;
  }
  // checkCollision() {  // loopa igenom blocks, jämföra position med block, jämföra nästa position
  // for (i = 0; i < Block.length; )

  // }
}
