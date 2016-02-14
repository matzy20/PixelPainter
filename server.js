var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/pixelpainter');
var pixelSchema = mongoose.Schema({owner: String});
//intsantiating Painting (model), paintings (database) which mongo creates
var Painting = mongoose.model('Painting', pixelSchema);

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(methodOverride('_method'));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
//db.once is an event listener, and now app.listen can be a call back
  db.once('open', function (){
    console.log('db connected');
    app.listen(3000, function () {
      console.log('listening on 3000');
    });
  });

