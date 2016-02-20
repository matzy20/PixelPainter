//CLIENT - THIS IS MY APP
//JQuery.com> > API documentation
//JQuery makes working with DOM easier
//JQuery selector does NOT return DOM though, return JQuery

$(run);
// same as $(run);

var swatchContainer;
function run () {
  init();
  //private variable created so SWATCH AND CANVAS can access!!
  var color = 'rgb(0, 0, 0)';
}
//controls to coloring canvasContainer
function init () {
  pixelPainterContainer = $('#pixelPainter');
  //
  drawSwatchGrid(6, 6);
  $('.swatchContainer .cell').click(function (events){
    color = $(this).css("background-color");
    //cell in swatchContainer for jade
    $('.swatchContainer .cell').removeClass('selected-color');
    $(this).addClass('selected-color');
    $(this).css("background-color", color);
  });
  canvasGrid(5, 5);
  $('.canvasCell').click(function (events){
    console.log(color);
    $(this).css("background-color", color);
  });

  // clearButton();
  // eraseButton();
  // saveButton();
}
/***TODO: gradually start commenting out original PixelPainter.js to defer to testGrid using jade ***/
// function clearButton (events){
  $('.clear').click(function (events) {
    $('.canvasCell').css("background-color", "white");
  });

// function eraseButton (events){
//    var color = $(this).css("background-color");
//   var $button = $('<button />').text('ERASE');
  // make sure not a CLASS button and it's THIS eraseButton
  // $button.addClass('button');
  // swatchContainer.append($button);

  $('.erase').click(function (events){
    $('.canvasCell').click(function (events){
      $(this).css("background-color", "white");
      //able to reapply colors again after clicking in swatchGrid
    $('.cell').click(function (events){
      //TODO: follow-up with Tony on reducing events
      $(this).css("background-color", color);
        $('.canvasCell').click(function (events){
          $(this).css("background-color", color);
        });
    });
    });
  });
  // $button.click(function (events) {
  //   //how to make that clicked on cell white
  //   $('.canvasCell').click(function (events) {
  //     $(this).css("background-color", "white");
  //   });
  // });
// }
// function saveButton(events){
  var data = [];
  $('.save').click(function (events){
    //make sure ajax is accessed before click event completes
    //
    $('.canvasCell').each(function (index, element){
      var color = $(element).css("background-color");
      data.push(color);
    });
    /*kept variable properties separate from data[] which is for colors which is in an array, easier this way*/
    //added artist and title as two separate properties
    //kept out of "each" function
    var artist = $('.artist').val();
    var title = $('.title').val();
    console.log('data', data);
    $.ajax({
      //QUESTION: able to create one also for GET for :id?
      type: "POST",
      url: "/paintings",
      data: JSON.stringify({
       "colors": data,
       "artist": artist,
       "title": title
       }),
      dataType: "JSON",
      contentType: "application/json",
      success: function (data) {
        console.log('Hello Ajax', data);
      }
    });
  });


//   var $button = $('<button />').text('SAVE');
//   $button.addClass('button');
//   swatchContainer.append($button);
//   $button.click(function (events){
//     var data = [];
//     $('.canvasCell').each(function (index, element){
//       var color = $(element).css("background-color");
//       //condition only works after reloading after 'save'
//       data.push(index, $(element).css("background-color"));
//     });

    //ajax allows you to send stuff to server from static app/client files
    //http://api.jquery.com/jquery.ajax/
// }

function canvasGrid (width, height) {
//   if (width > 5){
//     alert("cannot exceed more than 10");
//     return;
//   }
//   if (height > 5){
//     alert("cannot exceed more than 10");
//     return;
//   }
//   var idIterator = 0;
//   var canvasContainer = $('<div />');
//     canvasContainer
//       .addClass('canvasContainer');

//     for (var i = 0; i < width; i++){
//       var row = $('<div />');
//         row
//         .addClass('row');
//       for (var j = 0; j < height; j++){
//         var cellElement = $('<div />');
//         cellElement
//           .addClass('canvasCell')
//           //creates an id on each div for canvasGrid
//           .attr('id', ++idIterator);
//         row.append(cellElement);
//       }
//       canvasContainer.append(row);
//     }
// pixelPainterContainer.append(canvasContainer);
}

function drawSwatchGrid (x, y) {
  // swatchContainer = $('<div />');
  // swatchContainer
  //   .addClass('swatchContainer');

  // $('div.pixelPainterContainer').append(swatchContainer);

  // for (var column=0; column < y; column++){
  //   var rowContainer = $('<div />');
  //     rowContainer
  //     .addClass('row');

  //   for (var row=0; row < x; row ++){
  //     var cellElement = $('<div />');
  //     cellElement
  //       .addClass('cell');
  //     rowContainer.append(cellElement);
  //   }
  //   swatchContainer.append(rowContainer);
  // }

  // pixelPainterContainer.append(swatchContainer);

  function generateRandomColor () {
    var red = Math.floor(Math.random()*256);
    var green = Math.floor(Math.random()*256);
    var blue = Math.floor(Math.random()*256);

    //initially had randomColor as var which 'baked it', put in function to have it do multiple times and be able to be called
    return 'rgb('+red+ ','+green +','+blue+')';
  }

  //after reading the jQuery documentation, found out 'element', allowed to access single swatch vs all
  //find cells inside of swatchContainer
  $('.swatchContainer .cell').each(function(index, element){
  //now able to call generateRandomColor function
  $(element).css("background-color", generateRandomColor());
  });
  }


