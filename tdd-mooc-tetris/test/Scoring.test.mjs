
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { ScoreBoard } from "../src/ScoreBoard.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Score one line", () => {
  let board;
  let scoreBoard;
  beforeEach(() => {
    board = new Board(10, 8);
    scoreBoard = new ScoreBoard();
    board.addScoreBoard(scoreBoard)
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

  it("scoring one line gives 40 points", () => {
    board.drop(Tetromino.O_SHAPE)
    fallToBottom(board)

    expect(scoreBoard.toString()).to.equal(
        "40"
    );
  });

  xit("", () => {
  });
});