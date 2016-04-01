var mongoose = require('mongoose')
var Schema = mongoose.Schema

var workoutSchema = new Schema({
  name: { type: String, required: true },
  exercises: [
    { type: Schema.Types.ObjectId, ref: 'Exercise' }
  ]
})

module.exports = mongoose.model('Workout', workoutSchema)