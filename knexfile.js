const config = require('./src/config/config.js');

module.exports = {
  production: {
    client: 'pg',
    connection: { ...config.db }
  },
  development: {
    client: 'pg',
    connection: { ...config.db }
  }
};
