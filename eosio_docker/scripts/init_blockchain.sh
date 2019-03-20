#!/usr/bin/env bash
set -o errexit

echo "=== setup blockchain accounts and smart contract ==="

# set PATH
PATH="$PATH:/opt/eosio/bin:/opt/eosio/bin/scripts:"

set -m
echo "{" >> genesis.json
echo "\"initial_timestamp\": \"2018-06-01T12:00:00.000\",">> genesis.json
echo "\"initial_key\": \"EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV\",">> genesis.json
echo "\"initial_configuration\": {">> genesis.json
echo "\"max_block_net_usage\": 1048576,">> genesis.json
echo "\"target_block_net_usage_pct\": 1000,">> genesis.json
echo "\"max_transaction_net_usage\": 524288,">> genesis.json
echo "\"base_per_transaction_net_usage\": 12,">> genesis.json
echo "\"net_usage_leeway\": 500,">> genesis.json
echo "\"context_free_discount_net_usage_num\": 20,">> genesis.json
echo "\"context_free_discount_net_usage_den\": 100,">> genesis.json
echo "\"max_block_cpu_usage\": 1500000,">> genesis.json
echo "\"target_block_cpu_usage_pct\": 1000,">> genesis.json
echo "\"max_transaction_cpu_usage\": 1450000,">> genesis.json
echo "\"min_transaction_cpu_usage\": 100,">> genesis.json
echo "\"max_transaction_lifetime\": 3600,">> genesis.json
echo "\"deferred_trx_expiration_window\": 600,">> genesis.json
echo "\"max_transaction_delay\": 3888000,">> genesis.json
echo "\"max_inline_action_size\": 4096,">> genesis.json
echo "\"max_inline_action_depth\": 4,">> genesis.json
echo "\"max_authority_depth\": 6">> genesis.json
echo " }">> genesis.json
echo "}" >> genesis.json
cat genesis.json
# start nodeos ( local node of blockchain )
# run it in a background job such that docker run could continue
nodeos -e -p eosio -d /mnt/dev/data \
  --config-dir /mnt/dev/config \
  --http-validate-host=false \
  --plugin eosio::producer_plugin \
  --plugin eosio::chain_api_plugin \
  --plugin eosio::http_plugin \
  --http-server-address=0.0.0.0:8888 \
  --access-control-allow-origin=* \
  --max-transaction-time 10000 \
  --genesis-json genesis.json \
  --delete-all-blocks \
  --contracts-console \
  --verbose-http-errors &
sleep 1s
until curl localhost:8888/v1/chain/get_info
do
  sleep 1s
done

# Sleep for 2 to allow time 4 blocks to be created so we have blocks to reference when sending transactions
sleep 2s
echo "=== setup wallet: eosiomain ==="
# First key import is for eosio system account
cleos wallet create -n eosiomain --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > eosiomain_wallet_password.txt
cleos wallet import -n eosiomain --private-key 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3

echo "=== setup wallet: lokchainwal ==="
# key for eosio account and export the generated password to a file for unlocking wallet later
cleos wallet create -n lokchainwal --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > notechain_wallet_password.txt
# Owner key for lokchainwal wallet
cleos wallet import -n lokchainwal --private-key 5JpWT4ehouB2FF9aCfdfnZ5AwbQbTtHBAwebRXt94FmjyhXwL4K
# Active key for lokchainwal wallet
cleos wallet import -n lokchainwal --private-key 5JD9AGTuTeD5BXZwGQ5AtwBqHK21aHmYnTetHgk1B3pjj7krT8N

# * Replace "lokchainwal" by your own wallet name when you start your own project

# create account for lokchain with above wallet's public keys
cleos create account eosio lokchain EOS6PUh9rs7eddJNzqgqDx1QrspSHLRxLMcRdwHZZRL4tpbtvia5B EOS8BCgapgYA2L4LJfCzekzeSr3rzgSTUXRXwNi8bNRoz31D14en9

# * Replace "lokchain" by your own account name when you start your own project

echo "=== deploy smart contract ==="
# $1 smart contract name
# $2 account holder name of the smart contract
# $3 wallet for unlock the account
# $4 password for unlocking the wallet
deploy_contract.sh lokchain lokchain lokchainwal $(cat notechain_wallet_password.txt)

echo "=== create user accounts ==="
# script for create data into blockchain
create_accounts.sh

# * Replace the script with different form of data that you would pushed into the blockchain when you start your own project

echo "=== end of setup blockchain accounts and smart contract ==="
# create a file to indicate the blockchain has been initialized
touch "/mnt/dev/data/initialized"

# put the background nodeos job to foreground for docker run
fg %1
