#!/bin/bash

set -ex

USERNAME=ncpierson
IMAGE=soundoftext-api
VERSION=`cat VERSION`

./scripts/build.sh

if [ "$CI" ]; then
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
fi

docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$VERSION
docker push $USERNAME/$IMAGE:latest
docker push $USERNAME/$IMAGE:$VERSION
