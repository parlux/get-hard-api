var express = require('express')
var router = express.Router()

var Workout = require('../models/workout')
var Program = require('../models/program')

// Create workout
router.post('/', function(req, res, next) {
  var workout = new Workout(req.body)
  workout.save(function(err, workout) {
    if (err) return next(err)

    res.json(workout)
  })
})

// Get all workouts
router.get('/', function(req, res, next) {
  Workout
    .find({}, function(err, workouts) {
      if (err) return next(err)

      res.json(workouts)
    })
})

// Get workout by id
router.get('/:id', function(req, res, next) {
  Workout
    .findOne({ _id: req.params.id })
    .populate('exercises')
    .exec(function(err, workout) {
      if (err) return next(err)

      res.json(workout)
    })
})

// Update workout by id
router.put('/:id', function(req, res, next) {
  Workout.findOne({ _id: req.params.id }, function(err, workout) {
    if (err) return next(err)

    workout = Object.assign({}, workout, req.body)
    workout.save(function  (err, savedWorkout) {
      if (err) return next(err)

      res.json(savedWorkout)
    })
  })
})

// Delete workout by id
router.delete('/:id', function(req, res, next) {
  Workout
    .findOneAndRemove({ _id: req.params.id }, function(err) {
      if (err) return next(err)

      res.json({message: 'Removed'})
    })
})


module.exports = router
