#!/usr/bin/env bash

echo "=== start of first time setup ==="

# change to script's directory
cd "$(dirname "$0")"
SCRIPTPATH="$( pwd -P )"

#Assumes nodejs and docker are installed

# build docker image, if necessary
if [[ "$(docker images -q eosio-notechain:eos1.6.0-cdt1.5.0)" == "" ]]; then
  echo "=== Build docker image eosio-notechain version eos1.6.0-cdt1.5.0, this will take some time for the first time run ==="
  docker build -t eosio-notechain:eos1.6.0-cdt1.5.0 .
else
  echo "=== Docker image already exists, skip building ==="
fi

# force remove the perivous container if any
# create a clean data folder in eosio_docker to preserve block data
echo "=== setup/reset data for eosio_docker ==="
#docker rm --force eosio_notechain_container
rm -rf "./eosio_docker/data"
mkdir -p "./eosio_docker/data"

# set up node_modules for frontend
echo "=== npm install package for frontend react app ==="
# change directory to ./frontend
cd "$SCRIPTPATH/frontend"
npm install
