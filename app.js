const express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/soundoftext', { useMongoClient: true });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(cors());
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
app.use('/donations', require('./routes/donations'));

app.use('/', function(req, res) {
  if (res.locals.errorMessage) {
    return res.status(400).json({
      success: false,
      message: res.locals.errorMessage
    });
  }
});

module.exports = app;
