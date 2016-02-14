var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var morgan = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/pixelpainter_mongoose_demo');
var pixelSchema = mongoose.Schema({owner: String});
//intsantiating Painting (model), drawings (database) which mongo creates
var Painting = mongoose.model('Painting', pixelSchema);

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.static(path.resolve(__dirname, 'public')));