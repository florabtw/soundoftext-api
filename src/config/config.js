require('dotenv').config();

const env = process.env;

const config = {
  db: {
    database: env.POSTGRES_DB,
    host: env.DB__HOST,
    password: env.POSTGRES_PASSWORD,
    user: env.POSTGRES_USER
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
