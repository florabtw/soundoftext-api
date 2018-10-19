#!/bin/sh

source ~/.nvm/nvm.sh

cd ~/Deployment

rm -rf soundoftext-api

git clone git@gitlab.com:2pool/soundoftext-api.git

if [ ! -f "./.env" ]; then
  echo "Can't find .env file!"
  exit 1
fi

cp .env soundoftext-api/.env

cd soundoftext-api

yarn

pm2 delete soundoftext

NODE_ENV=production pm2 start scripts/www --name soundoftext
