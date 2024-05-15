import Point from "./point.js";
import Skin from "./skin.js";
import Powerup from "./powerup.js";
//import { map, speedPwrImage } from "../main.js";
import { map, images, skins } from "../main.js";
import Bomb from "./bomb.js";

// ChosenSkinIndex represents the players skin through entire game
// setChosenSkin provides a controlled way to update the chosen skin

export default class Player {
  constructor(id, x, y, size) {
    this.id = id;
    this.position = new Point(x, y, size);
    this.size = size;
    this.direction = 0;
    this.activeSkin = 0;
    this.skin = { animationFrame: 0, directionImage: true }; // Line from gemini 09-05-2024
    this.direction = "down"; // The direction the player is facing, to animate the player
    this.powerups = []; // The active powerups
    this.lives = 1; // The amount of lives the player has default always one, can be increased
  }

  draw() {
    let imageIndex = 0;
    this.skin.animationFrame++;

    if (this.direction === "down") {
      imageIndex = 0;
    } else if (this.direction === "up") {
      imageIndex = 5;
    } else if (this.direction === "left") {
      if (
        this.skin.animationFrame % 12 === 0 &&
        this.skin.directionImage === true
      ) {
        this.skin.directionImage = false;
        this.skin.animationFrame = 0;
      } else if (this.skin.animationFrame % 12 === 0) {
        this.skin.directionImage = true;
        this.skin.animationFrame = 0;
      }
      if (this.skin.directionImage === true) {
        imageIndex = 2;
      } else {
        imageIndex = 1;
      }
    }

    if (this.direction === "right") {
      if (
        this.skin.animationFrame % 12 === 0 &&
        this.skin.directionImage === true
      ) {
        this.skin.directionImage = false;
        this.skin.animationFrame = 0;
      } else if (this.skin.animationFrame % 12 === 0) {
        this.skin.directionImage = true;
        this.skin.animationFrame = 0;
      }
      if (this.skin.directionImage === true) {
        imageIndex = 3;
      } else {
        imageIndex = 4;
      }
    }

    image(
      skins[this.activeSkin][imageIndex],
      this.position.pixelX,
      this.position.pixelY,
      this.size,
      this.size,
    );

    //const currentSkin = this.skin.activeSkin;
    //const currentImage = currentSkin[this.direction]; // Assuming direction property exists
    //image(loadImage(currentImage), this.x, this.y, this.size, this.size);
    this.updatePickup();
  }

  die() {
    this.lives--;
    if (this.lives === 0) {
      console.log("DEAD");
    }
  }

  placeBomb() {
    let bombPlaced = false;

    map.grid.forEach((xRow) => {
      // loops through grid map
      xRow.forEach((yRow) => {
        if (yRow instanceof Bomb) {
          if (yRow.playerId === this.id) {
            bombPlaced = true;
          }
        }
      });
    });

    const x = this.position.getGridPosition().x;
    const y = this.position.getGridPosition().y;
    if (bombPlaced === false) {
      map.grid[x][y] = new Bomb(
        x * this.size,
        y * this.size,
        this.size,
        true,
        this.id,
      );
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
      if (powerup.type === "life") {
        this.lives += 1;
        powerup.pickup();
      } else {
        this.powerups.push(powerup.pickup());
      }
    }
  }
}
