#!/bin/sh

source ~/.nvm/nvm.sh

rm -rf soundoftext-api

git clone git@gitlab.com:2pool/soundoftext-api.git

cd soundoftext-api

yarn

pm2 delete soundoftext

pm2 start bin/www --name soundoftext
