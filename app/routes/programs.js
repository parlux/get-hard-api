var express = require('express')
var router = express.Router()
var async = require('async')

var Program = require('../models/program')

// Create a program
router.post('/', function(req, res, next) {
  var program = new Program(req.body)
  program.save(function(err, program) {
    if (err) return next(err)

    res.json(program)
  })
})

// Get all programs
router.get('/', function(req, res, next) {
  Program
    .find({}, function(err, programs) {
      if (err) return next(err)

      res.json(programs)
    })
})

// Get program by id
router.get('/:id', function(req, res, next) {
  Program
    .findOne({ _id: req.params.id })
    .populate('workouts')
    .exec(function(err, program) {
      if (err) return next(err)

      res.json(program)
    })
})


// Update program by id
router.put('/:id', function(req, res, next) {
  var programReq = req.body
  Program.findOne({ _id: req.params.id }, function(err, program) {
    if (err) return next(err)

    program = Object.assign(program, programReq)
    program.save(function  (err, savedProgram) {
      if (err) return next(err)

      res.json(savedProgram)
    })
  })
})

// Delete program by id
router.delete('/:id', function(req, res, next) {
  Program
    .findOneAndRemove({ _id: req.params.id }, function(err) {
      if (err) return next(err)

      res.json({message: 'Removed'})
    })
})

module.exports = router
