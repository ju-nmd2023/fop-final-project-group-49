import { font } from "../main.js";

export default class StartScreen {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;
  }

  playButton(x, y, w, h) {
    push();
    fill(209, 147, 31);
    rect(x, y, 500, 200, 20);
    stroke(3);
    fill(20, 20, 20);
    textSize(50);
    textAlign(CENTER);
    textFont(font);
    text("start", x, 400, 500, h);
    pop();
  }

  draw() {
    background(173, 100, 36);
    this.playButton(this.width / 2, this.height / 2, 250, 80);
  }
}
