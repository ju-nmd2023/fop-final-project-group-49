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
    fill(255, 255, 0);
    rect(this.position.pixelX, this.position.pixelY, this.size);
  }

  moveUp() {
    if (this.checkCollision(0, -1) === true) {
      this.position.pixelY -= 1;
      this.position.y -= 1;
    }
  }
  moveDown() {
    if (this.checkCollision(0, 1) === true) {
      this.position.pixelY += 1;
      this.position.y += 1;
    }
  }
  moveLeft() {
    if (this.checkCollision(-1, 0) === true) {
      this.position.pixelX -= 1;
      this.position.x -= 1;
    }
  }
  moveRight() {
    if (this.checkCollision(1, 0) === true) {
      this.position.pixelX += 1;
      this.position.x += 1;
    }
  }
  checkCollision(directionX, directionY) {
    let playerPosition = this.position.getGridPosition();
    let checkBox =
      map.grid[playerPosition.x + directionX][playerPosition.y + directionY];

    if (
      checkBox === undefined ||
      checkBox.position.x < this.position.x / this.size
    ) {
      return true;
    } else {
      console.log(checkBox);
    }
  }
}

// fix pixel position
