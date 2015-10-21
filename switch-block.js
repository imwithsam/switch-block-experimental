'use strict';

$(document).ready(function() {
  var board = generateBoard();

  drawOnCanvas(board);

  // TODO: *** Remove console.log ***
  console.log(board);

  // Bypass Initial 3-In-A-Row Scenario
  // Replace board if any tiles create 3-in-a-row horizontally or vertically

  // Bypass Initial Loss Scenario
  // Replace board if there are no possible 3-in-a-row scenarios with one move
});

function generateBoard() {
  // Create new 8x8 board with 70px x 70px tiles
  var board = new Board(8, 8, 70, 70);

  // Add columns with tiles to board
  for (var i=0; i < board.columnCount; i++) {
    var column = new Column(i);

    for (var j=0; j < board.rowCount; j++) {
      // Generate random tile type (1-7)
      // Zero is reserved for an empty tile
      var type = Math.floor((Math.random() * 7) + 1);
      var xCoord = i * board.tileWidth;
      var yCoord = j * board.tileHeight;
      var tile = new Tile(j, type, xCoord, yCoord)

      column.tiles.push(tile);
    }

    board.columns.push(column);
  }

  function Board(columnCount, rowCount, tileWidth, tileHeight) {
    this.columnCount = columnCount || 8;
    this.rowCount = rowCount || 8;
    this.tileWidth = tileWidth || 70;
    this.tileHeight = tileHeight || 70;
    this.width = this.tileWidth * this.columnCount;
    this.height = this.tileHeight * this.rowCount;
    this.columns = [];
  };

  function Column(columnNumber) {
    this.columnNumber = columnNumber;
    this.tiles = [];
  };

  function Tile(rowNumber, type, xCoord, yCoord) {
    this.rowNumber = rowNumber;
    this.type = type || 0;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
  };

  return board;
};

function drawOnCanvas(board) {
  var canvas = document.getElementById('board');
  var context = canvas.getContext('2d');

  canvas.width = board.width;
  canvas.height = board.height;

  board.columns.forEach(function(column) {
    column.tiles.forEach(function(tile) {
      var x = tile.xCoord;
      var y = tile.yCoord;
      var width = board.tileWidth;
      var height = board.tileHeight;

      context.strokeRect(x, y, width, height);
    });
  });

  return context;
};
