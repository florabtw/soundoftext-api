const express = require('express'),
  router      = express.Router(),
  uuid        = require('uuid/v1'),
  Sound       = require('../models/sound.js');

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

  sound.save()
    .then(instance => {
      res.json({
        success: true,
        id: instance.id
      });
    }).catch(error => {
      // TODO
      // What if text is empty?
      // What if voice is empty?
      console.error(error);

      res.json({
        success: false,
        message: 'something bad happened'
      });
    });
});

module.exports = router;
