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
  for (var column=0; column < board.columnCount; column++) {
    for (var row=0; row < board.rowCount; row++) {
      // Generate random tile type (1-7)
      // Zero is reserved for an empty tile
      var type = Math.floor((Math.random() * 7) + 1);
      var tile = new Tile(type, column, row)

      board.tiles.push(tile);
    }
  }

  function Board(columnCount, rowCount, tileWidth, tileHeight) {
    this.columnCount = columnCount || 8;
    this.rowCount = rowCount || 8;
    this.tileWidth = tileWidth || 70;
    this.tileHeight = tileHeight || 70;
    this.width = this.tileWidth * this.columnCount;
    this.height = this.tileHeight * this.rowCount;
    this.tiles = [];
  };

  function Tile(type, column, row) {
    this.type = type || 0;
    this.column = column;
    this.row = row;
  };

  return board;
};

function drawOnCanvas(board) {
  var canvas = document.getElementById('board');
  var context = canvas.getContext('2d');

  canvas.width = board.width;
  canvas.height = board.height;

  board.tiles.forEach(function(tile) {
    var x = tile.column * board.tileWidth;
    var y = tile.row * board.tileHeight;
    var width = board.tileWidth;
    var height = board.tileHeight;

    context.strokeRect(x, y, width, height);
  });

  return context;
};
