import { font, fartSound, logo } from "../main.js";

export default class StartScreen {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  playButton(x, y, w, h) {
    push();
    fill(209, 147, 31);
    rect(x, y, 500, 200, 20);
    pop();
    strokeWeight(2);
    fill(20, 20, 20);
    textSize(60);
    textAlign(CENTER);
    textFont(font);
    text("start", x, y + 110, 500, h);
  }

  mouseClicked() {
    if (
      mouseX > this.width / 2 &&
      mouseX < this.width / 2 + 500 &&
      mouseY > this.height / 2 + 200 &&
      mouseY < this.height / 2 + 200 + 200
    ) {
      fartSound.play();
      return true; // Returning the value from the main, the button is clicked then show next screen
    }
  }

  draw() {
    background(173, 100, 36);
    this.playButton(this.width / 2, this.height / 2 + 200, 250, 80);
    image(logo, this.width / 2 - 100, this.height / 2 - 100, 700, 280); // Babel logo
  }
}
