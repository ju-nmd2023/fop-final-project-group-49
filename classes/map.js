import Block from "./block.js";

export default class Map {
  constructor(width, height, gridSize) {
    this.width = width;
    this.height = height;
    this.gridSize = gridSize;
    this.marginLeft = (1000 - width) / 2;
    this.marginTop = (1000 - height) / 2;
    this.blocks = [];
  }

  draw() {
    for (let x = 0; x < this.width; x += this.gridSize) {
      for (let y = 0; y < this.height; y += this.gridSize) {
        stroke(255);
        noFill();
        rect(this.marginLeft + x, this.marginTop + y, this.gridSize);
      }
    }
    this.blocks.forEach((block) => {
      block.draw();
    });
  }

  generate(i) {
    loadJSON(`../maps/map${i}.json`, (data) => {
      let map = data;
      let index = 0;
      for (let y = 0; y < this.height; y += this.gridSize) {
        for (let x = 0; x < this.width; x += this.gridSize) {
          if (map[index] === "x") {
            this.blocks.push(new Block(x, y, this.gridSize));
          }
          index++;
        }
      }
    });
  }
}
