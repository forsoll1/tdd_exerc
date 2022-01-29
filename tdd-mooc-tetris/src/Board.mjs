// LEVEL 1 = Took 3,5 hours
// LEVEL 4 = Took 8 hours

import { Block } from "./Block.mjs";
import { RotatingShape } from "./RotatingShape.mjs";


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
  }

  tick(){
    var blockObj = this.getFallingBlockObj()

    if (blockObj){
      if (blockObj.falling && this.blockCanMoveDown(blockObj)) {
        blockObj.yPos += 1
      }else{
        blockObj.falling = false
      }     
    }
    this.drawBoard()
  }

  drawBoard(){
    var allBlockPoints = []
    var boardLines = []

    for (const blockObj of this.blockList) {
      var blockObjLineByLine = blockObj.shape.split("\n").filter(Boolean)
      var blockPoints = this.getReservedPoints(blockObjLineByLine)
      var symbol = blockObjLineByLine[blockPoints[0].y][blockPoints[0].x]
      for (const point of blockPoints) {
        point.x = point.x + blockObj.xPos
        point.y = point.y + blockObj.yPos
        point.symbol = symbol
        allBlockPoints.push(point)
      }
    }
    for(let y = 0; y < this.height; y++){
      var line = ""
      for(let x = 0; x < this.width; x++){
        var drawSymbol = "."
        for (const point of allBlockPoints) {
          if (point.x == x && point.y == y){
            drawSymbol = point.symbol
          }
        }
        line += drawSymbol
      }
      boardLines[y] = line
    }
    this.board = boardLines
  }

  moveLeft(){
    var blockObj = this.getFallingBlockObj()
    if (blockObj && this.blockCanMoveLeft(blockObj)){
      blockObj.xPos -= 1
    }
    this.drawBoard()
  }

  moveRight(){
    var blockObj = this.getFallingBlockObj()
    if (blockObj && this.blockCanMoveRight(blockObj)){
      blockObj.xPos += 1
    }
    this.drawBoard()
  }
  
  moveDown(){
    var blockObj = this.getFallingBlockObj()
    if (blockObj){
      this.tick()
    }
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

  blockCanMoveDown(blockObj){
    var blockPointsOnBoard = this.getBlockPoints(blockObj)
    var reservedPointsBoard = this.getReservedPoints(this.board)
    var oldPoints = this.filterDuplicatePoints(reservedPointsBoard, blockPointsOnBoard)

    for (const blockPoint of blockPointsOnBoard) {
      if (blockPoint.y + 1 == this.height){
        return false
      }
      for (const boardPoint of oldPoints) {
        if (blockPoint.x == boardPoint.x && blockPoint.y + 1 == boardPoint.y){
          return false
        }        
      }
    }
    return true
  }

  blockCanMoveRight(blockObj){
    var blockPointsOnBoard = this.getBlockPoints(blockObj)
    var reservedPointsBoard = this.getReservedPoints(this.board)
    var oldPoints = this.filterDuplicatePoints(reservedPointsBoard, blockPointsOnBoard)

    for (const blockPoint of blockPointsOnBoard) {
      if (blockPoint.x + 1 == this.width){
        return false
      }
      for (const boardPoint of oldPoints) {
        if (blockPoint.x + 1 == boardPoint.x && blockPoint.y == boardPoint.y){
          return false
        }        
      }
    }
    return true
  }
  

  blockCanMoveLeft(blockObj){
    var blockPointsOnBoard = this.getBlockPoints(blockObj)
    var reservedPointsBoard = this.getReservedPoints(this.board)
    var oldPoints = this.filterDuplicatePoints(reservedPointsBoard, blockPointsOnBoard)

    for (const blockPoint of blockPointsOnBoard) {
      if (blockPoint.x - 1 < 0){
        return false
      }
      for (const boardPoint of oldPoints) {
        if (blockPoint.x - 1 == boardPoint.x && blockPoint.y == boardPoint.y){
          return false
        }        
      }
    }
    return true
  }

  filterDuplicatePoints(allPoints, removeThesePoints){
    var result = allPoints.filter(function(point){
      return !removeThesePoints.find(function(removePoint){
        return removePoint.x == point.x && removePoint.y == point.y
      })
    })
    return result
  }

  getBlockPoints(blockObj){
    var blockObjLineByLine = blockObj.shape.split("\n").filter(Boolean)

    var blockPoints = this.getReservedPoints(blockObjLineByLine)
    var blockPointsOnBoard = []
    for (const point of blockPoints) {
      point.x += blockObj.xPos
      point.y += blockObj.yPos
      blockPointsOnBoard.push(point)
    }

    return blockPointsOnBoard
  }

  getReservedPoints(lineArray){
    var reservedPoints = []

    for (let x = 0; x < lineArray[0].length; x++) {
      for (let y = 0; y < lineArray.length; y++) {
        if(lineArray[y][x] != "."){
          const reservedPoint = {x:x , y:y}
          reservedPoints.push(reservedPoint)
        }
      }
    }
    return reservedPoints
  }

  boardRotateLeft(){
    var blockObj = this.getFallingBlockObj()
    var tempObj = blockObj.rotateLeft()

    if (blockObj && blockObj.name != "O"){
      var rotatableBlock = this.hasSpaceToRotate(blockObj, tempObj)     
    }else{
      return
    }
    if(rotatableBlock){
      blockObj.shape = rotatableBlock.shape
      blockObj.xPos = rotatableBlock.xPos
    }else{
      return
    }
    this.drawBoard()
  }

  boardRotateRight(){
    var blockObj = this.getFallingBlockObj()
    var tempObj = blockObj.rotateRight()

    if (blockObj && blockObj.name != "O"){
      var rotatableBlock = this.hasSpaceToRotate(blockObj, tempObj)     
    }else{
      return
    }
    if(rotatableBlock){
      blockObj.shape = rotatableBlock.shape
      blockObj.xPos = rotatableBlock.xPos
    }else{
      return
    }
    this.drawBoard()
  }

  hasSpaceToRotate(blockObj, rotatedBlock){
    var rotatedBlockPointsOnBoard = this.getBlockPoints(rotatedBlock)
    var originalBlockPointsOnBoard = this.getBlockPoints(blockObj)
    var reservedPointsBoard = this.getReservedPoints(this.board)
    var oldPoints = this.filterDuplicatePoints(reservedPointsBoard, originalBlockPointsOnBoard)

    if (this.rotatedObjFits(rotatedBlockPointsOnBoard, oldPoints)){
      return rotatedBlock
    }

    var testPointsOffsetRight = []
    for (const point of this.getBlockPoints(rotatedBlock)) {
      point.x += 1
      testPointsOffsetRight.push(point)
    }
    if (this.rotatedObjFits(testPointsOffsetRight, oldPoints)){
      rotatedBlock.xPos += 1
      return rotatedBlock
    }

    var testPointsOffsetLeft = []
    for (const point of this.getBlockPoints(rotatedBlock)) {
      point.x -= 1
      testPointsOffsetLeft.push(point)
    }

    if (this.rotatedObjFits(testPointsOffsetLeft, oldPoints)){
      rotatedBlock.xPos -= 1
      return rotatedBlock
    }
    return null
  }
  
  rotatedObjFits(blockPointsOnBoard, oldPoints){
    for (const point of blockPointsOnBoard) {
      if (point.x < 0 || point.x >= this.width || point.y < 0 || point.y >= this.height ){
        return false
      }
    }

    for (const boardPoint of oldPoints) {
      for (const blockPoint of blockPointsOnBoard) {
        if (boardPoint.x == blockPoint.x && boardPoint.y == blockPoint.y){
          return false
        }
      }
    }
    return true
  }
}