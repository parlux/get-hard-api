var express = require('express');
var router = express.Router();

var Exercise = require('../models/exercise');

router.get('/', function(req, res) {
  Exercise.find({}, function(err, exercises) {
    if (err) throw err;

    res.json(exercises);
  });
});

router.post('/', function(req, res) {
  var exercise = new Exercise(req.body.exercise);
  exercise.save(function(err, savedExercise) {
    if (err) throw err;

    res.json(savedExercise);
  });
});

router.get('/:id', function(req, res) {
  Exercise
    .findOne({ _id: req.params.id }, function(err, exercise) {
      if (err) throw err;

      res.json(exercise);
    });
});

router.delete('/:id', function(req, res) {
  Exercise
    .findOneAndRemove({ _id: req.params.id }, function(err) {
      if (err) throw err;

      res.json({message: 'Removed'});
    })
});

router.put('/:id', function(req, res) {
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

module.exports = router;
