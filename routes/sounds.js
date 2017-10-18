const express = require('express'),
  router      = express.Router(),
  uuid        = require('uuid/v1');

router.post('/', function(req, res, next) {
  res.json({
    success: true,
    id: uuid()
  });
});

module.exports = router;
