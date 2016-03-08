var express = require('express');
var router = express.Router();
var sortByOrder = require('../utils/sortByOrder');

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

router.post('/', function(req, res) {
  var program = new Program(req.body.program);
  program.save(function(err, savedProgram) {
    if (err) throw err;

    res.json(savedProgram);
  });
});

router.get('/:id', function(req, res) {
  Program
    .findOne({ _id: req.params.id })
    .populate('exercises._id')
    .exec(function(err, program) {
      if (err) throw err;

      var newProgram = Object.assign({}, program._doc, {
        exercises: program._doc.exercises.map(function(exercise) {
          var obj1 = Object.assign({}, { order: exercise.order });
          var obj2 = Object.assign({}, exercise._id._doc);
          return Object.assign({}, obj1, obj2);
        }).sort(sortByOrder)
      });

      res.json(newProgram);

    });
});

router.delete('/:id', function(req, res) {
  Program
    .findOneAndRemove({ _id: req.params.id }, function(err) {
      if (err) throw err;

      res.json({message: 'Removed'});
    })
});

router.put('/:id', function(req, res) {
  var programReq = req.body.program;
  Program.findOne({ _id: req.params.id }, function(err, program) {
    if (err) throw err;

    program = Object.assign(program, programReq);
    program.save(function  (err, savedProgram) {
      if (err) throw err;

      res.json(savedProgram);
    });
  });
});

module.exports = router;
