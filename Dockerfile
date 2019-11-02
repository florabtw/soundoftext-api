FROM keymetrics/pm2:10-alpine

WORKDIR /usr/src/app

COPY .version             .
COPY package.json         .
COPY yarn.lock            .
COPY config/pm2.json      .
COPY knexfile.js          .
COPY migrations           migrations
COPY src                  src

RUN yarn install --production --pure-lockfile

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 5757

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["pm2-runtime", "start", "pm2.json"]
