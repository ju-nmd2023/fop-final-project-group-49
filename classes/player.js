export default class Player {
  constructor() {
    this.position = { x: 0, y: 0 };
  }
  draw() {
    rect(100, 100, 40);
  }
}
