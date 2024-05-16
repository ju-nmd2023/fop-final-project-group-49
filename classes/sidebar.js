// Sidebar in game screen with stats, time etc. 11-05-2024 (https://chat.openai.com/share/00535081-827b-4115-be17-81876288c14a)
import { GAME_SCREEN, gameState, playerList } from "../main.js";
import Player from "../classes/player.js";

export default class Sidebar {
  constructor(x, y) {
    this.startTime = null; // Use performance.now() for start time
    this.startTimeDuration = 3 * 60 * 1000; // 3 minutes in milliseconds
    this.isPaused = false; // Add a variable to track pause state
  }

  startTimer() {
    this.startTime = performance.now(); // Start the timer when the game screen is active
  }

  // If pause is pressed
  mouseClicked() {
    console.log("mouseX:", mouseX, "mouseY:", mouseY); // For debugging

    if (
      mouseX > width / 2 - 20 && // Left edge of the button
      mouseX < width / 2 + 20 && // Right edge of the button (width + offset)
      mouseY > 900 + 25 && // Top edge of the button (using this.y)
      mouseY < 900 + 25 + 40 // Bottom edge of the button (height + offset)
    ) {
      console.log("Click Registered!");
      this.isPaused = !this.isPaused; // Toggle pause state
    }
  }

  sidebar(x, y) {
    fill(209, 147, 31);
    rect(x - 300, y, 600, 90, 20);
    rect(x - 150, y + 7, 75, 45, 10);
    rect(x - 250, y + 7, 75, 45, 10);
    rect(width / 2 + 70, y + 15, 110, 60, 10);
    // Pause button
    rect(width / 2 - 20, y + 25, 40, 40, 5);
    fill(244, 217, 17);
    rect(width / 2 - 13, y + 32, 10, 27, 2);
    rect(width / 2 + 2, y + 32, 10, 27, 2);
  }

  draw() {
    this.sidebar(width / 2, 900);

    // Pause the game if isPaused is true
    if (this.isPaused) {
      return; // Exit draw loop
    }

    // Display lives for player 2
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(20);
    text(playerList[1].lives, width / 2 - 115, 925);
    textSize(15);
    text("Player2", width / 2 - 115, 970);

    // Display lives for player 1
    textAlign(CENTER, CENTER);
    text(playerList[0].lives, width / 2 - 215, 925);
    textSize(15);
    text("player1", width / 2 - 215, 970);

    // Check if the game is in the game screen state before starting the timer
    if (gameState === GAME_SCREEN) {
      let elapsedTime = millis() + 2000 - this.startTime;
      let remainingTime = this.startTimeDuration - elapsedTime;
      let minutes = Math.floor(remainingTime / 60000);
      let seconds = Math.floor((remainingTime % 60000) / 1000);

      // Display the timer text
      textAlign(CENTER, CENTER);
      fill(0);
      textSize(30);
      text(
        minutes + ":" + (seconds < 10 ? "0" : "") + seconds,
        width / 2 + 128,
        height - 57
      );

      // Check if the timer has reached zero
      if (remainingTime <= 0) {
        // Timer has ended
        noLoop(); // Stop the draw loop
      }
    }
  }
}
