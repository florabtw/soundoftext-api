#!/bin/sh

source ~/.nvm/nvm.sh

cd soundoftext-api

git pull

yarn

pm2 delete soundoftext

pm2 start bin/www --name soundoftext
