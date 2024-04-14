import Player from "./classes/player.js";
import Map from "./classes/map.js";

// Create a new player and map
// The player (x, y, size)
// The map (width, height, gridSize)
// size is the size of the player and the grid

let size = 60;

export let map = new Map(900, 780, size);
let player = new Player(0, 0, size);

function setup() {
  frameRate(60);
  createCanvas(1000, 1000);
  background(0);
  map.generate(1);
}

function draw() {
  clear();
  player.draw();
  map.draw();
  if (keyIsDown(UP_ARROW)) {
    player.moveUp();
  } else if (keyIsDown(DOWN_ARROW)) {
    player.moveDown();
  } else if (keyIsDown(LEFT_ARROW)) {
    player.moveLeft();
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.moveRight();
  }
}

window.setup = setup;
window.draw = draw;
