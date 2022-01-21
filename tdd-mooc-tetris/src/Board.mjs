// LEVEL 1 = Took 3,5 hours


export class Board {
  width;
  height;
  board = []
  blockList = []

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.board = this.initBoard();
  }

  initBoard() {
    var newBoard = []
    for (let i = 0; i < this.height; i++) {
      newBoard.push(".".repeat(this.width))
    }
    return newBoard
  }

  drop(blockObj) {
    if (this.hasFalling()){
      throw "already falling"
    }
    this.blockList.push(blockObj)
    var blockObjLineByLine = blockObj.shape.split("\n")
    var distanceToLeftBorder = Math.floor((this.width - blockObjLineByLine[0].length) / 2)
    for (let i = 0; i < blockObjLineByLine.length; i++){
      this.board[i] = this.board[i].substring(0,distanceToLeftBorder) + blockObjLineByLine[i] + this.board[i].substring(distanceToLeftBorder + blockObjLineByLine[i].length,)
    }
    if (blockObj.xPos){
      var xPosition = Math.floor(this.width/2)
      blockObj.xPos = xPosition
    }
  }

  tick(){
    var boardLines = this.initBoard()

    for (const blockObj of this.blockList) {

      if (blockObj.falling && blockObj.yPos == this.height - 1){
        blockObj.falling = false
      }else if(blockObj.falling && this.board[blockObj.yPos + 1].charAt(blockObj.xPos) != "."){
        blockObj.falling = false        
      }else if (blockObj.falling){
        blockObj.yPos += 1
      }

    }
    for (const blockObj of this.blockList) {
      boardLines[blockObj.yPos] = boardLines[blockObj.yPos].substring(0, blockObj.xPos) + blockObj.shape + boardLines[blockObj.yPos].substring(blockObj.xPos + 1,)
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
