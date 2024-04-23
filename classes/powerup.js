import Point from "./point.js";

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
    circle(this.position.pixelX, this.position.pixelY, this.size);
    pop();
  }

  pickup() {
    let gridposition = this.position.getGridPosition(); //removes the powerup from the map
    map.grid[gridposition.x][gridposition.y] = undefined;
    return { type: this.type, duration: 1800 }; // lägga till powerup i spelarens lista på powerups

    // TODO: Implement pickup logic
  }
}
