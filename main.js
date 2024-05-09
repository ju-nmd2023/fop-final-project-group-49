import Player from "./classes/player.js";
import Map from "./classes/map.js";
import StartScreen from "./classes/start-screen.js";
import SkinsScreen from "./classes/skins-screen.js";
import Result from "./classes/result-screen.js";

// Create a new player and map
// The player (x, y, size)
// The map (width, height, gridSize)
// size is the size of the player and the grid
let gamestate = 0; // 0 = menu, 1 = skinscreen, 2 = game, 3 = game over
let size = 60;

export let START_SCREEN = 1; // Naming variables from gemini 29-04-2024
export let SKINS_SCREEN = 2;
export let GAME_SCREEN = 3;
export let RESULT_SCREEN = 4;

export let gameState = 1;

let startScreen = new StartScreen(0, 0, 500, 600);
let skinsScreen = new SkinsScreen(0, 0, 500, 500);
let resultScreen = new Result(0, 0, 500, 600);

export let map = new Map(900, 780, size);
export let player = new Player(0, 120, 120, size);

export let font;
export let img;
export let images;

function preload() {
  font = loadFont("assets/AGENTORANGE.TTF");
  img = loadImage("assets/BabelGameByggnader.png");
  images = {
    indestructible: [
      loadImage("assets/blueHouse.png"),
      loadImage("assets/pinkHouse.png"),
    ],
    destructible: [
      loadImage("assets/Bulle.png"),
      loadImage("assets/tree.png"),
      loadImage("assets/Lamp.png"),
    ],
  };
}

async function setup() {
  frameRate(60);
  createCanvas(1000, 1000);
  background(150, 150, 150);
  await map.generate(1);

  console.log(map.grid);
}

function draw() {
  clear();
  if (gameState === START_SCREEN) {
    startScreen.draw(); // Function to draw the start screen
  } else if (gameState === SKINS_SCREEN) {
    skinsScreen.draw(); // Function to draw the skins screen
  } else if (gameState === GAME_SCREEN) {
    map.draw(); // Function to draw the game screen
    player.draw();
  } else if (gameState === RESULT_SCREEN) {
    resultScreen.draw(); // Function to draw the result screen
  }

  if (keyIsDown(UP_ARROW)) {
    player.moveUp();
  } else if (keyIsDown(DOWN_ARROW)) {
    player.moveDown();
  } else if (keyIsDown(LEFT_ARROW)) {
    player.moveLeft();
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.moveRight();
  }

  // if (this.chooseSkinButton(mouseX, mouseY, 400, 900))
  //   player.skin.activeskin = 2;
  //skinsScreen.draw();
  if (keyIsDown(BACKSPACE)) {
    player.placeBomb();
  }
}

function mouseClicked(event) {
  console.log(event);
  if (gameState === START_SCREEN) {
    let clicked = startScreen.mouseClicked(event);
    clicked === true ? (gameState = SKINS_SCREEN) : null;
  } else if (gameState === SKINS_SCREEN) {
    let clicked = skinsScreen.mouseClicked(event);
    clicked === true ? (gameState = GAME_SCREEN) : null;
  } else if (gameState === RESULT_SCREEN) {
    resultScreen.mouseClicked(event);
  }
}

window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
