import { font, images } from "../main.js";

export default class SkinsScreen {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.activeSkins = [0, 1]; // Active skins for player one and player two
    this.highlightedSkinIndex = [0, 1]; // Highlighted skins for player one and player two
    this.setupKeyboardEvents(); // Call setupKeyboardEvents in constructor
  }

  getChosenSkins() {
    // Array returning the chosen skin index
    return this.activeSkins;
  }

  // Setup keyboard event listeners
  setupKeyboardEvents() {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        // Player One character selection
        case "ArrowLeft":
          this.changeActiveSkin(0, -1); // Move left for player one
          break;
        case "ArrowRight":
          this.changeActiveSkin(0, 1); // Move right for player one
          break;
        case "ArrowUp":
          this.changeActiveSkin(0, -3); // Move up for player one
          break;
        case "ArrowDown":
          this.changeActiveSkin(0, 3); // Move down for player one
          break;
        // Player Two character selection
        case "a":
          this.changeActiveSkin(1, -1); // Move left for player two
          break;
        case "d":
          this.changeActiveSkin(1, 1); // Move right for player two
          break;
        case "w":
          this.changeActiveSkin(1, -3); // Move up for player two
          break;
        case "s":
          this.changeActiveSkin(1, 3); // Move down for player two
          break;
      }
    });
  }

  // Change active skin index based on arrow key presses
  changeActiveSkin(player, direction) {
    const newIndex = this.activeSkins[player] + direction;
    if (newIndex >= 0 && newIndex <= 5) {
      const otherPlayerSkin = this.activeSkins[(player + 1) % 2]; // Get the other player's skin index
      if (newIndex === otherPlayerSkin) {
        return; // Players cannot chose same index (character)
      }
      this.activeSkins[player] = newIndex;
      this.highlightedSkinIndex[player] = newIndex;
      console.log("Player", player + 1, "selected Skin", newIndex);
    }
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
    if (mouseX > 300 && mouseX < 550 && mouseY > 800 && mouseY < 950) {
      return true;
    }
  }

  draw() {
    background(173, 100, 36);

    // Draw additional set of boxes in brown color (beneath the main yellow)
    fill(209, 147, 31); // Brown color for additional set of boxes
    for (let i = 0; i < 6; i++) {
      const row = Math.floor(i / 3); // Calculate which row the current box belongs to
      const yPosition = 100 + row * 350; // Adjust y position based on row for the additional set of boxes
      const xPosition = (i % 3) * 350; // Adjust x position for the additional set of boxes

      rect(xPosition, yPosition, 300, 300, 20); // Draw additional box

      image(images.screenSkins[i], xPosition + 10, yPosition - 50, 300, 400);
    }
    for (let player = 0; player < 2; player++) {
      // Iterate over skin boxes
      for (let i = 0; i < 6; i++) {
        const row = Math.floor(i / 3); // Calculate which row the current box belongs to
        const yPosition = 100 + row * 350; // Adjust y position based on row
        const xPosition = (i % 3) * 350 + player; // Adjust x position for player two

        // Highlight logic
        if (this.highlightedSkinIndex[player] === i) {
          fill(255, 197, 4); // Yellow color for highlighted skin
          rect(xPosition, yPosition, 300, 300, 20); // Draw highlighted box
          image(
            images.screenSkins[i],
            xPosition + 10,
            yPosition - 50,
            300,
            400,
          );
        }
      }
    }
    // Iterate over players

    this.chooseSkinButton(400, 860, 200, 100); // Adjust button position
  }
}
