import Player from "./classes/player.js";
import Map from "./classes/map.js";
import StartScreen from "./classes/start-screen.js";
import SkinsScreen from "./classes/skins-screen.js";
import Result from "./classes/result-screen.js";

// Create a new player and map
// The player (x, y, size)
// The map (width, height, gridSize)
// size is the size of the player and the grid
let size = 60;

let START_SCREEN = 1; // Naming variables from gemini 29-04-2024
let SKINS_SCREEN = 2;
let GAME_SCREEN = 3;
let RESULT_SCREEN = 4;

let gameState = 1;

let startScreen = new StartScreen(0, 0, 500, 600);
let skinsScreen = new SkinsScreen(0, 0, 500, 500);
let resultScreen = new Result(0, 0, 500, 600);

export let map = new Map(900, 780, size);
let player1 = new Player(0, 120, 120, size);
let player2 = new Player(1, 240, 240, size);
export let playerList = [player1, player2];

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
  if (gameState === START_SCREEN) {
    startScreen.draw(); // Function to draw the start screen
  } else if (gameState === SKINS_SCREEN) {
    skinsScreen.draw(); // Function to draw the skins screen
  } else if (gameState === GAME_SCREEN) {
    map.draw(); // Function to draw the game screen
    playerList.forEach((player) => player.draw());
  } else if (gameState === RESULT_SCREEN) {
    resultScreen.draw(); // Function to draw the result screen
  }

  if (keyIsDown(UP_ARROW)) {
    player1.moveUp();
  } else if (keyIsDown(DOWN_ARROW)) {
    player1.moveDown();
  } else if (keyIsDown(LEFT_ARROW)) {
    player1.moveLeft();
  } else if (keyIsDown(RIGHT_ARROW)) {
    player1.moveRight();
  }

  // if (this.chooseSkinButton(mouseX, mouseY, 400, 900))
  //   player.skin.activeskin = 2;
  //skinsScreen.draw();
  if (keyIsDown(BACKSPACE)) {
    player1.placeBomb();
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
