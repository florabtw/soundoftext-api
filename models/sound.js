const mongoose = require('mongoose'),
  Schema   = mongoose.Schema,
  ObjectId = Schema.ObjectId,
  voices = require('../helpers/voices.js');

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
  voice: {
    type: String,
    enum: voices.keys
  }
});

module.exports = mongoose.model('Sound', soundSchema);
