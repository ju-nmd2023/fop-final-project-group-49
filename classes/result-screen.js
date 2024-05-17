import { font, GAME_SCREEN, gameState, SKINS_SCREEN, loser } from "../main.js";
//import Player from "./player.js";

export default class Result {
  constructor() {
    // this.winner = Player[(0, 1)];
  }

  displayResult(x, y) {
    textSize(50);
    textAlign(CENTER);
    textFont(font);
    if (loser === 0) {
      text("Player 2 wins!", x, y - 80); //player 0 is now player 1
    } else {
      text("Player 1 wins!", x, y - 80); //player 1 is now player 2
    }
  }

  playAgainButton(x, y) {
    fill(209, 147, 31); // Orange button color
    rect(x - 200, y, 400, 150, 20); // Adjust button dimensions if needed

    fill(20, 20, 20); // Text color
    textSize(30);
    textAlign(CENTER);
    textFont(font);
    text("Play Again", x, y + 80);
  }

  changeCharacterButton(x, y) {
    fill(209, 147, 31);
    rect(x - 200, y, 400, 150, 20); // Adjust button dimensions if needed

    fill(20, 20, 20); // Text color
    textSize(27);
    textAlign(CENTER);
    textFont(font);
    text("Change Character", x, y + 80);
  }

  mouseClickedPlayAgain() {
    // Check for Play Again button click
    if (
      mouseX > width / 2 - 200 &&
      mouseX < width / 2 + 200 &&
      mouseY > 400 &&
      mouseY < 550
    ) {
      return true; // Transition to game screen
    }
  }
  mouseClickedChangeSkin() {
    // Check for Change Character button click
    if (
      mouseX > width / 2 - 200 &&
      mouseX < width / 2 + 200 &&
      mouseY > 600 &&
      mouseY < 750
    ) {
      return true; // Transition to skins screen
    }
  }

  draw() {
    background(173, 100, 36);
    this.displayResult(width / 2, 250);
    this.playAgainButton(width / 2, 400);
    this.changeCharacterButton(width / 2, 600);
  }
}
