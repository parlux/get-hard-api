var express = require('express');
var router = express.Router();

var Program = require('../models/program');

router.get('/', function(req, res) {
  Program
    .find({}, function(err, programs) {
      if (err) throw err;
      res.json(
        programs.map(function(program) {
          return {id: program._id, name: program.name};
        })
      );
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

module.exports = router;
