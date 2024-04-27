import Player from "./classes/player.js";
import Map from "./classes/map.js";
import Block from "./classes/block.js";
import StartScreen from "./classes/start-screen.js";
import SkinsScreen from "./classes/skins-screen.js";
import Powerup from "./classes/powerup.js";

// Create a new player and map
// The player (x, y, size)
// The map (width, height, gridSize)
// size is the size of the player and the grid
let gamestate = 0; // 0 = menu, 1 = skinscreen, 2 = game, 3 = game over
let size = 60;

// let startScreen = new StartScreen(0, 0, 500, 600);
let skinsScreen = new SkinsScreen(0, 0, 500, 500);

export let map = new Map(900, 780, size);
export let player = new Player(0, 120, 120, size);

export let font;
export let img;
function preload() {
  font = loadFont("assets/AGENTORANGE.TTF");
  img = loadImage("assets/BabelGameByggnader.png");
}

async function setup() {
  frameRate(60);
  createCanvas(1000, 1000);
  background(0);
  await map.generate(1);

  console.log(map.grid);
}

function draw() {
  clear();
  map.draw();
  player.draw();
  if (keyIsDown(UP_ARROW)) {
    player.moveUp();
  } else if (keyIsDown(DOWN_ARROW)) {
    player.moveDown();
  } else if (keyIsDown(LEFT_ARROW)) {
    player.moveLeft();
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.moveRight();
  }
  //skinsScreen.draw();
}

function mouseClicked(event) {
  console.log(event);
  map.grid[4][2] = new Powerup(4 * size, 2 * size, size, "bomb");
  console.log(map.grid);

  //skinsScreen.mouseClicked(event);
}

window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
