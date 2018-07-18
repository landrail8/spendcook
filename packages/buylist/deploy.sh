#!/bin/sh

export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://146.185.170.108:2376"
export DOCKER_CERT_PATH="./docker/deploy"

docker-compose build
docker-compose down
docker-compose up -d