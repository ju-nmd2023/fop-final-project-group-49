import Block from "./block.js";
import Bomb from "./bomb.js";

export default class Map {
  constructor(width, height, gridSize) {
    this.width = width;
    this.height = height;
    this.gridSize = gridSize;
    this.marginLeft = (1000 - width) / 2; // The left margin of the map. To center the map when drawn
    this.marginTop = (1000 - height) / 2; // The top margin of the map. To center the map when drawn
    this.grid = [];
    this.powerupTypes = ["bomb", "slow", "speed", "life"];
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

  async generate(i) {
    loadJSON(`../maps/map${i}.json`, (data) => {
      let map = data;

      // This creates all blocks in the grid
      for (let xIndex = 0; xIndex < map.length; xIndex++) {
        //loops through the map in x and then after y
        this.grid.push([]);
        for (let yIndex = 0; yIndex < map[xIndex].length; yIndex++) {
          if (map[xIndex][yIndex] == 1) {
            // If the block is indestructible
            this.grid[xIndex][yIndex] = new Block(
              xIndex * this.gridSize,
              yIndex * this.gridSize,
              this.gridSize,
              true
            );
          } else if (map[xIndex][yIndex] === 2) {
            // If the block is clear spawn point
            this.grid[xIndex][yIndex] = undefined;
          } else if (Math.random() < 0.5) {
            // If the block is destructible
            this.grid[xIndex][yIndex] = new Block(
              xIndex * this.gridSize,
              yIndex * this.gridSize,
              this.gridSize,
              false
            );
          }
        }
      }

      // This creates the powerups inside the blocks
      this.grid.forEach((xRow) => {
        xRow.forEach((yRow) => {
          if (yRow != undefined && !yRow.indestructible) {
            // If the block is destructible generate a powerup
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
