const env = process.env.NODE_ENV || 'development';
const hostname = process.env.SOT_HOSTNAME;

const config = {
  production: {
    soundsUrl: `http://${hostname}/api/public/sounds`,
    stripeKey: 'sk_live_2zPqnnWkpgQferm62iUDZGQ7'
  },
  staging: {
    soundsUrl: `http://${hostname}/api/public/sounds`,
    stripeKey: 'sk_test_h3Uc9EYgdw54L0qcdniOt6ld'
  },
  development: {
    soundsUrl: `http://${hostname}:9000/public/sounds`,
    stripeKey: 'sk_test_h3Uc9EYgdw54L0qcdniOt6ld'
  }
};

module.exports = config[env];
