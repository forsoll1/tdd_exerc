
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Moving tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("falling tetromino moves one step left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `..TTT.....
       ...T......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("falling tetromino moves one step right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `....TTT...
       .....T....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("tetromino cannot move right beyond border", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `.......TTT
       ........T.
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("tetromino cannot move left through another block", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `....TTTTTT
       .....T..T.
       .......TTT
       ........T.
       .......TTT
       ........T.`
    );
  });

  it("falling tetromino moves one step down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();

    expect(board.toString()).to.equalShape(
      `..........
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  it("tetromino cannot move down after hitting bottom", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...TTT....
       ....T.....`
    );
  });

  it("tetromino cannot move left beyond border", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `TTT.......
       .T........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("tetromino cannot move left through another block", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `TTTTTT....
       .T..T.....
       TTT.......
       .T........
       TTT.......
       .T........`
    );
  });
  

  xit("", () => {
    
  });
});