import { font, fartSound } from "../main.js";

export default class StartScreen {
  constructor(width, height) {
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

  mouseClicked() {
    const buttonX = this.width / 2; // Center the button horizontally
    const buttonY = this.height / 2; // Center the button vertically
    const buttonWidth = 500;
    const buttonHeight = 200;

    if (
      mouseX > buttonX &&
      mouseX < buttonX + buttonWidth &&
      mouseY > buttonY &&
      mouseY < buttonY + buttonHeight
    ) {
      return true;
    }
    // if (this.fartSound.isLoaded()) {
    //   // Check if sound is loaded before playing
    //   this.fartSound.play();
    //   return true;
    // }
  }

  draw() {
    background(173, 100, 36);
    this.playButton(this.width / 2, this.height / 2, 250, 80);
  }
}
