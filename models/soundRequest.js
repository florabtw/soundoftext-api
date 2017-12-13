const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  voices = require('../helpers/voices.js'),
  uuid = require('uuid'),
  logger = require('winston');

const SoundRequestSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  _id: { type: String, default: uuid.v1 },
  location: String,
  message: String,
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

SoundRequestSchema.statics.DONE = 'Done';
SoundRequestSchema.statics.PENDING = 'Pending';
SoundRequestSchema.statics.ERROR = 'Error';

SoundRequestSchema.statics.findOrCreate = function(props) {
  return this.findOne(props).then(soundRequest => {
    if (soundRequest == null) {
      return this.create(props);
    }
    return soundRequest;
  });
};

SoundRequestSchema.index({ text: 'hashed' });

const SoundRequest = mongoose.model('SoundRequest', SoundRequestSchema);

SoundRequest.on('index', error => {
  if (error) {
    logger.error('Failed to index Sound Requests. Message: ' + error.message);
  } else {
    logger.info('Indexed Sound Requests!');
  }
});

module.exports = SoundRequest;
