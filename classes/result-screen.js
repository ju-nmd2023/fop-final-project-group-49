import { gameState, GAME_SCREEN, SKINS_SCREEN } from "../main.js";

export default class Result {
  displayResult(x, y) {
    textSize(30);
    textAlign(CENTER);
    textFont(font);
    text("Player x wins!", 400, 900); // Make an if statement depending on who wins
  }

  playAgainButton(x, y) {
    fill(209, 147, 31);
    rect(400, 900, 200, 100, 20);
    fill(20, 20, 20);
    textSize(30);
    textAlign(CENTER);
    textFont(font);
    text("Play Again", 520, 900);
  }

  changeCharacterButton(x, y) {
    fill(209, 147, 31);
    rect(400, 700, 200, 100, 20);
    fill(20, 20, 20);
    textSize(30);
    textAlign(CENTER);
    textFont(font);
    text("Change character", 300, 900);
  }

  mouseClicked() {
    if (mouseX > 500 && mouseX < 520 && mouseY > 880 && mouseY < 910) {
      gameState = GAME_SCREEN;
    }
    if (mouseX > 290 && mouseX < 310 && mouseY > 890 && mouseY < 910) {
      gameState = SKINS_SCREEN;
    }
  }
}
