import Point from "./point.js";
import Powerup from "./powerup.js";
//import { map, speedPwrImage } from "../main.js";
import { map, skins, fartSound } from "../main.js";
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

    this.updatePickup();
  }

  die() {
    this.lives--;
    fartSound.play();
  }

  placeBomb() {
    let placedBombs = 0;

    map.grid.forEach((xRow) => {
      // loops through grid map for bombs
      xRow.forEach((yRow) => {
        if (yRow instanceof Bomb) {
          // checks if bomb has same id as player
          if (yRow.playerId === this.id) {
            placedBombs += 1;
          }
        }
      });
    });

    const x = this.position.getGridPosition().x;
    const y = this.position.getGridPosition().y;

    if (
      placedBombs <
      this.powerups.filter((pwrUp) => pwrUp.type === "extrabomb").length + 1
    ) {
      if (this.powerups.some((obj) => obj.type === "bomb")) {
        // checks if you have powerup or not
        map.grid[x][y] = new Bomb(
          x * this.size,
          y * this.size,
          this.size,
          true,
          this.id,
        );
      } else {
        // If no bomb is placed, you can place a bomb, else you cant
        map.grid[x][y] = new Bomb(
          x * this.size,
          y * this.size,
          this.size,
          false,
          this.id,
        );
      }
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
      // checks if you have relevant powerup and changes speed after.
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
      map.grid[playerGridPosition.x + directionX]?.[
        playerGridPosition.y + directionY
      ];

    let playerPosition = {
      x: this.position.x / this.size,
      y: this.position.y / this.size,
    };

    if (
      nextGrid === null ||
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
