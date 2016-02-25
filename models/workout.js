var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workoutSchema = new Schema({
  date: { type: Date, default: Date.now },
  program: { type: Schema.Types.ObjectId, ref: 'Program' },
  exercises: [
    {
      _id: { type: Schema.Types.ObjectId },
      name: String,
      sets: Number,
      reps: Number,
      weight: Number,
      increments: Number,
      status: []
    }
  ]
});

module.exports = mongoose.model('Workout', workoutSchema);