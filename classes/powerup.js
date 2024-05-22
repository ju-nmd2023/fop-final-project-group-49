import Point from "./point.js";
import { map, speedPwrImage } from "../main.js";

export default class Powerup {
  constructor(x, y, size, type) {
    this.position = new Point(x, y, size);
    this.size = size;
    this.type = type; // What type of powerup
  }

  draw() {
    push();
    fill(0, 255, 0);
    translate(this.size / 2, this.size / 2);
    // Drawings for different powerups
    if (this.type === "speed") {
      image(
        speedPwrImage.speedPwrImage,
        this.position.pixelX - this.size / 2,
        this.position.pixelY - this.size / 2,
        this.size,
        this.size,
      );
    } else if (this.type === "slow") {
      image(
        speedPwrImage.slowPwrImage,
        this.position.pixelX - this.size / 2,
        this.position.pixelY - this.size / 2,
        this.size,
        this.size,
      );
    } else if (this.type === "bomb") {
      image(
        speedPwrImage.bigBombPwrImage,
        this.position.pixelX - this.size / 2,
        this.position.pixelY - this.size / 2,
        this.size,
        this.size,
      );
    } else if (this.type === "life") {
      image(
        speedPwrImage.lifePwrImage,
        this.position.pixelX - this.size / 2,
        this.position.pixelY - this.size / 2,
        this.size,
        this.size,
      );
    } else if (this.type === "extrabomb") {
      image(
        speedPwrImage.extraBombPwrImage,
        this.position.pixelX - this.size / 2,
        this.position.pixelY - this.size / 2,
        this.size,
        this.size,
      );
    }
    pop();
  }

  pickup() {
    let gridposition = this.position.getGridPosition(); //removes the powerup from the map
    map.grid[gridposition.x][gridposition.y] = null;
    return { type: this.type, duration: 900 }; // adds powerup i players list
  }
}
