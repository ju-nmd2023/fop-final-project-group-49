import Player from "./classes/player.js";
import Map from "./classes/map.js";
import StartScreen from "./classes/start-screen.js";
import SkinsScreen from "./classes/skins-screen.js";
import Result from "./classes/result-screen.js";
import Sidebar from "./classes/sidebar.js";

// Create a new player and map
// The player (x, y, size)
// The map (width, height, gridSize)
// size is the size of the player and the grid
let size = 60;

let START_SCREEN = 1; // Naming variables from gemini 29-04-2024
export let SKINS_SCREEN = 2;
export let GAME_SCREEN = 3;
export let RESULT_SCREEN = 4;

export let gameState = 1;

let startScreen = new StartScreen(500, 600);
let skinsScreen = new SkinsScreen(500, 500);
let resultScreen = new Result(500, 600);
let sidebar = new Sidebar(600, 90);

export let map = new Map(900, 780, size);

let player1;
let player2;

export let playerList;

export let font;
export let img;
export let images;
export let skins;
export let speedPwrImage;

export let winner;
export let loser;
let loserFound = false;

function preload() {
  font = loadFont("assets/AGENTORANGE.TTF");
  img = loadImage("assets/BabelGameByggnader.png");
  speedPwrImage = {
    speedPwrImage: loadImage("assets/hotshot.png"),
    slowPwrImage: loadImage("assets/ladokU.png"),
    bigBombPwrImage: loadImage("assets/billys.png"),
    lifePwrImage: loadImage("assets/resorb.png"),
  };

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
    screenSkins: [
      loadImage("assets/skinscreenbabel/01:front.png"),
      loadImage("assets/skinscreenbabel/02:front.png"),
      loadImage("assets/skinscreenbabel/03 front.png"),
      loadImage("assets/skinscreenbabel/04:front.png"),
      loadImage("assets/skinscreenbabel/05:front.png"),
      loadImage("assets/skinscreenbabel/06:front.png"),
    ],
  };
  skins = [
    [
      //Red babel
      loadImage("assets/babeldirections/01.front.png"), //front
      loadImage("assets/babeldirections/01.left.01.png"), // first left
      loadImage("assets/babeldirections/01.left.02.png"), // second left
      loadImage("assets/babeldirections/01.right.01.png"), //first right
      loadImage("assets/babeldirections/01.right.02.png"), //second right
      loadImage("assets/babeldirections/01.back.png"), //back
    ],
    //green babel
    [
      loadImage("assets/babeldirections/02.front.png"), //front
      loadImage("assets/babeldirections/02.left.01.png"), // first left
      loadImage("assets/babeldirections/02.left.02.png"), // second left
      loadImage("assets/babeldirections/02.right.01.png"), // first right
      loadImage("assets/babeldirections/02.right.02.png"), // second right
      loadImage("assets/babeldirections/02.back.png"), //back
    ],
    //pink babel
    [
      loadImage("assets/babeldirections/03.front.png"), //front
      loadImage("assets/babeldirections/03.left.01.png"), // first left
      loadImage("assets/babeldirections/03.left.02.png"), // second left
      loadImage("assets/babeldirections/03.right.01.png"), // first right
      loadImage("assets/babeldirections/03.right.02.png"), // second right
      loadImage("assets/babeldirections/03.back.png"), //back
    ],
    //yellow babel
    [
      loadImage("assets/babeldirections/04.front.png"), //front
      loadImage("assets/babeldirections/04.left.01.png"), // first left
      loadImage("assets/babeldirections/04.left.02.png"), // second left
      loadImage("assets/babeldirections/04.right.01.png"), // first right
      loadImage("assets/babeldirections/04.right.02.png"), // second right
      loadImage("assets/babeldirections/04.back.png"), //back
    ],
    //orange babel
    [
      loadImage("assets/babeldirections/05.front.png"), //front
      loadImage("assets/babeldirections/05.left.01.png"), // first left
      loadImage("assets/babeldirections/05.left.02.png"), // second left
      loadImage("assets/babeldirections/05.right.01.png"), // first right
      loadImage("assets/babeldirections/05.right.02.png"), // second right
      loadImage("assets/babeldirections/05.back.png"), //back
    ],
    //blue babel
    [
      loadImage("assets/babeldirections/06.front.png"), //front
      loadImage("assets/babeldirections/06.left.01.png"), // first left
      loadImage("assets/babeldirections/06.left.02.png"), // second left
      loadImage("assets/babeldirections/06.right.01.png"), // first right
      loadImage("assets/babeldirections/06.right.02.png"), // second right
      loadImage("assets/babeldirections/06.back.png"), //back
    ],
  ];
}

async function setup() {
  frameRate(60);
  createCanvas(1000, 1000);
  background(150, 150, 150);

  player1 = new Player(0, 120, 120, size);
  player2 = new Player(1, 720, 600, size);

  playerList = [player1, player2];

  await map.generate(1);

  console.log(map.grid);
}

function draw() {
  clear();

  if (gameState === START_SCREEN) {
    startScreen.draw();
  } else if (gameState === SKINS_SCREEN) {
    skinsScreen.draw();
  } else if (gameState === GAME_SCREEN) {
    map.draw();
    playerList.forEach((player) => {
      // loops through players of their lives, if no lives left, change to gamestate 4.
      if (player?.lives === 0) {
        gameState = 4;
        loserFound = true;
        loser = player.id;
        console.log("the loser is: Player" + loser);
      }
    });

    playerList.forEach((player) => player?.draw());
    sidebar.draw();
    if (sidebar.startTime === null) {
      // Start the timer only if it hasn't been started yet
      sidebar.startTimer();
    }
  } else if (gameState === RESULT_SCREEN) {
    resultScreen.draw();
    resultScreen.mouseClickedChangeSkin(); // Call mouseClicked() within Result class
    resultScreen.mouseClickedPlayAgain();
  }
  // player 1 movement
  if (keyIsDown(UP_ARROW)) {
    player1.moveUp();
  } else if (keyIsDown(DOWN_ARROW)) {
    player1.moveDown();
  } else if (keyIsDown(LEFT_ARROW)) {
    player1.moveLeft();
  } else if (keyIsDown(RIGHT_ARROW)) {
    player1.moveRight();
  }

  if (keyIsDown(BACKSPACE)) {
    player1.placeBomb();
  }
  // player 2 movement
  if (keyIsDown(87)) {
    player2.moveUp();
  } else if (keyIsDown(83)) {
    player2.moveDown();
  } else if (keyIsDown(65)) {
    player2.moveLeft();
  } else if (keyIsDown(68)) {
    player2.moveRight();
  }
  if (keyIsDown(32)) {
    player2.placeBomb();
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
  } else if (gameState === GAME_SCREEN) {
    sidebar.mouseClicked(event); // Call sidebar's click handler
    console.log("Sidebar mouseClicked() function is called.");
  } else if (gameState === RESULT_SCREEN) {
    let clickedPlayAgain = resultScreen.mouseClickedPlayAgain(event);
    let clickedChangeSKin = resultScreen.mouseClickedChangeSkin(event);
    if (clickedPlayAgain) {
      setup();
      clickedPlayAgain = true ? (gameState = GAME_SCREEN) : null;
    } else if (clickedChangeSKin) {
      clickedChangeSKin = true ? (gameState = SKINS_SCREEN) : null;
      setup();
    }
  }
}

window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
