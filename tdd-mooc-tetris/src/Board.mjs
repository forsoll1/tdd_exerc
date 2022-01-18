import { Block } from "../src/Block.mjs";

export class Board {
  width;
  height;
  board = []
  blockList = []

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.initBoard();
  }

  initBoard() {
    for (let i = 0; i < this.height; i++) {
      this.board.push(".".repeat(this.width))
    }
  }

  drop(blockObj) {
    if (this.hasFalling()){
      throw "already falling"
    }
    this.blockList.push(blockObj)
    var xPosition = Math.floor(this.width/2)
    blockObj.xPos = xPosition

    this.board[0] = this.board[blockObj.yPos].substring(0, blockObj.xPos) + blockObj.color + this.board[blockObj.yPos].substring(blockObj.xPos + 1,)
  }

  tick(){
    var boardLines = []
    for (let i = 0; i < this.height; i++) {
      boardLines.push(".".repeat(this.width))
    }
    for (const blockObj of this.blockList) {
      if (blockObj.falling && blockObj.yPos == this.height - 1){
        blockObj.falling = false
      }else if(blockObj.falling && this.board[blockObj.yPos + 1].charAt(blockObj.xPos) != "."){
        blockObj.falling = false        
      }else if (blockObj.falling){
        console.log(boardLines[blockObj.yPos + 1].charAt(blockObj.xPos))
        blockObj.yPos += 1
      }

    }
    for (const blockObj of this.blockList) {
      boardLines[blockObj.yPos] = boardLines[blockObj.yPos].substring(0, blockObj.xPos) + blockObj.color + boardLines[blockObj.yPos].substring(blockObj.xPos + 1,)
    }

    this.board = boardLines
  }

  hasFalling(){
    for (const blockObj of this.blockList) {
      if (blockObj.falling){
        return true
      }
    }
    return false
  }

  toString() {
    var boardString = ""
    for (const line of this.board) {
      boardString += line + "\n"
    }
    return boardString;
  }
}
