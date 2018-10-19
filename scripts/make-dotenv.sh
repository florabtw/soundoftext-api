#! /bin/bash

if [ -z "$STRIPE__KEY" ]; then
  echo "Missing STRIPE__KEY"
  exit 1
fi

if [ -z "$STORAGE__ACCESS_KEY_ID" ]; then
  echo "Missing STORAGE__ACCESS_KEY_ID"
  exit 1
fi

if [ -z "$STORAGE__SECRET_ACCESS_KEY" ]; then
  echo "Missing STORAGE__SECRET_ACCESS_KEY"
  exit 1
fi

cat << EOF > .env
STORAGE__ACCESS_KEY_ID=$STORAGE__ACCESS_KEY_ID
STORAGE__SECRET_ACCESS_KEY=$STORAGE__SECRET_ACCESS_KEY
STRIPE__KEY=$STRIPE__KEY
EOF
