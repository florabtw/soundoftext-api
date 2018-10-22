#!/bin/bash

set -ex

USERNAME=ncpierson
IMAGE=soundoftext-api

docker build -t $USERNAME/$IMAGE:latest .
