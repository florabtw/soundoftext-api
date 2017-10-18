const mongoose = require('mongoose'),
  Schema   = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const soundSchema = new Schema({
  accessed: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now
  },
  path: String,
  status: {
    type: String,
    enum: ['Pending', 'Done', 'Error'],
    default: ['Pending']
  },
  text: String,
  voice: String
});

module.exports = mongoose.model('Sound', soundSchema);
