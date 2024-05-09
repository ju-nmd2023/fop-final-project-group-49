export default class Skin {
  constructor() {
    this.activeSkinIndex = 0; // Use index for better clarity
    // this.skinArray = [
    //   {
    //     // left: "imagePath1",
    //     // right: "imagePath2",
    //     // up: "imagePath3",
    //     // down: "imagePath4",
    //   },
    //   {
    //     // left: "imagePath5",
    //     // right: "imagePath6",
    //     // up: "imagePath7",
    //     // down: "imagePath8",
    //   },
    //   // ... add more skin objects for additional characters
    // ];

    this.player1Skin = {
      name: "Player 1",
      activeSkin: this.skinArray,
    };

    this.player2Skin = {
      name: "Player 2",
      activeSkin: this.skinArray,
    };
  }

  // get activeSkin() {
  //   return this.skinArray[this.activeSkinIndex]; // Better to access active skin
  // }

  setActiveSkin(index) {
    if (index >= 0 && index < this.skinArray.length) {
      this.activeSkinIndex = index;
    } else {
      console.error("Invalid skin index:", index);
    }
  }
}
