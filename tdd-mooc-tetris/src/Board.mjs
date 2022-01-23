// LEVEL 1 = Took 3,5 hours
// LEVEL 4 = Took 8 hours

import { Block } from "./Block.mjs";
import { RotatingShape } from "./RotatingShape.mjs";
import { Tetromino } from "./Tetromino.mjs";


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

  drop(blockObjTemp) {
    if (this.hasFalling()){
      throw "already falling"
    }

    var blockObj;
    if (blockObjTemp instanceof Block){
      blockObj = blockObjTemp
    }else{
      blockObj = new RotatingShape(blockObjTemp.shape, blockObjTemp.name)    
    }

    var blockObjLineByLine = blockObj.shape.split("\n").filter(Boolean)
    var distanceToLeftBorder = Math.floor((this.width - blockObjLineByLine[0].length) / 2)
    this.blockList.push(blockObj)

    blockObj.xPos = distanceToLeftBorder
    this.drawBoard()

    console.log('DROP')
    console.log(this.toString())
  }

  tick(){
    var boardLines = this.initBoard()

    for (const blockObj of this.blockList) {

      var blockObjLineByLine = blockObj.shape.split("\n").filter(Boolean)
      if (blockObj.falling && this.shapeReachesBottom(blockObj, blockObjLineByLine)){
        blockObj.falling = false
      }else if(blockObj.falling && this.nextTickWouldLeadToCollision(blockObj, blockObjLineByLine)){
        blockObj.falling = false        
      }else if (blockObj.falling){
        blockObj.yPos += 1
      }
    }

    for (const blockObj of this.blockList) {
      var blockObjLineByLine = blockObj.shape.split("\n").filter(Boolean)
      var counter = blockObj.yPos
        for (const blockLine of blockObjLineByLine) {
          if (counter < this.height && blockLine != ".".repeat(blockLine.length) ){
            boardLines[counter] = boardLines[counter].substring(0, blockObj.xPos) + blockLine + boardLines[counter].substring(blockObj.xPos + blockObjLineByLine[0].length,)
            counter += 1            
          }
        }   
      }
    this.board = boardLines
    
    console.log('TICK')
    console.log(this.toString())
  }

  drawBoard(){
    var boardLines = this.initBoard()

    for (const blockObj of this.blockList) {
      var blockObjLineByLine = blockObj.shape.split("\n").filter(Boolean)
      var counter = blockObj.yPos
        for (const blockLine of blockObjLineByLine) {
          if (counter < this.height && blockLine != ".".repeat(blockLine.length) ){
            boardLines[counter] = boardLines[counter].substring(0, blockObj.xPos) + blockLine + boardLines[counter].substring(blockObj.xPos + blockObjLineByLine[0].length,)
            counter += 1            
          }
        }   
      }
    this.board = boardLines
    console.log('DRAWBOARD')
    console.log(this.toString())


  }

  moveLeft(){
    var blockObj = this.getFallingBlockObj()
    if (blockObj){
      blockObj.xPos -= 1
    }
    this.drawBoard()

    console.log('moveLeft')
    console.log(this.toString())
  }

  moveRight(){
    var blockObj = this.getFallingBlockObj()
    if (blockObj){
      blockObj.xPos += 1
    }
    this.drawBoard()

    console.log('moveRight')
    console.log(this.toString())
  }
  
  moveDown(){
    var blockObj = this.getFallingBlockObj()
    if (blockObj){
      blockObj.yPos += 1
    }
    this.drawBoard()

    console.log('moveRight')
    console.log(this.toString())
  }

  hasFalling(){
    for (const blockObj of this.blockList) {
      if (blockObj.falling){
        return true
      }
    }
    return false
  }

  getFallingBlockObj(){
    var blockObj;
    for (const obj of this.blockList) {
      if (obj.falling){
        blockObj = obj
        return blockObj
      }
    }
    return null
  }

  toString() {
    var boardString = ""
    for (const line of this.board) {
      boardString += line + "\n"
    }
    return boardString;
  }

  shapeReachesBottom(blockObj, blockObjLineByLine){
    var lineNum = 0;
    for (let i = blockObjLineByLine.length-1; i > -1; i--){
      for (const char of blockObjLineByLine[i]) {
        if (char != "."){
          lineNum = i
          break
        }        
      }
    }
    if (blockObj.yPos + lineNum + 1 == this.height){
      return true
    }
    return false
  }

  nextTickWouldLeadToCollision(blockObj, blockObjLineByLine){

    var hasBlock = 0
    var didChange = false
    for (let i = blockObjLineByLine.length - 1; i > -1; i--){
      if(blockObjLineByLine[i] != ".".repeat(blockObjLineByLine[i].length)){
        hasBlock = i
        didChange = true
        break
      }else{
        blockObjLineByLine.splice(i)
      }
    }
    if(blockObj.yPos + hasBlock == this.height -1){
      return true
    }


    for(let i = 0; i < blockObjLineByLine[0].length; i++){
      if (blockObjLineByLine[hasBlock][i] != "." && this.board[blockObj.yPos + hasBlock + 1][blockObj.xPos + i] != "."){
        return true
      }
    }

    return false
  }
}