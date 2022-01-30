
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Full lines get cleared", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 8);
    board.drop(Tetromino.I_SHAPE)
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE)
    board.moveRight()
    board.moveRight()
    board.moveRight()
    fallToBottom(board)

  });

  it("bottom line gets cleared", () => {
    board.drop(Tetromino.O_SHAPE)
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ....OO....`
    );
  });

  it("two lines get cleared", () => {
    board.drop(Tetromino.I_SHAPE)
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE)
    board.moveRight()
    board.moveRight()
    board.moveRight()
    fallToBottom(board)
    board.drop(Tetromino.O_SHAPE)
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("middle line gets cleared", () => {
    board.drop(Tetromino.I_SHAPE)
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE)
    board.moveRight()
    board.moveRight()
    board.moveRight()
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE)
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE)
    board.moveRight()
    board.moveRight()
    board.moveRight()
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE)
    board.tick()
    board.boardRotateRight()
    board.moveRight()
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........
       IIII.TIIII
       IIII.TIIII`
    );
  });

  xit("", () => {
  });
});