// Sidebar in game screen with stats, time etc. 17-05-2024 (https://chatgpt.com/c/9b3628de-bb29-413d-9405-8023e6864b7c)
import { GAME_SCREEN, gameState, playerList, speedPwrImage } from "../main.js";

export default class Sidebar {
  constructor() {
    this.timelimit = 3 * 60 * 1000;
    this.startTime = null;
    this.countDown = this.timelimit;
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
      // console.log("Click Registered!");
      // this.isPaused = !this.isPaused; // Toggle pause state
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
    if (this.startTime === null) {
      this.startTime = millis(); // Initialize startTime when draw is first called
    }

    this.sidebar(width / 2, 900);

    let elapsed = millis() - this.startTime; // The elapsed time is calculated using millis() and subtracted from this.timelimit to get the remaining time.
    this.countDown = this.timelimit - elapsed;

    let minutes = int(this.countDown / 60000);
    let seconds = int((this.countDown % 60000) / 1000);

    if (this.countDown < 0) {
      minutes = 0;
      seconds = 0;
    }

    let timeDisplay = nf(minutes, 2) + ":" + nf(seconds, 2);

    textAlign(CENTER, CENTER);
    fill(0);
    textSize(30);
    text(timeDisplay, width / 2 + 128, height - 57);

    // Display lives for player 2
    image(speedPwrImage.lifePwrImage, 450 - 105, 915, 45, 45);
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(20);
    text(playerList[1]?.lives, width / 2 - 110, 925);
    textSize(15);
    text("Player2", width / 2 - 115, 970);

    // Display lives for player 1
    image(speedPwrImage.lifePwrImage, 450 - 205, 915, 45, 45);
    textAlign(CENTER, CENTER);
    textSize(20);
    text(playerList[0]?.lives, width / 2 - 210, 925);
    textSize(15);
    text("player1", width / 2 - 215, 970);

    // Check if the game is in the game screen state before starting the timer

    // text(
    //   minutes + ":" + (seconds < 10 ? "0" : "") + seconds,
    //   width / 2 + 128,
    //   height - 57
    // );
  }
}
