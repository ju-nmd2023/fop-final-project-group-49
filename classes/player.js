import Point from "./point.js";
import { map } from "../main.js";

export default class Player {
  constructor(x, y, size) {
    this.position = new Point(x, y, size);
    this.size = size;
    this.direction = "down"; // The direction the player is facing, to animate the player
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
      this.direction = "up";
    }
  }
  moveDown() {
    if (this.checkCollision(0, 1) === true) {
      this.position.pixelY += 1;
      this.position.y += 1;
      this.direction = "down";
    }
  }
  moveLeft() {
    if (this.checkCollision(-1, 0) === true) {
      this.position.pixelX -= 1;
      this.position.x -= 1;
      this.direction = "left";
    }
  }
  moveRight() {
    if (this.checkCollision(1, 0) === true) {
      this.position.pixelX += 1;
      this.position.x += 1;
      this.direction = "right";
    }
  }
  checkCollision(directionX, directionY) {
    let playerGridPosition = this.position.getGridPosition();
    let checkBox = // If the box youre moving towards.
      map.grid[playerGridPosition.x + directionX][
        playerGridPosition.y + directionY
      ];
    let playerPosition = {
      x: this.position.x / this.size,
      y: this.position.y / this.size,
    };

    if (
      checkBox === undefined ||
      (playerPosition.x > playerGridPosition.x && this.direction === "left") ||
      (playerPosition.x < playerGridPosition.x + 1 &&
        this.direction === "right")
    ) {
      return true;
    } else {
      console.log(checkBox);
    }
  }
}

// fix pixel position
