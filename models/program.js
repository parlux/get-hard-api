var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var programSchema = new Schema({
  name: String,
  exercises: [
    {
      exercise: { type: Schema.Types.ObjectId, ref: 'Exercise' },
      order: Number
    }
  ]
});

module.exports = mongoose.model('Program', programSchema);