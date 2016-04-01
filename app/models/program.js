var mongoose = require('mongoose')
var Schema = mongoose.Schema

var programSchema = new Schema({
  name: { type: String, required: true },
  duration: Number,
  workouts: [
    { type: Schema.Types.ObjectId, ref: 'Workout' }
  ]
})

module.exports = mongoose.model('Program', programSchema)