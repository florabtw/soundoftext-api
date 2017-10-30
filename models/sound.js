const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId,
  voices = require('../helpers/voices.js'),
  tts = require('google-tts-api'),
  downloadSound = require('../helpers/soundManager.js').downloadSound;

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

soundSchema.methods.download = function(cb) {
  return tts(this.text, this.voice)
    .then(url => {
      return downloadSound(this, url);
    })
    .then(path => {
      this.set({ path: path, status: 'Done' });
      return this.save();
    })
    .catch(error => {
      console.error(error);
      console.error('Sound: ' + this);

      this.set({ status: 'Error' });
      return this.save();
    });
};

module.exports = mongoose.model('Sound', soundSchema);
