var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 3000;
var dbConfig = require('./config/db.js');
var morgan = require('morgan');

// Routes
var exercises = require('./routes/exercises');
var programs = require('./routes/programs');
var workouts = require('./routes/workouts');

mongoose.connect(dbConfig.url);

app.use(morgan('dev'));;
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/exercises', exercises);
app.use('/programs', programs);
app.use('/workouts', workouts);

// Error handling
app.use(function(req, res, next) {
  res.status(404).json({
    message: 'Sorry cant find that!'
  });
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something broke!'
  });
});

// Serve
app.listen(port, function () {
  console.log('Application listening on port %s!', port);
});
