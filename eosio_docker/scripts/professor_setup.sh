echo "--add professor key--"
cleos wallet unlock -n eosiomain < eosiomain_wallet_password.txt
cleos wallet import -n eosiomain --private-key 5K7pqGyfh1LDGAA83cCfN3D2Mbp9Ys6KtXJ1ckALnsHywDwpm84
cleos wallet import -n eosiomain --private-key 5KCi3BQBXzk7maHmzeaiHRjUCmcT74Qe2qMv6kQy17u9m42g1sP
cleos set account permission kirkkcameron professor EOS7fuG2YWbHcaowde6fuovmFRjgqThLMsCTtupDFMTUN9XYafHBZ
cleos set action permission kirkkcameron attendit record professor

#echo "--populate tables--"
#cleos push action attendit populate '["kirkkcameron"]' -p kirkkcameron@active

echo to test: \n cleos push action attendit record '["kirkkcameron","nicolashardy","100","54","100"]' -p kirkkcameron@professor

