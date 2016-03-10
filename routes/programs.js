var express = require('express');
var router = express.Router();

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
    .populate('exercises')
    .exec(function(err, program) {
      if (err) throw err;

      res.json(program);

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
