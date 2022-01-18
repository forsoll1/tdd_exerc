import { Block } from "../src/Block.mjs";

export class Board {
  width;
  height;
  board = ""
  blockList = []

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.initBoard();
  }

  initBoard() {
    var line = ""
    for (let i = 0; i < this.width; i++) {
      line += "." 
    }
    for (var i = 0; i < this.height; i++) {
      this.board += line + "\n"
    }
  }

  drop(blockObj) {
    if (this.checkFalling()){
      throw "already falling"
    }
    this.blockList.push(blockObj)
    var xPosition = Math.floor(this.width/2)
    blockObj.xPos = xPosition

    var start = ".".repeat(xPosition) + blockObj.toString()
    var newBoard = start + this.board.substring(Math.floor(this.width/2) + 1,)
    this.board = newBoard
  }

  tick(){
    var boardLines = []
    for (let i = 0; i < this.height; i++) {
      boardLines.push(".".repeat(this.width))
    }
    for (const blockObj of this.blockList) {
      blockObj.yPos += 1
    }
    for (const blockObj of this.blockList) {
      boardLines[blockObj.yPos] = boardLines[blockObj.yPos].substring(0, blockObj.xPos) + blockObj.color + boardLines[blockObj.yPos].substring(blockObj.xPos + 1,)
    }
    var newBoard = ""
    for (const line of boardLines) {
      newBoard += line + "\n"
    }
    this.board = newBoard
  }

  checkFalling(){
    for (const blockObj of this.blockList) {
      if (blockObj.falling){
        return true
      }
    }
    return false
  }

  toString() {
    return this.board;
  }
}
