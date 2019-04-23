import {Api, JsonRpc, RpcError} from 'eosjs'; // https://github.com/EOSIO/eosjs
import JsSignatureProvider from 'eosjs/dist/eosjs-jssig'
import {TextDecoder, TextEncoder} from 'text-encoding';


function test() {
    const endpoint = "http://localhost:8888";

    let account = "useraaaaaaaa";
    let privateKey = "5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5";
    let crn = 123456;

    let actionName = "create";
    let actionData = {
        user: account,
        crn: crn,
        xval: 37.22,
        yval: -80.42,
    };
    // eosjs function call: connect to the blockchain
    const rpc = new JsonRpc(endpoint);
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()});
    try {
        var trans = {
            actions: [{
                account: "lokchain",
                name: actionName,
                authorization: [{
                    actor: account,
                    permission: 'active',
                }],
                data: actionData,
            }]
        };
        console.log(trans);

        var trans2 = {
            blocksBehind: 3,
            expireSeconds: 30,
        };


        api.transact(trans, trans2).then(() => {
            console.log(result);
        });


    } catch (e) {
        console.log('Caught exception: ' + e);
        if (e instanceof RpcError) {
            console.log(JSON.stringify(e.json, null, 2));
        }
    }
}

test();