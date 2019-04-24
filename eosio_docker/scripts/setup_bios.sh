#creates bios accounts
EOSIOMAIN_KEY=EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV

cleos wallet unlock -n eosiomain < eosiomain_wallet_password.txt
echo "--create necessary bios accounts--"
for suffix in bpay msig names ram ramfee saving token vpay rex
do
    cleos create account eosio eosio.$suffix $EOSIOMAIN_KEY
done

echo "--clone eosio.contract repo--"
git clone https://github.com/EOSIO/eosio.contracts

echo "--build--"
cd eosio.contracts/
./build.sh
cd ..
