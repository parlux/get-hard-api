var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var programSchema = new Schema({
  name: String,
  exercises: [
    { type: Schema.Types.ObjectId, ref: 'Exercise' }
  ]
});

module.exports = mongoose.model('Program', programSchema);