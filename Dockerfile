FROM keymetrics/pm2:8

WORKDIR /usr/src/app

COPY VERSION         .
COPY package.json    .
COPY yarn.lock       .
COPY config/pm2.json .
COPY src             .

RUN yarn install --production --pure-lockfile

EXPOSE 5757

CMD ["pm2-runtime", "start", "pm2.json"]
