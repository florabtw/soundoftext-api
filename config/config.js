const env = process.env.NODE_ENV || 'dev';

const config = {
  production: {
    soundsUrl: 'http://beta.soundoftext.com/public/sounds'
  },
  dev: {
    soundsUrl: 'http://192.168.1.45:3000/public/sounds'
  }
}

module.exports = config[env];
