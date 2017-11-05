const express = require('express'),
  router = express.Router(),
  uuid = require('uuid/v1'),
  SoundRequest = require('../models/soundRequest.js'),
  config = require('../config/config'),
  storage = require('../helpers/storage.js');

router.post('/', function(req, res, next) {
  if (!req.body.data) {
    res.locals.errorMessage = "Missing value for 'data'. See documentation.";
    return next();
  }

  if (!req.body.data.text) {
    res.locals.errorMessage = "Missing value for 'text'. See documentation.";
    return next();
  }

  if (!req.body.data.voice) {
    res.locals.errorMessage = "Missing value for 'voice'. See documentation.";
    return next();
  }

  const data = req.body.data;

  SoundRequest.findOrCreate({ text: data.text, voice: data.voice })
    .then(soundRequest => {
      res.json({ success: true, id: soundRequest.id });

      storage.create(soundRequest);
    })
    .catch(error => {
      console.error(error);
      console.error('Request Body: ' + JSON.stringify(req.body));

      res.locals.errorMessage = error.message;
      next();
    });
});

router.get('/:id', function(req, res, next) {
  lookupSound(req.params.id)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.locals.errorMessage = error.message;
      next();
    });
});

async function lookupSound(soundId) {
  const sound = await storage.lookup(soundId);

  if (sound) {
    return { status: SoundRequest.DONE, location: sound.location };
  }

  const soundRequest = await SoundRequest.findById(soundId);

  if (soundRequest) {
    const { status, message } = soundRequest;
    return { status, message };
  }

  throw new Error(`Could not find Sound with id ${soundId}`);
}

module.exports = router;
