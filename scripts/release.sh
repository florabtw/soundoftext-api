#!/bin/bash

set -ex

USERNAME=ncpierson
IMAGE=soundoftext-api

git pull

# bump version

version=`cat VERSION`
echo "Current version: $version"
read -p "New version:" version

echo "Using version: $version"

./scripts/build.sh

yarn version --new-version "$version"

git push
git push --tags

docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$version
docker push $USERNAME/$IMAGE:latest
docker push $USERNAME/$IMAGE:$version
