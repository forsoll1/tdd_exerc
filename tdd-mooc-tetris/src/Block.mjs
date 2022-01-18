export class Block {
  color;
  xPos;
  yPos;
  falling;

  constructor(color) {
    this.color = color;
    this.yPos = 0;
    this.falling = true;
  }
  toString() {
    return this.color;
  }
}
