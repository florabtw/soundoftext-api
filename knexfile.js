const config = require('./src/config/config.js');

module.exports = {
  production: {
    client: 'mysql',
    connection: { ...config.db }
  },
  development: {
    client: 'mysql',
    connection: { ...config.db }
  }
};
