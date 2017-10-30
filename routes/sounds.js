const express = require('express'),
  router = express.Router(),
  uuid = require('uuid/v1'),
  Sound = require('../models/sound.js'),
  config = require('../config/config'),
  sanitize = require('sanitize-filename');

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

  const body = req.body;

  const sound = new Sound({
    text: body.data.text,
    voice: body.data.voice
  });

  sound
    .save()
    .then(sound => {
      res.json({ success: true, id: sound.id });

      return sound;
    })
    .then(sound => {
      sound.download();
    })
    .catch(error => {
      console.error(error);
      console.error('Request Body: ' + JSON.stringify(req.body));

      res.locals.errorMessage = error.message;
      next();
    });
});

router.get('/:id', function(req, res, next) {
  Sound.findById(req.params.id)
    .then(sound => {
      const responseBody = { status: sound.status };

      if (sound.status == 'Done') {
        const soundUrl = `${config.soundsUrl}/${sound.path}`;
        const safeSoundUrl = encodeURI(soundUrl);

        responseBody.location = safeSoundUrl;
      } else if (sound.status == 'Error') {
        responseBody.message =
          'Failed to create audio file. Please send me an email if problem persists.';
      }

      res.json(responseBody);
    })
    .catch(error => {
      res.locals.errorMessage = `No sound was found with id "${req.params
        .id}".`;
      next();
    });
});

module.exports = router;
