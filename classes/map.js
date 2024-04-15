import Block from "./block.js";

export default class Map {
  constructor(width, height, gridSize) {
    this.width = width;
    this.height = height;
    this.gridSize = gridSize;
    this.marginLeft = (1000 - width) / 2; // The left margin of the map. To center the map when drawn
    this.marginTop = (1000 - height) / 2; // The top margin of the map. To center the map when drawn
    this.grid = [];
    this.powerupTypes = ["bomb", "fire", "speed"];
  }

  draw() {
    for (let x = 0; x < this.width; x += this.gridSize) {
      // Draw the empty grid outlines
      for (let y = 0; y < this.height; y += this.gridSize) {
        stroke(255);
        noFill();
        rect(this.marginLeft + x, this.marginTop + y, this.gridSize);
      }
    }

    // Loops through the grid and draws the blocks
    this.grid.forEach((xRow) => {
      xRow.forEach((yRow) => {
        if (yRow != undefined) {
          yRow.draw();
        }
      });
    });
  }

  generate(i) {
    loadJSON(`../maps/map${i}.json`, (data) => {
      let map = data;

      // This creates all blocks in the grid
      for (let xIndex = 0; xIndex < map.length; xIndex++) {
        this.grid.push([]);
        for (let yIndex = 0; yIndex < map[xIndex].length; yIndex++) {
          if (map[xIndex][yIndex] == "x") {
            this.grid[xIndex][yIndex] = new Block(
              xIndex * this.gridSize,
              yIndex * this.gridSize,
              this.gridSize,
              true,
            );
          } else if (map[xIndex][yIndex] === "o") {
            this.grid[xIndex][yIndex] = undefined;
          } else if (Math.random() < 1) {
            this.grid[xIndex][yIndex] = new Block(
              xIndex * this.gridSize,
              yIndex * this.gridSize,
              this.gridSize,
              false,
            );
          }
        }
      }

      // This creates the powerups
      this.grid.forEach((xRow) => {
        xRow.forEach((yRow) => {
          if (yRow != undefined) {
            this.powerupTypes.forEach((powerupType) => {
              if (Math.random() < 1 / this.powerupTypes.length) {
                yRow.powerup = powerupType;
                return;
              }
            });
          }
        });
      });
    });
  }
}
