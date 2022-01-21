export class Block {
  shape;
  xPos = 1;
  yPos;
  falling;

  constructor(shape) {
    this.shape = shape;
    this.yPos = 0;
    this.falling = true;
  }
  toString() {
    return this.color;
  }
}
