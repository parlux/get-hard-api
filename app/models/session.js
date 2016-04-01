var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ExerciseSchema = require('./exercise').schema

var feelings = require('../constants/feelings')

var GOOD = feelings.GOOD
var AVERAGE = feelings.AVERAGE
var UGLY = feelings.UGLY

var sessionSchema = new Schema({
  date: { type: String, default: Date.now },
  exercises: [ExerciseSchema],
  feeling: { type: String, enum: [ GOOD, AVERAGE, UGLY ] }
})

module.exports = mongoose.model('Session', sessionSchema)