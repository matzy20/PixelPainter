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
    if(err){
      res.send(err + 'no Paintings to display');
    }
    res.render('index', {
      'paintings': paintings
    });
  });
});

app.get('/paintings/:id', function (req, res){
  var paintingId = req.params.id;
  console.log('hello', req.params.id);
  // console.log('paintings', Painting);
  Painting.findById(paintingId, function (err, paintings){
    if(err){
      console.log(paintingId + 'is not a valid ID');
    }
    //TODO: create success res here
  }).then(function(painting){
    res.render('savedGrid',{
      'artist': painting.artist,
      'title': painting.title

    });
  });
});

app.post('/paintings', function (req, res){
  // console.log('typeof', typeof(req.body));
  console.log(req.body.colors);
  var newPainting = new Painting ({
    artist: req.body.artist,
    title: req.body.title,
    painting: req.body.colors
  });
  //speaking with ajax in client/app
  //if successful, ajax's message will show
  //callback in save sent back painting object
  newPainting.save(function(err, painting){
    //json since painting is an object
    res.json(painting);
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

