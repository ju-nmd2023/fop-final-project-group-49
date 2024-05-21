import Block from "./block.js";
import { buildings } from "../main.js";

export default class Map {
  constructor(width, height, gridSize) {
    this.width = width;
    this.height = height;
    this.gridSize = gridSize;
    this.marginLeft = (1000 - width) / 2; // The left margin of the map. To center the map when drawn
    this.marginTop = (1000 - height) / 2; // The top margin of the map. To center the map when drawn
    this.grid = [];
    this.powerupTypes = ["bomb", "slow", "speed", "life", "extrabomb"];
    this.block;
    this.centerBuilding = 0;
  }

  draw() {
    background(173, 100, 36);
    for (let x = 0; x < this.width; x += this.gridSize) {
      // Draw the empty grid outlines
      for (let y = 0; y < this.height; y += this.gridSize) {
        stroke(46, 46, 46);
        fill(200, 200, 200).rect(
          this.marginLeft + x,
          this.marginTop + y,
          this.gridSize,
        );
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
    // Rect under img
    rect(
      this.width / 2 + this.marginLeft - 90,
      this.height / 2 + this.marginTop - 90,
      180,
      180,
    );
    // Drawing the buildning in the middle
    image(
      buildings[this.centerBuilding],
      this.width / 2 + this.marginLeft - 90,
      this.height / 2 + this.marginTop - 90,
      180,
      180,
    );
  }

  async generate(i) {
    loadJSON(`../maps/map${i}.json`, (data) => {
      let map = data;
      this.centerBuilding = Math.floor(Math.random() * buildings.length); // Randomizes placement of buidlnings
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
              true,
            );
          } else if (map[xIndex][yIndex] === 2) {
            // If the block is clear spawn point
            this.grid[xIndex][yIndex] = null;
          } else if (Math.random() < 0.9) {
            // If the block is destructible
            this.grid[xIndex][yIndex] = new Block(
              xIndex * this.gridSize,
              yIndex * this.gridSize,
              this.gridSize,
              false,
            );
          } else {
            this.grid[xIndex][yIndex] = null;
          }
        }
      }

      // This creates the powerups inside the blocks
      this.grid.forEach((xRow) => {
        xRow.forEach((yRow) => {
          if (yRow != undefined && !yRow.indestructible) {
            // If the block is destructible generate a powerup
            yRow.powerup =
              this.powerupTypes[
                Math.floor(Math.random() * this.powerupTypes.length)
              ];
          }
        });
      });
    });
  }
}
