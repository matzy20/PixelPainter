var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var morgan = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
//mongo is running on in terminal
mongoose.connect('mongodb://localhost/pixelpainter');
//QUESTION: model vs schema, schema = properties on model?
var pixelSchema = mongoose.Schema({
  artist: String,
  title: String,
  painting: Object,
  id: String
});
//intsantiating Painting (model), paintings (database) which mongo creates
var Painting = mongoose.model('Painting', pixelSchema);

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
//due to ajax and save button on client/app.js need to parse for JSON also
app.use(bodyParser.json({extended: false}));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.static(path.resolve(__dirname, 'Public')));

app.set('views', 'views');
app.set('view engine', 'jade');

//see all INDEX of paintings
app.get('/paintings', function (req, res){
  Painting.find({}, function (err, paintings){
    console.log('paintings', paintings);
    if(err){
      res.send(err + 'no Paintings to display');
    }
    res.render('index', {
      'paintings': paintings
    });
  });
});

//make new paintings
app.get('/paintings/new', function (req, res){
  //QUESTION: empty object literal necessary in render?
  //No, only if render is REQUIRING in info, which its not
  res.render('newGrid');
});

//grabbing saved PaintingsById
app.get('/paintings/:id', function (req, res){
  var paintingId = req.params.id;
  console.log('hello', req.params.id);
  // console.log('paintings', Painting);
  Painting.findById(paintingId, function (err, paintings){
    if(err){
      console.log(paintingId + 'is not a valid ID');
    }
  }).then(function(painting){
    console.log('colors', painting.painting);
    res.render('savedGrid',{
      'artist': painting.artist,
      'title': painting.title,
      'painting': painting.painting
    });
  });
});

//saving paintings
app.post('/paintings', function (req, res){
  // console.log('typeof', typeof(req.body));
  var newPainting = new Painting ({
    artist: req.body.artist,
    title: req.body.title,
    painting: req.body.painting
  });
  //since working with json need redirect setup this way
  newPainting.save(function(err, painting){
    var paintingId = newPainting._id;
    res.send({
      redirect: '/paintings/' + paintingId
    });
  });
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
//db.once is an event listener, and now app.listen can be a call back
db.once('open', function (){
  console.log('db connected');
  //what express is running on
  app.listen(3000, function () {
    console.log('listening on 3000');
  });
});

