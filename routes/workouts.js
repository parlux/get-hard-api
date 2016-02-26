var express = require('express');
var router = express.Router();

var Workout = require('../models/workout');
var Program = require('../models/program');

router.get('/', function(req, res) {
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

router.post('/', function(req, res) {
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

router.put('//:id', function(req, res) {
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

module.exports = router;
