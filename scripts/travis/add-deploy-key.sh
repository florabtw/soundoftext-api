#!/bin/bash

eval $(ssh-agent -s)
ssh-add config/deploy_key

git config user.name "Travis"
git config user.email "travis@travis-ci.com"
