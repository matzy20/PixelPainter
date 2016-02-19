//CLIENT - THIS IS MY APP
//JQuery.com> > API documentation
//JQuery makes working with DOM easier
//JQuery selector does NOT return DOM though, return JQuery

$(function(){
  run();
});
//same as $(run);

var swatchContainer;
function run () {
  init();
  //private variable created so SWATCH AND CANVAS can access!!
  var color = 'rgb(0, 0, 0)';
}
//'setter' function, takes in a value and 'sets' it
function init () {
  pixelPainterContainer = $('#pixelPainter');
  // console.log(pixelPainterContainer);

  drawSwatchGrid(6, 6);
  $('.cell').click(function (events){
    color = $(this).css("background-color");
    $('.swatchContainer .cell').removeClass('selected-color');
    $(this).addClass('selected-color');
    $(this).css("background-color", color);
  });
  canvasGrid(5, 5);
  $('.canvasCell').click(function (events){
    console.log(color);
    $(this).css("background-color", color);
  });

  eraseButton();
  clearButton();
  saveButton();
}

function clearButton (events){
  var $button = $('<button />').text('CLEAR');
  $button.addClass('button');
  swatchContainer.append($button);
  /*changed from class button to THIS button, which overrid
  eraseButton (clearing all) due to order above*/
  $button.click(function (events) {
    $('.canvasCell').css("background-color", "white");
  });
}

function eraseButton (events){
  var $button = $('<button />').text('ERASE');
  //make sure not a CLASS button and it's THIS eraseButton
  $button.addClass('button');
  swatchContainer.append($button);

  $button.click(function (events) {
    //how to make that clicked on cell white
    $('.canvasCell').click(function (events) {
      $(this).css("background-color", "white");
    });
  });
}

function saveButton(events){

  var $button = $('<button />').text('SAVE');


  $button.addClass('button');
  swatchContainer.append($button);
  $button.click(function (events){
    var data = [];

    $('.canvasCell').each(function (index, element){
      var color = $(element).css("background-color");
      //condition only works after reloading after 'save'
      data.push(index, $(element).css("background-color"));
    });

    //ajax allows you to send stuff to server from static app/client files
    //http://api.jquery.com/jquery.ajax/
    $.ajax({
      //QUESTION: able to create one also for GET for :id?
      type: "POST",
      url: "/paintings",
      data: JSON.stringify({"canvasData":data}),//TODO: tbd info}
      dataType: "JSON",
      contentType: "application/json",
      success: function (message) {
        console.log('Hello Ajax', message);
      }
    });
    // .done(function (){
    //   alert("Your painting has been saved.");
    // });
  });
}

function canvasGrid (width, height) {
  if (width > 5){
    alert("cannot exceed more than 10");
    return;
  }
  if (height > 5){
    alert("cannot exceed more than 10");
    return;
  }
  var idIterator = 0;
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
          .addClass('canvasCell')
          //creates an id on each div for canvasGrid
          .attr('id', ++idIterator);
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


