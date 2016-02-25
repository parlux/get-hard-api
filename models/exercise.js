var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var exerciseSchema = new Schema({
  name: String,
  sets: Number,
  reps: Number,
  weight: Number,
  increments: Number
});

module.exports = mongoose.model('Exercise', exerciseSchema);