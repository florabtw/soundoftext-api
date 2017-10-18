const express = require('express'),
  router      = express.Router(),
  uuid        = require('uuid/v1'),
  Sound       = require('../models/sound.js');

router.post('/', function(req, res, next) {
  // TODO
  // assert req.body exists
  // assert req.body.text exists
  // assert req.body.voice exists
  // custom error message if not exists

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
