// LEVEL 1 = Took 3,5 hours
// LEVEL 4 = Took 8 hours

import { Block } from "./Block.mjs";
import { RotatingShape } from "./RotatingShape.mjs";


export class Board {
  width;
  height;
  board = []
  blockList = []

  fallingBlock;
  boardPoints = []

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.board = this.initBoard();
  }

  initBoard() {
    var newBoard = []
    this.fallingBlock = null
    for (let i = 0; i < this.height; i++) {
      newBoard.push(".".repeat(this.width))
    }
    return newBoard
  }

  drop(blockObjTemp) {
    if (this.fallingBlock){
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
    this.fallingBlock = blockObj
    this.blockList.push(blockObj)

    blockObj.xPos = distanceToLeftBorder
    this.drawBoard()
  }

  tick(){
    var blockObj = this.fallingBlock

    if (blockObj){
      if (blockObj.falling && this.blockCanMoveDown(blockObj)) {
        blockObj.yPos += 1
      }else{
        this.fallingBlock = null

        blockObj.falling = false
        var blockPoints = this.getBlockPoints(blockObj)
        for (const point of blockPoints) {
          this.boardPoints.push(point)
        }
        this.checkIfLinesClear()
      }     
    }
    this.drawBoard()
  }

  drawBoard(){
  var boardLines = []

  var allBlockPoints = []
  if (this.fallingBlock) {
    allBlockPoints = this.getBlockPoints(this.fallingBlock)
  }
  for (const point of this.boardPoints) {
    allBlockPoints.push(point)
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
    var blockObj = this.fallingBlock
    if (blockObj && this.blockCanMoveLeft(blockObj)){
      blockObj.xPos -= 1
    }
    this.drawBoard()
  }

  moveRight(){
    var blockObj = this.fallingBlock
    if (blockObj && this.blockCanMoveRight(blockObj)){
      blockObj.xPos += 1
    }
    this.drawBoard()
  }
  
  moveDown(){
    var blockObj = this.fallingBlock
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

  toString() {
    var boardString = ""
    for (const line of this.board) {
      boardString += line + "\n"
    }
    return boardString;
  }

  blockCanMoveDown(blockObj){
    var blockPointsOnBoard = this.getBlockPoints(blockObj)
    var oldPoints = this.boardPoints

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
    var oldPoints = this.boardPoints

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
    var oldPoints = this.boardPoints

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
          const reservedPoint = {x:x , y:y, symbol:lineArray[y][x]}
          reservedPoints.push(reservedPoint)
        }
      }
    }
    return reservedPoints
  }

  boardRotateLeft(){
    var blockObj = this.fallingBlock

    if (blockObj && blockObj.name != "O"){
      var tempObj = blockObj.rotateLeft()
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
    var blockObj = this.fallingBlock

    if (blockObj && blockObj.name != "O"){
      var tempObj = blockObj.rotateRight()
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
    var oldPoints = this.boardPoints

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
  checkIfLinesClear(){
    for (let y = 0; y < this.height; y++){
      var counter = 0
      for (const point of this.boardPoints) {
        if (point.y == y){
          counter += 1
        }
      }
      if (counter == this.width){
        this.handleClear(y)
      }
    }  
  }
  handleClear(yValue){
    this.boardPoints = this.boardPoints.filter(function(point){
      if(point.y != yValue && point.y > yValue){
        return point
      }else if (point.y < yValue){
        point.y += 1
        return point
      }
    })
  }
}