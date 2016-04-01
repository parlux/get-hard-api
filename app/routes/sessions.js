var express = require('express')
var router = express.Router()

var Session = require('../models/session')
var Workout = require('../models/workout')

// Create session
router.post('/', function(req, res, next) {
  var session = new Session(req.body)
  session.save(function(err, session) {
    if (err) return next(err)

    res.json(session)
  })
})

// Get all sessions
router.get('/', function(req, res, next) {
  Session
    .find({}, function(err, sessions) {
      if (err) return next(err)

      res.json(sessions)
    })
})

// Get session by id
router.get('/:id', function(req, res, next) {
  Session
    .findOne({ _id: req.params.id })
    .populate('exercises')
    .exec(function(err, session) {
      if (err) return next(err)

      res.json(session)
    })
})

// Update session by id
router.put('/:id', function(req, res, next) {
  Session.findOne({ _id: req.params.id }, function(err, session) {
    if (err) return next(err)

    session = Object.assign({}, session, req.body)
    session.save(function  (err, savedSession) {
      if (err) return next(err)

      res.json(savedSession)
    })
  })
})

// Delete session by id
router.delete('/:id', function(req, res, next) {
  Session
    .findOneAndRemove({ _id: req.params.id }, function(err) {
      if (err) return next(err)

      res.json({message: 'Removed'})
    })
})


module.exports = router
