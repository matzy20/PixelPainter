// JQuery
//JQuery.com> > API documentation
//JQuery makes working with DOM a easier
//note - JQuery selector does NOT return DOM though, return JQuery
$(function(){
  run();
});
//same as
// $(run);

function run () {
  init();
  createSideBar();
  createGrid();
}

//'setter' function, takes in a value and 'sets' it
function init () {
  //# id selector for CSS
  //replaced document.getElementById with $
  pixelPainterContainer = $('#pixelPainter');
  // pixelPainter.text('hello');
  // pixelPainter.addClass('container');
  console.log(pixelPainterContainer);
  //way of pulling pixels/colors
  var swatches = ['red', 'orange', 'blue', 'yellow', 'purple'];
  drawSwatches(swatches);
  //to take in x and y values
  //way of placing pixel table
  drawGrid(4, 4);
}
$(init);
/** accepting an array of colors to generate our swatches*/
function drawSwatches(swatches) {
  //get my swatch color
  var swatch = ['blue'];
  //creating elements via JQuery also
  //set my swatch's background color
  var swatchElement = $('<div class="swatch"></div>');
  swatchElement.css('background-color', swatch);

  //create click handler for this swatch
  swatchElement.on('click', function (event){
    var targetColor = swatchElement.css('background-color');
    $('.cell').css('background-color', targetColor);
  });
  //append swatch to the pixel painter
  pixelPainterContainer.append(swatchElement);
}
//create grid and gridContainer
function drawGrid (x, y){
  var grid = [];
  var gridContainter = $('<div />');
  gridContainter.attr('id','grid');
  gridContainter.addClass('container');
  //create row and row container
  for (var column = 0; column < y; column++){
    var rowArray = [];
    //need to put values in, and since no colors yet, set to null;
    var rowContainer = $('<div />');
    //create cell and cell container
    for (var row = 0; row < x; row++){
      var cellElement = $('<div />');
      cellElement.addClass('cell');
      rowArray.push(null);
      rowContainer.append(cellElement);
    }
    grid.push(rowArray);
    gridContainter.append(rowContainer);
  }
  pixelPainterContainer.append(gridContainter);
}
var createSideBar = function ()  {
  console.log('Create sidebar');
};
$(createSideBar);

var createGrid = function () {
  console.log('Create Grid');
};
$(createGrid);