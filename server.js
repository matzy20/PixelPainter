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
  painting: Object,
  title: String
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

app.get('/paintings', function (req, res){
  Painting.find({},function (err, paintings){
    if(err){
      res.send(err + 'is not valid');
    }
    console.log('getting paintings');
    res.render('index'
      // //TODO: expected this to attach all paintings, see jade
      // 'paintings': paintings
    );
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
    res.render('painting' ,{
      //TODO: confirm, the 'saved' Painting/:id to appear correct?
      'artist': 'Gail',
      'title': 'Picasso',
      'id': paintingId
    });
    // res.send(paintings);
  });
});

app.post('/paintings', function (req, res){
  console.log('typeOf', typeof(req.body.canvasData));
  var newPainting = new Painting ({
    artist: 'Joe',
    painting: req.body.canvasData,
    title: 'Pixel by Id'
  });
  //speaking with ajax in client/app
  //if successful, ajax's message will show
  // res.json({
  //   'artist': 'Gail'
  // });
  newPainting.save();
  res.sendStatus(200);
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

