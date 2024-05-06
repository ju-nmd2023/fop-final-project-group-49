import { font, img, gameState, GAME_SCREEN, player } from "../main.js";
import Player from "./player.js";
import Skin from "./skin.js";

export default class SkinsScreen {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.activeSkinIndex = null;
  }

  chooseSkinButton(x, y, width, height) {
    fill(209, 147, 31);
    rect(x, y, width, height, 20); // Adjusted width based on calculation 200 100
    fill(20, 20, 20);
    textSize(30);
    textAlign(CENTER, CENTER); // Center both horizontally and vertically
    textFont(font);
    text("Play", x + 100, y + 50); // Centered text
  }

  mouseClicked() {
    for (let i = 0; i < 6; i++) {
      // Check for all 6 boxes (0 to 5)
      if (this.isPointWithinBox(mouseX, mouseY, i * 320, 100, 300, 400)) {
        console.log("Skin", i, "was pressed");
        this.activeSkinIndex = i;
      } else if (
        this.isPointWithinBox(mouseX, mouseY, i * 320, 450, 300, 400)
      ) {
        // Check for lower boxes
        console.log("Skin", i + 3, "was pressed"); // Adjust index for lower row
        this.activeSkinIndex = i + 3; // Adjust activeSkinIndex for lower row
      }
      console.log(this.activeSkinIndex);
    }

    // "Play" button
    if (mouseX > 300 && mouseX < 550 && mouseY > 800 && mouseY < 950) {
      return true;
    }
  }

  isPointWithinBox(clickX, clickY, boxX, boxY, boxWidth, boxHeight) {
    return (
      clickX >= boxX &&
      clickX <= boxX + boxWidth &&
      clickY >= boxY &&
      clickY <= boxY + boxHeight
    ); // boxX stores the calculations/cordinates for i * 320
  }

  draw() {
    background(173, 100, 36);
    for (let i = 0; i < 3; i++) {
      const yPosition = 100 + (i < 3 ? 0 : 350); // Adjust y position based on row, evaluating true or false with ?

      // Draw top row (base color first)
      fill(209, 147, 31); // Base color
      rect(i * 350, yPosition, 300, 300, 20);

      // Highlight logic (top row)
      if (this.activeSkinIndex === i) {
        fill(244, 217, 17); // Example highlight color
      } else {
        fill(209, 147, 31); // Base color
      }

      // Draw top row again with highlight (if applicable)
      rect(i * 350, yPosition, 300, 300, 20);

      // Draw bottom row (base color first for lower row)
      fill(209, 147, 31); // Base color
      rect(i * 350, yPosition + 350, 300, 300, 20); // Adjust y position for lower row

      // Highlight logic (bottom row)
      if (this.activeSkinIndex === i + 3) {
        // Adjust index for lower row
        fill(244, 217, 17); // Example highlight color
      }

      // Draw bottom row again with highlight (if applicable)
      rect(i * 350, yPosition + 350, 300, 300, 20); // Adjust y position for lower row
    }
    this.chooseSkinButton(400, 860, 200, 100);
  }
}
