const express = require('express'),
  router = express.Router(),
  stripe = require('stripe')('sk_test_h3Uc9EYgdw54L0qcdniOt6ld');

const toDonation = charge => ({
  created: charge.created,
  amount: charge.amount / 100
});

router.post('/', function(req, res) {
  const token = req.body.token;
  const amount = req.body.amount;

  const charge = stripe.charges.create(
    {
      amount: amount,
      currency: 'usd',
      source: token,
      statement_descriptor: 'SOUNDOFTEXT_DONATION'
    },
    function(err, charge) {
      if (err) {
        res.status(500).json({ success: false, error: err });
        return;
      }

      const donation = toDonation(charge);
      res.json({ success: true, donation: donation });
    }
  );
});

module.exports = router;
