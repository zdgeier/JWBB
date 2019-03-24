#!/usr/bin/env bash
set -o errexit

# this file is used to continue the stopped blockchain

echo "=== start blockchain with  ==="

# set PATH
PATH="$PATH:/opt/eosio/bin:./"

set -m

# start nodeos ( local node of blockchain )
# run it in a background job such that docker run could continue
nodeos -e -p eosio -d /mnt/dev/data \
  --config-dir /mnt/dev/config \
  --hard-replay \
  --http-validate-host=false \
  --plugin eosio::producer_plugin \
  --plugin eosio::chain_api_plugin \
  --plugin eosio::http_plugin \
  --http-server-address=0.0.0.0:8888 \
  --access-control-allow-origin=* \
  --max-transaction-time 10000 \
  --genesis-json ~/Documents/JWBB/eosio_docker/scripts/genesis.json \
  --contracts-console \
  --delete-all-blocks \
  --verbose-http-errors

# `--hard-replay` option is needed
# because the docker stop signal is not being passed to nodeos process directly
# as we run the init_blockchain.sh as PID 1.
