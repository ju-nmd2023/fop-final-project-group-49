import { font, loser, sidebar } from "../main.js";

export default class Result {
  // Result screen
  displayResult(x, y) {
    textSize(50);
    textAlign(CENTER);
    textFont(font);
    if (loser === 0) {
      text("Player 2 wins!", x, y - 40); //player 0 is now player 1
    } else {
      text("Player 1 wins!", x, y - 40); //player 1 is now player 2
    }
  }

  // button 1
  playAgainButton(x, y) {
    strokeWeight(2);
    fill(209, 147, 31);
    rect(x - 200, y, 400, 150, 20);
    fill(20, 20, 20);
    strokeWeight(1);
    textSize(30);
    textAlign(CENTER);
    textFont(font);
    text("Play Again", x, y + 75);
  }

  // button 2
  changeCharacterButton(x, y) {
    strokeWeight(2);
    fill(209, 147, 31);
    rect(x - 200, y, 400, 150, 20);
    fill(20, 20, 20);
    strokeWeight(1);
    textSize(27);
    textAlign(CENTER);
    textFont(font);
    text("Change Character", x, y + 75);
  }

  mouseClickedPlayAgain() {
    // Check for playing again click
    if (
      mouseX > width / 2 - 200 &&
      mouseX < width / 2 + 200 &&
      mouseY > 400 &&
      mouseY < 550
    ) {
      sidebar.resetTimer(); // Reset the timer
      return true; // Returning from main screen
    }
  }

  mouseClickedChangeSkin() {
    // Check for change character click
    if (
      mouseX > width / 2 - 200 &&
      mouseX < width / 2 + 200 &&
      mouseY > 600 &&
      mouseY < 750
    ) {
      return true;
    }
  }

  draw() {
    background(173, 100, 36);
    this.displayResult(width / 2, 250);
    this.playAgainButton(width / 2, 400);
    this.changeCharacterButton(width / 2, 600);
  }
}
