var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/soundoftext', { useMongoClient: true });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static('public'));

app.use('/', function(req, res, next) {
  if (req.method == 'POST' && !req.is('json')) {
    return res.status(400).json({
      success: false,
      message: "Expected JSON body. Please use content-type 'application/json'."
    });
  }

  next();
});

app.use('/sounds', require('./routes/sounds'));

app.use('/', function(req, res) {
  if (res.locals.errorMessage) {
    return res.status(400).json({
      success: false,
      message: res.locals.errorMessage
    });
  }
});

module.exports = app;
