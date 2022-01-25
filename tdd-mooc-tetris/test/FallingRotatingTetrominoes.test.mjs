
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Falling ROTATING tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("falling tetromino can be rotated left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.boardRotateLeft()

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TT.....
       ....T.....
       ..........
       ..........`
    );
  });
  
  it("falling tetromino can be rotated right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.boardRotateRight()

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ....TT....
       ....T.....
       ..........
       ..........`
    );
  });

  xit("", () => {
  });
});