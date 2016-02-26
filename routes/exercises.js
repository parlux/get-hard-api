var express = require('express');
var router = express.Router();

var Exercise = require('../models/exercise');

router.get('/', function(req, res) {
  Exercise.find({}, function(err, exercises) {
    if (err) throw err;

    res.json(exercises);
  });
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
