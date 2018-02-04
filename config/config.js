const env = process.env.NODE_ENV || 'development';

const config = {
  production: { stripeKey: 'sk_live_2zPqnnWkpgQferm62iUDZGQ7' },
  development: { stripeKey: 'sk_test_h3Uc9EYgdw54L0qcdniOt6ld' }
};

module.exports = config[env];
