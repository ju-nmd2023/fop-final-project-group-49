import { font, images, gameState, shortFartSound } from "../main.js";

// A lot of this code has been changed, but initial help came from GPT 25-04-2024 and the conversation continued for some days

export default class SkinsScreen {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.activeSkins = [0, 1]; // Active skins for player one and player two
    this.highlightedSkinIndex = [0, 1]; // Highlighted skins for player one and player two
    this.setupKeyboardEvents(); // Call setupKeyboardEvents in constructor
  }

  // Array returning the chosen skin index
  getChosenSkins() {
    return this.activeSkins;
  }

  // Setup keyboard event listeners
  setupKeyboardEvents() {
    document.addEventListener("keydown", (event) => {
      if (gameState === 2) {
        switch (event.key) {
          // Player One character selection
          case "ArrowLeft":
            this.changeActiveSkin(0, -1); // Move left for player one
            shortFartSound.play();
            break;
          case "ArrowRight":
            this.changeActiveSkin(0, 1); // Move right for player one
            shortFartSound.play();
            break;
          case "ArrowUp":
            this.changeActiveSkin(0, -3); // Move up for player one
            shortFartSound.play();
            break;
          case "ArrowDown":
            this.changeActiveSkin(0, 3); // Move down for player one
            shortFartSound.play();
            break;
          // Player Two character selection
          case "a":
            this.changeActiveSkin(1, -1); // Move left for player two
            shortFartSound.play();
            break;
          case "d":
            this.changeActiveSkin(1, 1); // Move right for player two
            shortFartSound.play();
            break;
          case "w":
            this.changeActiveSkin(1, -3); // Move up for player two
            shortFartSound.play();
            break;
          case "s":
            this.changeActiveSkin(1, 3); // Move down for player two
            shortFartSound.play();
            break;
        }
      }
    });
  }

  // Change active skin index based on arrow key presses
  changeActiveSkin(player, direction) {
    const newIndex = this.activeSkins[player] + direction; // new index for the highlighted and chosen skin
    if (newIndex >= 0 && newIndex <= 5) {
      const otherPlayerSkin = this.activeSkins[(player + 1) % 2]; // Get the other player's skin index
      if (newIndex === otherPlayerSkin) {
        return; // Players cannot chose same index (character)
      }
      this.activeSkins[player] = newIndex;
      this.highlightedSkinIndex[player] = newIndex;
    }
  }

  playGameButton(x, y, width, height) {
    push();
    stroke(0, 0, 0);
    fill(209, 147, 31);
    rect(x, y, width, height, 20);
    pop();
    strokeWeight(2);
    fill(20, 20, 20);
    textSize(30);
    textAlign(CENTER, CENTER);
    textFont(font);
    text("Play", x + 100, y + 50);
  }

  mouseClicked() {
    if (mouseX > 300 && mouseX < 550 && mouseY > 800 && mouseY < 950) {
      return true;
    }
  }

  draw() {
    background(173, 100, 36);

    // Draw additional set of boxes in brown color (beneath the main yellow)
    // strokeWeight(3);
    fill(209, 147, 31);
    for (let i = 0; i < 6; i++) {
      const row = Math.floor(i / 3); // Calculate which row the current box belongs to
      const yPosition = 100 + row * 350; // Adjust y position based on row for the additional set of boxes
      const xPosition = (i % 3) * 350; // Adjust x position for the additional set of boxes

      rect(xPosition, yPosition, 300, 300, 20); // Draw additional box

      image(images.screenSkins[i], xPosition + 10, yPosition - 50, 300, 400); // images for the characters
    }
    for (let player = 0; player < 2; player++) {
      // Iterate over skin boxes to see which player
      for (let i = 0; i < 6; i++) {
        const row = Math.floor(i / 3); // Calculate which row the current box belongs to
        const yPosition = 100 + row * 350; // Adjust y position based on row
        const xPosition = (i % 3) * 350 + player; // Adjust x position for player two

        // Highlight logic
        if (this.highlightedSkinIndex[player] === i) {
          // strokeWeight(7);
          // stroke(146, 86, 33);
          fill(248, 178, 27); // Yellow color for highlighted skin
          rect(xPosition, yPosition, 300, 300, 20); // Draw highlighted box
          image(
            //draws characters
            images.screenSkins[i],
            xPosition + 10,
            yPosition - 50,
            300,
            400,
          );
        }
      }
    }
    this.playGameButton(400, 860, 200, 100);
  }
}
