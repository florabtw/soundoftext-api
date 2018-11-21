#!/bin/bash

if [ -z "$GPG_PASS" ]; then
  echo "Error: GPG_PASS is not set."
  exit 1
fi

command=`cat <<EOF
gpg --batch --import config/deploy.gpg && \
  git secret reveal -p $GPG_PASS
EOF
`

docker run             \
  -v `pwd`:`pwd`       \
  -w `pwd`             \
  --rm                 \
  ncpierson/git-secret \
  bash -c "$command"
