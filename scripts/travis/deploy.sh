#!/bin/bash

. ./scripts/travis/add-deploy-key.sh

git clone git@github.com:${TRAVIS_REPO_SLUG}.git $TRAVIS_REPO_SLUG

cd $TRAVIS_REPO_SLUG

openssl aes-256-cbc \
  -K $encrypted_829e1da235e2_key \
  -iv $encrypted_829e1da235e2_iv \
  -in config/deploy.gpg.enc      \
  -out config/deploy.gpg         \
  -d

./scripts/travis/decrypt.sh

yarn config set version-git-message "[skip ci] v%s"

yarn release
