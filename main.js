import Player from "./classes/player.js";

let player = new Player();

function setup() {
  createCanvas(500, 500);
  background(0);
}

window.setup = setup;

function draw() {
  player.draw();
}

window.draw = draw;
