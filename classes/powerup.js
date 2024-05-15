import Point from "./point.js";
import { map, speedPwrImage } from "../main.js";

export default class Powerup {
  constructor(x, y, size, type) {
    this.position = new Point(x, y, size);
    this.size = size;
    this.type = type; // What type of powerup is it?
  }

  draw() {
    push();
    fill(0, 255, 0);
    translate(this.size / 2, this.size / 2);
    if (this.type === "speed") {
      // How to position and display imgs from gpt 14-05-2024 (https://chat.openai.com/share/a7f83acd-c2b8-4477-8953-5c8224804cc4)
      image(
        speedPwrImage.speedPwrImage,
        this.position.pixelX - this.size / 2,
        this.position.pixelY - this.size / 2,
        this.size,
        this.size
      );
    } else if (this.type === "slow") {
      image(
        speedPwrImage.slowPwrImage,
        this.position.pixelX - this.size / 2,
        this.position.pixelY - this.size / 2,
        this.size,
        this.size
      );
    } else if (this.type === "bomb") {
      image(
        speedPwrImage.bigBombPwrImage,
        this.position.pixelX - this.size / 2,
        this.position.pixelY - this.size / 2,
        this.size,
        this.size
      );
    } else if (this.type === "life") {
      image(
        speedPwrImage.lifePwrImage,
        this.position.pixelX - this.size / 2,
        this.position.pixelY - this.size / 2,
        this.size,
        this.size
      );
    } else {
      circle(this.position.pixelX, this.position.pixelY, this.size);
    }
    pop();
  }

  pickup() {
    let gridposition = this.position.getGridPosition(); //removes the powerup from the map
    map.grid[gridposition.x][gridposition.y] = undefined;
    return { type: this.type, duration: 900 }; // lägga till powerup i spelarens lista på powerups

    // TODO: Implement pickup logic
  }
}

// i draw if type = speed visa denna bild
