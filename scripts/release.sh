#!/bin/bash

set -e

# yarn test
yarn version --patch
yarn deploy
