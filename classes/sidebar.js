// Sidebar in game screen with stats, time etc. 17-05-2024 (https://chatgpt.com/c/9b3628de-bb29-413d-9405-8023e6864b7c)
import {
  RESULT_SCREEN,
  gameState,
  playerList,
  speedPwrImage,
} from "../main.js";

export default class Sidebar {
  constructor() {
    this.timelimit = 3 * 60 * 1000; // 3 minutes
    this.startTime = null;
    this.countDown = this.timelimit;
    this.pauseTime = null;
    this.resumeTime = null;
    this.isPaused = false;
  }

  // Reseting the time, used for restarting game
  resetTimer() {
    this.startTime = null;
    this.countDown = this.timelimit;
  }

  // If pause is pressed
  mouseClicked() {
    if (
      mouseX > width / 2 - 20 && // Left edge of the button
      mouseX < width / 2 + 20 && // Right edge of the button (width + offset)
      mouseY > 900 + 25 && // Top edge of the button (using this.y)
      mouseY < 900 + 25 + 40 // Bottom edge of the button (height + offset)
    ) {
      this.isPaused = !this.isPaused; // Toggle pause state
      let date = new Date();
      if (this.isPaused === true) {
        this.pauseTime = date.getTime();
      } else {
        this.resumeTime = date.getTime();
        this.startTime += this.resumeTime - this.pauseTime;
      }
    }
  }

  // Sidebar with all boxes
  sidebar(x, y) {
    push();
    strokeWeight(1.5);
    fill(201, 147, 31);
    rect(x - 300, y, 600, 90, 20);
    fill(179, 121, 55);
    rect(x - 150, y + 7, 75, 45, 10);
    rect(x - 250, y + 7, 75, 45, 10);
    rect(width / 2 + 60, y + 15, 130, 60, 10);
    // Pause button
    rect(width / 2 - 20, y + 25, 40, 40, 5);
    fill(248, 178, 27);
    rect(width / 2 - 13, y + 32, 10, 27, 2);
    rect(width / 2 + 2, y + 32, 10, 27, 2);
    pop();
  }

  draw() {
    let date = new Date();

    this.sidebar(width / 2, height / 2 + 400);

    if (this.startTime == null) {
      this.startTime = date.getTime();
      this.isPaused = false;
    }

    let elapsedTime = date.getTime() - this.startTime;

    if (this.isPaused === false) {
      this.countDown = this.timelimit - elapsedTime;
    }

    let minutes = int(this.countDown / 60000);
    let seconds = int((this.countDown % 60000) / 1000);

    if (this.countDown < 0) {
      minutes = 0;
      seconds = 0;
    }

    let timeDisplay = nf(minutes, 2) + ":" + nf(seconds, 2); // nf is used for minutes and seconds, 00:00
    strokeWeight(1);
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(30);
    text(timeDisplay, width / 2 + 128, height - 57); // Displaying time

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
  }
}
