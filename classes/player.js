import Point from "./point.js";
import Skin from "./skin.js";
import Powerup from "./powerup.js";
import { map } from "../main.js";
import Bomb from "./bomb.js";

export default class Player {
  constructor(id, x, y, size) {
    this.id = id;
    this.position = new Point(x, y, size);
    this.size = size;
    this.direction = 0;
    this.activeSkin = 0;
    this.skin = new Skin(); // Line from gemini 18-04-2024
    this.direction = "down"; // The direction the player is facing, to animate the player
    this.powerups = []; // The active powerups
    this.lives = 1; // The amount of lives the player has default always one, can be increased
  }

  setActiveSkin(skinIndex) {
    if (skinIndex >= 0 && skinIndex < 6) {
      this.activeSkin = skinIndex;
    } else {
      console.error("Invalid skin index:", skinIndex);
    }
  }

  draw() {
    push();
    fill(255, 255, 0);
    rect(this.position.pixelX, this.position.pixelY, this.size);
    pop();

    //const currentSkin = this.skin.activeSkin;
    //const currentImage = currentSkin[this.direction]; // Assuming direction property exists
    //image(loadImage(currentImage), this.x, this.y, this.size, this.size);
    this.updatePickup();
  }

  placeBomb() {
    const x = this.position.getGridPosition().x;
    const y = this.position.getGridPosition().y;
    map.grid[x][y] = new Bomb(x * this.size, y * this.size, this.size, true);
  }

  die() {
    this.lives--;
    if (this.lives === 0) {
      console.log("DEAD");
    }
  }

  moveUp() {
    this.direction = "up";

    if (this.checkCollision(0, -1) === true) {
      this.position.x = this.position.getGridPosition().x * this.size;
      this.position.pixelX =
        this.position.getGridPosition().x * this.size + map.marginLeft;
      if (
        this.powerups.some((obj) => obj.type === "speed") &&
        this.powerups.some((obj) => obj.type === "slow")
      ) {
        this.position.pixelY -= 1;
        this.position.y -= 1;
      } else if (this.powerups.some((obj) => obj.type === "speed")) {
        this.position.pixelY -= 2;
        this.position.y -= 2;
      } else if (this.powerups.some((obj) => obj.type === "slow")) {
        this.position.pixelY -= 0.5;
        this.position.y -= 0.5;
      } else {
        this.position.pixelY -= 1;
        this.position.y -= 1;
      }
    }
  }

  moveDown() {
    this.direction = "down";
    if (this.checkCollision(0, 1) === true) {
      this.position.x = this.position.getGridPosition().x * this.size;
      this.position.pixelX =
        this.position.getGridPosition().x * this.size + map.marginLeft;
      if (
        this.powerups.some((obj) => obj.type === "speed") &&
        this.powerups.some((obj) => obj.type === "slow")
      ) {
        this.position.pixelY += 1;
        this.position.y += 1;
      } else if (this.powerups.some((obj) => obj.type === "speed")) {
        this.position.pixelY += 2;
        this.position.y += 2;
      } else if (this.powerups.some((obj) => obj.type === "slow")) {
        this.position.pixelY += 0.5;
        this.position.y += 0.5;
      } else {
        this.position.pixelY += 1;
        this.position.y += 1;
      }
    }
  }

  moveLeft() {
    this.direction = "left";

    if (this.checkCollision(-1, 0) === true) {
      this.position.y = this.position.getGridPosition().y * this.size;
      this.position.pixelY =
        this.position.getGridPosition().y * this.size + map.marginTop;
      if (
        this.powerups.some((obj) => obj.type === "speed") &&
        this.powerups.some((obj) => obj.type === "slow")
      ) {
        this.position.pixelX -= 1;
        this.position.x -= 1;
      } else if (this.powerups.some((obj) => obj.type === "speed")) {
        this.position.pixelX -= 2;
        this.position.x -= 2;
      } else if (this.powerups.some((obj) => obj.type === "slow")) {
        this.position.pixelX -= 0.5;
        this.position.x -= 0.5;
      } else {
        this.position.pixelX -= 1;
        this.position.x -= 1;
      }
    }
  }

  moveRight() {
    this.direction = "right";

    if (this.checkCollision(1, 0) === true) {
      this.position.y = this.position.getGridPosition().y * this.size;
      this.position.pixelY =
        this.position.getGridPosition().y * this.size + map.marginTop;
      if (
        this.powerups.some((obj) => obj.type === "speed") &&
        this.powerups.some((obj) => obj.type === "slow")
      ) {
        this.position.pixelX += 1;
        this.position.x += 1;
      } else if (this.powerups.some((obj) => obj.type === "speed")) {
        this.position.pixelX += 2;
        this.position.x += 2;
      } else if (this.powerups.some((obj) => obj.type === "slow")) {
        this.position.pixelX += 0.5;
        this.position.x += 0.5;
      } else {
        this.position.pixelX += 1;
        this.position.x += 1;
      }
    }
  }

  checkCollision(directionX, directionY) {
    let playerGridPosition = this.position.getGridPosition(); // return grid position in grid block x and y

    let nextGrid = // Is the box youre moving towards.
      map.grid[playerGridPosition.x + directionX][
        playerGridPosition.y + directionY
      ];

    let playerPosition = {
      x: this.position.x / this.size,
      y: this.position.y / this.size,
    };

    if (
      nextGrid === undefined ||
      nextGrid instanceof Powerup ||
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

  updatePickup() {
    this.powerups.forEach((powerup, index) => {
      powerup.duration--;
      if (powerup.duration === 0) {
        this.powerups.splice(index, 1);
      }
    });

    let playerGridPosition = this.position.getGridPosition();
    let powerup = map.grid[playerGridPosition.x]?.[playerGridPosition.y];
    if (powerup instanceof Powerup) {
      this.powerups.push(powerup.pickup());
    }
  }
}
