require('dotenv').config();

const env = process.env;

const config = {
  db: {
    database: env.MYSQL_DATABASE,
    host: env.DB__HOST,
    password: env.MYSQL_PASSWORD,
    user: env.MYSQL_USER
  },
  storage: {
    accessKeyId: env.STORAGE__ACCESS_KEY_ID,
    secretAccessKey: env.STORAGE__SECRET_ACCESS_KEY
  },
  stripe: {
    key: env.STRIPE__KEY
  }
};

module.exports = config;
