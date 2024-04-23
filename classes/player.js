import Point from "./point.js";
import Skin from "./skin.js";
import { map } from "../main.js";

export default class Player {
  constructor(id, x, y, size) {
    this.id = id;
    this.position = new Point(x, y, size);
    this.size = size;
    this.direction = 0;
    this.skin = new Skin(); // Line from gemini 18-04-2024
    this.direction = "down"; // The direction the player is facing, to animate the player
    this.powerups = []; // The active powerups
    this.lives = 1; // The amount of lives the player has default always one, can be increased
  }

  chooseSkin(skinIndex) {
    this.skin.setActiveSkin(skinIndex);
  } // Also from gemini

  draw() {
    push();
    fill(255, 255, 0);
    rect(this.position.pixelX, this.position.pixelY, this.size);
    pop();
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
    let playerGridPosition = this.position.getGridPosition(); // return grid position in grid block x and y
    let checkBox = // Is the box youre moving towards.
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
      (playerPosition.x < playerGridPosition.x && this.direction === "right") ||
      (playerPosition.y > playerGridPosition.y && this.direction === "up") ||
      (playerPosition.y < playerGridPosition.y && this.direction === "down")
    ) {
      return true;
    } else {
      return false;
    }
  }
}

// fix pixel position
