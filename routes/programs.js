var express = require('express');
var router = express.Router();
var _ = require('lodash');

var Program = require('../models/program');

router.get('/', function(req, res) {
  Program
    .find({}, function(err, programs) {
      if (err) throw err;
      res.json(
        programs.map(function(program) {
          return {_id: program._id, name: program.name};
        })
      );
    });
});

router.get('/:id', function(req, res) {
  Program
    .findOne({ _id: req.params.id })
    .populate('exercises.exercise')
    .exec(function(err, program) {
      if (err) throw err;

      res.json(program);
    });
});

router.post('/', function(req, res) {
  var program = new Program(req.body);
  program.save(function(err, savedProgram) {
    if (err) throw err;

    res.json(savedProgram);
  });
});

router.delete('/:id', function(req, res) {
  Program
    .findOneAndRemove({ _id: req.params.id }, function(err) {
      if (err) throw err;

      res.json({message: 'Removed'});
    })
});

module.exports = router;
