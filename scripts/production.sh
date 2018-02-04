#!/bin/sh

source ~/.nvm/nvm.sh

cd ~/Deployment

rm -rf soundoftext-api

git clone git@gitlab.com:2pool/soundoftext-api.git

cd soundoftext-api

yarn

pm2 delete soundoftext

pm2 start scripts/www --name soundoftext
