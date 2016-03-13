var express = require('express');
var router = express.Router();

var Workout = require('../models/workout');
var Program = require('../models/program');

router.get('/', function(req, res) {
  Workout
    .find({}, function(err, workouts) {
      if (err) throw err;

      res.json(workouts);
    });
});

router.get('/:id', function(req, res) {
  Workout
    .findOne({ _id: req.params.id })
    .populate('program')
    .exec(function(err, workout) {
      if (err) throw err;

      res.json(workout);
    });
});

router.post('/', function(req, res) {
  var workout = req.body.workout;
  var newWorkout = new Workout(workout);
  newWorkout.save(function(err, workout) {
    if (err) throw err;

    res.json(workout);
  });
});

router.put('/:id', function(req, res) {
  var updatedWorkout = req.body.workout;

  Workout.findOne({ _id: req.params.id }, function(err, workout) {
    if (err) throw err;

    workout = Object.assign(workout, updatedWorkout);
    workout.save(function  (err, savedWorkout) {
      if (err) throw err;

      res.json(savedWorkout);
    });
  });
});

module.exports = router;
