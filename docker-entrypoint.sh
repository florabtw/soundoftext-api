#!/bin/sh

NODE_ENV=production yarn knex migrate:latest

$@
