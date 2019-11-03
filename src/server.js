const Knex = require('knex');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const path = require('path');
const winston = require('winston');
const { Model } = require('objection');

const config = require('./config/config');
const knexConfig = require('../knexfile');

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, { timestamp: true, showLevel: false });

var knex = Knex(knexConfig.production);
Model.knex(knex);

const app = express();

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
