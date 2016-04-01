var mongoose = require('mongoose')
var Schema = mongoose.Schema
var exerciseTypes = require('../constants/exercise-types')

var STANDARD = exerciseTypes.STANDARD
var BODYWEIGHT = exerciseTypes.BODYWEIGHT
var TIMED = exerciseTypes.TIMED

var exerciseSchema = new Schema({
  type: { type: String, enum: [ STANDARD, BODYWEIGHT, TIMED ], default: STANDARD },
  name: { type: String, required: true },
  sets: Number,
  reps: Number,
  weight: Number,
  increments: Number,
  status: Array
});

module.exports = mongoose.model('Exercise', exerciseSchema)