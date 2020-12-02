FROM node:12.14-alpine

WORKDIR /usr/src/app

COPY .version        .
COPY package.json    .
COPY yarn.lock       .
COPY config/pm2.json .
COPY src             src

RUN yarn global add pm2
RUN yarn install --production --pure-lockfile

EXPOSE 5757

CMD ["pm2-runtime", "start", "pm2.json"]
