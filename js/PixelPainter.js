// JQuery
//JQuery.com> > API documentation
//JQuery makes working with DOM a easier
//note - JQuery selector does NOT return DOM though, return JQuery
$(function(){
  run();
});
//same as
// $(run);

var swatchContainer;
function run () {
  init();
  //private variable created so SWATCH AND CANVAS can access!!
  var color;
}
//'setter' function, takes in a value and 'sets' it
function init () {
  pixelPainterContainer = $('#pixelPainter');
  console.log(pixelPainterContainer);
  //why is my grid height doubling?
  drawSwatchGrid(6, 6);
  $('.cell').click(function (events){
    color = $(this).css("background-color");
    console.log(color);
    $(this).css("background-color", color);
  });
  canvasGrid(10, 10);
  $('.canvasCell').click(function (events){
    console.log(color);
    $(this).css("background-color", color);
  });
  clearButton();
}

function clearButton (events){
  var $button = $('<button />').text('CLEAR');
  $button.addClass('button');
  swatchContainer.append($button);
}

function canvasGrid (width, height) {
  if (width > 20){
    alert("cannot exceed more than 20");
    return;
  }
  if (height > 20){
    alert("cannot exceed more than 20");
    return;
  }

  var canvasContainer = $('<div />');
    canvasContainer
      .addClass('canvasContainer');

    for (var i = 0; i < width; i++){
      var row = $('<div />');
        row
        .addClass('row');
      for (var j = 0; j < height; j++){
        var cellElement = $('<div />');
        cellElement
          .addClass('canvasCell');
        row.append(cellElement);
      }
      canvasContainer.append(row);
    }
pixelPainterContainer.append(canvasContainer);
}

function drawSwatchGrid (x, y) {
  swatchContainer = $('<div />');
  swatchContainer
    .addClass('swatchContainer');
  // gridContainer.attr('id','grid');
  // gridContainer.addClass('container');
  $('div.pixelPainterContainer').append(swatchContainer);

  for (var column=0; column < y; column++){
    var rowContainer = $('<div />');
      rowContainer
      .addClass('row');

    for (var row=0; row < x; row ++){
      var cellElement = $('<div />');
      cellElement
        .addClass('cell');
      rowContainer.append(cellElement);
    }
    swatchContainer.append(rowContainer);
  }
  //why is my grid height doubling?
  pixelPainterContainer.append(swatchContainer);

  function generateRandomColor () {
    var red = Math.floor(Math.random()*256);
    var green = Math.floor(Math.random()*256);
    var blue = Math.floor(Math.random()*256);

    //initially had randomColor as var which 'baked it', put in function to have it do multiple times and be able to be called
    return 'rgb('+red+ ','+green +','+blue+')';
  }

  //after reading the jQuery documentation, found out 'element', allowed to access single swatch vs all
  $('.cell').each(function(index, element){
  //now able to call generateRandomColor function
  $(element).css("background-color", generateRandomColor());
  });
  }


