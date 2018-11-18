#!/bin/bash

./scripts/start.sh

sleep 2

ava test/**/*.acc.js
code=$?

./scripts/stop.sh

exit $code
