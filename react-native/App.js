/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'core-js';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, Button, View} from 'react-native';

import {Api, JsonRpc, RpcError} from 'eosjs-rn'; // https://github.com/EOSIO/eosjs
import JsSignatureProvider from 'eosjs-rn/dist/eosjs-jssig';
import {TextDecoder, TextEncoder} from 'text-encoding';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

const endpoint = "http://34.73.70.194:8888";
const accounts = [
    {
        "name": "useraaaaaaaa",
        "privateKey": "5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5",
        "publicKey": "EOS6kYgMTCh1iqpq9XGNQbEi8Q6k5GujefN9DSs55dcjVyFAq7B6b"
    },
    {
        "name": "useraaaaaaab",
        "privateKey": "5KLqT1UFxVnKRWkjvhFur4sECrPhciuUqsYRihc1p9rxhXQMZBg",
        "publicKey": "EOS78RuuHNgtmDv9jwAzhxZ9LmC6F295snyQ9eUDQ5YtVHJ1udE6p"
    },
    {
        "name": "useraaaaaaac",
        "privateKey": "5K2jun7wohStgiCDSDYjk3eteRH1KaxUQsZTEmTGPH4GS9vVFb7",
        "publicKey": "EOS5yd9aufDv7MqMquGcQdD6Bfmv6umqSuh9ru3kheDBqbi6vtJ58"
    },
    {
        "name": "useraaaaaaad",
        "privateKey": "5KNm1BgaopP9n5NqJDo9rbr49zJFWJTMJheLoLM5b7gjdhqAwCx",
        "publicKey": "EOS8LoJJUU3dhiFyJ5HmsMiAuNLGc6HMkxF4Etx6pxLRG7FU89x6X"
    },
    {
        "name": "useraaaaaaae",
        "privateKey": "5KE2UNPCZX5QepKcLpLXVCLdAw7dBfJFJnuCHhXUf61hPRMtUZg",
        "publicKey": "EOS7XPiPuL3jbgpfS3FFmjtXK62Th9n2WZdvJb6XLygAghfx1W7Nb"
    },
    {
        "name": "useraaaaaaaf",
        "privateKey": "5KaqYiQzKsXXXxVvrG8Q3ECZdQAj2hNcvCgGEubRvvq7CU3LySK",
        "publicKey": "EOS5btzHW33f9zbhkwjJTYsoyRzXUNstx1Da9X2nTzk8BQztxoP3H"
    },
    {
        "name": "useraaaaaaag",
        "privateKey": "5KFyaxQW8L6uXFB6wSgC44EsAbzC7ideyhhQ68tiYfdKQp69xKo",
        "publicKey": "EOS8Du668rSVDE3KkmhwKkmAyxdBd73B51FKE7SjkKe5YERBULMrw"
    }
];

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noteTable: [], // to store the table rows from smart contract
            note: "", // Following 3 fields store current values of the text fields
            account: "",
            privateKey: "",
        };
        this.handleFormEvent = this.handleFormEvent.bind(this);
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    }

    handleTextFieldChange(event) {
        this.setState(prevState => {
            let newState = Object.assign({}, prevState);
            newState["account"] = this.refs.account._lastNativeText;
            newState["privateKey"] = this.refs.privateKey._lastNativeText;
            newState["note"] = this.refs.note._lastNativeText;
            return newState;
        });
    }

    // generic function to handle form events (e.g. "submit" / "reset")
    // push transactions to the blockchain by using eosjs
    async handleFormEvent(event) {
        // stop default behaviour
        event.preventDefault();

        // collect form data i.e. account, private key and note
        let account = this.state.account;
        let privateKey = this.state.privateKey;
        let note = this.state.note;

        // prepare variables for the switch below to send transactions
        let actionName = "update";
        let actionData = {
            user: account,
            note: note,
        };

        // define actionName and action according to event type
        // switch (event.type) {
        //     case "submit":
        //         actionName = "update";
        //         actionData = {
        //             user: account,
        //             note: note,
        //         };
        //         break;
        //     default:
        //         return;
        // }
        console.log(actionName);

        // eosjs function call: connect to the blockchain
        const rpc = new JsonRpc(endpoint);
        const signatureProvider = new JsSignatureProvider([privateKey]);
        const api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()});
        try {
            const result = await api.transact({
                actions: [{
                    account: "notechainacc",
                    name: actionName,
                    authorization: [{
                        actor: account,
                        permission: 'active',
                    }],
                    data: actionData,
                }]
            }, {
                blocksBehind: 3,
                expireSeconds: 30,
            });

            console.log(result);
            this.getTable();
        } catch (e) {
            console.log('Caught exception: ' + e);
            if (e instanceof RpcError) {
                console.log(JSON.stringify(e.json, null, 2));
            }
        }
    }

    // gets table data from the blockchain
    // and saves it into the component state: "noteTable"
    getTable() {
        const rpc = new JsonRpc(endpoint);
        rpc.get_table_rows({
            "json": true,
            "code": "notechainacc",   // contract who owns the table
            "scope": "notechainacc",  // scope of the table
            "table": "notestruct",    // name of the table as specified by the contract abi
            "limit": 100,
        }).then(result => this.setState({noteTable: result.rows}));
    }

    render() {
        const {noteTable} = this.state;

        let noteCards = noteTable.map((row) =>
            (<Text>{row.user} said {row.note} at {row.timestamp}</Text>));
        return (
            <View style={styles.container}>
                {noteCards}
                <TextInput placeholder= "account" ref="account" onChangeText={this.handleTextFieldChange}/>
                <TextInput placeholder="key" ref="privateKey" onChangeText={this.handleTextFieldChange}/>
                <TextInput placeholder="note" ref="note" onChangeText={this.handleTextFieldChange}/>
                <Button title="submit" onPress={this.handleFormEvent}>
                    Add / Update note
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default App;