var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// DB
mongoose.connect('mongodb://localhost/get-hard');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Models
var Exercise = require('./models/exercise');
var Program = require('./models/program');
var Workout = require('./models/workout');

// App
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.json({
    message: 'Hello World!!!'
  });
});

// Get all exercises
app.get('/exercises', function(req, res) {
  Exercise.find({}, function(err, exercises) {
    if (err) throw err;

    res.json(exercises);
  });
});

// Update an exercise by id
app.put('/exercises/:id', function(req, res) {
  var exerciseReq = req.body.exercise;

  Exercise.findOne({ _id: req.params.id }, function(err, exercise) {
    if (err) throw err;

    exercise = Object.assign(exercise, exerciseReq);
    exercise.save(function  (err, savedExercise) {
      if (err) throw err;

      res.json(savedExercise);  
    });
  });
});

// Get all programs
app.get('/programs', function(req, res) {
  Program
    .find({}, function(err, programs) {
      if (err) throw err;
      res.json(
        programs.map(function(program) {
          return {id: program._id, name: program.name};
        })
      );
    });
});

// Get one program by id
app.get('/programs/:id', function(req, res) {
  Program
    .findOne({ _id: req.params.id })
    .populate('exercises')
    .exec(function(err, program) {
      if (err) throw err;
      res.json(program);
    });
});

// Create new workout
app.post('/workouts', function(req, res) {
  var programId = req.body.program; 
  var newWorkout = new Workout({
    date: Date.now(),
    program: programId
  });

  Program
    .findOne({ _id: programId })
    .populate('exercises')
    .exec(function(err, program) {
      if (err) throw err;

      newWorkout.exercises = program.exercises;
      newWorkout.save(function(err, workout) {
        if (err) throw err;

        res.json( {message: 'Created new workout ' + workout._id} );
      });
  });
});

// Update a workout by id
app.put('/workouts/:id', function(req, res) {
  var workoutReq = req.body.workout;

  Workout.findOne({ _id: req.params.id }, function(err, workout) {
    if (err) throw err;

    workout = Object.assign(workout, workoutReq);
    workout.save(function  (err, savedWorkout) {
      if (err) throw err;
      
      res.json(savedWorkout);  
    });
  });
});

// Get all workouts
app.get('/workouts', function(req, res) {
  Workout
    .find({})
    .populate('program')
    .exec(function(err, workouts) {
      if (err) throw err;

      var result = workouts.map(function(workout) {
        // This is a bit nasty, Object.assign seems to convert
        // the model to a plain JS object, which means I need
        // to use ._doc to get the values of the doc out here
        return Object.assign({}, workout._doc, {
          program: {
            _id: workout.program._id,
            name: workout.program.name
          }
        });
      });

      res.json(result);
    });
});

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
app.listen(3000, function () {
  console.log('get-hard-api listening on port 3000!');
});
